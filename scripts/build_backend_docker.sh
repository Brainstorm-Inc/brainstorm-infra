#!/usr/bin/env bash

project="$BE_REPO_PATH/Brainstorm"

docker build -t brainstorm-backend:latest -f "$project/Brainstorm.API/Dockerfile" $project
