const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// CORS configuration for production
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://shopeasy-frontend.vercel.app', // Updated with likely Vercel URL
    /\.vercel\.app$/, // Allow any Vercel subdomain
    /\.railway\.app$/ // Allow Railway domains
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Data storage (using JSON files for simplicity)
const DATA_DIR = './data';
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const ITEMS_FILE = path.join(DATA_DIR, 'items.json');
const CARTS_FILE = path.join(DATA_DIR, 'carts.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Initialize data files
const initializeDataFiles = () => {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
  }
  
  if (!fs.existsSync(ITEMS_FILE)) {
    const sampleItems = [
      {
        id: uuidv4(),
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 199.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
        stock: 50
      },
      {
        id: uuidv4(),
        name: "Smart Watch",
        description: "Feature-rich smartwatch with health monitoring",
        price: 299.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
        stock: 30
      },
      {
        id: uuidv4(),
        name: "Running Shoes",
        description: "Comfortable running shoes for daily workouts",
        price: 89.99,
        category: "Sports",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
        stock: 100
      },
      {
        id: uuidv4(),
        name: "Coffee Maker",
        description: "Automatic coffee maker with programmable settings",
        price: 149.99,
        category: "Home",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300",
        stock: 25
      },
      {
        id: uuidv4(),
        name: "Laptop Backpack",
        description: "Durable laptop backpack with multiple compartments",
        price: 59.99,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300",
        stock: 75
      },
      {
        id: uuidv4(),
        name: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with excellent sound quality",
        price: 79.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300",
        stock: 40
      }
    ];
    fs.writeFileSync(ITEMS_FILE, JSON.stringify(sampleItems, null, 2));
  }
  
  if (!fs.existsSync(CARTS_FILE)) {
    fs.writeFileSync(CARTS_FILE, JSON.stringify({}));
  }
};

initializeDataFiles();

// Helper functions
const readJsonFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeJsonFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Authentication Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const users = readJsonFile(USERS_FILE);
    
    // Check if user already exists
    if (users.find(user => user.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      name,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeJsonFile(USERS_FILE, users);

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const users = readJsonFile(USERS_FILE);
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Items Routes
app.get('/api/items', (req, res) => {
  try {
    const items = readJsonFile(ITEMS_FILE);
    const { category, minPrice, maxPrice, search } = req.query;
    
    let filteredItems = items;

    // Filter by category
    if (category && category !== 'all') {
      filteredItems = filteredItems.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by price range
    if (minPrice) {
      filteredItems = filteredItems.filter(item => item.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filteredItems = filteredItems.filter(item => item.price <= parseFloat(maxPrice));
    }

    // Filter by search term
    if (search) {
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json(filteredItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/items/:id', (req, res) => {
  try {
    const items = readJsonFile(ITEMS_FILE);
    const item = items.find(i => i.id === req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cart Routes
app.get('/api/cart', authenticateToken, (req, res) => {
  try {
    const carts = readJsonFile(CARTS_FILE);
    const userCart = carts[req.user.userId] || [];
    
    // Get full item details for cart items
    const items = readJsonFile(ITEMS_FILE);
    const cartWithDetails = userCart.map(cartItem => {
      const item = items.find(i => i.id === cartItem.itemId);
      return {
        ...cartItem,
        item
      };
    });

    res.json(cartWithDetails);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/cart/add', authenticateToken, (req, res) => {
  try {
    const { itemId, quantity = 1 } = req.body;
    
    if (!itemId) {
      return res.status(400).json({ message: 'Item ID is required' });
    }

    const items = readJsonFile(ITEMS_FILE);
    const item = items.find(i => i.id === itemId);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const carts = readJsonFile(CARTS_FILE);
    if (!carts[req.user.userId]) {
      carts[req.user.userId] = [];
    }

    const userCart = carts[req.user.userId];
    const existingItem = userCart.find(cartItem => cartItem.itemId === itemId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      userCart.push({
        id: uuidv4(),
        itemId,
        quantity,
        addedAt: new Date().toISOString()
      });
    }

    writeJsonFile(CARTS_FILE, carts);
    res.json({ message: 'Item added to cart successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/cart/update', authenticateToken, (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    
    if (!itemId || quantity < 0) {
      return res.status(400).json({ message: 'Valid item ID and quantity are required' });
    }

    const carts = readJsonFile(CARTS_FILE);
    if (!carts[req.user.userId]) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const userCart = carts[req.user.userId];
    const cartItemIndex = userCart.findIndex(cartItem => cartItem.itemId === itemId);

    if (cartItemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity === 0) {
      userCart.splice(cartItemIndex, 1);
    } else {
      userCart[cartItemIndex].quantity = quantity;
    }

    writeJsonFile(CARTS_FILE, carts);
    res.json({ message: 'Cart updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/cart/remove/:itemId', authenticateToken, (req, res) => {
  try {
    const { itemId } = req.params;
    
    const carts = readJsonFile(CARTS_FILE);
    if (!carts[req.user.userId]) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const userCart = carts[req.user.userId];
    const cartItemIndex = userCart.findIndex(cartItem => cartItem.itemId === itemId);

    if (cartItemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    userCart.splice(cartItemIndex, 1);
    writeJsonFile(CARTS_FILE, carts);
    
    res.json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});