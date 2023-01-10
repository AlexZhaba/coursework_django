from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Subdivision

class ExtendsUserAdmin(UserAdmin):
  list_display = ("username", "email", "first_name", "last_name", "is_staff", "subdivision")

  fieldsets = (
        (None, {"fields": ("username", "password", "subdivision")}),
        (("Personal info"), {"fields": ("first_name", "last_name", "email")}),
        (
            ("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (("Important dates"), {"fields": ("last_login", "date_joined")}),
    )


admin.site.register(User, ExtendsUserAdmin)
admin.site.register(Subdivision)
# Register your models here.
