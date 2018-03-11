import factory
from factory.fuzzy import FuzzyInteger

from opa.models import PackingObject


class PackingObjectFactory(factory.alchemy.SQLAlchemyModelFactory):
    class Meta:
        model = PackingObject

    width = FuzzyInteger(0, 50)
    height = FuzzyInteger(0, 50)

    x_coordinate = None
    y_coordinate = None


FACTORIES = (
    PackingObjectFactory,
)
