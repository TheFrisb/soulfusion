from django.urls import path

from .views import OrderListView, UpdateOrderStatusView, UpdateOrderAgentView, RetrieveOrderView

urlpatterns = [
    path("", OrderListView.as_view(), name="order-list"),
    path("<int:pk>/", RetrieveOrderView.as_view(), name="order-detail"),
    path("<int:pk>/status/", UpdateOrderStatusView.as_view(), name="order-detail"),
    path("<int:pk>/agent/", UpdateOrderAgentView.as_view(), name="order-agent"),
]
