from opa.models import PackingObject, PackingSpace
from opa.utils import query_by_session


def make_input(db, session_id):
    packing_objs = query_by_session(db, session_id, PackingObject).all()
    packing_space = query_by_session(db, session_id, PackingSpace).one()

    packing_objs_data = [
        {
            'id': p.id,
            'width': p.width,
            'height': p.height,
            'rotated': int(p.rotated)
        }
        for p in packing_objs
    ]

    return {
        'packing_objects': packing_objs_data,
        'packing_space': {'totalWidth': packing_space.width, 'totalHeight': packing_space.height}
    }



