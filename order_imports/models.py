from django.db import models

from core.models import BaseInternalModel


# Create your models here.
class OrderImport(BaseInternalModel):
    file = models.FileField(
        upload_to="order_imports/",
        verbose_name="Order Import File",
        help_text="Upload an XLSX or CSV file containing order data.",
    )
