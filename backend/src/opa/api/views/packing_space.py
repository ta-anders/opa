import logging

from django.db.models import Case, F, Q, When
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response

from opa.api.models import PackingObject, PackingSpace
from opa.api.serializers.packing_object import PackingObjectSerializer
from opa.api.serializers.packing_space import PackingSpaceSerializer

logger = logging.getLogger(__name__)


@api_view(['GET'])
def packing_space_get(request, session_id):
    try:
        space = PackingSpace.objects.get(session_id=session_id)
    except PackingSpace.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    return Response(PackingSpaceSerializer(space).data)


class PackingSpaceDetailViews(UpdateAPIView):
    queryset = PackingSpace.objects.all()
    serializer_class = PackingSpaceSerializer

    def put(self, request, *args, **kwargs):
        resp = super(PackingSpaceDetailViews, self).update(request, *args, *kwargs)

        width, height = resp.data['width'], resp.data['height']

        effected = (
            PackingObject.objects
            .filter(session_id=self.kwargs['session_id'])
            .exclude(x_coordinate__isnull=True)
            .annotate(
                obj_width=Case(
                    When(rotated=True, then=F('_height')),
                    default=F('_width')
                )
            )
            .annotate(
                obj_height=Case(
                    When(rotated=True, then=F('_width')),
                    default=F('_height')
                )
            )
            .filter(
                Q(obj_width__gt=width - F('x_coordinate')) | Q(obj_height__gt=height - F('y_coordinate'))
            )
        )

        for e in effected:
            e.x_coordinate = None
            e.y_coordinate = None

            e.save()

        effected_data = PackingObjectSerializer(effected, many=True).data

        return Response(
            data={
                'packing_space': resp.data,
                'modified_packing_objects': effected_data
            }
        )
