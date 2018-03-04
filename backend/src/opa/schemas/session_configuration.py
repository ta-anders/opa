from marshmallow import Schema, fields


class SessionConfigurationSchema(Schema):
    id = fields.Integer(dump_only=True)

    enable_tooltips = fields.Boolean(requred=True, dump_to='enableTooltips')
