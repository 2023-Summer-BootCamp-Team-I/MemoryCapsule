import json
from datetime import datetime, timedelta

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.http import JsonResponse, HttpRequest
from rest_framework.decorators import api_view
from capsules.models import *
from musics.models import *
from stories.models import *
from themes.models import *
from users.models import *
from capsules.views import *
from users.views import *
from core.uuid_decode import *
from django.test import RequestFactory
from django.core.files.uploadedfile import SimpleUploadedFile



# /api/v1/test-data/
@api_view(['GET'])
def insert_test_data(request) -> json:
    # 기존 데이터 전부 삭제
    Music.objects.all().delete()
    Capsule.objects.all().delete()
    Theme.objects.all().delete()
    Story.objects.all().delete()
    User.objects.all().delete()
    UserCapsule.objects.all().delete()

    # Music 데이터 리스트 생성
    music_url = 'https://memory-capsule.s3.ap-northeast-2.amazonaws.com/music-no1.mp3'
    music_data = []
    for i in range(1, 11):
        music_data.append(
            {
                'music_id': i,
                'music_name': f'music_test {i}',
                'music_context': f'music_test {i}',
                'music_url': music_url
            }
        )

    for data in music_data:
        music = Music.objects.create(**data)

    # Theme 데이터 리스트 생성
    theme_img_url = 'https://memory-capsule.s3.ap-northeast-2.amazonaws.com/1f21d5a1-42ca-4513-b6df-588c945c07e9'
    themes_data = []
    for i in range(1, 11):
        themes_data.append(
            {
                'theme_id': i,
                'theme_name': f'theme test {i}',
                'theme_img_url': theme_img_url,
            }
        )

    for theme_data in themes_data:
        theme = Theme.objects.create(**theme_data)







    # # User 회원가입 API 호출

    # file_path = 'django_back/capsule.jpg'
    # with open(file_path, 'rb') as file:
    #     img_file_content = file.read()

    # img_file_name = 'file.jpg'

    # img_file = InMemoryUploadedFile(
    #     file=img_file_content,
    #     field_name='img_file',
    #     name=img_file_name,
    #     content_type='image/jpeg',
    #     size=len(img_file_content),
    #     charset=None,
    # )

    # for i in range(1, 11):
    #     factory = RequestFactory()

    #     data = {
    #         'id': f"id {i}",
    #         'password': "1",
    #         'email': f"{i}@naver.com",
    #         'nickname': f"nickname {i}",
    #         'phone_number': f"{i}",
    #     }
    #     mock_request = factory.post('api/v1/users/sign-up', data=data, format='multipart')

    #     mock_request.FILES['img_file'] = img_file
    #     result = sign_up(mock_request)















    # capsule_img_url = 'https://memory-capsule.s3.ap-northeast-2.amazonaws.com/1f21d5a1-42ca-4513-b6df-588c945c07e9'


    # for i in range(1, 11):
    #     factory = RequestFactory()

    #     # 로그인 요청에 사용할 데이터 준비
    #     login_data = {
    #         'id': f"id {i}",
    #         'password': "1"
    #     }

    #     # 로그인 API에 POST 요청 보내기
    #     json_data = json.dumps(login_data)
    #     mock_request = factory.post('api/v1/users/sign-in', data=json_data, content_type='application/json')

    #     # 로그인 결과에서 jwt_token 값 추출
    #     response = sign_in(mock_request)
    #     result_obj = json.loads(response.content)
    #     jwt_token = result_obj['jwt_token']
    #     user_uuid_obj = get_user_uuid_obj_from_jwt(jwt_token)

    #     capsules_data = []
    #     for j in range(1, 11):
    #         capsules_data.append(
    #             {
    #                 'creator_id': user_uuid_obj,
    #                 'theme_id': 1,
    #                 'capsule_name': f'Capsule name {j}',
    #                 'due_date': "2021-07-10 16:50:43",
    #                 'limit_count': 30,
    #                 'capsule_password': '1',
    #                 'capsule_img_url': capsule_img_url,
    #             },
    #         )
    #         capsules_data.append(
    #             {
    #                 'creator_id': user_uuid_obj,
    #                 'theme_id': 1,
    #                 'capsule_name': f'Capsule name {j + 10}',
    #                 'due_date': "2026-07-10 16:50:43",
    #                 'limit_count': 30,
    #                 'capsule_password': '1',
    #                 'capsule_img_url': capsule_img_url,
    #             },
    #         )

    #     for capsule_data in capsules_data:
    #         capsule = Capsule.objects.create(**capsule_data)
















    # # 스토리 생성 API

    # # 스토리 생성 API에 사용할 데이터 준비
    # story_img_url = 'https://memory-capsule.s3.ap-northeast-2.amazonaws.com/1f21d5a1-42ca-4513-b6df-588c945c07e9'

    # stories_data = []

    # capsules = Capsule.objects.all()

    # for capsule in capsules:
    #     for i in range(1, 31):
    #         stories_data.append(
    #             {
    #                 'creator_id': user_uuid_obj,
    #                 'capsule_id': capsule.capsule_id,
    #                 'story_title': f'Story Title {i}',
    #                 'story_content': f'Story Content {i}',
    #                 'story_img_url': story_img_url,
    #             }
    #         )

    # for story_data in stories_data:
    #     story = Story.objects.create(**story_data)

    return JsonResponse({'result': "good"}, safe=False, status=200)

