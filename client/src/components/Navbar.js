import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Store } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/products');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/products" className="navbar-brand">
            <Store size={28} />
            <span>ShopEasy</span>
          </Link>

          <div className="navbar-menu">
            <Link to="/products" className="navbar-link">
              Products
            </Link>

            {user ? (
              <div className="navbar-user-menu">
                <Link to="/cart" className="navbar-cart">
                  <ShoppingCart size={20} />
                  {getCartItemsCount() > 0 && (
                    <span className="cart-badge">{getCartItemsCount()}</span>
                  )}
                </Link>
                
                <div className="user-dropdown">
                  <button className="user-button">
                    <User size={20} />
                    <span>{user.name}</span>
                  </button>
                  <div className="dropdown-content">
                    <button onClick={handleLogout} className="dropdown-item">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="navbar-auth">
                <Link to="/login" className="btn btn-outline">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;