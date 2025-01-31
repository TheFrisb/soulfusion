from django.db import models

from core.models import BaseInternalModel


# Create your models here.
class Product(BaseInternalModel):
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    stock = models.PositiveIntegerField(default=0)
    sale_price = models.PositiveIntegerField(default=0)
    stock_price = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.name} - {self.price} MKD"
