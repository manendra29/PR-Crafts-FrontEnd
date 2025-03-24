import React, { useState } from 'react';
import './PriceCategoryCards.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PriceCategoryCards = () => {

  const naviagteTo=useNavigate();
  
  return (
    <div className="container">
      <h2 className="section-title">Shop By Price Range</h2>
      <div className="cards-container">

        <div className="price-card" onClick={()=>naviagteTo(`/undershop/${499}`)}>
          <div className="card-content card-499">
            <div className="card-info">
              <h3>Under ₹499</h3>
              
            </div>
          </div>
        </div>

    
        <div className="price-card" onClick={()=>naviagteTo(`/undershop/${999}`)}>
          <div className="card-content card-999">
            <div className="card-info">
              <h3>Under ₹999</h3>
              
            </div>
          </div>
        </div>

      
        <div className="price-card" onClick={()=>naviagteTo(`/undershop/${1999}`)}>
          <div className="card-content card-1999">
            <div className="card-info">
              <h3>Under ₹1999</h3>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCategoryCards;





