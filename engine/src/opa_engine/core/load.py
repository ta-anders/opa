import json

from opa_engine.core.schemas import InputDataSchema


def load_data(data):
    try:
        json_data = json.load(data)
    except AttributeError:
        json_data = json.loads(data)

    return load_data_from_json(json_data)


def load_data_from_json(json_data):
    return InputDataSchema().load(json_data).data
