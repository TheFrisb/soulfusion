from rest_framework import serializers

from accounts.serializers import UserSerializer
from orders.models import Customer, OrderItem, Order
from products.serializers import ProductSerializer


class CustomerSerializer(serializers.ModelSerializer):
    has_history = serializers.BooleanField(read_only=True)

    class Meta:
        model = Customer
        fields = ["id", "name", "phone", "has_history"]


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ["id", "product", "quantity", "price"]


class OrderSerializer(serializers.ModelSerializer):
    agent = UserSerializer(read_only=True)
    customer = CustomerSerializer(read_only=True)
    order_item = OrderItemSerializer(read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "status",
            "agent",
            "customer",
            "order_item",
            "address",
            "created_at",
            "updated_at",
        ]
