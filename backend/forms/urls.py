from django.urls import path

from . import views

app_name = 'forms'
urlpatterns = [
  path('template/', views.index, name='index'),
]