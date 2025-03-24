import React, { useState } from 'react';
import { Typography, Card, Box, Rating, Pagination } from '@mui/material';
import './ProductListingPage.css';
import { BestsellerCard } from '../BestsellerProducts/BestsellerProducts';
import Header from '../Layout/Header';


const ProductListingPage = ({ categoryName, tagLine, products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortMethod, setSortMethod] = useState('all'); // Default sort method
  const productsPerPage = 8;
  
  
  const sortedProducts = [...products].sort((a, b) => {
    if (sortMethod === 'price-low-high') {
      return a.price - b.price;
    } else if (sortMethod === 'price-high-low') {
      return b.price - a.price;
    }
    return 0; // Default ordering for 'all'
  });
  
  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const pageCount = Math.ceil(sortedProducts.length / productsPerPage);
  
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  // Handle sort method change
  const handleSortChange = (method) => {
    setSortMethod(method);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  return (
    <>
    <div style={{ marginBottom: "0.7rem" }}>
      <Header />
    </div>

    
    <div className="category-page">
      <div className="category-header">
        <div className="category-title-container">
          <Typography variant="h3" className="category-title">
            {categoryName}
          </Typography>
          <Typography className="category-tagline">
            {tagLine}
          </Typography>
        </div>
        <div className="category-svg">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path 
              fill="#333" 
              d="M140,20 L160,20 L160,40 L140,40 Z M120,40 L140,40 L140,60 L120,60 Z M100,60 L120,60 L120,80 L100,80 Z M80,80 L100,80 L100,100 L80,100 Z M60,100 L80,100 L80,120 L60,120 Z M40,120 L60,120 L60,140 L40,140 Z M20,140 L40,140 L40,160 L20,160 Z"
            />
            <circle cx="160" cy="160" r="20" fill="#333" />
            <path 
              fill="none" 
              stroke="#333" 
              strokeWidth="8" 
              d="M20,20 C60,40 140,40 180,20" 
            />
          </svg>
        </div>
      </div>
      
      <div className="category-filters">
        <div className="filter-container">
          <div className="filter-label">Filter Products:</div>
          <div className="filter-options">
            <button 
              className={`filter-btn ${sortMethod === 'all' ? 'active' : ''}`}
              onClick={() => handleSortChange('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${sortMethod === 'price-low-high' ? 'active' : ''}`}
              onClick={() => handleSortChange('price-low-high')}
            >
              Price: Low to High
            </button>
            <button 
              className={`filter-btn ${sortMethod === 'price-high-low' ? 'active' : ''}`}
              onClick={() => handleSortChange('price-high-low')}
            >
              Price: High to Low
            </button>
          </div>
        </div>
      </div>
      
   {products.length===0 ?<h1 className="no_products">No Products Yet </h1> : <div className="products-grid">
        {currentProducts.map(product => (
          <BestsellerCard key={product.id} product={product} />
        ))}
      </div>
   }
      
      <div className="pagination-container">
        <Pagination 
          count={pageCount} 
          page={currentPage} 
          onChange={handlePageChange} 
          color="standard" 
          size="large"
        />
      </div>
    </div>
    </>
  );
};

export default ProductListingPage;