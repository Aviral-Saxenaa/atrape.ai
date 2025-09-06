@echo off
echo ========================================
echo    Deploying Frontend to Vercel
echo ========================================
echo.

echo [1/4] Installing Vercel CLI...
npm install -g vercel

echo.
echo [2/4] Installing client dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [3/4] Building React app...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed
    pause
    exit /b 1
)

echo.
echo [4/4] Deploying to Vercel...
echo.
echo IMPORTANT: When prompted:
echo - Set up and deploy? Y
echo - Which scope? [your-username]
echo - Link to existing project? N
echo - Project name: shopeasy-frontend
echo - In which directory is your code located? ./
echo.
vercel --prod

echo.
echo Frontend deployment complete!
echo Your app should be live at the URL shown above.
echo.
pause