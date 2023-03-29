from hims.configuration import models as conf_model
from hims.operation import models as op_model
from rest_framework import generics, pagination
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction, connection


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
            for element in data:


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
    



class TransferredItemDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_model.ItemTransferred
    serializer_class = serializers.ItemTransferredSerializer