import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, showAddToCart = true }) => {
  const handleAddToCart = () => {
    onAddToCart(product.id);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Product+Image';
          }}
        />
        <div className="product-category">{product.category}</div>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={`star ${i < 4 ? 'filled' : ''}`}
            />
          ))}
          <span className="rating-text">(4.0)</span>
        </div>

        <div className="product-footer">
          <div className="product-price">
            <span className="price">${product.price.toFixed(2)}</span>
            {product.stock < 10 && (
              <span className="stock-warning">Only {product.stock} left!</span>
            )}
          </div>

          {showAddToCart && (
            <button
              onClick={handleAddToCart}
              className="add-to-cart-btn"
              disabled={product.stock === 0}
            >
              <ShoppingCart size={16} />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;