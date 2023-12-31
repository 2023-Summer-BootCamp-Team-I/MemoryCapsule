import pymysql
from time import time, sleep
import logging


def mysql_is_ready():
    check_timeout = 10
    check_interval = 1

    start_time = time()
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    logger.addHandler(logging.StreamHandler())

    port = 3306
    host = 'mysqldb'

    while time() - start_time < check_timeout:
        try:
            pymysql.connect(host=host, port=port, user='root', password='20031105', db='memory_capsule')
            return True
        except:
            sleep(check_interval)
    logger.error("We could not connect to {host}:{port} within {check_timeout} seconds.")
    return False


mysql_is_ready()