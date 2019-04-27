from django.shortcuts import render
from django.http import HttpResponse
from .models import generate_wav

def index(request):
    return render(request, 'demo.html', {'midi': 'default.mid'})

def get_wav(request):
    x = float(request.GET['x'])
    y = float(request.GET['y'])
    wav_file = generate_wav(x, y)
    return HttpResponse(wav_file)

