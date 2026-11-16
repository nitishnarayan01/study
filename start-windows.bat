@echo off
REM One-click start for the TPM Learning Hub on Windows. Double-click this file.
title TPM Learning Hub
cd /d "%~dp0"

where docker >nul 2>nul
if errorlevel 1 (
  echo.
  echo  Docker is not installed. Install Docker Desktop from https://www.docker.com/products/docker-desktop/
  echo  then start it and run this file again.
  echo.
  pause
  exit /b 1
)

docker info >nul 2>nul
if errorlevel 1 (
  echo.
  echo  Docker Desktop is installed but not running.
  echo  Open Docker Desktop, wait until it says "Engine running", then run this file again.
  echo.
  pause
  exit /b 1
)

if not exist ".env" (
  echo  Creating .env from .env.example ^(edit it later to set your own admin email and password^)
  copy ".env.example" ".env" >nul
)

echo.
echo  Building and starting. The first time takes 3 to 10 minutes.
echo  When you see "Application startup complete", open http://localhost:3000
echo  Keep this window open. Press Ctrl+C here to stop.
echo.
start "" /b cmd /c "timeout /t 90 /nobreak >nul & start http://localhost:3000"
docker compose up --build
echo.
echo  The app stopped. If you saw red errors above, copy them and send them to Claude.
pause
