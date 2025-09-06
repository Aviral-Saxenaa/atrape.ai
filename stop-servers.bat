@echo off
echo Stopping all servers...
taskkill /f /im node.exe >nul 2>&1
echo All Node.js processes stopped.
echo.
echo Press any key to close...
pause > nul