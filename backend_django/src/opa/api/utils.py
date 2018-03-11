import random

LETTERS = '0123456789ABCDEF'


def get_random_color():
    color_list = [random.choice(LETTERS) for _ in range(6)]

    return '#' + ''.join(color_list)
