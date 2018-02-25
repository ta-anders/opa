from opa.contexts import OpaContext

SESSION_STUB = r'/sessions/{session_id}'


def includeme(config):
    config.add_route('sessions', r'/sessions')
    config.add_route('session_item', r'/sessions/{session_id:\d+}')

    def route_factory(name, route):
        config.add_route(name, SESSION_STUB + route, factory=OpaContext)

    route_factory('packing_objects', r'/packing_objects')
    route_factory('packing_object_item', r'/packing_objects/{packing_object_id:\d+}')
    route_factory('cgreedy', r'/solve/cgreedy')
    route_factory('level_mip', r'/solve/level_mip')
    route_factory('clear_packed', r'/packing_objects/clear')

    route_factory('packing_spaces', r'/packing_spaces')
