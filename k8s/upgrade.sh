#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
BUILD_NUMBER=$(cat buildnumber | sed 's/[^0-9]//g')

if [ ${HOST} == "stage" ]
then
    BUILD_NUMBER=${BUILD_NUMBER}-rc
fi

ansible-playbook k8s/upgrade.yml -u ubuntu -e COMPONENT=${COMPONENT} -e VERSION=${VERSION} -e BUILD_NUMBER=${BUILD_NUMBER} -e HOST=${HOST} --private-key=~/.ssh/iqsadmin.pem -vvvv