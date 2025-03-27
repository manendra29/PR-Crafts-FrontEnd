// import React from 'react';
// import { Card, Typography, Box, Rating } from '@mui/material';
// import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
// import StarOutlineIcon from '@mui/icons-material/StarOutline';
// import './BestsellerProducts.css';

// const BestsellerCard = ({ product,tag}) => {
//   return (
//     <Card className="bestseller-card">
//      {tag && <div className="bestseller-tag">
//         <LocalFireDepartmentIcon className="fire-icon" />
//         <span>BestSeller</span>
//       </div>
//      }
      
//       <div className="image-container">
//         <img src={product.image} alt={product.name} className="product-image" />
//       </div>
      
//       <Box className="product-details">
//         <Typography variant="h6" className="product-name">
//           {product.name}
//         </Typography>
        
//         <Box className="rating-container">
//           <Rating 
//             value={product.rating} 
//             precision={0.5} 
//             readOnly 
//             size="small"
//             className="rating-stars"
//           />
//           <Typography variant="body2" className="review-count">
//             ({product.reviewCount})
//           </Typography>
//         </Box>
        
//         <Typography variant="h5" className="product-price">
//           ${product.price.toFixed(2)}
//         </Typography>
        
//         <button className="add-to-cart-btn">
//           Add to Cart
//         </button>
//       </Box>
//     </Card>
//   );
// };

// // Example usage with demo data
// const BestsellerProducts = ({productName,tagLine,tag}) => {
//   const bestsellerProducts = [
//     {
//       id: 1,
//       name: "Handcrafted Paper Flower Bouquet",
//       price: 24.99,
//       rating: 4.8,
//       reviewCount: 127,
//       image: "/images/srk1.jpg"
//     },
//     {
//       id: 2,
//       name: "3D Paper Butterfly Wall Art",
//       price: 18.50,
//       rating: 4.6,
//       reviewCount: 85,
//       image: "/images/srk1.jpg"
//     },
//     {
//       id: 3,
//       name: "Origami DIY Kit",
//       price: 12.99,
//       rating: 4.9,
//       reviewCount: 203,
//       image: "/images/srk1.jpg"
//     },
//     {
//       id: 4,
//       name: "Paper Quilled Greeting Card",
//       price: 8.95,
//       rating: 4.7,
//       reviewCount: 156,
//       image: "/images/srk1.jpg"
//     }
//   ];

//   return (
//     <div className="bestsellers-section">
//       <div className="section-header">
//         <Typography variant="h4" className="section-title">
//           Our {productName}
//         </Typography>
//         <div className="tagline-container">
//           <span className="sparkle sparkle-left">
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M12 2L14.4 8.4L21 10.8L14.4 13.2L12 19.6L9.6 13.2L3 10.8L9.6 8.4L12 2Z" fill="#FFD700" stroke="#FFA500" strokeWidth="1" />
//             </svg>
//           </span>
//           <Typography className="tagline">
//            {tagLine}
//           </Typography>
//           <span className="sparkle sparkle-right">
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M12 2L14.4 8.4L21 10.8L14.4 13.2L12 19.6L9.6 13.2L3 10.8L9.6 8.4L12 2Z" fill="#FFD700" stroke="#FFA500" strokeWidth="1" />
//             </svg>
//           </span>
//         </div>
//       </div>
      
//       <div className="bestsellers-grid">
//         {bestsellerProducts.map(product => (
//           <BestsellerCard tag={tag} key={product.id} product={product} />
//         ))}
//       </div>
//       <div className="view_all">
//         <span className="button-view" >View All</span>
//       </div>
     
//     </div>
//   );
// };

// export default BestsellerProducts;







import React, { useEffect, useState } from 'react';
import { Card, Typography, Box, Rating } from '@mui/material';
import './BestsellerProducts.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const BestsellerCard = ({ product, tag }) => {
  
  const navigateTo = useNavigate();
  
  // Calculate the discounted price
  const discountedPrice = product.price - (product.price * (product.discount / 100));
  
  return (
    <Card className="bestseller-card">
      <div className="image-container" onClick={()=>navigateTo(`/product/${product._id}`)}>
        <img src={product.postImages[0]?.url} alt={product.title} className="product-image" />
        {tag && <div className="bestseller-tag">Bestseller</div>}
      </div>
      
      {product.length === 0 ? <h1 className="no-product">No Product Yet</h1> : 
        <Box className="product-details">
          <Typography variant="h6" className="product-name">
            {product.title}
          </Typography>
          
          <Box className="rating-container">
            <Rating 
              value={product.rating} 
              precision={0.5} 
              readOnly 
              size="small"
              className="rating-stars1"
            />
            <Typography variant="body2" className="review-count">
              ({product.reviewCount})
            </Typography>
          </Box>
          
          <div className="price-container">
            <Typography variant="h6" className="product-price">
              ₹{discountedPrice.toFixed(2)}
            </Typography>
            <Typography variant="body2" className="original-price">
              ₹{product.price.toFixed(2)}
            </Typography>
            <Typography variant="body2" className="discount-percentage">
              ({product.discount}% off)
            </Typography>
          </div>
          
          <button onClick={()=> navigateTo(`/product/${product._id}`)} className="add-to-cart-btn1">
           View
          </button>
        </Box>
      }
    </Card>
  );
};

const BestsellerProducts = ({ productName, tagLine, tag }) => {
  const [bestsellerProducts, setBestsellerProducts] = useState([]);

  const CategoryFetch = async() => {
    try {
      const response = await axios.get(`https://pr-crafts-backend.vercel.app/api/v1/post/category/${productName}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      setBestsellerProducts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  }
  
  const BestSellerFetch = async() => {
    try {
      const response = await axios.get("https://pr-crafts-backend.vercel.app/api/v1/user/bytag/BestSeller", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      setBestsellerProducts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    try {
      tag == true ? BestSellerFetch() : CategoryFetch();
    } catch (error) {
      console.log(error);
    }
  }, []);
  
  const navigateTo = useNavigate();

  return (
    <section className="bestsellers-section">
      <div className="section-header">
        <Typography variant="h4" className="section-title">
          {productName}
        </Typography>
        {tagLine && (
          <Typography className="section-tagline">
            {tagLine}
          </Typography>
        )}
      </div>
      
      <div className="bestsellers-grid">
        {bestsellerProducts.map(product => (
          <BestsellerCard tag={tag} key={product._id} product={product} />
        ))}
      </div>
      
      <div className="view-all-container" onClick={() => {tag ? navigateTo("/bestseller") : navigateTo(`/category/${productName}`)}}>
        <button className="view-all-btn">View All</button>
      </div>
    </section>
  );
};

export default BestsellerProducts;