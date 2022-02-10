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
    # permission_classes = [IsAuthenticated]

class UserViewSet(viewsets.ModelViewSet):
    # import pdb; pdb.set_trace()
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAuthenticated]
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer    
# class EmployeeViewset(APIView):
#     def get(self, request, format=None):
#         employee = Employee.objects.all()
#         serializer = EmployeeSerializer(employee, many=True)
#         return Response(data=serializer.data, status=status.HTTP_200_OK)   
    
#     def post(self, request, format=None):
#         serializer = EmployeeSerializer(data=request.data)
#         if serializer.is_valid():
#            serializer.save()
#            return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 