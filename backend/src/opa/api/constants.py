from opa_engine.cgreedy_wrapper import call_cgreedy
from opa_engine.level_mip import solve, solve_cp


DEFAULT_SESSION_CONFIG_KWARGS = {
    'enable_tooltips': True,
    'selected_algorithm_id': 1,
}


ALGORITHM_NAME_TO_FUNC_MAPPING = {
    'cgreedy': call_cgreedy,
    'level_mip': solve,
    'level_cp': solve_cp
}
