# Base 이미지 설정
FROM python:3.9

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치
COPY requirements.txt .
RUN pip install -r requirements.txt
RUN pip install --upgrade pillow
RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx
RUN apt-get update && apt-get install -y ffmpeg

# 소스 코드 복사
COPY . .

# 컨테이너 실행 명령 설정
CMD gunicorn django_back.wsgi:application -b 0.0.0.0:8000