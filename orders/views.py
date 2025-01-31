from rest_framework.generics import ListAPIView

from orders.models import Order
from orders.serializer import OrderSerializer


# Create your views here.
class OrderListView(ListAPIView):
    queryset = Order.objects.all().select_related(
        "customer", "order_item__product", "agent"
    )
    serializer_class = OrderSerializer
