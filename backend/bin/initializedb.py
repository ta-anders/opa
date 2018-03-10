#!/usr/bin/env python
import datetime
import os
import sys
import transaction

from pyramid.paster import (
    get_appsettings,
    setup_logging,
)

from pyramid.scripts.common import parse_vars

from opa.models.meta import Base
from opa.models import (
    get_engine,
    get_session_factory,
    get_tm_session,
    Algorithm,
    PackingObject,
    PackingSpace,
    Session,
    SessionConfiguration
)


def usage(argv):
    cmd = os.path.basename(argv[0])
    print('usage: %s <config_uri> [var=value]\n'
          '(example: "%s development.ini")' % (cmd, cmd))
    sys.exit(1)


def main(argv=sys.argv):
    if len(argv) < 2:
        usage(argv)
    config_uri = argv[1]
    options = parse_vars(argv[2:])
    setup_logging(config_uri)
    settings = get_appsettings(config_uri, options=options)

    engine = get_engine(settings)
    Base.metadata.create_all(engine)

    session_factory = get_session_factory(engine)

    with transaction.manager:
        dbsession = get_tm_session(session_factory, transaction.manager)

        session1 = Session(name='test 1', created_at=datetime.datetime.now())
        session2 = Session(name='test 2', created_at=datetime.datetime.now())
        dbsession.add_all([session1, session2])

        config_1 = SessionConfiguration(session=session1, enable_tooltips=True, selected_algorithm_id=1)
        config_2 = SessionConfiguration(session=session2, enable_tooltips=False, selected_algorithm_id=1)

        space = PackingSpace(height=500, width=600, session=session1)
        model = PackingObject(width=100, height=100, background_color='#000000', session=session1)

        space2 = PackingSpace(height=500, width=600, session=session2)

        algorithms = [
            Algorithm(name='cgreedy'),
            Algorithm(name='level_mip'),
            Algorithm(name='level_cp')
        ]

        dbsession.add_all([config_1, config_2, space, model, space2] + algorithms)


if __name__ == '__main__':
    main()
