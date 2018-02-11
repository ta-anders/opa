from sqlalchemy import Column, Integer

from opa.models.meta import Base
from opa.models.session import SessionIDMixin


class PackingSpace(Base, SessionIDMixin):
    __tablename__ = 'packing_spaces'

    id = Column(Integer, primary_key=True)

    width = Column(Integer, nullable=False)
    height = Column(Integer, nullable=False)
