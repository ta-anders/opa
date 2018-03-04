import datetime

from marshmallow import fields
from pyramid.view import view_config
from webargs.pyramidparser import use_kwargs

from opa.constants import DEFAULT_SESSION_CONFIG_KWARGS
from opa.models import PackingSpace, Session, SessionConfiguration
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


@view_config(
    route_name='sessions',
    request_method='POST',
    renderer='json'
)
@use_kwargs(
    {
        'name': fields.String(required=True),
        'height': fields.Integer(required=True),
        'width': fields.Integer(required=True),
        'status': fields.String(required=True, allow_none=True)
    }
)
def session_post(request, name, height, width, status):
    db = request.dbsession

    new_session = Session(name=name, created_at=datetime.datetime.now(), status=status)
    packing_space = PackingSpace(height=height, width=width, session=new_session)

    # To init the session configuration for this new session, use the one
    # from the most recently created session (if one exists). Otherwise use a default.
    # TODO: make a master session config to use
    latest_session_config = (
        db.query(SessionConfiguration)
        .order_by(SessionConfiguration.id.desc()).first()
    )
    session_config = (
        latest_session_config.copy(db, new_session)
        if latest_session_config is not None
        else SessionConfiguration(session=new_session, **DEFAULT_SESSION_CONFIG_KWARGS)
    )

    db.add_all([new_session, packing_space, session_config])
    db.flush()

    schema = SessionSchema(strict=True)

    result = schema.dump(new_session)

    return result.data


@view_config(
    route_name='session_item',
    request_method='PUT',
    renderer='json'
)
@use_kwargs(
    {
        'session_id': fields.Integer(required=True, location='matchdict'),
        'status': fields.String(required=True)
    }
)
def session_put(request, session_id, status):
    db = request.dbsession

    session = db.query(Session).get(session_id)
    session.status = status
    db.flush()

    schema = SessionSchema(strict=True)

    result = schema.dump(session)

    return result.data


@view_config(
    route_name='session_item',
    request_method='DELETE',
    renderer='json'
)
@use_kwargs(
    {'session_id': fields.Integer(required=True, location='matchdict')}
)
def session_delete(request, session_id):
    db = request.dbsession

    db.query(Session).filter_by(id=session_id).delete()

    return {'deleted': [session_id]}
