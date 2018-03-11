import logging
import random

from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import ListCreateAPIView, UpdateAPIView
from rest_framework.response import Response

from opa.api.models import PackingObject
from opa.api.serializers.packing_object import PackingObjectSerializer
from opa.api.utils import get_random_color
from opa.api.views import FilterBySessionMixin

logger = logging.getLogger(__name__)


class PackingObjectListViews(FilterBySessionMixin, ListCreateAPIView):
    queryset = PackingObject.objects.all()
    serializer_class = PackingObjectSerializer

    def post(self, request, *args, **kwargs):
        num_objects = int(request.data['num_objects'])
        logger.debug('Creating %s new packing objects', num_objects)

        # Create a random selection of new packing objects
        new = [
            PackingObject(
                session_id=self.kwargs['session_id'],
                width=10 + int(200 * random.random()),
                height=10 + int(50 * random.random()),
                x_coordinate=None,
                y_coordinate=None,
                background_color=get_random_color()
            )
            for _ in range(num_objects)
        ]
        PackingObject.objects.bulk_create(new)

        serializer = PackingObjectSerializer(new, many=True)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        unpacked = (
            self.get_queryset()
            .filter(Q(x_coordinate__isnull=True) | Q(y_coordinate__isnull=True))
        )

        ret = {'deleted': [p.id for p in unpacked]}

        unpacked.delete()

        return Response(ret)


class PackingObjectDetailViews(FilterBySessionMixin, UpdateAPIView):
    queryset = PackingObject.objects.all()
    serializer_class = PackingObjectSerializer


@api_view(['PUT'])
def packing_objects_clear_packed(request, session_id):
    packed = (
        PackingObject.objects
        .filter(session_id=session_id)
        .filter(Q(x_coordinate__isnull=False) | Q(rotated=True))
    )

    for p in packed:
        p.x_coordinate = None
        p.y_coordinate = None
        p.rotated = False

        p.save()

    return Response(PackingObjectSerializer(packed, many=True).data)
