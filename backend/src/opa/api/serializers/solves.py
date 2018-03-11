from rest_framework import serializers

# The x/y coordinate to send through to indicate that an object is unpacked.
from opa.api.models import PackingObject, PackingSpace

UNPACKED_INT = -1


class SolverPackingObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackingObject
        fields = ('id', 'width', 'height', 'rotated')

    def to_representation(self, instance):
        data = super(SolverPackingObjectSerializer, self).to_representation(instance)
        data['x_coordinate'] = UNPACKED_INT
        data['y_coordinate'] = UNPACKED_INT

        return data


class SolverPackingSpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackingSpace
        fields = ('width', 'height')


class SolverInputSerializer(serializers.Serializer):
    packing_objects = SolverPackingObjectSerializer(many=True)
    packing_space = SolverPackingSpaceSerializer()

