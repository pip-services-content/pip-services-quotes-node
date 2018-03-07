#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
BUILD_IMAGE="pipdevs/${COMPONENT}:${VERSION}-${TRAVIS_BUILD_NUMBER}-build"
TEST_IMAGE="pipdevs/${COMPONENT}:${VERSION}-${TRAVIS_BUILD_NUMBER}-test"
IMAGE1="pipdevs/${COMPONENT}:${VERSION}-${TRAVIS_BUILD_NUMBER}-rc"
IMAGE2="pipdevs/${COMPONENT}:latest"

rm -rf ./node_modules
rm -rf ./obj

docker rmi ${BUILD_IMAGE} --force
docker rmi ${TEST_IMAGE} --force
docker rmi ${IMAGE2} --force
docker rmi ${IMAGE1} --force
docker image prune --force

docker ps -a | grep Exit | cut -d ' ' -f 1 | xargs docker rm