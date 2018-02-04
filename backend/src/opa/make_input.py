from opa.models import PackingObject, PackingSpace


def make_input(db):
    packing_objs = db.query(PackingObject).all()
    packing_space = db.query(PackingSpace).one()

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



