from sqlalchemy import Boolean, Column, Integer

from opa.models.meta import Base
from opa.models.session import SessionIDMixin


class SessionConfiguration(Base, SessionIDMixin):
    __tablename__ = 'session_configurations'

    id = Column(Integer, primary_key=True)

    enable_tooltips = Column(Boolean, nullable=False, default=True)

    def copy(self, db, new_session):
        new_session_config = SessionConfiguration(
            session=new_session,
            enable_tooltips=self.enable_tooltips
        )
        db.add(new_session_config)

        return new_session_config
