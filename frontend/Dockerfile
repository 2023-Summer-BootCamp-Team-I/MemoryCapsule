# Node.js v16을 기반으로 하는 Alpine Linux 이미지를 사용
FROM node:16-alpine

# 작업 디렉터리 설정
WORKDIR /frontend

# 현재 디렉터리의 모든 파일과 디렉터리를 컨테이너의 /frontend 디렉터리로 복사
COPY . .

# npm을 사용하여 종속성 설치
RUN npm install

# Vite를 전역적으로 설치
RUN npm install vite

# 컨테이너 시작 시 실행될 명령 설정
CMD ["npm", "run", "dev"]