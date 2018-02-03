from opa.models import PackingObject


def make_input(db):
    packing_objs = db.query(PackingObject).all()

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
        'packing_space': {'totalWidth': 600, 'totalHeight': 500}
    }



