from hims.configuration import models as conf_model
from hims.operation import models as op_model
from rest_framework import generics, pagination
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction, connection

from hims.operation import serializers
from durin.auth import TokenAuthentication
from hims.operation.utility.custom_value_generator import ValueManager
from django.conf import settings


class ReturnedItemList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_model.ItemReturned.objects.all()
    serializer_class = serializers.ItemReturnedSerializer
    # pagination.PageNumberPagination.page_size = 2
    
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        operation_type = settings.OPERATION_TYPE['returned']
        #request.data._mutable = True
        data = request.data['data']
        result=Response()
        if(data):
            batch_no = ValueManager.generate_batch_no(self,data, operation_type)
            for element in data:

                item_in_hotel = op_model.ItemInHotel.objects.filter(hotel=element['hotel'], item=element['item']).last()
                if item_in_hotel:
                    request.data['opening_balance'] = (item_in_hotel.opening_balance
                                                       + item_in_hotel.received
                                                       - item_in_hotel.damaged
                                                       -item_in_hotel.returned
                                                       -item_in_hotel.transferred
                    )
                    item_in_hotel.returned=item_in_hotel.returned + int(element['quantity_returned'])
                    item_in_hotel.save()

                avail_item_quantity_snapshot= op_model.AvailableItemQuantitySnapshot.objects.filter(
                    item = element['item']
                ).last()

                if avail_item_quantity_snapshot:
                    avail_item_quantity_snapshot.quantity_returned=  avail_item_quantity_snapshot.quantity_returned + int(element['quantity_returned'])
                    avail_item_quantity_snapshot.save()

                
                request.data['hotel'] = element['hotel']
                request.data['item'] = element['item']
                request.data['batch_no'] = batch_no
                request.data['quantity_returned'] = element['quantity_returned']
                request.data['unit_price'] = element['unit_price']
                request.data['expiry_date'] = element['expiry_date']
                request.data['returned_on'] = element['returned_on']
                request.data['remarks'] = element['remarks']
                request.data['created_by'] = request.user.id

                result = self.create(request, *args, **kwargs)




        #request.data._mutable = False
        return self.get(request, *args, **kwargs)
    

    def get_queryset(self):
        """
        This view should return a list of all the purchases item  received
        for the specified order .
        """
        queryset = op_model.ItemReturned.objects.all()
        # order_number = self.request.data['order_no']
        batch_no = self.request.query_params.get('batch_no')
        from_date = self.request.query_params.get('from_date')
        to_date = self.request.query_params.get('to_date')
        hotel_id = self.request.query_params.get('hotel')
        department_id= self.request.query_params.get('department')

        if(batch_no):
            queryset = queryset.filter(batch_no=batch_no)
        
        if(from_date and to_date):
            queryset = queryset.filter(returned_on__gte=from_date, returned_on__lte=to_date)
        
        if(hotel_id):
            queryset = queryset.filter(hotel=hotel_id)

        if(department_id):
            queryset = queryset.filter(item__department=department_id)

        return queryset



class ReturnedItemDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_model.ItemReturned
    serializer_class = serializers.ItemReturnedSerializer


class ReturnedItemBatches(generics.ListAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_model.ItemReturned.objects.all()
    serializer_class = serializers.ItemReturnedSerializer
    # pagination.PageNumberPagination.page_size = 2

    def get_queryset(self):
        print('What is this?')
        """
        This view should return a list of all the purchases item  received
        for the specified order .
        """
        hotel = self.request.query_params.get('hotel_id')

        queryset = op_model.ItemReturned.objects.raw('''
            SELECT ROW_Number() over( order by batch_no) as id, count(*) as number_of_item, 
                batch_no
	        FROM public.operation_itemreturned where hotel_id=%s group by batch_no;
                ''', [hotel])
        return queryset

    # def list(self, request, *arg, **kwargs):

    #     return super().list(self, request, *arg, **kwargs)

class ReturnedItemPerBatch(generics.ListAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_model.ItemReturned.objects.all()
    serializer_class = serializers.ItemReturnedSerializer
    # pagination.PageNumberPagination.page_size = 2

    def get_queryset(self):
        print('What is this?')
        """
        This view should return a list of all the purchases item  received
        for the specified order .
        """
        queryset = op_model.ItemReturned.objects.all()
        batch_no = self.request.query_params.get('batch_no')
        if batch_no:
            queryset = op_model.ItemReturned.objects.filter(batch_no=batch_no)
        return queryset
