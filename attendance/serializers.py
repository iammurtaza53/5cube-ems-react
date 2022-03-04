from rest_framework.serializers import ModelSerializer 
from rest_framework import serializers
from rest_framework.response import Response
from employee.models import Employee
from .models import *

class AttendanceSerializer(ModelSerializer):
    first_name = serializers.ReadOnlyField(source = 'employee.first_name')
    last_name = serializers.ReadOnlyField(source='employee.last_name')
 
    class Meta:
        model = Attendance
        fields = ('id','first_name','last_name', 'employee', 'status','in_time','out_time', 'created_at')  
    
    def update(self, instance, validated_data):
        # import pdb; pdb.set_trace()
        print(validated_data,"here i am")
        if len(validated_data) == 1: 
            instance.out_time = validated_data.get('out_time', instance.out_time)
            instance.save()
            return instance
        else:
            instance.status = validated_data.get('status',instance.status)
            instance.in_time = validated_data.get('in_time',instance.in_time)
            instance.out_time = validated_data.get('out_time',instance.out_time)
            instance.created_at = validated_data.get('created_at',instance.created_at)
            instance.save()
            return instance
            
           
    def create(self, validated_data):

        attendance_data = Attendance.objects.create(**validated_data)
        return attendance_data
 
            
class EverydayAttendanceSerializer(ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'  
        
# class AttendanceYearSerializer(ModelSerializer):
    
#     class Meta:
#         model= Attendance
#         fields= ('created_at',)                    

class AttendancePerEmployeeSerializer(ModelSerializer):
    first_name = serializers.ReadOnlyField(source = 'employee.first_name')
    last_name = serializers.ReadOnlyField(source='employee.last_name')
    email = serializers.ReadOnlyField(source='employee.email')
    class Meta:
        model = Attendance
        fields = ('id','first_name','last_name','email', 'employee', 'status','in_time','out_time', 'created_at')  
 
 