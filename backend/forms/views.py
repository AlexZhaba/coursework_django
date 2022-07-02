from django.forms import model_to_dict
from django.http import JsonResponse
import json
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers

# Create your views here.
from .models import FormTemplate, FormWithAnswer, Answer, Question
from users.models import User

@csrf_exempt
def index(request):
  if request.method == "GET":
    if 'id' in request.GET:
      forms = [FormWithAnswer.objects.get(pk=request.GET['id'])]
    elif 'user_id' in request.GET:
      forms = FormWithAnswer.objects.filter(
        # user=User.objects.get(pk=request.GET['user_id'])
        user=get_object_or_404(User, pk=request.GET['user_id'])
      )
    else:
      forms = list(FormWithAnswer.objects.all())
    response_json = []

    for form in forms:
      model_form = model_to_dict(form)
      print(model_form)
      model_form["name"] = FormTemplate.objects.get(pk=model_form['form_template']).name
      model_form["user"] = model_to_dict(User.objects.get(pk=model_form['user']))
      model_form["about_user"] = model_to_dict(User.objects.get(pk=model_form['about_user']))
      model_form["questions"] = []
      answers = Answer.objects.filter(form=model_form["id"])
      for answer in answers:
        print(answer.question)
        question = model_to_dict(answer.question)
        question['answer'] = model_to_dict(answer)
        model_form["questions"].append(question)
        # print(answer.question)
      response_json.append(model_form)
    # print(response_json)
    if 'id' in request.GET:
      return JsonResponse(
        response_json[0],
      safe=False)
    else:
      return JsonResponse(
        response_json,
      safe=False)
  elif request.method == "POST":
    data = json.loads(request.body)
    print(data)
    new_form = FormWithAnswer(
      form_template=FormTemplate.objects.get(pk=data['form_template_id']),
      about_user=User.objects.get(pk=data['about']),
      user=User.objects.get(pk=data['user_id']),
    )
    new_form.save()
    # data_answer = Ans

    for question_id, answer in data['answers'].items():
      print(question_id, answer)
      print(User.objects.get(pk=data['user_id']))
      print(Question.objects.get(pk=question_id))
      print(new_form)
      new_answer = Answer(
        # user=User.objects.get(pk=data['user_id']),
        question=Question.objects.get(pk=question_id),
        form=new_form,
        text=answer,
      )
      new_answer.save()

    return JsonResponse({
      'form_id': new_form.id
    }, safe=False)

@csrf_exempt
def template(request):
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
    