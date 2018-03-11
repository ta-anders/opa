from rest_framework import serializers

from opa.api.models import SessionConfiguration, Algorithm


class SessionConfigurationSerializer(serializers.HyperlinkedModelSerializer):
    selected_algorithm = serializers.PrimaryKeyRelatedField(queryset=Algorithm.objects.all())

    class Meta:
        model = SessionConfiguration
        fields = ('id', 'enable_tooltips', 'selected_algorithm')
