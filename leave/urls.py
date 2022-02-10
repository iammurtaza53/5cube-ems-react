from django.contrib import admin
from django.urls import path
from . import views
from rest_framework import routers

router = routers.DefaultRouter()

router.register('leave',views.LeaveViewSet, basename="leave")

router.register('employeeDropdown',views.EmployeeDropdownViewSet)

urlpatterns = [
    # path('employee/',views.EmployeeViewset,name="employee"),
]

urlpatterns += router.urls