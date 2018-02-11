import logging
import random

from marshmallow import fields
from pyramid.view import view_config
from sqlalchemy import or_
from webargs.pyramidparser import use_kwargs

from opa.make_input import make_input
from opa.models import PackingObject
from opa.read_result import read_result
from opa.schemas.packing_object import PackingObjectSchema
from opa.solvers.cgreedy_wrapper import call_cgreedy
from opa.utils import get_random_color, query_by_session

logger = logging.getLogger(__name__)


@view_config(
    route_name='packing_objects',
    request_method='GET',
    renderer='json'
)
def packing_objects_get(request):
    db = request.dbsession

    packing_objs = query_by_session(db, request.context.session_id, PackingObject).all()

    schema = PackingObjectSchema(strict=True, many=True)

    result = schema.dump(packing_objs)

    return result.data


@view_config(
    route_name='packing_objects',
    request_method='POST',
    renderer='json'
)
@use_kwargs(
    {'num_objects': fields.Integer(required=True)}
)
def packing_objects_post(request, num_objects):
    db = request.dbsession

    logger.debug('Creating %s new packing objects', num_objects)

    # Create a random selection of new packing objects
    new = [
        PackingObject(
            session_id=request.context.session_id,
            width=10 + int(200 * random.random()),
            height=10 + int(50 * random.random()),
            x_coordinate=None,
            y_coordinate=None,
            background_color=get_random_color()
        )
        for _ in range(num_objects)
    ]
    db.add_all(new)
    db.flush()

    schema = PackingObjectSchema(strict=True, many=True)

    result = schema.dump(new)

    return result.data


@view_config(
    route_name='packing_objects',
    request_method='DELETE',
    renderer='json'
)
def packing_objects_delete_unpacked(request):
    db = request.dbsession

    unpacked = (
        query_by_session(db, request.context.session_id, PackingObject)
        .filter(or_(PackingObject.x_coordinate.is_(None), PackingObject.y_coordinate.is_(None)))
    )
    ret = {'deleted': [p.id for p in unpacked]}

    unpacked.delete()
    db.flush()

    return ret


@view_config(
    route_name='clear_packed',
    request_method='PUT',
    renderer='json'
)
def packing_objects_clear_packed(request):
    db = request.dbsession

    (
        query_by_session(db, request.context.session_id, PackingObject.id)
        .filter(
            or_(
                PackingObject.x_coordinate.isnot(None),
                PackingObject.rotated.is_(True)
            )
        ).update(
            {'x_coordinate': None, 'y_coordinate': None, 'rotated': False}
        )
    )

    db.flush()

    # TODO: lazy return of everything here - how do I get which rows have been updated above?
    return PackingObjectSchema(many=True, strict=True).dump(db.query(PackingObject).all()).data


@view_config(
    route_name='packing_object_item',
    request_method='PUT',
    renderer='json'
)
@use_kwargs(
    {
        'packing_object_id': fields.Integer(required=True, location='matchdict')
    }
)
def packing_object_put(request, packing_object_id):

    db = request.dbsession

    packing_obj = db.query(PackingObject).get(packing_object_id)

    for k, v in request.json.items():
        setattr(packing_obj, k, v)

    schema = PackingObjectSchema(strict=True)

    result = schema.dump(packing_obj)

    return result.data


@view_config(
    route_name='solve',
    request_method='POST',
    renderer='json'
)
def packing_objects_solve(request):
    db = request.dbsession

    input = make_input(db, request.context.session_id)

    result = call_cgreedy(**input)

    data = read_result(db, result)

    schema = PackingObjectSchema(strict=True, many=True)
    
    return schema.dump(data).data



