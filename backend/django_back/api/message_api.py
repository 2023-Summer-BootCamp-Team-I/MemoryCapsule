import json
from api.lib import message


# 자세한 정보
# https://github.dev/solapi/solapi-python/
# 한번 요청으로 1만건의 메시지 발송이 가능합니다.

def send_normal_message():
    data = {
        'messages': [
            {
                'to': '01032555442',
                'from': '01032555442',
                'text': '한글 45자, 영자 90자 이하 입력되면 자동으로 SMS타입의 메시지가 추가됩니다.'
            }
        ]
    }
    res = message.send_many(data)
    print(json.dumps(res.json(), indent=2, ensure_ascii=False))
