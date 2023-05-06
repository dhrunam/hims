from hims.configuration import models as conf_model
from hims.operation import models as op_model
from rest_framework import generics, pagination
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction, connection
from hims.operation import serializers
from durin.auth import TokenAuthentication
from hims.operation.utility.custom_value_generator import ValueManager

class DamagedItemList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_model.ItemDamaged.objects.all()
    serializer_class = serializers.ItemDamagedSerializer
    # pagination.PageNumberPagination.page_size = 2

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        print('hi')
        # request.data._mutable = True
        data = request.data['data']
        result = Response()
        if(data):
            batch_no = ValueManager.generate_batch_no(self, data)
            for element in data:

                print(element)

                # request.data['id'] = element['id']
                request.data['hotel'] = element['hotel']
                request.data['item'] = element['item']
                request.data['batch_no'] = batch_no

                request.data['opening_balance'] = element['opening_balance']
                request.data['quantity_damaged'] = element['quantity_damaged']
                request.data['remarks'] = element['remarks']
                request.data['damaged_on'] = element['damaged_on']
                request.data['created_by'] = request.user.id
                
                result = self.create(request, *args, **kwargs)

                item_in_hotel = op_model.ItemInHotel.objects.filter(hotel=element['hotel'], item=element['item'])

                if item_in_hotel:
                    item_in_hotel[0].damaged=item_in_hotel[0].returned + int(element['quantity_damaged'])
                    item_in_hotel[0].save()



        # request.data._mutable = False
        return self.get(request, *args, **kwargs)
    

    def get_queryset(self):
        """
        This view should return a list of all the purchases item  received
        for the specified order .
        """
        queryset = op_model.ItemDamaged.objects.all()
        # order_number = self.request.data['order_no']
        batch_no = self.request.query_params.get('batch_no')
        from_date = self.request.query_params.get('from_date')
        to_date = self.request.query_params.get('to_date')

        if(batch_no):
            queryset = queryset.filter(batch_no=batch_no)
        
        if(from_date and to_date):
            queryset = queryset.filter(damaged_on__gte=from_date, damaged_on__lte=to_date)
        
        return queryset


class DamagedItemDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_model.ItemDamaged
    serializer_class = serializers.ItemDamagedSerializer