from hims.configuration import models as conf_model
from hims.operation import models as op_model
from rest_framework import generics, pagination
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction, connection
from hims.operation import serializers
from durin.auth import TokenAuthentication

class ReceivedItemList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_model.ItemReceived.objects.all()
    serializer_class = serializers.ItemReceivedSerializer
    # pagination.PageNumberPagination.page_size = 2

    # @transaction.atomic
    # def post(self, request, *args, **kwargs):
    #     print('hi')
        #data = request.data['data']
        # result = self.create(request, *args, **kwargs)
        # if(data):
        #     for element in data:
        #         print(element)
        #         request.data['id'] = element['id']
        #         request.data['item_dispatch_list'] = element['item_dispatch_list']
        #         request.data['dispatch'] = element['dispatch']
        #         request.data['purchase'] = element['purchase']
        #         request.data['item'] = element['item']
        #         request.data['serial_no'] = element['serial_no']
        #         request.data['model_no'] = element['model_no']
        #         request.data['specification'] = element['specification']
        #         request.data['brand'] = element['brand']
        #         request.data['warranty_period'] = element['warranty_period']
        #         request.data['is_in_use'] = element['is_in_use']
        #         request.data['remarks'] = element['remarks']
        #         if(request.data['id'] is None or request.data['id'] <= 0):
        #             result = self.create(request, *args, **kwargs)

        #     # update_item_dispatch_list(self, data)
        # # self.request.query_params['dispatch_id'] = data[0]['dispatch']
        # self.dispatch_id = data[0]['dispatch']
        # return self.get(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        request.data._mutable = True
        request.data['created_by'] = request.user.id
        return self.create(request, *args, **kwargs)




class ReceivedItemDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = op_model.ItemReceived
    serializer_class = serializers.ItemReceivedSerializer