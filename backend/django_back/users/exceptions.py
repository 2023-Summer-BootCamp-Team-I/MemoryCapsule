import re

class CustomException(Exception):
    def __init__(self, error_code, message):
        super().__init__(message)
        self.error_code = error_code


def email_syntax_check(email):
    # 예외 상황이 발생할 경우 커스텀 예외를 던짐
    if re.search(r'@.*\.', email):
        pass
    else:
        error_code = 401
        message = "옳지 않은 이메일 형식입니다."
        raise CustomException(error_code, message)