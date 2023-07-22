#!/usr/bin/env bash

REPOSITORY=/path/to/your/repository
ZIP_FILE=/path/to/your/zipfile.zip
COMPOSE_FILE=/path/to/docker-compose.yml
APP_NAME=cicdproject

# Decompress the zip file to the repository directory
unzip -o $ZIP_FILE -d $REPOSITORY

# Change to the repository directory
cd $REPOSITORY

docker-compose -f $COMPOSE_FILE down

docker rm -f $(docker ps -aq) || docker rmi -f $(docker images -aq) || docker volume rm $(docker volume ls -q) || find . -path "*/migrations/*.py" -delete

# Build and start the containers defined in docker-compose.yml
docker-compose -f $COMPOSE_FILE up -d
