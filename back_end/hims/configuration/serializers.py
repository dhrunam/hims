
from dataclasses import fields
import imp
from pyexpat import model
from rest_framework import serializers
from hims.configuration  import models



#  State
class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.State
        fields = ['id','name']

# District
class DistrictSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.District
        fields = [ 'id', 'state','name'] 

class ManageDistrictSerializer(serializers.ModelSerializer):
    related_state=StateSerializer(source="state",read_only=True)
    class Meta:
        model = models.District
        fields = [
                    'id',
                    'name',
                    'state',
                    'related_state',

        ]

# Designation
class DesignationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DesignationMaster
        fields = ['id','name']



class ProprietorSerializer(serializers.ModelSerializer):
    # related_state = StateSerializer(source="state",read_only=True)
    # related_district = DistrictSerializer(source="district",read_only=True)
    class Meta:
        model = models.Proprietor
        fields = [
                    'id', 
                    'name',
                    'address_line1',
                    'address_line2', 
                    'address_line3',
                    'pin',
                    'contact_number',

                ]

class HotelSerializer(serializers.ModelSerializer):
    related_state = StateSerializer(source="state",read_only=True)
    related_district = DistrictSerializer(source="district",read_only=True)
    related_proprietor = ProprietorSerializer(source='proprietor', read_only=True)

    class Meta:
        model = models.Hotel
        fields = [
                    'id', 
                    'name',
                    'short_name',
                    'state',
                    'district',
                    'proprietor',
                    'address_line1',
                    'address_line2', 
                    'address_line3',
                    'pin',
                    'contact_number',
                    'related_state',
                    'related_district',
                    'related_proprietor',

                ]

class DepartmentMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DepartmentMaster

        fields = ['id','name','short_name']


# Hotel Departments

class HotelDepartmentSerializer(serializers.ModelSerializer):
    related_hotel = StateSerializer(source="hotel",read_only=True)
    related_department = DistrictSerializer(source="department",read_only=True)
    class Meta:
        model=models.HotelDepartment
        fields=[
            'hotel',
            'department',
            'related_hotel',
            'related_department',


        ]


## Item
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Item

        fields = [
                    'id',
                    'name',

        ]   


## Unit
class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Unit

        fields = [
                    'id',
                    'name',
                    'short_name',

        ] 