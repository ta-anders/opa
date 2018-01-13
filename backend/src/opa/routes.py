def includeme(config):
    config.add_route('home', '/')

    config.add_route('packing_objects', r'/packing_objects')
    config.add_route('packing_object_item', r'/packing_objects/{packing_object_id:/d+}')
