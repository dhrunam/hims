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
    



class DamagedItemDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_model.ItemDamaged
    serializer_class = serializers.ItemDamagedSerializer