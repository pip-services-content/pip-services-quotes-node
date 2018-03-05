#!/bin/bash

docker exec iqs-e2e powershell /iqs-management-ps-ws/iqs-simulation-ps/src/Test/Test-IqsQuotes.ps1 -ServerUrl "api.positron.stage.iquipsys.net"