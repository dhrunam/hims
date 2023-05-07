from rest_framework import serializers
from django.db import transaction, connection
from hims.operation import models as op_models
from hims.configuration import models as config_models
from hims.configuration import serializers as config_serializers
from hims.account import models as acc_models
from hims.configuration.serializers import(
    
    UnitSerializer,
    ItemSerializer,
    HotelSerializer,
    ProprietorSerializer,
    StateSerializer,
    HotelDepartmentSerializer,
    DepartmentMasterSerializer,
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
    related_vendor = config_serializers.VendorSerializer(source='vendor', read_only=True)
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
            'vendor',
            'batch_no',
            'opening_balance',
            'quantity_received',
            'unit_price',
            'expiry_date',
            'received_on',
            'remarks',
            'created_by',
            'created_at',
            'related_hotel',
            'related_item',
            'related_create_user',
            'related_vendor',


        ]

    # def create(self, validated_data):

    #     try:
    #         with transaction.atomic():

    #             item_received = op_models.ItemReceived.objects.create(
    #                 hotel=validated_data['hotel'],
    #                 item=validated_data['item'],
    #                 batch_no=validated_data['batch_no'],
    #                 opening_balance=validated_data['opening_balance'],
    #                 quantity_received=validated_data['quantity_received'],
    #                 unit_price=validated_data['unit_price'],
    #                 expiry_date=validated_data['expiry_date'],
    #                 remarks=validated_data['remarks'],
    #                 created_by=validated_data['created_by'],

    #             )

              

    #            item_in_hotel = op_models.ItemInHotel.objects.filter(hotel=validated_data['hotel'], item=validated_data['item'])
                

    #             if item_in_hotel:
    #                 item_in_hotel[0].opening_balance=validated_data['opening_balance']
    #                 item_in_hotel[0].received=item_in_hotel[0].received + validated_data['quantity_received']
    #                 item_in_hotel[0].save()
    #             else:
    #                 item_in_hotel=op_models.ItemInHotel.objects.create(
    #                 hotel=validated_data['hotel'],
    #                 item=validated_data['item'],
    #                 opening_balance=validated_data['quantity_received'],
    #                 received=validated_data['quantity_received']
    #             )
    #             return item_received

    #             # return Response(serializers.data(), status=status.HTTP_200_OK)

    #     except TypeError:
    #         return TypeError("There is some error in processing your data.")

    def update(self, instance, validated_data):

        try:
            # with transaction.atomic():
                item_received = instance
                prev_quantity_received = item_received.quantity_received

                item_received.hotel = validated_data['hotel']
                item_received.item = validated_data['item']
                item_received.opening_balance = validated_data['opening_balance']
                item_received.quantity_received = validated_data['quantity_received']
                item_received.remarks = validated_data['remarks']
                item_received.created_by = validated_data['created_by']
                item_received.save()

                item_in_hotel = op_models.ItemInHotel.objects.filter(hotel=validated_data['hotel'], item=validated_data['item'])
                if item_in_hotel:
                    item_in_hotel[0].received=item_in_hotel[0].received - prev_quantity_received + validated_data['quantity_received']
                    item_in_hotel[0].save()

                return item_received

        except TypeError:
            return TypeError("There is some error in processing your data.")

