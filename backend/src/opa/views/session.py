from pyramid.view import view_config

from opa.models import Session
from opa.schemas.session import SessionSchema


@view_config(
    route_name='sessions',
    request_method='GET',
    renderer='json'
)
def sessions_get(request):
    db = request.dbsession

    sessions = db.query(Session).all()

    schema = SessionSchema(strict=True, many=True)

    result = schema.dump(sessions)

    return result.data
