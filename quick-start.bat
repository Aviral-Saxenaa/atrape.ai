@echo off
echo Quick Start - ShopEasy E-commerce
echo.

echo Starting backend...
start "Backend" cmd /k "node server.js"

echo Starting frontend...
cd client
start "Frontend" cmd /k "npm start"
cd ..

echo.
echo Servers starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause > nul