from django.urls import re_path, path

from . import views

FLOAT_REGEX = '[+-]?([0-9]*[.])?[0-9]+'

urlpatterns = [
    path('', views.index, name='index'),
    path('generate_midi/', views.get_midi),
]
