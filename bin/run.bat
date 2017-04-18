@ECHO OFF

SETLOCAL enabledelayedexpansion

TITLE Quotes Microservice

SET OLDDIR=%CD%
SET CURRDIR=%~dp0

CD /d %CURRDIR%\..

node ./bin/run.js -c ./config/config.yaml

CD /d %OLDDIR%

ENDLOCAL