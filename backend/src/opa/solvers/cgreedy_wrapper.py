import logging

from ctypes import CDLL, POINTER, Structure, byref, c_int, c_uint

logger = logging.getLogger(__name__)


class PackingSpace(Structure):
    _fields_ = [
        ("totalHeight", c_int),
        ("totalWidth", c_int)
    ]


class PackingObject(Structure):
    _fields_ = [
        ("id", c_uint),
        ("height", c_int),
        ("width", c_int),
        ("xCoordinate", c_int),
        ("yCoordinate", c_int)
    ]


# TODO: sort this thing out
packer = CDLL('../algorithms/cgreedy/cgreedy.so')
func = packer.doFirstFitPack

func.restype = POINTER(PackingObject)
func.argtypes = (POINTER(PackingSpace), POINTER(PackingObject), c_int)


def packing_object_array_type_factory(num):
    return PackingObject * num


def call_cgreedy(packing_space, packing_objects):
    num_objects = len(packing_objects)
    space = PackingSpace(**packing_space)

    ArrayType = packing_object_array_type_factory(num_objects)
    objects = (
        PackingObject(
            xCoordinate=-1,
            yCoordinate=-1,
            **pobj
        )
        for pobj in packing_objects
    )
    packing_objects = ArrayType(*objects)

    answer = func(byref(space), packing_objects, num_objects)

    return [
        {
            'id': r.id,
            'x_coordinate': r.xCoordinate,
            'y_coordinate': r.yCoordinate
        }
        for r in answer[:num_objects]
    ]
