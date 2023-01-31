from hims.configuration import models as conf_model
from hims.operation import models as op_model
from rest_framework import generics, pagination
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction, connection

from hims.operation import serializers
from durin.auth import TokenAuthentication

class ReturnedItemList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_model.ItemReturned.objects.all()
    serializer_class = serializers.ItemReturnedSerializer
    # pagination.PageNumberPagination.page_size = 2
    
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        print('hi')
        request.data._mutable = True
        data = request.data['data']
        result = self.create(request, *args, **kwargs)
        if(data):
            for element in data:

                print(element)

                request.data['id'] = element['id']
                request.data['hotel'] = element['hotel']
                request.data['item'] = element['item']
                request.data['opening_balance'] = element['opening_balance']
                request.data['quantity_returned'] = element['quantity_returned']
                request.data['remarks'] = element['remarks']
                request.data['created_by'] = request.user.id
                if(request.data['id'] is None or request.data['id'] <= 0):
                    result = self.create(request, *args, **kwargs)


        request.data._mutable = False
        return self.get(request, *args, **kwargs)
    




class ReturnedItemDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_model.ItemReturned
    serializer_class = serializers.ItemReturnedSerializer