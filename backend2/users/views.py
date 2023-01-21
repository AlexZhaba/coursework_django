from .models import User
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import filters
from users.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]

    filter_backends = [filters.SearchFilter]
    search_fields = ['subdivision_id', 'id']

    permission_classes_by_action = {
      'create': [AllowAny],
      'list': [IsAuthenticated],
      'me': [IsAuthenticated],
    }


    @action(methods=['GET'], detail=False)
    def me(self, request):
      return Response(UserSerializer(request.user).data)


    def get_permissions(self):
      try:
          return [permission() for permission in self.permission_classes_by_action[self.action]]
      except KeyError: 
          return [permission() for permission in self.permission_classes]


    def get_queryset(self):
      if (not self.request.GET.get('subdivision_id')):
        return User.objects.all().order_by('-date_joined')

      return User.objects.all().filter(subdivision=self.request.GET.get('subdivision_id')).order_by('-date_joined')