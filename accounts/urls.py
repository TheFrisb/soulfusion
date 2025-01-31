from django.urls import path

from accounts.views import GetMeView, LoginView, RefreshTokenView

urlpatterns = [
    path("auth/login/", LoginView.as_view(), name="token_obtain_pair"),
    path("auth/refresh-token/", RefreshTokenView.as_view(), name="token_refresh"),
    path("me/", GetMeView.as_view(), name="get_me"),
]
