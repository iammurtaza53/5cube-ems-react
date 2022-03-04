from django.contrib import admin
from django.urls import path
from . import views
from rest_framework import routers

router = routers.DefaultRouter()

router.register('attendance',views.AttendenceViewSet, basename="attendance")
router.register('newattendance',views.EverydayAttendanceViewSet, basename="newattendance")
# router.register('attendanceyear',views.AttendanceYearViewset, basename="attendanceyear")
router.register('employeerecord',views.AttendancePerEmployeeViewSet, basename="employeerecord")


urlpatterns = [
    # path('employee/',views.EmployeeViewset,name="employee"),
]

urlpatterns += router.urls