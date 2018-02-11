from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.orm import relationship

from opa.models.meta import Base


class Session(Base):
    __tablename__ = 'sessions'

    id = Column(Integer, primary_key=True)

    name = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False)


class SessionIDMixin(object):
    @declared_attr
    def session_id(cls):
        return Column('session_id', Integer, ForeignKey('sessions.id'), nullable=False)

    @declared_attr
    def session(cls):
        return relationship(Session)
