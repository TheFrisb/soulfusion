from django.urls.conf import path

from core.views import ProductPageFormView, ThankYouView, TestView

app_name = "core"
urlpatterns = [
    path(
        "product-page/<slug:slug>/",
        ProductPageFormView.as_view(),
        name="product-page",
    ),
    path("thank-you/", ThankYouView.as_view(), name="thank-you"),
    path("test/", TestView.as_view(), name="test"),
]
