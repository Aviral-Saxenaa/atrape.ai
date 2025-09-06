import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, loading, updateCartItem, removeFromCart, getCartTotal } = useCart();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateCartItem(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="container">
          <div className="empty-cart-content">
            <ShoppingCart size={64} />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="btn btn-primary">
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((cartItem) => (
              <div key={cartItem.id} className="cart-item">
                <div className="item-image">
                  <img
                    src={cartItem.item?.image}
                    alt={cartItem.item?.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=Product';
                    }}
                  />
                </div>

                <div className="item-details">
                  <h3>{cartItem.item?.name}</h3>
                  <p>{cartItem.item?.description}</p>
                  <span className="item-category">{cartItem.item?.category}</span>
                </div>

                <div className="item-price">
                  <span className="price">${cartItem.item?.price?.toFixed(2)}</span>
                </div>

                <div className="quantity-controls">
                  <button
                    onClick={() => handleQuantityChange(cartItem.itemId, cartItem.quantity - 1)}
                    className="quantity-btn"
                    disabled={cartItem.quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity">{cartItem.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(cartItem.itemId, cartItem.quantity + 1)}
                    className="quantity-btn"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="item-total">
                  <span className="total-price">
                    ${((cartItem.item?.price || 0) * cartItem.quantity).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => handleRemoveItem(cartItem.itemId)}
                  className="remove-btn"
                  title="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              
              <div className="summary-row">
                <span>Tax</span>
                <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
              </div>

              <button className="checkout-btn btn btn-primary w-full">
                Proceed to Checkout
              </button>

              <Link to="/products" className="continue-shopping">
                <ArrowLeft size={16} />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;