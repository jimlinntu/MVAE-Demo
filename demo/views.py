from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'demo.html', {'midi': 'default.mid'})

def generate_midi(request):
    x = float(request.GET['x'])
    y = float(request.GET['y'])
    return HttpResponse('(%.2f,%.2f).mid' % (x, y))

