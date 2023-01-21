from .models import User, Subdivision
from rest_framework import serializers

class SubdivisionSerializer(serializers.HyperlinkedModelSerializer):

  class Meta:
    model = Subdivision
    fields = ['name', 'id']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    subdivision = SubdivisionSerializer(many=False, read_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'id', 'subdivision']
