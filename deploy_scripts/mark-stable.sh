#!/bin/bash

if [ $TEST_PASSED == "false" ]
then
    echo Test failed. This step skipped.
    exit 0
fi

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
BUILD_NUMBER=$(grep BUILD_NUMBER deploy_scripts/upgrade-stage.sh | grep rc | sed 's/[^0-9]//g')
STAGE_IMAGE="pipdevs/${COMPONENT}:${VERSION}-${BUILD_NUMBER}-rc"
PROD_IMAGE="pipdevs/${COMPONENT}:${VERSION}-${BUILD_NUMBER}"
TAG="v${VERSION}-${BUILD_NUMBER}"

# Any subsequent(*) commands which fail will cause the shell scrupt to exit immediately
set -e
set -o pipefail

# Configure git and set production tag on git repo
git config --global user.email "krdima92@gmail.com" 
git config --global user.name "stee1" 

git remote rm origin 
git remote add origin "https://stee1:${GITHUB_API_KEY}@github.com/pip-services-content/pip-services-quotes-node.git"

git tag $TAG
git push --tags

# Build docker image
#docker build -f docker/Dockerfile -t ${IMAGE} .
docker pull $STAGE_IMAGE
docker tag $STAGE_IMAGE $PROD_IMAGE

# Push production image to docker registry
docker login -u $DOCKER_USER -p $DOCKER_PASSWORD
docker push $PROD_IMAGE

# cleanup
docker rmi $STAGE_IMAGE --force
docker rmi $PROD_IMAGE --force
docker image prune --force