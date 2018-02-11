from marshmallow import Schema, fields


class SessionSchema(Schema):
    id = fields.Integer(dump_only=True)

    name = fields.String(required=True)
    created_at = fields.DateTime(requred=True, dump_to='createdAt')

