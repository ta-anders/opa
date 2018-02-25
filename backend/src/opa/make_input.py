from opa.models import PackingObject, PackingSpace
from opa.schemas.solves import SolverInputSchema
from opa.utils import query_by_session


def make_input(db, session_id):
    packing_objs = query_by_session(db, session_id, PackingObject).all()
    packing_space = query_by_session(db, session_id, PackingSpace).one()

    data_dict = {'packing_objects': packing_objs, 'packing_space': packing_space}
    input_data = SolverInputSchema(strict=True).dump(data_dict).data

    return input_data



