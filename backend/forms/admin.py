from django.contrib import admin

from .models import Answer, FormTemplate, Question, FormWithAnswer
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
admin.site.register(FormWithAnswer)
admin.site.register(Answer)
admin.site.register(FormTemplate, FormTemplateAdmin)