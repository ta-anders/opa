from django.conf.urls import include, url
from rest_framework import routers

from opa.api.views.packing_object import PackingObjectDetailViews, PackingObjectListViews, packing_objects_clear_packed
from opa.api.views.packing_space import PackingSpaceDetailViews, packing_space_get
from opa.api.views.session import SessionViewSet
from opa.api.views.session_configuration import SessionConfigDetailViews, session_config_get
from opa.api.views.solves import opa_solve

router = routers.DefaultRouter()
router.register(r'sessions', SessionViewSet)

urlpatterns = router.urls

# Packing space
packing_space_urls = [
    url(r'^packing_spaces/$', packing_space_get),
    url(r'^packing_spaces/(?P<pk>[0-9]+)/$', PackingSpaceDetailViews.as_view())
]

# Packing objects
packing_object_urls = [
    url(r'^packing_objects/$', PackingObjectListViews.as_view()),
    url(r'^packing_objects/clear/$', packing_objects_clear_packed),
    url(r'^packing_objects/(?P<pk>[0-9]+)/$', PackingObjectDetailViews.as_view()),

]

# Session configuration
session_config_urls = [
    url(r'^session_configuration/$', session_config_get),
    url(r'^session_configuration/(?P<pk>[0-9]+)/$', SessionConfigDetailViews.as_view())
]

# Solves
solve_urls = [
    url(r'^solve/(?P<algorithm_id>[0-9]+)/$', opa_solve)
]

# All the things that sit under sessions
child_patterns = packing_space_urls + packing_object_urls + session_config_urls + solve_urls


urlpatterns += [
    url(r'^sessions/(?P<session_id>[0-9]+)/', include(child_patterns))
]
