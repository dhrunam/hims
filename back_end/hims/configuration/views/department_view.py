from hims.configuration import models
from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated

from hims.configuration import serializers
from durin.auth import TokenAuthentication

class DepartmentList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.DepartmentMaster.objects.all()
    serializer_class = serializers.DepartmentMasterSerializer
    # pagination.PageNumberPagination.page_size = 2


class DepartmentDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.DepartmentMaster
    serializer_class = serializers.DepartmentMasterSerializer