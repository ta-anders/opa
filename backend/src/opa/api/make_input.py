from opa.api.models import PackingObject, PackingSpace

from opa.api.serializers.solves import SolverInputSerializer


def make_input(session_id):
    packing_objs = PackingObject.objects.filter(session_id=session_id)
    packing_space = PackingSpace.objects.filter(session_id=session_id).first()

    data_dict = {'packing_objects': packing_objs, 'packing_space': packing_space}
    input_data = SolverInputSerializer(data_dict).data

    return input_data



