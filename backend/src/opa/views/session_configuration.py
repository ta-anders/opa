from marshmallow import fields
from pyramid.view import view_config
from webargs.pyramidparser import use_kwargs

from opa.models import SessionConfiguration, Algorithm
from opa.schemas.algorithm import AlgorithmSchema
from opa.schemas.session_configuration import SessionConfigurationSchema
from opa.utils import query_by_session


@view_config(
    route_name='session_configuration',
    request_method='GET',
    renderer='json'
)
def session_configuration_get(request):
    db = request.dbsession

    session_configuration = query_by_session(db, request.context.session_id, SessionConfiguration).one()

    schema = SessionConfigurationSchema(strict=True)

    result = schema.dump(session_configuration).data

    # TODO: tacking this onto here for now
    algorithms = db.query(Algorithm).all()
    result['algorithms'] = AlgorithmSchema(strict=True, many=True).dump(algorithms).data

    return result


@view_config(
    route_name='session_configuration',
    request_method='PUT',
    renderer='json'
)
@use_kwargs(
    {
        'enable_tooltips': fields.Boolean(required=True, load_from='enableTooltips'),
        'selected_algorithm_id': fields.Integer(required=True, load_from='selectedAlgorithmId')
    }
)
def session_configuration_put(request, enable_tooltips, selected_algorithm_id):
    db = request.dbsession

    session_configuration = query_by_session(db, request.context.session_id, SessionConfiguration).one()

    session_configuration.enable_tooltips = enable_tooltips
    session_configuration.selected_algorithm_id = selected_algorithm_id

    return SessionConfigurationSchema(strict=True).dump(session_configuration).data
