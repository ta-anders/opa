from django.db import models

from opa.api.models.session import SessionIDMixin


class SessionConfiguration(SessionIDMixin):
    enable_tooltips = models.BooleanField(default=True)
    selected_algorithm = models.ForeignKey('Algorithm', on_delete=models.SET_NULL, null=True)

    class Meta:
        db_table = 'session_configurations'

    # def copy(self, db, new_session):
    #     new_session_config = SessionConfiguration(
    #         session=new_session,
    #         enable_tooltips=self.enable_tooltips,
    #         selected_algorithm_id=self.selected_algorithm_id
    #     )
    #     db.add(new_session_config)
    #
    #     return new_session_config
