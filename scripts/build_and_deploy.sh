#!/usr/bin/env bash

pull_repo() {
    cd "$1" && git pull
}


run_migrations() {
    cd "$BE_REPO_PATH/Brainstorm/Brainstorm.Migrations" && dotnet ef database update
}

run_postgres() {
    name=postgres
    ports=5432:5432
    vol=/var/lib/postgresql/data
    passwd=postgres
    username=postgres

    docker run -d --name=$container_name -p $ports -v postgres-volume: $vol -e POSTGRES_PASSWORD=$passwd $username
}
run() {
    docker-compose up
}

pull_repo $BE_REPO_PATH
pull_repo $FE_REPO_PATH

run_migrations
run


