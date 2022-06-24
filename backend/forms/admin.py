from django.contrib import admin

from .models import FormTemplate, Question
# Register your models here.

class QuestionsInline(admin.TabularInline):
  model = FormTemplate.questions.through
  extra = 3


class FormTemplateAdmin(admin.ModelAdmin):
  fieldsets = [
      (None, {'fields': ['name']}),
  ]
  inlines = [QuestionsInline]
  search_fields = ['name']


admin.site.register(Question)
admin.site.register(FormTemplate, FormTemplateAdmin)