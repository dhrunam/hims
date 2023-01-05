from rest_framework import serializers
from django.db import transaction, connection
from hims.operation import models as op_models
from hims.configuration import models as config_models
from hims.account import models as acc_models
from hims.configuration.serializers import(
    
    UnitSerializer,
    ItemSerializer,
    HotelSerializer,
    ProprietorSerializer,
    StateSerializer,
    HotelDepartmentSerializer
)
from hims.account.serializers import (
    ResgisteredUserSerializer,
)



class ItemReceivedSerializer(serializers.ModelSerializer):
    # purchase_amount = serializers.FloatField(read_only=True)
    # balance_amount = serializers.FloatField(read_only=True)

    related_create_user = ResgisteredUserSerializer(
        source='created_by', read_only=True)

    related_hotel = HotelSerializer(source='hotel', read_only=True)

    related_item= ItemSerializer(source='item', read_only=True)
    class Meta:
        model = op_models.ItemReceived

    # hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL)
    # item=models.ForeignKey(config_model.Item, null=True, on_delete=models.SET_NULL)
    # quantity_received=models.IntegerField(default=0)
    # created_by = models.ForeignKey(
    #  acc_model.User, null=True, on_delete=models.SET_NULL, related_name='item_received_created_by')
    # created_at = models.DateTimeField(auto_now=True, blank=False)

        fields = [
            'id',
            'hotel',
            'item',
            'opening_balance',
            'quantity_received',
            'remarks',
            'created_by',
            'created_at',
            'related_hotel',
            'related_item',
            'related_create_user',


        ]


class ItemReturnedSerializer(serializers.ModelSerializer):
    # purchase_amount = serializers.FloatField(read_only=True)
    # balance_amount = serializers.FloatField(read_only=True)

    related_create_user = ResgisteredUserSerializer(
        source='created_by', read_only=True)

    related_hotel = HotelSerializer(source='hotel', read_only=True)

    related_item= ItemSerializer(source='item', read_only=True)
    class Meta:
        model = op_models.ItemReturned

    # hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL)
    # item=models.ForeignKey(config_model.Item, null=True, on_delete=models.SET_NULL)
    # quantity_received=models.IntegerField(default=0)
    # created_by = models.ForeignKey(
    #  acc_model.User, null=True, on_delete=models.SET_NULL, related_name='item_received_created_by')
    # created_at = models.DateTimeField(auto_now=True, blank=False)

        fields = [
            'id',
            'hotel',
            'item',
            'opening_balance',
            'quantity_returned',
            'remarks',
            'created_by',
            'created_at',
            'related_hotel',
            'related_item',
            'related_create_user',


        ]

class ItemDamagedSerializer(serializers.ModelSerializer):
    # purchase_amount = serializers.FloatField(read_only=True)
    # balance_amount = serializers.FloatField(read_only=True)

    related_create_user = ResgisteredUserSerializer(
        source='created_by', read_only=True)

    related_hotel = HotelSerializer(source='hotel', read_only=True)

    related_item= ItemSerializer(source='item', read_only=True)
    class Meta:
        model = op_models.ItemDamaged

    # hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL)
    # item=models.ForeignKey(config_model.Item, null=True, on_delete=models.SET_NULL)
    # quantity_received=models.IntegerField(default=0)
    # created_by = models.ForeignKey(
    #  acc_model.User, null=True, on_delete=models.SET_NULL, related_name='item_received_created_by')
    # created_at = models.DateTimeField(auto_now=True, blank=False)

        fields = [
            'id',
            'hotel',
            'item',
            'opening_balance',
            'quantity_damaged',
            'remarks',
            'created_by',
            'created_at',
            'related_hotel',
            'related_item',
            'related_create_user',


        ]


class ItemTransferredSerializer(serializers.ModelSerializer):
    # purchase_amount = serializers.FloatField(read_only=True)
    # balance_amount = serializers.FloatField(read_only=True)

    related_create_user = ResgisteredUserSerializer(
        source='created_by', read_only=True)
    related_acknowledged_by_user = ResgisteredUserSerializer(
        source='acknowledged_by', read_only=True)

    related_from_hotel = HotelSerializer(source='from_hotel', read_only=True)
    related_to_hotel = HotelSerializer(source='to_hotel', read_only=True)

    related_from_department = HotelSerializer(source='from_department', read_only=True)
    related_to_department = HotelSerializer(source='to_department', read_only=True)
    related_item= ItemSerializer(source='item', read_only=True)
    class Meta:
        model = op_models.ItemTransferred

#     from_hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL, related_name='from_hotel')
#     to_hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL, related_name='to_hotel')

#     from_department=models.ForeignKey(config_model.DepartmentMaster, on_delete=models.SET_NULL, null=True, related_name='from_department')
#     to_department=models.ForeignKey(config_model.DepartmentMaster, on_delete=models.SET_NULL, null=True, related_name='to_department')
   

        fields = [
            'id',
            'from_hotel',
            'to_hotel',
            'from_department',
            'to_department',
            'opening_balance',
            'quantity_transferred',
            'remarks',
            'created_by',
            'created_at',
            'is_acknowledged',
            'related_from_hotel',
            'related_to_hotel',
            'related_from_department',
            'related_to_department',
            'related_item',
            'related_create_user',
            'related_acknowledged_by_user'


        ]



class ItemInHotelSerializer(serializers.ModelSerializer):
    # purchase_amount = serializers.FloatField(read_only=True)
    # balance_amount = serializers.FloatField(read_only=True)
        
    related_hotel = HotelSerializer(source='hotel', read_only=True)

    related_item= ItemSerializer(source='item', read_only=True)

    class Meta:
        model = op_models.ItemInHotel

    # hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL)
    # item=models.ForeignKey(config_model.Item, null=True, on_delete=models.SET_NULL)
    # opening_balance=models.IntegerField(default=0)
    # received=models.IntegerField(default=0)
    # damaged=models.IntegerField(default=0)
    # returned=models.IntegerField(default=0)
    # transferred=models.IntegerField(default=0)
    # min_level=models.IntegerField(default=0)
    # max_level=models.IntegerField(default=0)

        fields = [
            'id',
            'hotel',
            'item',
            'opening_balance',
            'received',
            'damaged',
            'returned',
            'transferred',
            'min_level',
            'max_level',
            'related_hotel',
            'related_item',

        ]

