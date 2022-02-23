from dataclasses import field
from os import stat
from rest_framework.serializers import ModelSerializer 
from rest_framework import serializers
from rest_framework.response import Response
from employee.models import Employee
from .models import *

class AttendanceSerializer(ModelSerializer):
    first_name = serializers.ReadOnlyField(source = 'employee.first_name')
    last_name = serializers.ReadOnlyField(source='employee.last_name')
    # employee_id = serializers.ReadOnlyField(source='employee.id')
    
    class Meta:
        model = Attendance
        fields = ('id','first_name','last_name', 'employee', 'status','in_time','out_time', 'created_at')  
        
    # def create (self,instance,validated_data):
    #     print(validated_data,"datatatat")
    #     if len(validated_data) == 3:
    #         print("attendance data",validated_data)
    #         instance.id = validated_data.get('employee',instance.id)
    #         instance.in_time = validated_data.get('in_time',instance.in_time)
    #         instance.status = validated_data.get('status',instance.status)
    #         instance.save()
    #         return instance  
    
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
        # import pdb; pdb.set_trace()
        # print("data:",validated_data)
        # employee_id = validated_data.get("employee")
        # print(employee_id,"dfmbvhdfhvbdjhfv")
        # status = validated_data.get("status")
        # print(status,"dfmbvhdfhvbdjhfv")
        # in_time = validated_data.get("in_time")
        # print(validated_data['out_time'])
        # if validated_data['out_time']:
        #     Attendance.objects.filter(employee = validated_data['employee']).update(out_time = validated_data['out_time'])
        #     # attendance_data = Attendance.objects.create(**validated_data)
        #     # return attendance_data
        #     return Response({'message': "Created"})
        # else:
        # if not Attendance.objects.filter(employee = validated_data['employee']).exists() and (Attendance.objects.get(employee = validated_data['employee']).created_at != validated_data['created_at']):
        #     attendance_data = Attendance.objects.create(**validated_data)
        #     return attendance_data
        # else:
        #     return Response({'message': "Can't create"})
        # useful : .exists() and (Attendance.objects.get(employee = validated_data['employee']).created_at != validated_data['created_at'])
        # try:  
        #     attendance_data  = Attendance.objects.get(employee = validated_data['employee'])
        #     # return Response({'message': "Can't create"})
            
        # except Attendance.DoesNotExist:
        attendance_data = Attendance.objects.create(**validated_data)
        return attendance_data
        # print(validated_data,"jhsad")
        # print(validated_data['employee'], "emppp")
        # if not Attendance.objects.filter().exists(employee = validated_data['first_name']):
        # # Insert new data here
        #     Attendance.objects.create(**validated_data)
            
        # obj, created = Attendance.objects.get_or_create(
        #         employee=validated_data['employee'],
        #         # created_at=validated_data['created_at'],
        #         defaults={**validated_data},
        #     )

        # import pdb; pdb.set_trace()
        # validated_data['profile_picture_path'] = 'images/' + str(validated_data['profile_picture_path']).split('\\')[-1]

        # employee_data = Employee.objects.create(**validated_data)
        # return employee_data  
            
class EverydayAttendanceSerializer(ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'            