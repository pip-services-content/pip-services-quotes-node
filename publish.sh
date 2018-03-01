#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
IMAGE1="pipdevs/${COMPONENT}:${VERSION}-${TRAVIS_BUILD_NUMBER}-rc"
IMAGE2="pipdevs/${COMPONENT}:latest"
TAG="v${VERSION}-${TRAVIS_BUILD_NUMBER}-rc"

# Any subsequent(*) commands which fail will cause the shell scrupt to exit immediately
set -e
set -o pipefail

# Configure git
#git config user.email ${GIT_EMAIL}
#git config user.name ${GIT_USER}

# Set tag on git repo
#git tag $TAG
#git push --tags

# Push production image to docker registry
#docker login -u $DOCKER_USER -p $DOCKER_PASS
cat docker/my_password.txt | docker login --username $DOCKER_USER --password-stdin
docker push $IMAGE1
docker push $IMAGE2

