@echo off
TITLE Smart CRM Starter
CLS

ECHO ========================================================
ECHO       Starting Smart CRM (Elite SaaS Version)
ECHO ========================================================
ECHO.
ECHO This script will start a local web server to bypass
ECHO browser security restrictions on JavaScript modules.
ECHO.

:: Check for Python
python --version >nul 2>&1
IF %ERRORLEVEL% EQU 0 (
    ECHO [OK] Python found. Starting server...
    ECHO.
    ECHO Opening browser in 3 seconds...
    TIMEOUT /T 3 >nul
    START http://localhost:8000
    python -m http.server 8000
    GOTO END
)

:: Check for Node/NPM
call npm -v >nul 2>&1
IF %ERRORLEVEL% EQU 0 (
    ECHO [OK] Node.js found. Starting server...
    ECHO.
    ECHO Opening browser in 3 seconds...
    TIMEOUT /T 3 >nul
    START http://localhost:3000
    npx serve .
    GOTO END
)

ECHO [ERROR] Neither Python nor Node.js was found in your PATH.
ECHO.
ECHO Please install Python (python.org) or Node.js (nodejs.org)
ECHO to run modern web applications locally.
ECHO.
PAUSE

:END
