# Vercel + Railway Deployment Guide

## 🚀 Complete Deployment Steps

### Step 1: Deploy Backend to Railway

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and Deploy**
   ```bash
   railway login
   railway link
   railway up
   ```

3. **Set Environment Variables in Railway Dashboard**
   - Go to your Railway project dashboard
   - Add these variables:
     - `PORT=5000`
     - `JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024`
     - `NODE_ENV=production`

4. **Get your Railway URL**
   - Copy the generated Railway URL (e.g., `https://your-app-name.railway.app`)

### Step 2: Update Frontend Configuration

1. **Update the API URL in client/.env**
   ```
   REACT_APP_API_URL=https://atrapeai-production.up.railway.app
   ```
   ✅ Already configured with your Railway URL

### Step 3: Deploy Frontend to Vercel

**IMPORTANT: Deploy from the client directory, not the root!**

1. **Use the deployment script (Recommended)**
   ```bash
   deploy-frontend.bat
   ```

2. **OR Manual deployment:**
   ```bash
   cd client
   npm install
   npm run build
   vercel --prod
   ```

3. **Follow Vercel prompts:**
   - Set up and deploy? **Y**
   - Which scope? **[your-username]**
   - Link to existing project? **N** (for first time)
   - Project name: **shopeasy-frontend**
   - In which directory is your code located? **./** (current directory)

### Step 4: Configure CORS (Important!)

After deployment, you need to update your backend to allow your Vercel domain.

1. **Update server.js CORS configuration**
   Add your Vercel URL to the allowed origins:
   ```javascript
   const corsOptions = {
     origin: [
       'http://localhost:3000',
       'https://shopeasy-frontend.vercel.app'  // Updated with your Vercel URL
     ],
     credentials: true
   };
   ```

2. **Redeploy backend to Railway**
   ```bash
   railway up
   ```

## 🎉 Your App is Live!

- **Frontend**: https://your-vercel-app.vercel.app
- **Backend**: https://your-railway-app.railway.app

## 🔧 Quick Deployment Scripts

Use the provided batch files:
- `deploy-backend.bat` - Deploys to Railway
- `deploy-frontend.bat` - Deploys to Vercel

## 📝 Notes

- ✅ Railway URL already updated in `client/.env`
- Both services offer free tiers perfect for testing
- Railway automatically detects Node.js and builds your app
- Vercel automatically detects React and optimizes the build

## 🛠️ Troubleshooting

**CORS Issues**: Make sure your Vercel URL is added to CORS origins in server.js
**API Not Found**: Verify the REACT_APP_API_URL in client/.env matches your Railway URL
**Build Failures**: Check that all dependencies are properly listed in package.json