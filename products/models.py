from django.db import models

from core.models import BaseInternalModel


# Create your models here.
class Product(BaseInternalModel):
    name = models.CharField(max_length=255)
    price = models.IntegerField()

    def __str__(self):
        return f"{self.name} - {self.price} MKD"
