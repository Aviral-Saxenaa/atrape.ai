import React from 'react';
import { X } from 'lucide-react';
import './FilterSidebar.css';

const FilterSidebar = ({ filters, onFilterChange, categories, isVisible, onClose }) => {
  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFilterChange({
      category: 'all',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name'
    });
  };

  return (
    <>
      {isVisible && <div className="filter-overlay" onClick={onClose} />}
      <div className={`filter-sidebar ${isVisible ? 'visible' : ''}`}>
        <div className="filter-header">
          <h3>Filters</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="filter-section">
          <h4>Category</h4>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-section">
          <h4>Price Range</h4>
          <div className="price-inputs">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="price-input"
              min="0"
            />
            <span>to</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="price-input"
              min="0"
            />
          </div>
        </div>

        <div className="filter-section">
          <h4>Sort By</h4>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="filter-select"
          >
            <option value="name">Name (A-Z)</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <button onClick={clearFilters} className="clear-filters-btn">
          Clear All Filters
        </button>
      </div>
    </>
  );
};

export default FilterSidebar;