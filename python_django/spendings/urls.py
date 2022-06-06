from django.urls import path

from . import views

urlpatterns = [
    path('', views.spendings, name='spendings'),
]
