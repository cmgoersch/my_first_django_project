from django.db import models
from datetime import date
# Create your models here.
class ShoppingItem(models.Model):
    created_at = models.DateField(default=date.today)
    name = models.CharField(max_length=255) 
    done = models.BooleanField(default=False)

    lol