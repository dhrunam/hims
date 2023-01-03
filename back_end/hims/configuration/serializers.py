
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