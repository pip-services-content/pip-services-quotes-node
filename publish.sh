#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
IMAGE1="pipdevs/${COMPONENT}:${VERSION}-${TRAVIS_BUILD_NUMBER}"
IMAGE2="pipdevs/${COMPONENT}:latest"
TAG="v${VERSION}-${TRAVIS_BUILD_NUMBER}"

# Any subsequent(*) commands which fail will cause the shell scrupt to exit immediately
set -e
set -o pipefail

# Set tag on git repo
git tag $TAG
git push --tags

# Push production image to docker registry
docker login -u $DOCKER_USER -p $DOCKER_PASS
docker push $IMAGE1
docker push $IMAGE2

