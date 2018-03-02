#!/bin/bash

echo $TEST_PASSED
if [ $TEST_PASSED == "false" ]
then
    echo Test failed. This step skipped.
    exit 0
fi

COMPONENT=$(grep -m1 name ../package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
VERSION=$(grep -m1 version ../package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
BUILD_NUMBER=21
IMAGE="pipdevs/${COMPONENT}:${VERSION}-${BUILD_NUMBER}"
TAG="v${VERSION}-${BUILD_NUMBER}"

# Any subsequent(*) commands which fail will cause the shell scrupt to exit immediately
set -e
set -o pipefail

# Set tag on git repo
git tag $TAG
git push --tags

# Build docker image
docker build -f ../docker/Dockerfile -t ${IMAGE} .

# Push production image to docker registry
docker push $IMAGE