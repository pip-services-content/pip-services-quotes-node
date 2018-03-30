#!/bin/bash

VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
TAG="v${VERSION}-${TRAVIS_BUILD_NUMBER}-rc"

# Any subsequent(*) commands which fail will cause the shell script to exit immediately
set -e
set -o pipefail

# Login to npm
if [ -z "${NPM_USER}" ]; then
npm login
else
npm install -g npm-cli-login
npm-cli-login
fi

#npm publish --tag ${TAG}
npm publish