from django.shortcuts import render
from .serializers import *
from rest_framework import viewsets
from datetime import date

# Create your views here.
class AttendenceViewSet(viewsets.ModelViewSet):
    serializer_class = AttendanceSerializer
    queryset = Attendance.objects.all().order_by('-created_at')
    
current_date = date.today()
print(current_date)    

class EverydayAttendanceViewSet(viewsets.ModelViewSet):
    serializer_class = EverydayAttendanceSerializer
    queryset = Attendance.objects.all().filter(created_at=current_date)