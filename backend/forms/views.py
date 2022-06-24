from django.http import JsonResponse
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers

# Create your views here.
from .models import FormTemplate

@csrf_exempt
def index(request):
  if request.method == "GET":
    templates_json =  list(FormTemplate.objects.values())
    i = 0
    for template in FormTemplate.objects.all():
      # print(template.questions.all())
      templates_json[i]["questions"] = list(template.questions.values())
      i += 1
    # templates_json = serializers.serialize('json', FormTemplate.objects.values())
    return JsonResponse(templates_json, safe=False)