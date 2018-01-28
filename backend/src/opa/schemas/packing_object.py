from marshmallow import Schema, fields


class PackingObjectSchema(Schema):
    id = fields.Integer(dump_only=True)

    width = fields.Float(required=True)
    height = fields.Float(required=True)

    x_coordinate = fields.Integer(required=True, allow_none=True)
    y_coordinate = fields.Integer(required=True, allow_none=True)

    background_color = fields.String(required=True, allow_none=True)

    packed = fields.Boolean(required=True)
