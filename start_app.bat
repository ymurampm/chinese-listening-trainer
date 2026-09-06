@echo off
chcp 65001 >nul
title Chinese Listening Trainer

cd /d "%~dp0"

netstat -ano | findstr ":8080 " >nul
if %errorlevel% neq 0 (
    start /b python -m http.server 8080 >nul 2>&1
    ping 127.0.0.1 -n 2 >nul
)

start http://localhost:8080/
exit
