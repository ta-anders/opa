from marshmallow import Schema, fields


class AlgorithmSchema(Schema):
    id = fields.Integer(dump_only=True)

    name = fields.String(required=True)
