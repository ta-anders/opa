from django.conf.urls import url, include
from rest_framework import routers

from opa.api.views.session import SessionViewSet

router = routers.DefaultRouter()
router.register(r'sessions', SessionViewSet)

urlpatterns = router.urls
