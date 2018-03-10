from django.db import models

from opa.api.models.session import SessionIDMixin


class PackingSpace(SessionIDMixin):
    width = models.IntegerField()
    height = models.IntegerField()

    class Meta:
        db_table = 'packing_spaces'
