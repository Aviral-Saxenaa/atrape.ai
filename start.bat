@echo off
echo Starting ShopEasy E-commerce Application...
echo.

echo Installing dependencies...
call npm install
cd client
call npm install
cd ..

echo.
echo Starting backend server...
start "Backend Server" cmd /k "node server.js"

echo.
echo Starting frontend development server...
cd client
start "Frontend Server" cmd /k "npm start"
cd ..

echo.
echo Application is starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul