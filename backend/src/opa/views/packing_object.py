import logging
import random

from marshmallow import fields
from pyramid.view import view_config
from sqlalchemy import or_
from webargs.pyramidparser import use_kwargs

from opa.models import PackingObject
from opa.schemas.packing_object import PackingObjectSchema
from opa.utils import get_random_color

logger = logging.getLogger(__name__)


@view_config(
    route_name='packing_objects',
    request_method='GET',
    renderer='json'
)
def packing_objects_get(request):
    db = request.dbsession

    packing_objs = db.query(PackingObject).all()

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
        db.query(PackingObject)
        .filter(or_(PackingObject.x_coordinate.is_(None), PackingObject.y_coordinate.is_(None)))
    )
    ret = {'deleted': [p.id for p in unpacked]}

    unpacked.delete()
    db.flush()

    return ret


@view_config(
    route_name='packing_object_item',
    request_method='PUT',
    renderer='json'
)
@use_kwargs(
    {
        'packing_object_id': fields.Integer(required=True, location='matchdict'),
        'x_coordinate': fields.Integer(required=True, allow_none=True),
        'y_coordinate': fields.Integer(required=True, allow_none=True)
    }
)
def packing_object_post(request, packing_object_id, x_coordinate, y_coordinate):

    db = request.dbsession

    packing_obj = db.query(PackingObject).get(packing_object_id)
    packing_obj.x_coordinate = x_coordinate
    packing_obj.y_coordinate = y_coordinate

    schema = PackingObjectSchema(strict=True)

    result = schema.dump(packing_obj)

    return result.data

