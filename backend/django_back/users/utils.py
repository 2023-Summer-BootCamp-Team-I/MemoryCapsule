from .models import User
import bcrypt
def createUser(id, password, email, nickname, user_img_url):
    return User.objects.create(
        id=id,
        password=bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8"),
        email=email,
        nickname=nickname,
        user_img_url=user_img_url
    )

