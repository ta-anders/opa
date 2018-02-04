from sqlalchemy import Column, Integer

from opa.models.meta import Base


class PackingSpace(Base):
    __tablename__ = 'packing_spaces'

    id = Column(Integer, primary_key=True)

    width = Column(Integer, nullable=False)
    height = Column(Integer, nullable=False)
