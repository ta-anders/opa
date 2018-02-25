from marshmallow import Schema, fields, post_load

from opa_engine.core.models import InputData, PackingObject, PackingSpace


class PackingSpaceSchema(Schema):
    width = fields.Integer(required=True)
    height = fields.Integer(required=True)

    @post_load
    def make_object(self, data):
        return PackingSpace(**data)


class PackingObjectSchema(Schema):
    id = fields.Integer(required=True)
    width = fields.Integer(required=True)
    height = fields.Integer(required=True)
    x_coordinate = fields.Integer(required=True)
    y_coordinate = fields.Integer(required=True)
    rotated = fields.Integer(required=True)

    @post_load
    def make_object(self, data):
        return PackingObject(**data)


class InputDataSchema(Schema):
    packing_space = fields.Nested(PackingSpaceSchema, many=False)
    packing_objects = fields.Nested(PackingObjectSchema, many=True)

    @post_load
    def make_object(self, data):
        return InputData(**data)


def load_data(json_data):
    return InputDataSchema().load(json_data).data
