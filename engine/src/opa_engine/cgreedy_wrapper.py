import logging

from ctypes import CDLL, POINTER, Structure, byref, c_int, c_uint

from opa_engine.core.load import load_data_from_json

logger = logging.getLogger(__name__)


class PackingSpace(Structure):
    _fields_ = [
        ("totalHeight", c_int),
        ("totalWidth", c_int)
    ]


class PackingParameters(Structure):
    _fields_ = [
        ("allowRotation", c_int),
    ]


class PackingObject(Structure):
    _fields_ = [
        ("id", c_uint),
        ("height", c_int),
        ("width", c_int),
        ("xCoordinate", c_int),
        ("yCoordinate", c_int),
        ("rotated", c_int)
    ]


# TODO: sort this thing out
packer = CDLL('../engine/src/cgreedy/cgreedy.so')
func = packer.doFirstFitPack

func.restype = POINTER(PackingObject)
func.argtypes = (POINTER(PackingSpace), POINTER(PackingObject), POINTER(PackingParameters), c_int)


def packing_object_array_type_factory(num):
    return PackingObject * num


def call_cgreedy(json_data, allow_rotation=True):
    packing_space, packing_objects = load_data_from_json(json_data)

    num_objects = len(packing_objects)
    space = PackingSpace(packing_space.height, packing_space.width)

    parameters = PackingParameters(int(allow_rotation))

    ArrayType = packing_object_array_type_factory(num_objects)
    objects = (
        PackingObject(
            id=pobj.id,
            height=pobj.height,
            width=pobj.width,
            xCoordinate=pobj.x_coordinate,
            yCoordinate=pobj.y_coordinate,
            rotated=pobj.rotated
        )
        for pobj in packing_objects
    )
    packing_objects = ArrayType(*objects)

    answer = func(byref(space), packing_objects, byref(parameters), num_objects)

    return [
        {
            'id': r.id,
            'x_coordinate': r.xCoordinate,
            'y_coordinate': r.yCoordinate,
            'rotated': r.rotated
        }
        for r in answer[:num_objects]
    ]
