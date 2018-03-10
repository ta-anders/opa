from sqlalchemy import Column, Integer, String

from opa.models.meta import Base


class Algorithm(Base):
    __tablename__ = 'algorithms'

    id = Column(Integer, primary_key=True)

    name = Column(String, nullable=False)
