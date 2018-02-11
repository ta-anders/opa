from pyramid.security import Allow, DENY_ALL, Authenticated

from opa.models import Session


class OpaContext(object):
    def __init__(self, request):
        self.request = request

        self.session_id = request.matchdict.get('session_id')

    def __acl__(self):
        acl = [
            (Allow, Authenticated, 'view'),
            (Allow, Authenticated, 'edit'),
            (Allow, Authenticated, 'create'),
            (Allow, Authenticated, 'delete')
        ]

        acl += [DENY_ALL]

        return acl
