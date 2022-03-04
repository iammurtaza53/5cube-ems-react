from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from .models import Employee
from .serializers import EmployeeSerializer
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated


# Create your views here.

class EmployeeViewset(viewsets.ModelViewSet):
    # import pdb; pdb.set_trace()
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class UserViewSet(viewsets.ModelViewSet):
    # import pdb; pdb.set_trace()
    queryset = User.objects.all()
    serializer_class = UserSerializer

