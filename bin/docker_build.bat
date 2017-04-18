@ECHO OFF

SETLOCAL enabledelayedexpansion

TITLE Docker Build 

SET OLDDIR=%CD%
SET CURRDIR=%~dp0

CD /d %CURRDIR%

docker build -t pip-services-quotes:1.1.0 -f ./Dockerfile --rm=true ..

CD /d %OLDDIR%

ENDLOCAL
