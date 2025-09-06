@echo off
echo ========================================
echo    ShopEasy E-commerce Application
echo ========================================
echo.

echo [1/5] Cleaning up corrupted files...
if exist "client\node_modules" (
    echo Removing corrupted node_modules...
    rmdir /s /q "client\node_modules" 2>nul
)
if exist "client\package-lock.json" (
    echo Removing corrupted package-lock.json...
    del "client\package-lock.json" 2>nul
)

echo.
echo [2/5] Installing backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo [3/5] Installing frontend dependencies (this may take a few minutes)...
cd client
call npm install --no-optional --legacy-peer-deps
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    echo Trying alternative installation...
    call npm cache clean --force
    call npm install --no-optional --legacy-peer-deps --force
)
cd ..

echo.
echo [4/5] Stopping any existing servers...
taskkill /f /im node.exe >nul 2>&1
echo Waiting 2 seconds for cleanup...
timeout /t 2 /nobreak > nul

echo Starting backend server...
start "Backend Server (Port 5000)" cmd /k "echo Backend Server Starting... && echo. && node server.js && echo. && echo Backend server stopped. Press any key to close... && pause"

echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo [5/5] Starting frontend server...
cd client
start "Frontend Server (Port 3000)" cmd /k "echo Frontend Server Starting... && echo This may take 1-2 minutes to compile... && echo. && npm start && echo. && echo Frontend server stopped. Press any key to close... && pause"
cd ..

echo.
echo ========================================
echo    Application Started Successfully!
echo ========================================
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Wait 1-2 minutes for React to compile, then open:
echo http://localhost:3000
echo.
echo Both servers are running in separate windows.
echo Close this window when you're done.
echo.
pause