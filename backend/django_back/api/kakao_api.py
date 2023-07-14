import json
import requests
import environ

env = environ.Env()
env.read_env()


def send_kakao_message(capsule_img_url):
    url = "https://kapi.kakao.com/v2/api/talk/memo/default/send"

    # 사용자 토큰
    headers = {
        "Authorization": "Bearer " + env('ACCESS_TOKEN')
    }

    data = {
        'template_object': json.dumps({
            'object_type': 'feed',
            "content": {
                "title": "오늘의 디저트",
                "description": "아메리카노, 빵, 케익",
                "image_url": capsule_img_url,
                "image_width": 640,
                "image_height": 640,
                "link": {
                    "web_url": "http://www.naver.com",
                    "mobile_web_url": "http://www.naver.com",
                    "android_execution_params": "contentId=100",
                    "ios_execution_params": "contentId=100"
                }
            }
        })
    }

    response = requests.post(url, headers=headers, data=data)
    print(response.status_code)
    if response.json().get('result_code') == 0:
        print('메시지를 성공적으로 보냈습니다.')
    else:
        print('메시지를 성공적으로 보내지 못했습니다. 오류메시지 : ' + str(response.json()))

