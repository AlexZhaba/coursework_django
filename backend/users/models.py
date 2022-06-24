from django.db import models

# Create your models here.

class Subdivision(models.Model):
  name = models.CharField(max_length=40)

  def __str__(self):
    return f'{self.name}'


class User(models.Model):
  name = models.CharField(max_length=40)
  subdivision = models.ForeignKey('Subdivision', on_delete=models.CASCADE)

  def __str__(self):
    return f'{self.name}'