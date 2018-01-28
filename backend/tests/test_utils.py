from opa.utils import LETTERS, get_random_color


def test_get_random_color():
    ans = get_random_color()
    assert ans.startswith('#')
    assert all(l in LETTERS for l in ans[1:])