class ItemReceivedBatchesSerializer(serializers.ModelSerializer):
    number_of_item = serializers.IntegerField(read_only=True)

    class Meta:
        model = op_models.ItemReceived

        fields = [
        'id',
        'number_of_item',
        'batch_no',

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
            'batch_no',
            'hotel',
            'item',
            'opening_balance',
            'quantity_returned',
            'unit_price',
            'expiry_date',
            'returned_on',
            'remarks',
            'created_by',
            'created_at',
            'related_hotel',
            'related_item',
            'related_create_user',


        ]
    
        # def create(self, validated_data):

        #     try:
        #         # with transaction.atomic():

        #             item_returned = op_models.ItemReturned.objects.create(
        #                 hotel=validated_data['hotel'],
        #                 item=validated_data['item'],
        #                 opening_balance=validated_data['opening_balance'],
        #                 quantity_returned=validated_data['quantity_returned'],
        #                 remarks=validated_data['remarks'],
        #                 created_by=validated_data['created_by'],

        #             )


        #             item_in_hotel = op_models.ItemInHotel.objects.filter(hotel=validated_data['hotel'], item=validated_data['item'])
                    

        #             if item_in_hotel:
        #                 item_in_hotel[0].returned=item_in_hotel[0].returned + validated_data['quantity_returned']
        #                 item_in_hotel[0].save()

        #             # return item_returned

        #         # return Response(serializers.data(), status=status.HTTP_200_OK)

        #     except TypeError:
        #         return TypeError("There is some error in processing your data.")

        def update(self, instance, validated_data):

            try:
                with transaction.atomic():
                    item_returned = instance
                    prev_quantity_returned = item_returned.quantity_returned

                    item_returned.hotel = validated_data['hotel']
                    item_returned.item = validated_data['item']
                    item_returned.opening_balance = validated_data['opening_balance']
                    item_returned.quantity_returned = validated_data['quantity_returned']
                    item_returned.remarks = validated_data['remarks']
                    item_returned.created_by = validated_data['created_by']
                    item_returned.save()

                    item_in_hotel = op_models.ItemInHotel.objects.filter(hotel=validated_data['hotel'], item=validated_data['item'])
                    if item_in_hotel:
                        item_in_hotel[0].returned=item_in_hotel[0].returned - prev_quantity_returned + validated_data['quantity_returned']
                        item_in_hotel[0].save()

                    return item_returned

            except TypeError:
                return TypeError("There is some error in processing your data.")

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
            'batch_no',
            'hotel',
            'item',
            'opening_balance',
            'quantity_damaged',
            'unit_price',
            'expiry_date',
            'remarks',
            'damaged_on',
            'created_by',
            'created_at',
            'related_hotel',
            'related_item',
            'related_create_user',


        ]

        # def create(self, validated_data):

        #     try:
        #         with transaction.atomic():

        #             item_damaged = op_models.ItemDamaged.objects.create(
        #                 hotel=validated_data['hotel'],
        #                 item=validated_data['item'],
        #                 opening_balance=validated_data['opening_balance'],
        #                 quantity_damaged=validated_data['quantity_damaged'],
        #                 remarks=validated_data['remarks'],
        #                 created_by=validated_data['created_by'],

        #             )


        #             item_in_hotel = op_models.ItemInHotel.objects.filter(hotel=validated_data['hotel'], item=validated_data['item'])

        #             if item_in_hotel:
        #                 item_in_hotel[0].damaged=item_in_hotel[0].returned + validated_data['quantity_damaged']
        #                 item_in_hotel[0].save()

        #             return item_damaged

        #     except TypeError:
        #         return TypeError("There is some error in processing your data.")
       
        def update(self, instance, validated_data):

            try:
                with transaction.atomic():
                    item_damaged = instance
                    prev_quantity_damaged = item_damaged.quantity_damaged

                    item_damaged.hotel = validated_data['hotel']
                    item_damaged.item = validated_data['item']
                    item_damaged.opening_balance = validated_data['opening_balance']
                    item_damaged.quantity_damaged = validated_data['quantity_damaged']
                    item_damaged.remarks = validated_data['remarks']
                    item_damaged.created_by = validated_data['created_by']
                    item_damaged.save()

                    item_in_hotel = op_models.ItemInHotel.objects.filter(hotel=validated_data['hotel'], item=validated_data['item'])
                    if item_in_hotel:
                        item_in_hotel[0].damaged=item_in_hotel[0].damaged - prev_quantity_damaged + validated_data['quantity_damaged']
                        item_in_hotel[0].save()

                    return item_damaged

            except TypeError:
                return TypeError("There is some error in processing your data.")

class ItemTransferredSerializer(serializers.ModelSerializer):
    # purchase_amount = serializers.FloatField(read_only=True)
    # balance_amount = serializers.FloatField(read_only=True)

    related_create_user = ResgisteredUserSerializer(
        source='created_by', read_only=True)
    related_acknowledged_by_user = ResgisteredUserSerializer(
        source='acknowledged_by', read_only=True)

    related_from_hotel = HotelSerializer(source='from_hotel', read_only=True)
    related_to_hotel = HotelSerializer(source='to_hotel', read_only=True)

    related_from_department = DepartmentMasterSerializer(source='from_department', read_only=True)
    related_to_department = DepartmentMasterSerializer(source='to_department', read_only=True)
    related_item= ItemSerializer(source='item', read_only=True)
    class Meta:
        model = op_models.ItemTransferred

