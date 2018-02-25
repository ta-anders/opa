from collections import namedtuple


class PackingSpace(object):
    def __init__(self, width, height):
        self.width = width
        self.height = height


class PackingObject(object):
    def __init__(self, id, width, height, x_coordinate, y_coordinate, rotated):
        self.id = id
        self.width = width
        self.height = height
        self.x_coordinate = x_coordinate
        self.y_coordinate = y_coordinate
        self.rotated = rotated

    @property
    def volume(self):
        return self.width * self.height


InputData = namedtuple('InputData', ['packing_space', 'packing_objects'])
