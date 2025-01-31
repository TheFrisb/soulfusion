from django.urls.conf import path

from core.views import ProductPageFormView, ThankYouView

app_name = "core"
urlpatterns = [
    path(
        "product-page/<slug:slug>/",
        ProductPageFormView.as_view(),
        name="product-page", 
    ),
    path("thank-you/", ThankYouView.as_view(), name="thank-you"),
]
