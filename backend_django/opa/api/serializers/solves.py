# from marshmallow import Schema, fields
#
# # The x/y coordinate to send through to indicate that an object is unpacked.
# UNPACKED_INT = -1
#
#
# class SolverPackingObjectSchema(Schema):
#     id = fields.Integer()
#
#     width = fields.Integer(required=True)
#     height = fields.Integer(required=True)
#
#     x_coordinate = fields.Constant(UNPACKED_INT)
#     y_coordinate = fields.Constant(UNPACKED_INT)
#
#     rotated = fields.Function(lambda obj: int(obj.rotated))
#
#
# class SolverPackingSpaceSchema(Schema):
#     width = fields.Integer(required=True)
#     height = fields.Integer(required=True)
#
#
# class SolverInputSchema(Schema):
#     packing_objects = fields.Nested(SolverPackingObjectSchema, many=True)
#     packing_space = fields.Nested(SolverPackingSpaceSchema)
#
