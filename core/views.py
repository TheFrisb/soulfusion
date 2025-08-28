import logging

from django.urls import reverse_lazy
from django.views.generic import TemplateView, FormView

from core.forms import OrderForm
from facebook_pixel.services import FacebookPixelService
from products.models import ProductPage

logger = logging.getLogger(__name__)


class ProductPageFormView(FormView):
    form_class = OrderForm

    def get_template_names(self):
        product_page = self.get_object()
        return [product_page.get_template_name()]

    def get_object(self):
        slug = self.kwargs.get("slug")
        return ProductPage.objects.prefetch_related("product").get(slug=slug)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["product_page"] = self.get_object()
        context["title"] = context["product_page"].product.name
        self._send_view_content()
        return context

    def get_initial(self):
        initial = super().get_initial()
        product_page = self.get_object()
        initial["product_id"] = product_page.product.id
        return initial

    def form_valid(self, form):
        order = form.save()

        self._send_purchase_event(order)

        return super().form_valid(form)

    def get_success_url(self):
        return reverse_lazy(
            "core:thank-you",
        )

    def _send_view_content(self):
        if not self.request.method == "GET":
            return

        product_page = self.get_object()
        try:
            fb_pixel_service = FacebookPixelService()
            response = fb_pixel_service.send_event(
                event_name="ViewContent",
                request=self.request,
                product=product_page.product,
            )

            logger.info(
                f"Sent ViewContent event for product page: {product_page.id} and slug: {product_page.slug}. Response: {response}"
            )
        except Exception as e:
            logger.error(
                f"Error sending ViewContent event for product page: {product_page.id} and slug: {product_page.slug}. Error: {e}"
            )

    def _send_purchase_event(self, order):
        try:
            product_page = self.get_object()
            fb_pixel_service = FacebookPixelService()
            response = fb_pixel_service.send_event(
                event_name="Purchase",
                request=self.request,
                product=product_page.product,
                order=order,
            )

            logger.info(
                f"Sent Purchase event for order: {order.id}. Response: {response}"
            )
        except Exception as e:
            logger.error(
                f"Error sending Purchase event for order: {order.id}. Error: {e}"
            )


class TestView(TemplateView):
    template_name = "product-pages/bonefix/index.html"


class ThankYouView(TemplateView):
    template_name = "thank_you.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["title"] = "Ви благодариме!"
        return context
