import json
from api.lib import message
import environ

env = environ.Env()
env.read_env()


# 자세한 정보
# https://github.dev/solapi/solapi-python/
# 한번 요청으로 1만건의 메시지 발송이 가능합니다.

def send_normal_message(client_phone_number_list, title, text):
    data = {
        'messages': [
            {
                'to': client_phone_number_list,
                'from': env('HOST_PHONE_NUMBER'),
                # 'imageId': env('CAPSULE_IMAGE_ID'),
                # 'subject': title,
                'text': text
            }
        ]
    }
    res = message.send_many(data)
    print(json.dumps(res.json(), indent=2, ensure_ascii=False))
