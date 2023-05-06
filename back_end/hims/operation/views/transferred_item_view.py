from hims.configuration import models as conf_model
from hims.operation import models as op_model
from rest_framework import generics, pagination
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction, connection
from hims.operation.utility import ValueManager

from hims.operation import serializers
from durin.auth import TokenAuthentication

class TransferredItemList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_model.ItemTransferred.objects.all()
    serializer_class = serializers.ItemTransferredSerializer
    # pagination.PageNumberPagination.page_size = 2

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        print('hi')
        #request.data._mutable = True
        data = request.data['data']
        result = Response()
        if(data):
            batch_no = ValueManager.generate_batch_no(self, data)
            for element in data:

                request.data['batch_no'] = batch_no
                request.data['from_hotel'] = element['from_hotel']
                request.data['to_hotel'] = element['to_hotel']
                request.data['from_department'] = element['from_department']
                request.data['to_department'] = element['to_department']

                request.data['item'] = element['item']
                request.data['opening_balance'] = element['opening_balance']
                request.data['quantity_transferred'] = element['quantity_transferred']
                request.data['remarks'] = element['remarks']
                request.data['transferred_on'] = element['transferred_on']
                
                request.data['created_by'] = request.user.id
                request.data['is_acknowledged'] = False

                result = self.create(request, *args, **kwargs)

                item_in_from_hotel = op_model.ItemInHotel.objects.filter(hotel=element['from_hotel'], item=element['item'])
                    

                if item_in_from_hotel and element['from_hotel']!=element['to_hotel']:
                    item_in_from_hotel[0].transferred=item_in_from_hotel[0].transferred + int(element['quantity_transferred'])
                    item_in_from_hotel[0].save()

                item_in_to_hotel = op_model.ItemInHotel.objects.filter(hotel=element['to_hotel'], item=element['item'])
               
                if item_in_to_hotel and element['from_hotel']!=element['to_hotel']:
                    item_in_to_hotel[0].received=item_in_to_hotel[0].received + int(element['quantity_transferred'])
                    item_in_to_hotel[0].save()


        #request.data._mutable = False
        return self.get(request, *args, **kwargs)
    

    def get_queryset(self):
        """
        This view should return a list of all the purchases item  received
        for the specified order .
        """
        queryset = op_model.ItemTransferred.objects.all()
        # order_number = self.request.data['order_no']
        batch_no = self.request.query_params.get('batch_no')
        from_date = self.request.query_params.get('from_date')
        to_date = self.request.query_params.get('to_date')

        if(batch_no):
            queryset = queryset.filter(batch_no=batch_no)
        
        if(from_date and to_date):
            queryset = queryset.filter(transferred_on__gte=from_date, transferred_on__lte=to_date)
        
        return queryset





class TransferredItemDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_model.ItemTransferred
    serializer_class = serializers.ItemTransferredSerializer