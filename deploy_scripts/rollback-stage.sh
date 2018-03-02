#!/bin/bash

echo $TEST_PASSED
if [ $TEST_PASSED == "true" ]
then
    echo Test passed. This step skipped.
    exit 0
fi

ansible-playbook rollback-stage.yml -u ubuntu --private-key=~/.ssh/iqsadmin.pem -vvvv