from .models import User
from bcrypt import checkpw
import bcrypt
from django.http import JsonResponse

def create_user(id, password, phone_number, email, nickname, user_img_url):
    return User.objects.create(
        id=id,
        password=bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8"),
        phone_number=phone_number,
        email=email,
        nickname=nickname,
        user_img_url=user_img_url
    )

def user_find_by_id(login_id_input):
    return User.objects.get(id=login_id_input)


def check_encrypted_password(password_input, user):
    return checkpw(password_input.encode('utf-8'), user.password.encode('utf-8'))