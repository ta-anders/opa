from pyramid.view import view_config

from opa.make_input import make_input
from opa.read_result import read_result
from opa.schemas.packing_object import PackingObjectSchema

from opa_engine.cgreedy_wrapper import call_cgreedy
from opa_engine.level_mip import solve, solve_cp


@view_config(
    route_name='cgreedy',
    request_method='POST',
    renderer='json'
)
def packing_objects_cgreedy_solve(request):
    db = request.dbsession

    input_data = make_input(db, request.context.session_id)

    result = call_cgreedy(**input_data)

    data = read_result(db, result)

    schema = PackingObjectSchema(strict=True, many=True)

    return schema.dump(data).data


@view_config(
    route_name='level_mip',
    request_method='POST',
    renderer='json'
)
def packing_objects_level_mip_solve(request):
    db = request.dbsession

    input_data = make_input(db, request.context.session_id)

    result = solve_cp(input_data)

    data = read_result(db, result)

    schema = PackingObjectSchema(strict=True, many=True)

    return schema.dump(data).data
