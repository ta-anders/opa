# from marshmallow import fields
# from pyramid.view import view_config
# from webargs.pyramidparser import use_kwargs
#
# from opa.constants import ALGORITHM_NAME_TO_FUNC_MAPPING
# from opa.make_input import make_input
# from opa.models.algorithm import Algorithm
# from opa.read_result import read_result
# from opa.schemas.packing_object import PackingObjectSchema
#
#
# @view_config(
#     route_name='opa_solve',
#     request_method='POST',
#     renderer='json'
# )
# @use_kwargs(
#     {
#         'algorithm_id': fields.Integer(required=True, location='matchdict')
#     }
# )
# def opa_solve(request, algorithm_id):
#     db = request.dbsession
#
#     algorithm = db.query(Algorithm).get(algorithm_id)
#
#     input_data = make_input(db, request.context.session_id)
#
#     # TODO: think of a better way...
#     result = ALGORITHM_NAME_TO_FUNC_MAPPING[algorithm.name](input_data)
#
#     data = read_result(db, result)
#
#     schema = PackingObjectSchema(strict=True, many=True)
#
#     return schema.dump(data).data
#
