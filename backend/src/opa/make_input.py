from opa.models import PackingObject


def make_input(db):
    packing_objs = db.query(PackingObject).all()

    keys = ['id', 'width', 'height']

    return {
        'packing_objects': [{k: getattr(p, k) for k in keys} for p in packing_objs],
        'packing_space': {'totalWidth': 600, 'totalHeight': 500}
    }



