import json

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.http import JsonResponse, HttpRequest
from rest_framework.decorators import api_view
from capsules.models import *
from musics.models import *
from stories.models import *
from themes.models import *
from users.models import *
from capsules.utils import capsule_POST


# /api/v1/test-data/
@api_view(['GET'])
def insert_test_data(request) -> json:

    # 기존 데이터 전부 삭제
    Music.objects.all().delete()
    User.objects.all().delete()
    Theme.objects.all().delete()
    Capsule.objects.all().delete()
    Story.objects.all().delete()
    UserCapsule.objects.all().delete()


    # Music 데이터 리스트 생성
    music_url = 'https://author-picture.s3.ap-northeast-2.amazonaws.com/music-no1.mp3'
    music_data = [
        {
            'music_id': 1,
            'music_name': 'test',
            'music_context': 'test',
            'music_url': music_url
        },
    ]

    for data in music_data:
        music = Music.objects.create(**data)

    # User 데이터 리스트 생성
    users_data = [
        {
            'user_id': 1,
            'id': '정재빈',
            'password': '1',
            'phone_number': '01032555442',
            'email': '1.com',
            'nickname': 'test',
            'status': 0,
            'user_img_url': 'test.com',
        },
        {
            'user_id': 2,
            'id': '박경은',
            'password': '2',
            'phone_number': '01025555420',
            'email': '2.com',
            'nickname': 'test',
            'status': 0,
            'user_img_url': 'test.com',
        },
        {
            'user_id': 3,
            'id': '이민기',
            'password': '3',
            'phone_number': '01042200980',
            'email': '3.com',
            'nickname': 'test',
            'status': 0,
            'user_img_url': 'test.com',
        },
        {
            'user_id': 4,
            'id': '김윤아',
            'password': '4',
            'phone_number': '01089576720',
            'email': '4.com',
            'nickname': 'test',
            'status': 0,
            'user_img_url': 'test.com',
        },
        {
            'user_id': 5,
            'id': '김성훈',
            'password': '5',
            'phone_number': '01020833472',
            'email': '5.com',
            'nickname': 'test',
            'status': 0,
            'user_img_url': 'test.com',
        },
        {
            'user_id': 6,
            'id': '유재윤',
            'password': '6',
            'phone_number': '01086240981',
            'email': '6.com',
            'nickname': 'test',
            'status': 0,
            'user_img_url': 'test.com',
        },
    ]

    for user_data in users_data:
        user = User.objects.create(**user_data)

    # Theme 데이터 리스트 생성
    theme_img_url = ''
    themes_data = [
        {
            'theme_id': 1,
            'theme_name': 'test',
            'theme_img_url': theme_img_url,
        },
        {
            'theme_id': 2,
            'theme_name': 'test',
            'theme_img_url': theme_img_url,
        },
    ]

    for theme_data in themes_data:
        theme = Theme.objects.create(**theme_data)

    user = User.objects.get(id='정재빈')

    # HttpRequest 객체 생성
    mock_request = HttpRequest()
    mock_request.method = 'POST'
    mock_request.POST = {
        'creator_id': user.user_id,
        'theme_id': 1,
        'capsule_name': '1',
        'due_date': '2025-07-09 16:50:43',
        'limit_count': 15,
        'capsule_password': '1'
    }

    file_path = 'django_back/capsule.jpg'
    with open(file_path, 'rb') as file:
        img_file_content = file.read()

    img_file_name = 'file.jpg'

    img_file = InMemoryUploadedFile(
        file=img_file_content,
        field_name='img_file',
        name=img_file_name,
        content_type='image/jpeg',  # Set the appropriate content type
        size=len(img_file_content),
        charset=None,
    )

    # Adding the file to mock_request.FILES
    mock_request.FILES = {
        'img_file': img_file,
    }

    # 캡슐 생성
    result, code = capsule_POST(mock_request)

    print(result)


    capsule = Capsule.objects.get(capsule_name='1')
    story_img_url = 'https://example.com/story_img.jpg'

    stories_data = [
        {
            'story_id': 1,
            'creator': user,
            'capsule': capsule,
            'story_title': 'Story Title 1',
            'story_content': 'Story Content 1',
            'story_img_url': story_img_url,
        },
        {
            'story_id': 2,
            'creator': user,
            'capsule': capsule,
            'story_title': 'Story Title 2',
            'story_content': 'Story Content 2',
            'story_img_url': story_img_url,
        },
    ]

    for story_data in stories_data:
        story = Story.objects.create(**story_data)

    return JsonResponse({'result': 'good'}, safe=False, status=200)
