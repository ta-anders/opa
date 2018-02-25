import logging
from collections import defaultdict

from ortools.linear_solver import pywraplp
from ortools.constraint_solver import pywrapcp

from opa_engine.core.load import load_data_from_json
from opa_engine.core.schemas import PackingObjectSchema

logger = logging.getLogger(__name__)


def solve(json_data):
    packing_space, packing_objects = load_data_from_json(json_data)

    packing_objects.sort(key=lambda p: -p.height)

    md = pywraplp.Solver(
        'LevelMip',
        pywraplp.Solver.CBC_MIXED_INTEGER_PROGRAMMING
    )

    # If an object starts a level
    object_starts_level = {
        p: md.IntVar(0, 1, '{}_starts_level'.format(p.id))
        for p in packing_objects
    }

    object_to_levels = defaultdict(list)
    levels_to_objects = defaultdict(list)
    for l, p_start in enumerate(packing_objects):
        for p in packing_objects[l + 1:]:
            object_to_levels[p].append(p_start)
            levels_to_objects[p_start].append(p)

    # If an object is packed in a level
    object_packed_in_level = {
        (p, p_start): md.IntVar(0, 1, '{}_packed_in_{}'.format(p.id, p_start.id))
        for p in object_to_levels
        for p_start in object_to_levels[p]
    }

    # Slack variable for objects that do not get packed
    object_not_packed = {
        p: md.IntVar(0, 1, '{}_slack'.format(p.id))
        for p in packing_objects
    }

    # Objective is to minimise wasted space
    obj = md.Objective()
    for p, slack_var in object_not_packed.items():
        obj.SetCoefficient(slack_var, p.volume)
    obj.SetMinimization()

    for p in packing_objects:
        # Each object must either be packed, start a new level or not be packed
        must_be_packed = md.Constraint(1, 1)
        for l in object_to_levels[p]:
            must_be_packed.SetCoefficient(object_packed_in_level[p, l], 1)

        must_be_packed.SetCoefficient(object_starts_level[p], 1)
        must_be_packed.SetCoefficient(object_not_packed[p], 1)

        # Link up total width of each level
        total_width_limit = md.Constraint(-md.infinity(), 0)
        for p_other in levels_to_objects[p]:
            total_width_limit.SetCoefficient(object_packed_in_level[p_other, p], p_other.width)

        total_width_limit.SetCoefficient(object_starts_level[p], p.width - packing_space.width)

    # Link up total height
    total_height_limit = md.Constraint(-md.infinity(), packing_space.height)
    for p in object_starts_level:
        total_height_limit.SetCoefficient(object_starts_level[p], p.height)

    md.EnableOutput()
    md.set_time_limit(15 * 1000)
    params = pywraplp.MPSolverParameters()
    params.SetDoubleParam(pywraplp.MPSolverParameters.RELATIVE_MIP_GAP, 0.00)
    md.Solve(params)

    current_y_coord = 0

    for p, var in object_starts_level.items():
        if var.solution_value() > 0.5:
            p.x_coordinate = 0
            p.y_coordinate = current_y_coord
            current_x_coord = p.width

            for p_other in levels_to_objects[p]:
                if object_packed_in_level[p_other, p].solution_value() > 0.5:
                    p_other.x_coordinate = current_x_coord
                    p_other.y_coordinate = current_y_coord

                    current_x_coord += p_other.width

            current_y_coord += p.height

    return PackingObjectSchema(many=True).dump(packing_objects).data


def solve_cp(json_data):
    packing_space, packing_objects = load_data_from_json(json_data)

    packing_objects.sort(key=lambda p: -p.height)

    parameters = pywrapcp.Solver.DefaultSolverParameters()
    md = pywrapcp.Solver(
        'LevelMip',
        parameters
    )

    # If an object starts a level
    object_starts_level = {
        p: md.IntVar(0, 1, '{}_starts_level'.format(p.id))
        for p in packing_objects
    }

    object_to_levels = defaultdict(list)
    levels_to_objects = defaultdict(list)
    for l, p_start in enumerate(packing_objects):
        for p in packing_objects[l + 1:]:
            object_to_levels[p].append(p_start)
            levels_to_objects[p_start].append(p)

    # If an object is packed in a level
    object_packed_in_level = {
        (p, p_start): md.IntVar(0, 1, '{}_packed_in_{}'.format(p.id, p_start.id))
        for p in object_to_levels
        for p_start in object_to_levels[p]
    }

    # Slack variable for objects that do not get packed
    object_not_packed = {
        p: md.IntVar(0, 1, '{}_slack'.format(p.id))
        for p in packing_objects
    }

    # Objective is to minimise wasted space
    max_wasted = sum(p.volume for p in packing_objects)
    obj_expr = md.IntVar(0, max_wasted, "obj_expr")
    md.Add(obj_expr == sum(p.volume * slack_var for p, slack_var in object_not_packed.items()))
    objective = md.Minimize(obj_expr, 1)

    for p in packing_objects:
        # Each object must either be packed, start a new level or not be packed
        md.Add(
            sum(1 * object_packed_in_level[p, l] for l in object_to_levels[p]) +
            1 * object_starts_level[p] +
            1 * object_not_packed[p] == 1
        )

        # Link up total width of each level
        md.Add(
            sum(
                p_other.width * object_packed_in_level[p_other, p]
                for p_other in levels_to_objects[p]
            ) <= (packing_space.width - p.width) * object_starts_level[p]
        )

    # Link up total height
    md.Add(
        sum(p.height * object_starts_level[p] for p in object_starts_level) <=
        packing_space.height
    )

    obj_phase_vars = [obj_expr]
    level_phase_vars = list(object_starts_level.values())
    pack_phase_vars = list(object_packed_in_level.values())

    obj_phase = md.Phase(
        obj_phase_vars,
        md.CHOOSE_MIN_SIZE,
        md.ASSIGN_MAX_VALUE
    )

    level_phase = md.Phase(
        level_phase_vars,
        md.CHOOSE_MIN_SIZE,
        md.ASSIGN_MAX_VALUE
    )

    pack_phase = md.Phase(
        pack_phase_vars,
        md.CHOOSE_MIN_SIZE,
        md.ASSIGN_MAX_VALUE
    )

    decision_builder = md.Compose([pack_phase, level_phase, obj_phase])

    collector = md.LastSolutionCollector()
    for v in obj_phase_vars + level_phase_vars + pack_phase_vars:
        collector.Add(v)
    collector.AddObjective(obj_expr)

    time_limit_ms = md.TimeLimit(120000)

    search_log = md.SearchLog(100, obj_expr)

    md.Solve(decision_builder, [objective, time_limit_ms, search_log, collector])

    best_solution = collector.SolutionCount() - 1

    current_y_coord = 0

    for p, var in object_starts_level.items():
        if collector.Value(best_solution, var) > 0.5:
            p.x_coordinate = 0
            p.y_coordinate = current_y_coord
            current_x_coord = p.width

            for p_other in levels_to_objects[p]:
                if collector.Value(best_solution, object_packed_in_level[p_other, p]) > 0.5:
                    p_other.x_coordinate = current_x_coord
                    p_other.y_coordinate = current_y_coord

                    current_x_coord += p_other.width

            current_y_coord += p.height

    return PackingObjectSchema(many=True).dump(packing_objects).data

