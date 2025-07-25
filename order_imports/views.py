import logging

import pandas as pd
from rest_framework.exceptions import ValidationError
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from order_imports.serializers import XlsxOrderImportSerializer

logger = logging.getLogger(__name__)


# Create your views here.
class CreateXlsxOrderImportView(GenericAPIView):
    def __init__(self):
        super().__init__()
        self.pd = None
        self.required_headers = [
            "IME",
            "ADRESA",
            "GRAD",
            "TELEFON",
            "PRODUKTI"
        ]

    serializer_class = XlsxOrderImportSerializer
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            self.pd = pd.read_excel(
                serializer.validated_data['file'],
                engine='openpyxl',
                dtype=str,
            )
        except Exception as e:
            raise ValidationError(
                detail=f"Error reading Excel file: {str(e)}"
            )

        self._validate_headers()

        for index, row in self.pd.iterrows():
            if row[required_headers].isnull().all() or not row[required_headers].astype(str).str.strip().any():
                continue

            values = {header: row.get(header, '') for header in required_headers}
            print(f"Row {index + 1}: {values}")

        return Response(
            {"message": "File processed successfully."},
            status=200
        )

    def _validate_headers(self):
        required_headers = [
            "IME",
            "ADRESA",
            "GRAD",
            "TELEFON",
            "PRODUKTI"
        ]

        actual_headers = self.pd.columns.tolist()
        missing_headers = [
            header.upper() for header in required_headers if header not in actual_headers
        ]

        if missing_headers:
            raise ValidationError(
                detail=f"Missing required headers: {', '.join(missing_headers)}"
            )

        # class ListOrderImportsView(ListAPIView):
#     serializer_class = OrderImportListSerializer
#     queryset = OrderImport.objects.all().order_by('-created_at')
#
#     def get(self, request, *args, **kwargs):
#         return super().get(request, *args, **kwargs)
#
#
# class GetOrderImportView(RetrieveAPIView):
#     serializer_class = XlsxOrderImportListSerializer
#     queryset = OrderImport.objects.all()
#
#     def get(self, request, *args, **kwargs):
#         return super().get(request, *args, **kwargs)
