import pytest

from pyramid import testing

from factories import FACTORIES
from opa.models.meta import Base


@pytest.yield_fixture
def app_config():
    settings = {'sqlalchemy.url': 'sqlite:///:memory:'}
    config = testing.setUp(settings=settings)
    config.include('opa.models')
    yield config
    testing.tearDown()


@pytest.fixture
def dbsession(app_config):
    session = app_config.registry['dbsession_factory']()
    engine = session.bind
    Base.metadata.create_all(engine)
    return session


@pytest.fixture(autouse=True)
def set_sqlalchemy_session_on_factories(dbsession):
    for factory_cls in FACTORIES:
        factory_cls._meta.sqlalchemy_session = dbsession
