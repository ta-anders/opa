import pytest
from sqlalchemy.exc import IntegrityError

from factories import PackingObjectFactory


def test_bad_packing_object(dbsession):
    # Constraint on table should prevent this
    PackingObjectFactory(x_coordinate=None, y_coordinate=10)

    with pytest.raises(IntegrityError):
        dbsession.flush()


