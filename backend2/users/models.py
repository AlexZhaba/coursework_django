from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
from django.db import models

# Create your models here.

class User(AbstractUser):
  # pass
  # name = models.CharField(max_length=40)
  subdivision = models.ForeignKey('Subdivision', on_delete=models.CASCADE, null=True)

  # class Meta:
  #   # app_label = 'main_base_user'
    # abstract = True
  # # def __str__(self):
  #   # return f'{self.name}'

class Subdivision(models.Model):
  name = models.CharField(max_length=40)

  def __str__(self):
    return f'{self.name}'
