from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from users.serializers import UserSerializer
from rest_framework import mixins, filters, generics

from .serializers import AnswerSerializer, FormTemplateSerializer, FormWithAnswerSerializer
from .models import Answer, FormTemplate, FormWithAnswer, Question
# Create your views here.

# class FormTemplatesViewSet(generics.ListAPIView):
class FormTemplatesViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = FormTemplate.objects.all()
    serializer_class = FormTemplateSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    page_size = 10


class FormWithAnswersViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    serializer_class = FormWithAnswerSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
      return FormWithAnswer.objects.all().filter(user=self.request.user)

    @action(detail=False, methods=['POST'])
    def full_create(self, request, *args, **kwargs):
      form = self.create(request, *args, **kwargs)
      
      form_instance = get_object_or_404(FormWithAnswer, pk=form.data.get('id'))

      
      # next 20 lines should be fixed but im tired
      serializers = [AnswerSerializer(data=answer).is_valid() for answer in request.data.get('answers')]

      isIncorrect = len(list(filter(lambda result: result == False, serializers)))

      if isIncorrect:
        return Response({
          'error': 'incorrect format'
        }, status=status.HTTP_400_BAD_REQUEST)

      for answer in request.data.get('answers'):
        answer_instance = Answer(
          text=answer.get('text'),
          question=get_object_or_404(Question, pk=answer.get('question_id')),
          form=form_instance
        )
        answer_instance.save()
      
      return form