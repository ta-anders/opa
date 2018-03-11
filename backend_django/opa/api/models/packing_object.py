from django.db import models

from opa.api.models.session import SessionIDMixin


class PackingObject(SessionIDMixin):
    _width = models.IntegerField()
    _height = models.IntegerField()

    x_coordinate = models.IntegerField(null=True)
    y_coordinate = models.IntegerField(null=True)

    background_color = models.CharField(null=True, max_length=10)

    rotated = models.BooleanField(default=False)

    class Meta:
        db_table = 'packing_objects'

    @property
    def packed(self):
        return self.x_coordinate is not None or self.y_coordinate is not None

    @property
    def width(self):
        return self._width if not self.rotated else self._height

    @width.setter
    def width(self, val):
        self._width = val

    @property
    def height(self):
        return self._height if not self.rotated else self._width

    @height.setter
    def height(self, val):
        self._height = val
