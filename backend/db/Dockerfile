# Base 이미지 설정
FROM mysql:latest
# 환경 변수 설정
ENV MYSQL_ROOT_PASSWORD=20031105
ENV MYSQL_DATABASE=memory_capsule
ENV MYSQL_ROOT_USER=root
ENV MYSQL_PASSWORD=20031105

# 초기 SQL 스크립트 복사
COPY init.sql /docker-entrypoint-initdb.d/