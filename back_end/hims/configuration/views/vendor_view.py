from hims.configuration import models
from rest_framework import generics, pagination, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from hims.configuration import serializers
from durin.auth import TokenAuthentication


class VendorList(generics.ListCreateAPIView):
    queryset = models.Vendor.objects.all().order_by('-id')
    serializer_class = serializers.VendorSerializer

class VendorDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Vendor
    serializer_class = serializers.VendorSerializer