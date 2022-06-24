from django.http import HttpResponse
from django.shortcuts import render
import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict

from .models import User, Subdivision

# Create your views here.

@csrf_exempt
def index(request):
  print("index")
  
  if request.method == "POST":
    try:
      new_user = User(
        name=request.POST["name"],
        subdivision=Subdivision.objects.get(pk=request.POST["subdivision_id"])
      )
    except:
      users = list(User.objects.values())
      return JsonResponse(users, safe=False)
    else:
      new_user.save()
      return JsonResponse(model_to_dict(new_user), safe=False)
  elif request.method == "DELETE":
    print(json.loads(request.body))
    try:
      # print(json.loads(request.body)["user_id"])
      delete_user = User.objects.get(id=json.loads(request.body)["user_id"])
    except:
      return JsonResponse({
        "error": "user id doesn't exist"
      })
    else:
      delete_user.delete()
      return JsonResponse("ok")
  else:
    users = list(User.objects.values())
    return JsonResponse(users, safe=False)