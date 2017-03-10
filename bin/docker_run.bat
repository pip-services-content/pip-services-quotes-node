@ECHO OFF

SETLOCAL enabledelayedexpansion

TITLE Docker Build 

SET OLDDIR=%CD%
SET CURRDIR=%~dp0

CD /d %CURRDIR%

docker run -i -t --rm -P pip-services-quotes:1.0.0

CD /d %OLDDIR%

ENDLOCAL
