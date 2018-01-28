import logging
import time

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


packer = CDLL('packer.so')
func = packer.doPack

func.restype = POINTER(PackingObject)
func.argtypes = (POINTER(PackingSpace), POINTER(PackingObject), c_int)


def packing_object_array_type_factory(num):
    return PackingObject * num


def call_creedy(packing_space, packing_objects):
    st = time.time()

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

    et = time.time()

    print('Python wrapper took {} seconds'.format((et - st)))

    return [a for a in answer[:num_objects]]


if __name__ == '__main__':
    space = {'totalWidth': 500, 'totalHeight': 450}
    objs = [
        {'id': i, 'width': 50, 'height': 50}
        for i in range(50)
    ]

    call_creedy(space, objs)