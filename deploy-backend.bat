@echo off
echo ========================================
echo    Deploying Backend to Railway
echo ========================================
echo.

echo [1/2] Installing Railway CLI...
npm install -g @railway/cli

echo.
echo [2/2] Deploying to Railway...
echo.
echo You'll need to:
echo 1. Login to Railway
echo 2. Create a new project
echo 3. Set environment variables
echo.
echo Starting Railway deployment...
railway login
railway link
railway up

echo.
echo Backend deployment complete!
echo Don't forget to set these environment variables in Railway dashboard:
echo - PORT=5000
echo - JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024
echo - NODE_ENV=production
echo.
pause