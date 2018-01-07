from sqlalchemy import (
    Column,
    Integer,
    Float,
    CheckConstraint
)

from opa.models.meta import Base


class PackingObject(Base):
    __tablename__ = 'packing_objects'

    id = Column(Integer, primary_key=True)
    width = Column(Float, nullable=False)
    height = Column(Float, nullable=False)

    x_coordinate = Column(Integer, nullable=True)
    y_coordinate = Column(Integer, nullable=True)

    __table_args__ = (
        CheckConstraint(
            """
            (CASE WHEN x_coordinate IS NULL THEN 1 ELSE 0 END) +
            (CASE WHEN y_coordinate IS NULL THEN 1 ELSE 0 END) <> 1
            """,
            'none_or_both_coordinates_null'
        ),
    )
