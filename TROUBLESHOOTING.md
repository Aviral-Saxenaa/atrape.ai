# 🔧 Deployment Troubleshooting Guide

## Frontend Deployment Issues

### ❌ Error: "Could not find a required file. Name: index.html"

**Problem:** Vercel is looking for index.html in the wrong directory.

**Solution:**
1. Make sure you're deploying from the `client` directory, not the root
2. Use the deployment script: `deploy-frontend.bat`
3. When prompted "In which directory is your code located?", answer: `./`

### ❌ Error: "Build failed" or npm install issues

**Solution:**
```bash
cd client
npm cache clean --force
npm install --legacy-peer-deps
npm run build
```

### ❌ Error: API calls failing (CORS errors)

**Problem:** Frontend can't connect to backend due to CORS.

**Solution:**
1. ✅ `client/.env` already updated with Railway URL: `https://atrapeai-production.up.railway.app`
2. ✅ `server.js` already updated with Vercel URL: `https://shopeasy-frontend.vercel.app`
3. Redeploy backend: `railway up`

## Backend Deployment Issues

### ❌ Error: "Module not found" or dependency issues

**Solution:**
```bash
npm cache clean --force
npm install
railway up
```

### ❌ Error: Environment variables not working

**Solution:**
1. Go to Railway dashboard
2. Add environment variables:
   - `PORT=5000`
   - `JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024`
   - `NODE_ENV=production`

## Quick Fix Commands

### Reset and redeploy everything:
```bash
# Backend
railway up

# Frontend
cd client
npm cache clean --force
npm install
npm run build
vercel --prod
```

### Test locally first:
```bash
run.bat
```

## Getting Help

If you're still having issues:
1. Check the error logs in Railway/Vercel dashboards
2. Verify all environment variables are set
3. Make sure both deployments are complete
4. Test API endpoints directly in browser