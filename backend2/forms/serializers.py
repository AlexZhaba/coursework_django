from rest_framework import serializers

from users.serializers import UserSerializer
from .models import FormTemplate, FormWithAnswer, Question, Answer

class QuestionSerializer(serializers.ModelSerializer):

  class Meta:
    model = Question
    fields = ['text', 'id']


class FormTemplateSerializer(serializers.ModelSerializer):
  questions = QuestionSerializer(many=True, read_only=True)

  class Meta:
    model = FormTemplate
    fields = ['name', 'questions', 'id']


class FormWithAnswerSerializer(serializers.ModelSerializer):
  form_template = FormTemplateSerializer(many=False, read_only=True)
  user = UserSerializer(many=False, read_only=True)
  about_user = UserSerializer(many=False, read_only=True)
  
  class Meta:
    model = FormWithAnswer
    fields = ['form_template', 'about_user', 'user', 'form_template_id', 'about_user_id', 'user_id', 'id']

    extra_kwargs = {
      'form_template_id': {'source': 'form_template', 'write_only': True },
      'user_id': {'source': 'user', 'write_only': True },
      'about_user_id': {'source': 'about_user', 'write_only': True }
    }


class AnswerSerializer(serializers.ModelSerializer):
  form = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
  question = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

  class Meta:
    model = Answer
    fields = ['text', 'question', 'form']
