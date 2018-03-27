#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
BUILD_IMAGE="pipdevs/${COMPONENT}:${VERSION}-${TRAVIS_BUILD_NUMBER}-build"
TEST_IMAGE="pipdevs/${COMPONENT}:${VERSION}-${TRAVIS_BUILD_NUMBER}-test"
STAGE_IMAGE="pipdevs/${COMPONENT}:${VERSION}-${TRAVIS_BUILD_NUMBER}-rc"

rm -rf ./node_modules
rm -rf ./obj

docker rmi ${BUILD_IMAGE} --force
docker rmi ${TEST_IMAGE} --force
docker rmi ${STAGE_IMAGE} --force
docker image prune --force

# Remove exited containers:
docker ps --filter status=dead --filter status=exited -aq | xargs -r docker rm -v
    
# Remove unused images:
docker images --no-trunc | grep '<none>' | awk '{ print $3 }' | xargs -r docker rmi

# Remove unused volumes:
docker volume ls -qf dangling=true | xargs -r docker volume rm