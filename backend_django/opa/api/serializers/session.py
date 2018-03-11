import logging

from rest_framework import serializers

from opa.api.constants import DEFAULT_SESSION_CONFIG_KWARGS
from opa.api.models import Session, PackingSpace, SessionConfiguration

logger = logging.getLogger(__name__)


class SessionSerializer(serializers.HyperlinkedModelSerializer):
    height = serializers.IntegerField(required=False)
    width = serializers.IntegerField(required=False)

    class Meta:
        model = Session
        fields = ('id', 'name', 'created_at', 'status', 'height', 'width')

    def create(self, validated_data):
        # TODO: this probably should not happen here
        new_session = Session.objects.create(
            name=validated_data['name'],
            status=validated_data['status']
        )

        # Init this session with a packing space.
        PackingSpace.objects.create(
            height=validated_data['height'],
            width=validated_data['width'],
            session=new_session
        )

        latest_session_config = SessionConfiguration.objects.order_by('-id').first()

        if latest_session_config is not None:
            latest_session_config.copy(new_session)
        else:
            SessionConfiguration.objects.create(session=new_session, **DEFAULT_SESSION_CONFIG_KWARGS)

        return new_session
