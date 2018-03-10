import logging

from rest_framework import serializers

from opa.api.models import Session, PackingSpace

logger = logging.getLogger(__name__)


class SessionSerializer(serializers.HyperlinkedModelSerializer):
    height = serializers.IntegerField(required=False)
    width = serializers.IntegerField(required=False)

    class Meta:
        model = Session
        fields = ('id', 'name', 'created_at', 'status', 'height', 'width')

    def create(self, validated_data):
        new_session = Session.objects.create(
            name=validated_data['name'],
            status=validated_data['status']
        )

        # Init this session with a packing space. TODO: copy over session config
        PackingSpace.objects.create(
            height=validated_data['height'],
            width=validated_data['width'],
            session=new_session
        )

        return new_session
