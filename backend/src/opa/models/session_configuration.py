from sqlalchemy import Boolean, Column, ForeignKey, Integer
from sqlalchemy.orm import relationship

from opa.models import Algorithm
from opa.models.meta import Base
from opa.models.session import SessionIDMixin


class SessionConfiguration(Base, SessionIDMixin):
    __tablename__ = 'session_configurations'

    id = Column(Integer, primary_key=True)

    enable_tooltips = Column(Boolean, nullable=False, default=True)
    selected_algorithm_id = Column(Integer, ForeignKey('algorithms.id', ondelete='SET NULL'), nullable=False)

    selected_algorithm = relationship(Algorithm)

    def copy(self, db, new_session):
        new_session_config = SessionConfiguration(
            session=new_session,
            enable_tooltips=self.enable_tooltips,
            selected_algorithm_id=self.selected_algorithm_id
        )
        db.add(new_session_config)

        return new_session_config
