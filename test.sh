#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
IMAGE="pipdevs/${COMPONENT}:${VERSION}-${TRAVIS_BUILD_NUMBER}-test"
CONTAINER="${COMPONENT}"

# Any subsequent(*) commands which fail will cause the shell script to exit immediately
set -e
set -o pipefail

export IMAGE

# Workaround to remove dangling images
docker-compose -f ./docker/docker-compose.test.yml down

docker-compose -f ./docker/docker-compose.test.yml up --build --abort-on-container-exit --exit-code-from test

# Workaround to remove dangling images
docker-compose -f ./docker/docker-compose.test.yml down