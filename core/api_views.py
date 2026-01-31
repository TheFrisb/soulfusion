from rest_framework import serializers, status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from core.utils import normalize_phone_number_if_possible
from orders.models import Customer, Order, OrderItem
from products.models import Product


class PhoneNumberField(serializers.CharField):
    default_error_messages = {
        "required": "Телефонскиот број е задолжителен.",
        "invalid": "Телефонскиот број не е валиден.",
    }

    def to_internal_value(self, data):
        data = super().to_internal_value(data)

        normalized = normalize_phone_number_if_possible(data)

        if not normalized:
            self.fail("invalid")

        return normalized

class IncomingOrderSerializer(serializers.Serializer):
    phone_number = PhoneNumberField()
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=False)

class CheckoutView(APIView):
    serializer_class = IncomingOrderSerializer

    def post(self, request, product_id):
        serialized_data = self.serializer_class(data=request.data)

        if not serialized_data.is_valid():
            return Response(serialized_data.errors, status=status.HTTP_400_BAD_REQUEST)

        customer, created = Customer.objects.get_or_create(
            phone=serialized_data.validated_data["phone_number"],
            defaults={"name": serialized_data.validated_data["first_name"]}
        )

        order = Order.objects.create(customer=customer, status=Order.Status.PENDING, type=Order.Type.NORMAL)

        product = get_object_or_404(Product, id=product_id)
        OrderItem.objects.create(
            order=order, product=product, quantity=1, price=product.sale_price
        )

        return Response(status=status.HTTP_204_NO_CONTENT)