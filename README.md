# ShopEasy - E-commerce Web Application

A modern, full-stack e-commerce web application built with React and Node.js, featuring user authentication, product browsing with filters, and persistent shopping cart functionality.

## 🚀 Features

### Backend Features
- **JWT Authentication**: Secure user registration and login
- **RESTful APIs**: Complete CRUD operations for items
- **Advanced Filtering**: Filter products by category, price range, and search terms
- **Cart Management**: Add, update, and remove items from cart
- **Data Persistence**: Cart items persist after logout using JSON file storage

### Frontend Features
- **Modern UI**: Professional, responsive design with smooth animations
- **User Authentication**: Signup and login pages with form validation
- **Product Listing**: Grid layout with search and filter capabilities
- **Shopping Cart**: Full cart management with quantity controls
- **Responsive Design**: Mobile-first approach, works on all devices
- **Real-time Updates**: Instant cart updates and notifications

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **JWT** for authentication
- **bcryptjs** for password hashing
- **JSON file storage** (easily replaceable with database)

### Frontend
- **React 18** with functional components and hooks
- **React Router** for navigation
- **Axios** for API calls
- **React Toastify** for notifications
- **Lucide React** for icons
- **CSS3** with modern styling and animations

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup
1. Clone the repository and install dependencies:
```bash
npm install
```

2. Start the backend server:
```bash
npm run dev
```
The server will run on `http://localhost:5000`

### Frontend Setup
1. Install client dependencies:
```bash
npm run install-client
```

2. Start the React development server:
```bash
npm run client
```
The frontend will run on `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/items` - Get all items with optional filters
- `GET /api/items/:id` - Get single item

### Cart (Protected Routes)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/:itemId` - Remove item from cart

## 🎨 Design Features

- **Gradient Backgrounds**: Modern gradient designs throughout the app
- **Smooth Animations**: Hover effects and transitions
- **Card-based Layout**: Clean, organized content presentation
- **Professional Typography**: Carefully chosen fonts and spacing
- **Color Scheme**: Consistent purple/blue theme with good contrast
- **Mobile Responsive**: Optimized for all screen sizes

## 📱 Screenshots

### Product Listing Page
- Grid layout with product cards
- Search and filter functionality
- Category-based filtering
- Price range filters

### Shopping Cart
- Item quantity management
- Remove items functionality
- Order summary with totals
- Responsive design

### Authentication
- Clean login/signup forms
- Form validation
- Password visibility toggle
- Error handling

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes for cart operations
- Input validation and sanitization

## 🚀 Deployment Ready

The application is configured for easy deployment:
- Environment variable support
- Production build optimization
- Static file serving
- CORS configuration

## 📄 Project Structure

```
├── server.js              # Express server
├── package.json           # Backend dependencies
├── data/                  # JSON data storage
│   ├── users.json
│   ├── items.json
│   └── carts.json
└── client/                # React frontend
    ├── public/
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── contexts/      # React contexts
    │   ├── pages/         # Page components
    │   └── App.js
    └── package.json       # Frontend dependencies
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Aviral**

---

*Built with ❤️ using React and Node.js*
