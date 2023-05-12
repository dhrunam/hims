from hims.configuration import models as conf_model
from hims.operation import models as op_model
from rest_framework import generics, pagination
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction, connection
from hims.operation import serializers
from durin.auth import TokenAuthentication
from hims.operation.utility.custom_value_generator import ValueManager
from urllib.parse import unquote
from django.conf import settings



class ReceivedItemList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_model.ItemReceived.objects.all()
    serializer_class = serializers.ItemReceivedSerializer
    # pagination.PageNumberPagination.page_size = 2

    def get_queryset(self):
        """
        This view should return a list of all the purchases item  received
        for the specified order .
        """
        queryset = op_model.ItemReceived.objects.all()
        # order_number = self.request.data['order_no']
        batch_no = self.request.query_params.get('batch_no')
        from_date = self.request.query_params.get('from_date')
        to_date = self.request.query_params.get('to_date')
        hotel_id = self.request.query_params.get('hotel')
        department_id= self.request.query_params.get('department')

        if(batch_no):
            queryset = queryset.filter(batch_no=batch_no)
        
        if(from_date and to_date):
            queryset = queryset.filter(received_on__gte=from_date, received_on__lte=to_date)

        if(hotel_id):
            queryset = queryset.filter(hotel=hotel_id)

        if(department_id):
            queryset = queryset.filter(item__department=department_id)
        
        return queryset

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        operation_type = settings.OPERATION_TYPE['received']
        print('Operation_Type:',operation_type)
        #request.data._mutable = True
        data = request.data['data']

        # result = self.create(request, *args, **kwargs)
        if(data):
            batch_no = ValueManager.generate_batch_no(self,data, operation_type)
            # print('batch_no', batch_no)
            for element in data:

                item_in_hotel = op_model.ItemInHotel.objects.filter(hotel=element['hotel'], item=element['item']).last()
                if item_in_hotel:
                    request.data['opening_balance'] = (item_in_hotel.opening_balance
                                                       + item_in_hotel.received
                                                       - item_in_hotel.damaged
                                                       -item_in_hotel.returned
                                                       -item_in_hotel.transferred
                    )
                    #item_in_hotel[0].opening_balance=element['opening_balance']
                    item_in_hotel.received=item_in_hotel.received + int(element['quantity_received'])
                    item_in_hotel.save()
                else:
                    item_in_hotel=op_model.ItemInHotel.objects.create(
                        hotel=conf_model.Hotel.objects.get(id=element['hotel']),
                        item=conf_model.Item.objects.get(id=element['item']),
                        opening_balance=element['opening_balance'],
                        received=element['quantity_received'],
                        min_level = element['min_level'],
                        max_level = element['max_level']
                    )
                
                avail_item_quantity_snapshot= op_model.AvailableItemQuantitySnapshot.objects.filter(
                    item = element['item']
                ).last()

                if avail_item_quantity_snapshot:
                    avail_item_quantity_snapshot.quantity_received=  avail_item_quantity_snapshot.quantity_received + int(element['quantity_received'])
                    avail_item_quantity_snapshot.save()
                
                else:
                    op_model.AvailableItemQuantitySnapshot.objects.create(
                        item=conf_model.Item.objects.get(id=element['item']),
                        quantity_received=element['quantity_received'],
                        opening_balance=element['opening_balance'],

                    )
                
                # request.data['id'] = element['id']
                request.data['hotel'] = element['hotel']
                request.data['item'] = element['item']
                request.data['vendor'] = element['vendor']
                request.data['batch_no'] = batch_no
                request.data['quantity_received'] = element['quantity_received']
                request.data['unit_price'] = element['unit_price']
                request.data['expiry_date'] = element['expiry_date']
                request.data['received_on'] = element['received_on']
                request.data['remarks'] = element['remarks']
                request.data['created_by'] = request.user.id
                result = self.create(request, *args, **kwargs)



        #request.data._mutable = False
        return self.get(request, *args, **kwargs)
    

class ReceivedItemBatches(generics.ListAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_model.ItemReceived.objects.all()
    serializer_class = serializers.ItemReceivedBatchesSerializer
    # pagination.PageNumberPagination.page_size = 2

    def get_queryset(self):
        print('What is this?')
        """
        This view should return a list of all the purchases item  received
        for the specified order .
        """
        hotel = self.request.query_params.get('hotel_id')

        queryset = op_model.ItemReceived.objects.raw('''
            SELECT ROW_Number() over( order by batch_no) as id, count(*) as number_of_item, 
                batch_no
	        FROM public.operation_itemreceived where hotel_id=%s group by batch_no;
                ''', [hotel])
        return queryset

    # def list(self, request, *arg, **kwargs):

    #     return super().list(self, request, *arg, **kwargs)


class ReceivedItemPerBatch(generics.ListAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_model.ItemReceived.objects.all()
    serializer_class = serializers.ItemReceivedSerializer
    # pagination.PageNumberPagination.page_size = 2

    def get_queryset(self):
        print('What is this?')
        """
        This view should return a list of all the purchases item  received
        for the specified order .
        """
        batch_no =unquote(self.request.query_params.get('batch_no'))
        if batch_no:
            queryset = op_model.ItemReceived.objects.filter(batch_no=batch_no)
        return queryset

class ReceivedItemDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_model.ItemReceived
    serializer_class = serializers.ItemReceivedSerializer