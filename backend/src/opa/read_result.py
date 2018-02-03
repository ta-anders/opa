from opa.models import PackingObject


def read_result(db, result):
    packed = []

    for r in result:
        obj = db.query(PackingObject).get(r['id'])

        if r['x_coordinate'] >= 0:
            obj.x_coordinate = r['x_coordinate']
            obj.y_coordinate = r['y_coordinate']

        packed.append(obj)

    db.flush()

    return packed
