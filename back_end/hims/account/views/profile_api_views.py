
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User, Group
from rest_framework import status
from rest_framework.response import Response
from hims.account import serializers, models
from durin.auth import TokenAuthentication

class UserProfileList(generics.ListCreateAPIView):
    queryset = models.UserProfile.objects.all()
    serializer_class= serializers.UserProfileSerializer

class UserProfileDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.UserProfile
    serializer_class= serializers.UserProfileSerializer


class UserRegisterList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = serializers.RegisterSerializer

    


class UserRegisterDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = User
    serializer_class = serializers.RegisterSerializer

    def patch(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)



class UserGroupList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = Group.objects.all()
    serializer_class = serializers.UserGroupSerializer

class UserGroupDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = Group
    serializer_class = serializers.UserGroupSerializer

