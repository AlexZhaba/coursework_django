from django.forms import model_to_dict
from django.http import JsonResponse
import json
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers

# Create your views here.
from .models import FormTemplate

@csrf_exempt
def index(request):
  if request.method == "GET":
    if "template_id" in request.GET:
      # template_json = model_to_dict(FormTemplate.objects.get(pk=request.GET["template_id"]))
      template = get_object_or_404(FormTemplate, pk=request.GET["template_id"])
      template_json = model_to_dict(template)
      template_json["questions"] = list(template.questions.values())
      # template_json["questions"] = list(template_json.questions.values())
      return JsonResponse(template_json, safe=False)
    else:
      templates_json = list(FormTemplate.objects.values())
      i = 0
      for template in FormTemplate.objects.all():
        # print(template.questions.all())
        templates_json[i]["questions"] = list(template.questions.values())
        i += 1
      # templates_json = serializers.serialize('json', FormTemplate.objects.values())
      return JsonResponse(templates_json, safe=False)