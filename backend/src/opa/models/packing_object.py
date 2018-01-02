from sqlalchemy import (
    Column,
    Integer,
    Float)

from opa.models.meta import Base


class PackingObject(Base):
    __tablename__ = 'packing_objects'
    id = Column(Integer, primary_key=True)
    width = Column(Float, nullable=False)
    height = Column(Float, nullable=False)

    x_coordinate = Column(Integer, nullable=True)
    y_coordinate = Column(Integer, nullable=True)
