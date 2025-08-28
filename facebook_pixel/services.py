import time

from facebook_business import FacebookAdsApi
from facebook_business.adobjects.serverside.action_source import ActionSource
from facebook_business.adobjects.serverside.content import Content
from facebook_business.adobjects.serverside.custom_data import CustomData
from facebook_business.adobjects.serverside.event import Event
from facebook_business.adobjects.serverside.event_request import EventRequest
from facebook_business.adobjects.serverside.user_data import UserData

from backend import settings
from facebook_pixel.utils import get_user_agent, get_client_ip, normalize_and_hash
from orders.models import Order
from products.models import Product

FacebookAdsApi.init(access_token=settings.FACEBOOK_ACCESS_TOKEN)


class FacebookPixelService:
    def __init__(self):
        self.pixel_id = settings.FACEBOOK_PIXEL_ID
        FacebookAdsApi.init(access_token=settings.FACEBOOK_ACCESS_TOKEN)

    def send_event(self, event_name, request, product: Product, order: Order = None):
        user_data = self._get_user_data(request, order)
        content = self._get_content(product)
        custom_data = self._get_custom_data(product, content)
        event = self._create_event(request, event_name, user_data, custom_data)

        events = [event]
        event_request = EventRequest(
            events=events, pixel_id=self.pixel_id, test_event_code="TEST76322"
        )
        event_response = event_request.execute()
        return event_response

    def _get_user_data(self, request, order: Order = None) -> UserData:
        first_name = normalize_and_hash(order.customer_first_name) if order else None
        last_name = normalize_and_hash(order.customer_last_name) if order else None
        phone_number = normalize_and_hash(order.customer_phone) if order else None
        fbc_cookie = request.COOKIES.get("_fbc", None)
        fbp_cookie = request.COOKIES.get("_fbp", None)

        user_data = UserData(
            fbc=fbc_cookie,
            fbp=fbp_cookie,
            client_user_agent=get_user_agent(request),
            client_ip_address=get_client_ip(request),
            first_name=first_name,
            last_name=last_name,
            country_code="MK",
            phone=phone_number,
        )

        return user_data

    def _get_content(self, product):
        return Content(
            product_id=str(product.id),
            quantity=1,
            item_price=float(product.sale_price),
            title=product.name,
        )

    def _get_custom_data(self, product, content: Content):
        return CustomData(
            contents=[content],
            content_ids=[str(product.id)],
            currency="MKD",
            value=float(product.sale_price),
            content_type="product",
            num_items=1,
        )

    def _create_event(self, request, event_name, user_data, custom_data):
        return Event(
            event_name=event_name,
            event_time=int(time.time()),
            event_source_url=request.build_absolute_uri(),
            action_source=ActionSource.WEBSITE,
            user_data=user_data,
            custom_data=custom_data,
        )
