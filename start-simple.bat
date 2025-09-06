@echo off
echo Starting ShopEasy E-commerce App...
echo.

echo Stopping any existing servers...
taskkill /f /im node.exe >nul 2>&1

echo.
echo Starting Backend Server...
start "Backend (Port 5000)" cmd /k "node server.js"

echo.
echo Starting Frontend Server...
cd client
start "Frontend (Port 3000)" cmd /k "set SKIP_PREFLIGHT_CHECK=true && set NODE_OPTIONS=--openssl-legacy-provider && npm start"
cd ..

echo.
echo Servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause > nul