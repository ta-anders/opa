from django.db import models


class Algorithm(models.Model):
    name = models.CharField(max_length=15)

    class Meta:
        db_table = 'algorithms'
