import random

LETTERS = '0123456789ABCDEF'


def get_random_color():
    color_list = [random.choice(LETTERS) for _ in range(6)]

    return '#' + ''.join(color_list)


def query_by_session(db, session_id, model):
    return db.query(model).filter_by(session_id=session_id)
