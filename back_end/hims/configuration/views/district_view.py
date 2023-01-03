from hims.configuration import models
from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated

from hims.configuration import serializers
from durin.auth import TokenAuthentication

class DistrictList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.District.objects.all()
    serializer_class = serializers.ManageDistrictSerializer
    # pagination.PageNumberPagination.page_size = 2


class DistrictDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.District
    serializer_class = serializers.DistrictSerializer

