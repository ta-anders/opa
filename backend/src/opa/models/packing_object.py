from sqlalchemy import CheckConstraint, Column, Integer, String, Boolean

from opa.models.meta import Base


class PackingObject(Base):
    __tablename__ = 'packing_objects'

    id = Column(Integer, primary_key=True)

    _width = Column(Integer, nullable=False)
    _height = Column(Integer, nullable=False)

    x_coordinate = Column(Integer, nullable=True)
    y_coordinate = Column(Integer, nullable=True)

    background_color = Column(String, nullable=True)

    rotated = Column(Boolean, default=False, nullable=False)

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

    @property
    def width(self):
        return self._width if not self.rotated else self._height

    @width.setter
    def width(self, val):
        self._width = val

    @property
    def height(self):
        return self._height if not self.rotated else self._width

    @height.setter
    def height(self, val):
        self._height = val
