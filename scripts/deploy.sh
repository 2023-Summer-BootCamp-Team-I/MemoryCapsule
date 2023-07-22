#!/usr/bin/env bash

REPOSITORY=/home/ec2-user/memory_capsule
#ZIP_FILE=/home/ec2-user/memory_capsule.zip
COMPOSE_FILE=$REPOSITORY/docker-compose.yml
APP_NAME=memory_capsule

# Decompress the zip file to the repository directory
#unzip -o $ZIP_FILE -d $REPOSITORY

# Change to the repository directory
cd $REPOSITORY

docker-compose -f $COMPOSE_FILE down

docker rm -f $(docker ps -aq) || docker rmi -f $(docker images -aq) || docker volume rm $(docker volume ls -q) || find . -path "*/migrations/*.py" -delete

# Build and start the containers defined in docker-compose.yml
docker-compose -f $COMPOSE_FILE up -d
