from rest_framework import serializers

from opa.api.models import PackingObject


class PackingObjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PackingObject
        fields = (
            'id',
            'width',
            'height',
            'x_coordinate',
            'y_coordinate',
            'background_color',
            'packed',
            'rotated'
        )
