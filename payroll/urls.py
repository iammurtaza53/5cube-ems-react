from django.contrib import admin
from django.urls import path
from . import views
from rest_framework import routers

router = routers.DefaultRouter()

router.register('payroll',views.PayrollViewset, basename="payroll")

urlpatterns = [
    # path('employee/',views.EmployeeViewset,name="employee"),
]

urlpatterns += router.urls