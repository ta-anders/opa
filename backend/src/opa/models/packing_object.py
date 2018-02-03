from sqlalchemy import CheckConstraint, Column, Float, Integer, String

from opa.models.meta import Base


class PackingObject(Base):
    __tablename__ = 'packing_objects'

    id = Column(Integer, primary_key=True)
    width = Column(Integer, nullable=False)
    height = Column(Integer, nullable=False)

    x_coordinate = Column(Integer, nullable=True)
    y_coordinate = Column(Integer, nullable=True)

    background_color = Column(String, nullable=True)

    __table_args__ = (
        CheckConstraint(
            """
            (CASE WHEN x_coordinate IS NULL THEN 1 ELSE 0 END) +
            (CASE WHEN y_coordinate IS NULL THEN 1 ELSE 0 END) <> 1
            """,
            'none_or_both_coordinates_null'
        ),
    )

    @property
    def packed(self):
        return self.x_coordinate is not None or self.y_coordinate is not None
