from django_back.settings import JWT_SECRET_KEY, ALGORITHM

import jwt
import uuid
from rest_framework import exceptions
from rest_framework import authentication
from users.models import User  # models 오타 수정


def get_user_uuid_obj_from_jwt(jwt_token):
    try:
        decoded = jwt.decode(jwt_token, JWT_SECRET_KEY, ALGORITHM)
        user_id = decoded.get("user_id")
        user_uuid_obj = uuid.UUID(user_id)
        user = User.objects.get(pk=user_uuid_obj)
        return user_uuid_obj

    except jwt.exceptions.DecodeError:
        raise exceptions.AuthenticationFailed(
            {
                "success": False,
                "message": "잘못된 토큰입니다.",
                "code": "JWT_403_INVALID_ACCESSTOKEN",
            }
        )
    except jwt.ExpiredSignatureError:
        raise exceptions.AuthenticationFailed(
            {
                "success": False,
                "message": "토큰이 만료되었습니다.",
                "code": "JWT_403_EXPIRED_ACCESSTOKEN",
            }
        )
    except User.DoesNotExist:
        raise exceptions.AuthenticationFailed(
            {
                "success": False,
                "message": "해당 유저가 존재하지 않습니다.",
                "code": "JWT_403_USER_NOT_FOUND",
            }
        )
