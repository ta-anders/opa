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
    PackingObject,
    PackingSpace,
    Session
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

        session = Session(name='test', created_at=datetime.datetime.now())
        dbsession.add(session)

        model = PackingObject(width=10, height=10, session=session)
        space = PackingSpace(height=500, width=600, session=session)
        dbsession.add(model)
        dbsession.add(space)


if __name__ == '__main__':
    main()
