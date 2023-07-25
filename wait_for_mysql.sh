#!/bin/bash

# MySQL 서버의 호스트와 포트를 설정합니다.
host="mysqldb"
port="3306"

# MySQL 서버가 응답하기를 기다립니다.
while ! nc -z $host $port; do
  echo "$(date) - waiting for mysql..."
  sleep 1
done

# MySQL 서버가 준비되었으면, 원래의 커맨드를 실행합니다.
exec "$@"