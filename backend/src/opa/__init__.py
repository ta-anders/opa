from pyramid.config import Configurator


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.include('opa.models')
    config.include('opa.routes')
    config.scan()
    return config.make_wsgi_app()
