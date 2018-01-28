def includeme(config):
    config.add_route('home', '/')

    config.add_route('packing_objects', r'/packing_objects')
    config.add_route('packing_object_item', r'/packing_objects/{packing_object_id:\d+}')
    config.add_route('solve', r'/solve')
    config.add_route('clear_packed', r'/packing_objects/clear')
