from rest_framework import serializers

from opa.api.models import PackingSpace


class PackingSpaceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PackingSpace
        fields = ('id', 'width', 'height')
