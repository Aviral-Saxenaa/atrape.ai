# ShopEasy - Deployment Guide

## 🚀 Quick Start

### Local Development

1. **Install Dependencies**
   ```bash
   npm install
   cd client && npm install
   ```

2. **Start the Application**
   
   **Option A: Using the batch file (Windows)**
   ```bash
   start.bat
   ```
   
   **Option B: Manual start**
   ```bash
   # Terminal 1 - Backend
   node server.js
   
   # Terminal 2 - Frontend
   cd client
   npm start
   ```

3. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🌐 Production Deployment

### Option 1: Heroku Deployment

1. **Prepare for deployment**
   ```bash
   npm run build
   ```

2. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

3. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Option 2: Vercel/Netlify (Frontend) + Railway/Render (Backend)

**Frontend (Vercel/Netlify):**
1. Build the React app: `cd client && npm run build`
2. Deploy the `client/build` folder

**Backend (Railway/Render):**
1. Deploy the root directory
2. Set start command: `node server.js`
3. Set environment variables if needed

### Option 3: VPS/Cloud Server

1. **Install Node.js** on your server
2. **Clone the repository**
3. **Install dependencies**
4. **Build the frontend**
   ```bash
   cd client && npm run build
   ```
5. **Start with PM2** (recommended)
   ```bash
   npm install -g pm2
   pm2 start server.js --name "shopeasy"
   ```

## 🔧 Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
```

## 📊 Features Included

✅ **Backend Features:**
- JWT Authentication (Register/Login)
- RESTful APIs for products
- CRUD operations for cart
- Advanced filtering (category, price, search)
- Data persistence with JSON files

✅ **Frontend Features:**
- Modern React 18 with hooks
- Responsive design (mobile-first)
- User authentication with protected routes
- Product listing with filters
- Shopping cart with persistence
- Professional UI with animations
- Toast notifications

✅ **Security Features:**
- Password hashing with bcryptjs
- JWT token authentication
- Protected API routes
- Input validation

## 🎨 UI/UX Features

- **Modern Design**: Gradient backgrounds, smooth animations
- **Responsive**: Works on all devices
- **Professional**: Clean, organized layout
- **User-Friendly**: Intuitive navigation and interactions

## 📱 Mobile Responsive

The application is fully responsive and works perfectly on:
- Desktop computers
- Tablets
- Mobile phones

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/items` - Get all products (with filters)
- `GET /api/items/:id` - Get single product

### Cart (Protected)
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:id` - Remove from cart

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, JWT, bcryptjs
- **Frontend**: React 18, React Router, Axios, CSS3
- **Storage**: JSON files (easily replaceable with database)
- **Icons**: Lucide React
- **Notifications**: React Toastify

## 📝 Sample Data

The application comes with sample products including:
- Electronics (headphones, smartwatch, speaker)
- Sports (running shoes)
- Home (coffee maker)
- Accessories (laptop backpack)

## 🚀 Performance

- Optimized React build
- Efficient API calls
- Minimal dependencies
- Fast loading times

---

**Ready for production deployment!** 🎉

The application is fully functional and includes all requested features:
- Professional UI design
- Complete authentication system
- Product filtering and search
- Persistent shopping cart
- Mobile responsive design