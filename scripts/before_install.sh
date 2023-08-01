#!/usr/bin/env bash

REPOSITORY=/home/ec2-user/MemoryCapsule
#ZIP_FILE=/home/ec2-user/memory_capsule.zip
COMPOSE_FILE=$REPOSITORY/docker-compose.deploy.yml
ELK_COMPOSE_FILE=$REPOSITORY/docker-compose.elk.yml
APP_NAME=memory_capsule

# Decompress the zip file to the repository directory
#unzip -o $ZIP_FILE -d $REPOSITORY

# Change to the repository directory
cd $REPOSITORY

docker-compose -f $COMPOSE_FILE down -v --rmi "all"
docker-compose -f $ELK_COMPOSE_FILE down -v --rmi "all"


