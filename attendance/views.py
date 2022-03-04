from django.shortcuts import render
from .serializers import *
from rest_framework import viewsets
from datetime import date

# Create your views here.
class AttendenceViewSet(viewsets.ModelViewSet):
    serializer_class = AttendanceSerializer
    queryset = Attendance.objects.all().order_by('-created_at')
    
current_date = date.today()
    

class EverydayAttendanceViewSet(viewsets.ModelViewSet):
    serializer_class = EverydayAttendanceSerializer
    queryset = Attendance.objects.all().filter(created_at=current_date)
    # print(queryset)
    
# class AttendanceYearViewset(viewsets.ModelViewSet):
#     serializer_class = AttendanceYearSerializer
#     queryset = Attendance.objects.dates('created_at','year','DESC')  
#     print(queryset[0])

class AttendancePerEmployeeViewSet(viewsets.ModelViewSet):
    serializer_class = AttendancePerEmployeeSerializer
    queryset = Attendance.objects.all().filter(employee="614f800f-4107-4537-88d0-2ad002b2c568")
    