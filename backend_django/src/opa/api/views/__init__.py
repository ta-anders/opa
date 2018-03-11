class FilterBySessionMixin(object):
    def get_queryset(self):
        session_id = self.kwargs['session_id']

        return self.queryset.filter(session_id=session_id)
