from marshmallow import Schema, fields


class PackingSpaceSchema(Schema):
    id = fields.Integer(dump_only=True)

    width = fields.Integer(required=True)
    height = fields.Integer(required=True)
