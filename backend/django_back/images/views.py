from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
# Create your views here.
from .storages import FileUpload, s3_client

from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@swagger_auto_schema(
    methods=['POST'],
    operation_summary="이미지 S3에 전송",
    consumes=['multipart/form-data'],
    manual_parameters=[
        openapi.Parameter(
            name="filename",
            in_=openapi.IN_FORM,
            type=openapi.TYPE_FILE,
            description="사진 파일 올리기",
        )
    ]
)
@api_view(['post'])
@parser_classes([MultiPartParser, FormParser])
def upload_image(request):
    if request.method == 'POST':
        file = request.FILES['filename']
        image_url = upload_image_for_api(file)
        return JsonResponse({'image_url': image_url})


def upload_image_for_api(file):
    image_url = FileUpload(s3_client).upload(file)
    # Testing을 위해 임시로 사용
    # image_url = "https://author-picture.s3.ap-northeast-2.amazonaws.com/907816aa-e0af-4edc-8679-07a67fcf1fbd"
    return image_url
