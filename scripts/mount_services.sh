#!/usr/bin/env bash

services="$(pwd)/../services/*.service"

for service in $services; do
    service_name=$(basename $service)
    sudo cp -f "$service" "/etc/systemd/system/$service_name"
done

