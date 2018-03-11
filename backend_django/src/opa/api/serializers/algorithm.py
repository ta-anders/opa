from rest_framework import serializers

from opa.api.models import Algorithm


class AlgorithmSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Algorithm
        fields = ('id', 'name')
