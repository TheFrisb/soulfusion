from django.db.models import Count, Case, When, Value, BooleanField, Prefetch
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from orders.models import Order, Customer
from orders.serializer import OrderSerializer
from .models import User
from .serializers import UserSerializer


class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]


class RefreshTokenView(TokenRefreshView):
    permission_classes = [AllowAny]


class GetMeView(APIView):
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=HTTP_200_OK)


class UsersListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GetMeOrdersView(ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        return (
            Order.objects.filter(
                agent=self.request.user,
                status__in=[Order.Status.TAKE, Order.Status.CALL_AGAIN, Order.Status.PENDING],
            )
            .select_related("agent", "order_item__product")
            .prefetch_related(
                Prefetch("customer", queryset=self.get_customer_queryset())
            )
        )

    def get_customer_queryset(self):
        return Customer.objects.annotate(
            orders_count=Count("orders"), comments_count=Count("comments")
        ).annotate(
            has_history=Case(
                When(orders_count__gte=2, then=Value(True)),
                When(comments_count__gte=1, then=Value(True)),
                default=Value(False),
                output_field=BooleanField(),
            )
        )
