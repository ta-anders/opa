from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response

from opa.api.models import Algorithm, SessionConfiguration
from opa.api.serializers.algorithm import AlgorithmSerializer
from opa.api.serializers.session_configuration import SessionConfigurationSerializer
from opa.api.views import FilterBySessionMixin


@api_view(['GET'])
def session_config_get(request, session_id):
    try:
        config = SessionConfiguration.objects.get(session_id=session_id)
    except SessionConfiguration.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    data = SessionConfigurationSerializer(config).data

    # TODO: tacking this onto here for now
    algorithms = Algorithm.objects.all()
    data['algorithms'] = AlgorithmSerializer(algorithms, many=True).data

    return Response(data)


class SessionConfigDetailViews(FilterBySessionMixin, UpdateAPIView):
    queryset = SessionConfiguration.objects.all()
    serializer_class = SessionConfigurationSerializer
