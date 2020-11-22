#!/bin/bash

HOME_DATABASE=$(pwd)/mongo-data
DB_NAME=db_mongo
if [ "$(docker ps | grep "$DB_NAME")" != "" ]; then
        docker stop "$DB_NAME"
fi
docker run --name "$DB_NAME" -d -p 27017:27017 -v "$HOME_DATABASE":/data/db mongo
