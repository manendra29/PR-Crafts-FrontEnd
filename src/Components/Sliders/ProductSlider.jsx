// import React, { useState, useRef } from 'react';
// import { Box, Typography, IconButton } from '@mui/material';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import './ProductSlider.css';

// const ProductSlider = () => {
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const sliderRef = useRef(null);

//   // Sample product data
//   const products = [
//     { id: 1, name: 'DIY', image:"/images/srk1.jpg" },
//     { id: 2, name: 'Birthday', image: '/images/srk1.jpg' },
//     { id: 3, name: 'Product 3', image: '/images/srk1.jpg' },
//     { id: 4, name: 'Product 4', image: '/images/srk1.jpg' },
//     { id: 5, name: 'Product 5', image: '/images/srk1.jpg' },
//     { id: 6, name: 'Product 6', image: '/images/srk1.jpg' },
//     { id: 7, name: 'Product 7', image: '/images/srk1.jpg' },
//     { id: 8, name: 'Product 8', image: '/images/srk1.jpg' },
//     { id: 9, name: 'Product 9', image: '/images/srk1.jpg' },
//     { id: 10, name: 'Product 10', image: '/images/srk1.jpg' },
//     { id: 11, name: 'Product 11', image: '/images/srk1.jpg' },
//     { id: 12, name: 'Product 12', image: '/images/srk1.jpg' },
//     { id: 13, name: 'Product 13', image: '/images/srk1.jpg' },
//   ];

//   const handleScrollLeft = () => {
//     if (sliderRef.current) {
//       sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
//       setScrollPosition(Math.max(0, scrollPosition - 300));
//     }
//   };

//   const handleScrollRight = () => {
//     if (sliderRef.current) {
//       sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
//       setScrollPosition(scrollPosition + 300);
//     }
//   };

//   return (
//     <div className="product-slider-container">
//       <Typography variant="h4" className="slider-title">
//         Our Craft Categories
//       </Typography>
      
//       <div className="slider-wrapper">
//         {/* Left scroll button */}
//         <IconButton
//           onClick={handleScrollLeft}
//           disabled={scrollPosition <= 0}
//           className={`scroll-button left-button ${scrollPosition <= 0 ? 'hidden' : ''}`}
//         >
//           <ArrowBackIosIcon />
//         </IconButton>

//         {/* Product slider container */}
//         <div
//           ref={sliderRef}
//           className="product-slider"
//         >
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="product-card"
//             >
//               <div className="product-image-container">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="product-image"
//                 />
//               </div>
//               <Typography className="product-name">
//                 {product.name}
//               </Typography>
//             </div>
//           ))}
//         </div>

//         {/* Right scroll button */}
//         <IconButton
//           onClick={handleScrollRight}
//           className="scroll-button right-button"
//         >
//           <ArrowForwardIosIcon />
//         </IconButton>
//       </div>
//     </div>
//   );
// };

// export default ProductSlider;























// import React, { useRef } from 'react';
// import './ProductSlider.css';

// const ProductSlider = () => {
//   const sliderRef = useRef(null);

//   // Sample product data
//   const products = [
//     { id: 1, name: 'DIY Crafts', image: "/images/srk1.jpg" },
//     { id: 2, name: 'Birthday Cards', image: '/images/srk1.jpg' },
//     { id: 3, name: 'Gift Boxes', image: '/images/srk1.jpg' },
//     { id: 4, name: 'Paper Flowers', image: '/images/srk1.jpg' },
//     { id: 5, name: 'Scrapbooks', image: '/images/srk1.jpg' },
//     { id: 6, name: 'Origami Decor', image: '/images/srk1.jpg' },
//     { id: 7, name: 'Bookmarks', image: '/images/srk1.jpg' },
//     { id: 8, name: 'Paper Jewelry', image: '/images/srk1.jpg' },
//     { id: 9, name: 'Wall Art', image: '/images/srk1.jpg' },
//     { id: 10, name: 'Greeting Cards', image: '/images/srk1.jpg' },
//     { id: 11, name: 'Paper Mobiles', image: '/images/srk1.jpg' },
//     { id: 12, name: 'Papier-Mâché', image: '/images/srk1.jpg' },
//     { id: 13, name: 'Quilling Art', image: '/images/srk1.jpg' },
//   ];

//   return (
//     <div className="product-slider-container">
//       <h2 className="slider-title">Our Craft Categories</h2>
      
//       <div className="slider-wrapper">
//         {/* Product slider container - touch/finger scrollable only */}
//         <div className="product-slider" ref={sliderRef}>
//           {products.map((product) => (
//             <div key={product.id} className="product-card">
//               <div className="product-image-container">
//                 <img 
//                   src={product.image} 
//                   alt={product.name} 
//                   className="product-image" 
//                 />
//               </div>
//               <div className="product-name1">{product.name}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductSlider;



















//3rd One

import React, { useEffect, useRef, useState } from 'react';
import './ProductSlider.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const sliderRef = useRef(null);
  const navigateTo=useNavigate();
  useEffect(()=>{
    const fetch=async(req,res,next)=>{
      try {
        const response=await axios.get("https://pr-crafts-backend.vercel.app/api/v1/post/allcategory",{
          withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
        });
        setProducts(response.data.categories);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  },[])


  return (
    <section className="craft-categories">
      <h2 className="category-title">Explore Our Craft Collections</h2>
      
      <div className="category-slider-container">
        <div className="category-slider" ref={sliderRef}>
          {products.map((product) => (
            <div key={product._id} className="category-item" onClick={()=>{navigateTo(`/category/${product.title}`)}}>
              <div className="category-image-wrapper">
                <img 
                  src={product.image.url} 
                  alt={product.title} 
                  className="category-image" 
                />
              </div>
              <span className="category-name">{product.title}</span>
            </div>
          ))}
        </div>
        <div className="scroll-indicator">
          <span>← Swipe to explore →</span>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;