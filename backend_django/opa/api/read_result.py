from opa.api.models import PackingObject


def read_result(result):
    packed = []

    for r in result:
        obj = PackingObject.objects.get(pk=r['id'])

        if r['x_coordinate'] >= 0:
            obj.x_coordinate = r['x_coordinate']
            obj.y_coordinate = r['y_coordinate']

            obj.rotated = bool(r['rotated'])
        else:
            obj.x_coordinate = None
            obj.y_coordinate = None

        obj.save()
        packed.append(obj)

    return packed
