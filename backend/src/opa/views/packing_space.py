import logging

from marshmallow import fields
from pyramid.view import view_config
from sqlalchemy import and_, or_
from sqlalchemy.dialects import postgresql
from webargs.pyramidparser import use_kwargs

from opa.models import PackingObject, PackingSpace
from opa.schemas.packing_object import PackingObjectSchema
from opa.schemas.packing_space import PackingSpaceSchema

logger = logging.getLogger(__name__)


@view_config(
    route_name='packing_spaces',
    request_method='GET',
    renderer='json'
)
def packing_space_get(request):
    db = request.dbsession

    packing_space = db.query(PackingSpace).one()

    schema = PackingSpaceSchema(strict=True)

    result = schema.dump(packing_space)

    return result.data


@view_config(
    route_name='packing_spaces',
    request_method='PUT',
    renderer='json'
)
@use_kwargs(
    {
        'width': fields.Integer(required=True),
        'height': fields.Integer(required=True)
    }
)
def packing_space_put(request, width, height):
    db = request.dbsession

    packing_space = db.query(PackingSpace).one()

    packing_space.width = width
    packing_space.height = height

    effected_objects = (
        db.query(PackingObject)
        .filter(
            and_(
                PackingObject.x_coordinate.isnot(None),
                or_(
                    PackingObject.x_coordinate + PackingObject.width > width,
                    PackingObject.y_coordinate + PackingObject.height > height
                )
            )
        )
    ).all()

    for e in effected_objects:
        e.x_coordinate = None
        e.y_coordinate = None

    db.flush()

    space_schema = PackingSpaceSchema(strict=True)
    objects_schema = PackingObjectSchema(strict=True, many=True)

    return {
        'packing_space': space_schema.dump(packing_space).data,
        'modified_packing_objects': objects_schema.dump(effected_objects).data
    }
