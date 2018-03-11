from django.db import models

from opa.api.models.session import SessionIDMixin


class SessionConfiguration(SessionIDMixin):
    enable_tooltips = models.BooleanField(default=True)
    selected_algorithm = models.ForeignKey('Algorithm', on_delete=models.SET_NULL, null=True)

    class Meta:
        db_table = 'session_configurations'

    def copy(self, new_session):
        new_session_config = self
        new_session_config.pk = None
        new_session_config.session = new_session
        new_session_config.save()

        return new_session_config
