import logging
import random

from marshmallow import fields
from pyramid.view import view_config
from webargs.pyramidparser import use_kwargs

from opa.models import PackingObject
from opa.schemas.opa import PackingObjectSchema


logger = logging.getLogger(__name__)


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
            y_coordinate=None
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
def packing_objects_delete_all(request):
    db = request.dbsession

    db.query(PackingObject).delete()
    db.flush()

    return 'Deleted everything'
