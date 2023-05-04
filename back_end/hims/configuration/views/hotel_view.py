from hims.configuration import models
from rest_framework import generics, pagination, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from hims.configuration import serializers
from durin.auth import TokenAuthentication
from django.db import transaction, connection

class HotelList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.Hotel.objects.all()
    serializer_class = serializers.HotelSerializer
    # pagination.PageNumberPagination.page_size = 2
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        #request.data._mutable = True
        data = request.data['data']

        result = self.create(request, *args, **kwargs)
        if(data):
            
            # print('batch_no', batch_no)
            for element in data:
                
                result = models.HotelDepartment.objects.create(
                    hotel = result.data['id'],
                    department = element['department']
                )

        #request.data._mutable = False
        return self.get(request, *args, **kwargs)
    



class HotelDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.Hotel
    serializer_class = serializers.HotelSerializer

    def patch(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)