from django.shortcuts import render
from .serializers import *
from rest_framework import viewsets

# Create your views here.
class PayrollViewset(viewsets.ModelViewSet):
    serializer_class = PayrollSerializer
    queryset = Payroll.objects.all()