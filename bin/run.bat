@ECHO OFF

SETLOCAL enabledelayedexpansion

TITLE Quotes Microservice

SET OLDDIR=%CD%
SET CURRDIR=%~dp0

CD /d %CURRDIR%

node run.js %1

CD /d %OLDDIR%

ENDLOCAL