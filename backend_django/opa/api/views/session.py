from rest_framework import status, viewsets
from rest_framework.response import Response

from opa.api.models import Session
from opa.api.serializers.session import SessionSerializer


class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

    def destroy(self, request, *args, **kwargs):
        # TODO: make front end match default django behaviour?
        instance = self.get_object()
        instance_id = instance.id
        self.perform_destroy(instance)
        return Response(status=status.HTTP_200_OK, data={'deleted': [instance_id]})
