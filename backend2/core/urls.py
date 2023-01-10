"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import include, path
from django.contrib import admin
from rest_framework import routers
from users import views as UsersViews
from forms import views as FormsViews
from rest_framework.authtoken import views as RestViews

router = routers.DefaultRouter()
router.register(r'users', UsersViews.UserViewSet)
router.register(r'forms', FormsViews.FormTemplatesViewSet)
router.register(r'form_templates', FormsViews.FormWithAnswersViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-token-auth/', RestViews.obtain_auth_token),
    path('admin/', admin.site.urls)
]