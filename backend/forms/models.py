from django.db import models

# Create your models here.
class Question(models.Model):
  text = models.CharField(max_length=1000)

  def __str__(self):
    return self.text


class FormTemplate(models.Model):
  name = models.CharField(max_length=100, default='')
  questions = models.ManyToManyField(Question)

  def __str__(self):
    return self.name


class FormWithAnswer(models.Model):
  form_template = models.ForeignKey("FormTemplate", on_delete=models.CASCADE)
  about_user = models.ForeignKey("users.User", on_delete=models.CASCADE)


class Answers(models.Model):
  user = models.ForeignKey("users.User", on_delete=models.CASCADE)
  question = models.ForeignKey("Question", on_delete=models.CASCADE)
  form = models.ForeignKey("FormWithAnswer", on_delete=models.CASCADE)
  text = models.CharField(max_length=1000)