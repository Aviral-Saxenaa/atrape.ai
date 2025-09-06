@echo off
echo ========================================
echo    Deploying Frontend to Vercel
echo ========================================
echo.

echo [1/3] Installing Vercel CLI...
npm install -g vercel

echo.
echo [2/3] Building React app...
cd client
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed
    pause
    exit /b 1
)

echo.
echo [3/3] Deploying to Vercel...
echo.
echo Follow the prompts:
echo - Link to existing project? N (for first time)
echo - Project name: shopeasy-frontend
echo - Directory: ./build
echo.
cd build
vercel --prod

echo.
echo Frontend deployment complete!
echo.
pause