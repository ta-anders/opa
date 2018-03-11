from django.db import models


class Session(models.Model):
    name = models.CharField(unique=True, max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10)

    class Meta:
        db_table = 'sessions'


class SessionIDMixin(models.Model):
    session = models.ForeignKey('Session', on_delete=models.CASCADE)

    class Meta:
        abstract = True
