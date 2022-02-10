from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework import routers


router = routers.DefaultRouter()

router.register('employees',views.EmployeeViewset, basename="employees")
router.register('users',views.UserViewSet, basename="users")
# router.register('authentication',views.UserViewSet, basename="authentication")


urlpatterns = [
    # path('admin', admin.site.urls),
    path('', include(router.urls)),
    # path('employee/',views.EmployeeViewset,name="employee"),
]

urlpatterns += router.urls