# kanban/models.py
from django.db import models

class Card(models.Model):
    title = models.CharField(max_length=100)
    text = models.TextField()
    footer = models.CharField(max_length=100)
    priority = models.CharField(max_length=50)

    class Meta:
        app_label = 'kanban'
