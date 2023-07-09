# Base 이미지 설정
FROM python:3.9

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치
COPY requirements.txt .
RUN pip install -r requirements.txt
RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx

# 소스 코드 복사
COPY . .

# 컨테이너 실행 명령 설정
CMD python manage.py runserver 0.0.0.0:8000