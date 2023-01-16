from email.policy import default
from django.db import models

# Create your models here.

class Question(models.Model):
  text = models.CharField(max_length=1000)

  def __str__(self):
    return self.text


class FormTemplate(models.Model):
  name = models.CharField(max_length=100, default='')
  description = models.TextField(default='')
  image = models.ImageField(upload_to ='uploads/', default='')
  rating = models.IntegerField(
    choices=[(5, 5), (4, 4), (3, 3), (2, 2), (1, 1), (0, 0)],
    default=5
  )
  questions = models.ManyToManyField(Question)

  def __str__(self):
    return self.name


class FormWithAnswer(models.Model):
  form_template = models.ForeignKey("FormTemplate", on_delete=models.CASCADE)
  about_user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name='about_user_set')
  user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name='user_set', default=None)

  def __str__(self):
    return self.user.username + "-" + self.form_template.name


class Answer(models.Model):
  form = models.ForeignKey("FormWithAnswer", on_delete=models.CASCADE, related_name='answer')
  question = models.ForeignKey("Question", on_delete=models.CASCADE)
  text = models.CharField(max_length=1000)

  def __str__(self):
    return self.text