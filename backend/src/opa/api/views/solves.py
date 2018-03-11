from rest_framework.decorators import api_view
from rest_framework.response import Response

from opa.api.constants import ALGORITHM_NAME_TO_FUNC_MAPPING
from opa.api.make_input import make_input
from opa.api.models import Algorithm
from opa.api.read_result import read_result
from opa.api.serializers.packing_object import PackingObjectSerializer


@api_view(['POST'])
def opa_solve(request, session_id, algorithm_id):
    algorithm = Algorithm.objects.get(pk=algorithm_id)

    input_data = make_input(session_id)

    # TODO: think of a better way...
    result = ALGORITHM_NAME_TO_FUNC_MAPPING[algorithm.name](input_data)

    data = read_result(result)

    return Response(PackingObjectSerializer(data, many=True).data)
