from django.shortcuts import render

from .serializers import EmployeeDropdownSerializer, LeaveSerializer
from .models import Leave
from employee.models import Employee

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class LeaveViewSet(viewsets.ModelViewSet):
    serializer_class = LeaveSerializer
    # import pdb; pdb.set_trace()
    queryset = Leave.objects.all().order_by('-created_at')
    # queryset = Leave.objects.select_related('employee').order_by('-created_at')
    # def get_queryset(self):
    #     queryset = Leave.objects.select_related('employee')
    #     return queryset
    # for q in queryset:
    #     print(q.employee.first_name)
        
# class LeaveViewSet(viewsets.APIView):
    
#     def get(self, request):
        
#         leave = Leave.objects.all()
        
#         all_data = []
#         for i in leave:
            
#             name = Employee.objects.get(id = i.employee).first_name
#             designation = Employee.objects.get(id = i.employee).designation
            
#             dic = {
#                 'id': i.id,
#                 'employee': name,
#                 'status':i.status,
#                 'l'
#             }
            
#             all_data.append(dic)
        
#         return Response(all_data)
        
        
class EmployeeDropdownViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeDropdownSerializer
    queryset = Employee.objects.all()        