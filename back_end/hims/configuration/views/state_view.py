from hims.configuration import models
from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated

from hims.configuration import serializers
from durin.auth import TokenAuthentication


class StateList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)

    queryset = models.State.objects.all()
    serializer_class = serializers.StateSerializer
    # pagination.PageNumberPagination.page_size = 100


class StateDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = models.State
    serializer_class = serializers.StateSerializer