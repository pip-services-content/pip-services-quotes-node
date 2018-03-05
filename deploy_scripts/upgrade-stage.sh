#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
#BUILD_NUMBER=${BUILD_NUMBER-0}
BUILD_NUMBER=37-rc

ansible-playbook upgrade-stage.yml -u ubuntu -e COMPONENT=$COMPONENT -e VERSION=$VERSION -e BUILD_NUMBER=$BUILD_NUMBER --private-key=~/.ssh/iqsadmin.pem -vvvv