@echo off
echo ========================================
echo    Simple Start - ShopEasy App
echo ========================================
echo.

echo [1/3] Stopping existing servers...
taskkill /f /im node.exe >nul 2>&1
timeout /t 2 /nobreak > nul

echo [2/3] Starting backend server...
start "Backend (Port 5000)" cmd /k "echo Backend Starting... && node server.js"
timeout /t 3 /nobreak > nul

echo [3/3] Starting frontend (may take time to install/compile)...
cd client
start "Frontend (Port 3000)" cmd /k "echo Frontend Starting... && echo Installing dependencies if needed... && npm install --legacy-peer-deps --force && echo Starting React server... && npm start"
cd ..

echo.
echo ========================================
echo    Servers Starting...
echo ========================================
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000 (wait 2-3 minutes)
echo.
echo Two windows opened - wait for React to compile!
echo.
pause