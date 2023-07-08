from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
# Create your views here.
from .storages import FileUpload, s3_client


@api_view(['post'])
def upload_image(request):
    if request.method == 'POST':
        file = request.FILES['filename']
        image_url = FileUpload(s3_client).upload(file)
        return JsonResponse({'image_url': image_url})
