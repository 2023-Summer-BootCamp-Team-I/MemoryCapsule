from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
# Create your views here.
from .storages import FileUpload, s3_client


@api_view(['post'])
def upload_image(request):
    if request.method == 'POST':
        file = request.FILES['filename']
        image_url = upload_image_for_api(file)
        return JsonResponse({'image_url': image_url})


def upload_image_for_api(file):
    image_url = FileUpload(s3_client).upload(file)
    # Testing을 위해 임시로 사용
    # image_url = "https://author-picture.s3.ap-northeast-2.amazonaws.com/520d24a6-4a44-4788-9111-ae9f3e6424bb"
    return image_url
