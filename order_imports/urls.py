from django.urls import path

from order_imports.views import CreateXlsxOrderImportView

urlpatterns = [
    path("xlsx/", CreateXlsxOrderImportView.as_view(), name="create_xlsx_order_import"),
]
