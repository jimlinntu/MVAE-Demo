from django.shortcuts import render
from django.http import HttpResponse
from .models import generate_midi

def index(request):
    return render(request, 'demo.html', {'midi': 'default.mid'})

def get_midi(request):
    x = float(request.GET['x'])
    y = float(request.GET['y'])
    midi_file = generate_midi(x, y)
    return HttpResponse(midi_file)