#     from_hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL, related_name='from_hotel')
#     to_hotel=models.ForeignKey(config_model.Hotel,null=True, on_delete=models.SET_NULL, related_name='to_hotel')

#     from_department=models.ForeignKey(config_model.DepartmentMaster, on_delete=models.SET_NULL, null=True, related_name='from_department')
#     to_department=models.ForeignKey(config_model.DepartmentMaster, on_delete=models.SET_NULL, null=True, related_name='to_department')
   

        fields = [
            'id',
            'batch_no',
            'from_hotel',
            'to_hotel',
            'from_department',
            'to_department',
            'item',
            'opening_balance',
            'quantity_transferred',
            'unit_price',
            'expiry_date',
            'remarks',
            'transferred_on',
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

        # def create(self, validated_data):

        #     try:
        #         with transaction.atomic():

        #             item_transferred = op_models.ItemTransferred.objects.create(
        #                 from_hotel=validated_data['from_hotel'],
        #                 to_hotel=validated_data['to_hotel'],
        #                 from_department=validated_data['from_department'],
        #                 to_department=validated_data['to_department'],
        #                 item=validated_data['item'],
        #                 opening_balance=validated_data['opening_balance'],
        #                 quantity_transferred=validated_data['quantity_transferred'],
        #                 remarks=validated_data['remarks'],
        #                 created_by=validated_data['created_by'],
        #                 is_acknowledged=False
        #             )



        #             item_in_hotel = op_models.ItemInHotel.objects.filter(hotel=validated_data['hotel'], item=validated_data['item'])
                    

        #             if item_in_hotel:
        #                 item_in_hotel[0].transferred=item_in_hotel[0].transferred + validated_data['quantity_transferred']
        #                 item_in_hotel[0].save()

        #             return item_transferred

        #         # return Response(serializers.data(), status=status.HTTP_200_OK)

        #     except TypeError:
        #         return TypeError("There is some error in processing your data.")

    
    
        def update(self, instance, validated_data):

            try:
                with transaction.atomic():
                    item_transferred = instance
                    prev_quantity_transferred = item_transferred.quantity_transferred 
                    item_transferred.from_hotel = validated_data['from_hotel']
                    item_transferred.to_hotel = validated_data['to_hotel']
                    item_transferred.from_department = validated_data['from_department']
                    item_transferred.to_department = validated_data['to_department']
                    item_transferred.item = validated_data['item']
                    item_transferred.opening_balance = validated_data['opening_balance']
                    item_transferred.quantity_transferred = validated_data['quantity_transferred']
                    item_transferred.remarks = validated_data['remarks']
                    item_transferred.created_by = validated_data['created_by']
                    item_transferred.is_acknowledged = validated_data['is_acknowledged']
                    item_transferred.save()

                    item_in_hotel = op_models.ItemInHotel.objects.filter(hotel=validated_data['hotel'], item=validated_data['item'])
                    if item_in_hotel:
                        item_in_hotel[0].transferred=item_in_hotel[0].transferred - prev_quantity_transferred + validated_data['quantity_transferred']
                        item_in_hotel[0].save()

                    return item_transferred

            except TypeError:
                return TypeError("There is some error in processing your data.")

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

class CustomItemInHotelSerializer(serializers.ModelSerializer):
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

class SummaryReportSerializers(serializers.ModelSerializer):
    date_range = serializers.DateField(read_only=True)
    name = serializers.CharField(read_only=True)
    hotel_id = serializers.IntegerField(read_only=True)
    quantity_received= serializers.IntegerField(read_only=True)
    quantity_damaged= serializers.IntegerField(read_only=True)
    quantity_returned= serializers.IntegerField(read_only=True)
    quantity_transferred= serializers.IntegerField(read_only=True)
    sod_opening_balance= serializers.IntegerField(read_only=True)
    department_id= serializers.IntegerField(read_only=True)
    class Meta:
        model =  op_models.ItemInHotel
        fields =[
                    'id',
                    'name',
                    'date_range',
                    'hotel_id',
                    'department_id',
                    'quantity_received',
                    'quantity_damaged',
                    'quantity_returned',
                    'quantity_transferred',
                    'sod_opening_balance'

        ]


