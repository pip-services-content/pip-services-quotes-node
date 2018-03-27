#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
STAGE_IMAGE="pipdevs/${COMPONENT}:${VERSION}-${TRAVIS_BUILD_NUMBER}-rc"
TAG="v${VERSION}-${TRAVIS_BUILD_NUMBER}-rc"

# Any subsequent(*) commands which fail will cause the shell script to exit immediately
set -e
set -o pipefail

# Push production image to docker registry
docker login -u $DOCKER_USER -p $DOCKER_PASS
docker push ${STAGE_IMAGE}