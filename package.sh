#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
IMAGE1="pipdevs/${COMPONENT}:${VERSION}-${TRAVIS_BUILD_NUMBER}-rc"
IMAGE2="pipdevs/${COMPONENT}:latest"

# Any subsequent(*) commands which fail will cause the shell script to exit immediately
set -e
set -o pipefail

# Build docker image
docker build -f docker/Dockerfile -t ${IMAGE1} -t ${IMAGE2} .