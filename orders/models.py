from django.db import models

from core.models import BaseInternalModel


# Create your models here.
class Customer(BaseInternalModel):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name} - {self.phone}"


class Order(BaseInternalModel):
    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        ASSIGNED = "ASSIGNED", "Assigned"
        CALL_AGAIN = "CALL_AGAIN", "Call Again"
        CONFIRMED = "CONFIRMED", "Confirmed"
        SHIPPED = "SHIPPED", "Shipped"
        RETURNED = "RETURNED", "Returned"
        PAID = "PAID", "Paid"
        TRASHED = "TRASHED", "Trashed"
        CANCELLED = "CANCELLED", "Cancelled"

    status = models.CharField(
        max_length=255,
        choices=Status,
        default=Status.PENDING,
    )
    agent = models.ForeignKey(
        "accounts.User", on_delete=models.CASCADE, null=True, blank=True
    )
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.pk} - {self.status} - {self.customer}"


class OrderItem(BaseInternalModel):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey("products.Product", on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.IntegerField()

    def __str__(self):
        return f"{self.product} - {self.quantity} - {self.price}"
