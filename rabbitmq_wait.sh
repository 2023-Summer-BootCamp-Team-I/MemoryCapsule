#!/bin/bash
# wait-for-rabbitmq.sh

set -e

host="$1"
shift
cmd="$@"

until nc -z $host 15672; do
  >&2 echo "RabbitMQ is unavailable - sleeping"
  sleep 1
done

>&2 echo "RabbitMQ is up - executing command"
exec $cmd