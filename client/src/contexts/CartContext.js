import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load cart when user logs in
  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const loadCart = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await axios.get('/api/cart');
      setCartItems(response.data);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (itemId, quantity = 1) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      await axios.post('/api/cart/add', { itemId, quantity });
      await loadCart(); // Reload cart to get updated data
      toast.success('Item added to cart!');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add item to cart';
      toast.error(message);
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    if (!user) return;

    try {
      await axios.put('/api/cart/update', { itemId, quantity });
      await loadCart(); // Reload cart to get updated data
      if (quantity === 0) {
        toast.success('Item removed from cart');
      } else {
        toast.success('Cart updated');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update cart';
      toast.error(message);
    }
  };

  const removeFromCart = async (itemId) => {
    if (!user) return;

    try {
      await axios.delete(`/api/cart/remove/${itemId}`);
      await loadCart(); // Reload cart to get updated data
      toast.success('Item removed from cart');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove item from cart';
      toast.error(message);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, cartItem) => {
      return total + (cartItem.item?.price || 0) * cartItem.quantity;
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    getCartTotal,
    getCartItemsCount,
    loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};