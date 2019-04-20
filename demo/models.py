from django.db import models
import random

def generate_random_points(n=10):
    return [{
                'x': random.random(),
                'y':random.random()
            } for _ in range(n)]
