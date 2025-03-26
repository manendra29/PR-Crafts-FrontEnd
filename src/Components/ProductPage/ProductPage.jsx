// import React, { useEffect, useState, useRef } from 'react';
// import { 
//   Button, 
//   TextField, 
//   Typography, 
//   Rating, 
//   IconButton, 
//   Container, 
//   Grid, 
//   Box, 
//   Card, 
//   CardContent, 
//   Divider, 
//   Chip,
//   CircularProgress 
// } from '@mui/material';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import './ProductPage.css';
// import ReviewSection from './ReviewSection';
// import Header from '../Layout/Header';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const ProductPage = () => {
//   const {id} = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const imagesContainerRef = useRef(null);
  
//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/v1/post/showpost/${id}`, {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json"
//           }
//         });
//         setProduct(response.data.post);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         setError("Failed to load product data");
//         setLoading(false);
//       }
//     };
//     fetchPost();
//   }, [id]);

//   // State management
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [customization, setCustomization] = useState('');

//   // Calculate discounted price safely
//   const discountedPrice = product && product.price
//     ? (product.discount 
//       ? (product.price - (product.price * product.discount / 100)).toFixed(2) 
//       : product.price.toFixed(2))
//     : "0.00";

//   // Image slider controls
//   const nextImage = () => {
//     if (!product || !product.postImages) return;
//     setCurrentImageIndex((prevIndex) => 
//       prevIndex === product.postImages.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevImage = () => {
//     if (!product || !product.postImages) return;
//     setCurrentImageIndex((prevIndex) => 
//       prevIndex === 0 ? product.postImages.length - 1 : prevIndex - 1
//     );
//   };

//   // Handle scroll behavior for images container
//   useEffect(() => {
//     const handleScroll = (e) => {
//       if (imagesContainerRef.current) {
//         const { scrollHeight, scrollTop, clientHeight } = imagesContainerRef.current;
//         const isScrolledToBottom = scrollHeight - scrollTop <= clientHeight + 5;
        
//         if (!isScrolledToBottom) {
//           e.preventDefault();
//           e.stopPropagation();
//         }
//       }
//     };

//     const imagesContainer = imagesContainerRef.current;
//     if (imagesContainer) {
//       imagesContainer.addEventListener('wheel', handleScroll, { passive: false });
//     }

//     return () => {
//       if (imagesContainer) {
//         imagesContainer.removeEventListener('wheel', handleScroll);
//       }
//     };
//   }, []);

//   // Quantity controls
//   const increaseQuantity = () => setQuantity(quantity + 1);
//   const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  
//   // WhatsApp message generation
//   const generateWhatsAppMessage = () => {
//     if (!product) return "";
//     const message = `Hi, I'm interested in buying ${quantity} of the ${product.username || product.title || "product"}${customization ? ` with this customization: ${customization}` : ''}. Could you provide more details?`;
//     const encodedMessage = encodeURIComponent(message);
//     return `https://wa.me/1234567890?text=${encodedMessage}`;
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <Typography variant="h5" color="error">{error}</Typography>
//       </Box>
//     );
//   }

//   if (!product) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <Typography variant="h5">Product not found</Typography>
//       </Box>
//     );
//   }

//   return (
//     <>
//     <div className="product-header">
//       <Header />
//     </div>
     
//     <Container maxWidth="lg" className="product-page-container">
//       <Grid container spacing={3}>
//         {/* Product Images Section */}
//         <Grid item xs={12} md={6}>
//           <div className="images-scroll-container" ref={imagesContainerRef}>
//             <Card className="image-card">
//               <div className="image-slider-container">
//                 {product.postImages && product.postImages.length > 0 ? (
//                   <img 
//                     src={`http://localhost:4000/${product.postImages[currentImageIndex]}`} 
//                     alt={`${product.title || "Product"} view ${currentImageIndex + 1}`} 
//                     className="product-image"
//                   />
//                 ) : (
//                   <Box display="flex" justifyContent="center" alignItems="center" height="300px">
//                     <Typography>No image available</Typography>
//                   </Box>
//                 )}
                
//                 {product.postImages && product.postImages.length > 1 && (
//                   <div className="image-slider-controls">
//                     <IconButton onClick={prevImage} className="slider-button prev">
//                       <ArrowBackIosIcon />
//                     </IconButton>
//                     <IconButton onClick={nextImage} className="slider-button next">
//                       <ArrowForwardIosIcon />
//                     </IconButton>
//                   </div>
//                 )}
//               </div>
              
//               {/* Thumbnails */}
//               {product.postImages && product.postImages.length > 1 && (
//                 <div className="thumbnail-container">
//                   {product.postImages.map((image, index) => (
//                     <div 
//                       key={index} 
//                       className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
//                       onClick={() => setCurrentImageIndex(index)}
//                     >
//                       <img 
//                         src={`http://localhost:4000/${image}`} 
//                         alt={`Thumbnail ${index + 1}`} 
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </Card>

//             {/* All Product Images */}
//             {product.postImages && product.postImages.length > 1 && (
//               <div className="all-images-container">
//                 <Typography variant="h6" component="h3" className="subsection-title">
//                   All Product Images
//                 </Typography>
//                 <div className="images-grid">
//                   {product.postImages.map((image, index) => (
//                     <div 
//                       key={index}
//                       className="full-image-wrapper"
//                       onClick={() => setCurrentImageIndex(index)}
//                     >
//                       <img 
//                         src={`http://localhost:4000/${image}`}
//                         alt={`Product view ${index + 1}`}
//                         className="full-product-image"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </Grid>

//         {/* Product Details Section */}
//         <Grid item xs={12} md={6}>
//           <Card className="details-card">
//             <CardContent>
//               <Typography variant="h4" component="h1" className="product-title">
//                 {product.name || product.title || "Untitled Product"}
//               </Typography>
              
//               {product.rating !== undefined && (
//                 <Box className="rating-container">
//                   <Rating 
//                     name="read-only" 
//                     value={product.rating} 
//                     precision={0.5} 
//                     readOnly 
//                   />
//                   <Typography variant="body2" className="review-count">
//                     ({product.reviewCount || 0} reviews)
//                   </Typography>
//                 </Box>
//               )}

//               <Box className="price-container">
//                 {product.price && (
//                   <>
//                     {product.discount ? (
//                       <>
//                         <Typography variant="h5" component="span" className="discounted-price">
//                           ${discountedPrice}
//                         </Typography>
//                         <Typography variant="body1" component="span" className="original-price">
//                           ${product.price.toFixed(2)}
//                         </Typography>
//                         <Chip 
//                           label={`${product.discount}% OFF`} 
//                           size="small" 
//                           color="secondary" 
//                           className="discount-chip"
//                         />
//                       </>
//                     ) : (
//                       <Typography variant="h5" component="span">
//                         ${product.price.toFixed(2)}
//                       </Typography>
//                     )}
//                   </>
//                 )}
//               </Box>

//               {product.inStock !== undefined && (
//                 <Typography variant="body1" className="availability">
//                   {product.inStock ? (
//                     <span className="in-stock">In Stock</span>
//                   ) : (
//                     <span className="out-of-stock">Out of Stock</span>
//                   )}
//                 </Typography>
//               )}

//               {product.tags && product.tags.length > 0 && (
//                 <Box className="tags-container">
//                   {product.tags.map((tag, index) => (
//                     <Chip 
//                       key={index} 
//                       label={tag} 
//                       variant="outlined" 
//                       size="small" 
//                       className="tag-chip"
//                     />
//                   ))}
//                 </Box>
//               )}
              
//               {/* Product Specifications */}
//               {product.specification && (
//                 <div className="specification-wrapper">
//                   <Typography variant="subtitle1" component="h3" className="spec-section-title">
//                     Specification:
//                   </Typography>
//                   <Typography variant="body2" className="spec-text">
//                     {product.specification}
//                   </Typography>
//                 </div>
//               )}
              
//               {product.description && (
//                 <Typography variant="body1" className="short-description">
//                   {product.description}
//                 </Typography>
//               )}

//               <Divider className="section-divider" />

//               {/* Quantity Selector */}
//               <Box className="quantity-selector">
//                 <Typography variant="body1" component="span">
//                   Quantity:
//                 </Typography>
//                 <div className="quantity-controls">
//                   <Button 
//                     onClick={decreaseQuantity} 
//                     variant="outlined" 
//                     className="quantity-button"
//                   >
//                     -
//                   </Button>
//                   <Typography variant="body1" className="quantity-display">
//                     {quantity}
//                   </Typography>
//                   <Button 
//                     onClick={increaseQuantity} 
//                     variant="outlined" 
//                     className="quantity-button"
//                   >
//                     +
//                   </Button>
//                 </div>
//               </Box>

//               {/* Customization Field */}
//               <TextField
//                 label="Customization Instructions"
//                 multiline
//                 rows={2}
//                 variant="outlined"
//                 fullWidth
//                 placeholder="Tell us how you'd like to customize this product..."
//                 className="customization-field"
//                 value={customization}
//                 onChange={(e) => setCustomization(e.target.value)}
//               />

//               {/* Action Buttons */}
//               <Box className="action-buttons">
//                 <Button 
//                   variant="contained" 
//                   color="primary" 
//                   startIcon={<AddShoppingCartIcon />}
//                   className="add-to-cart-button"
//                   fullWidth
//                 >
//                   Add to Cart
//                 </Button>
                
//                 <Button 
//                   variant="outlined" 
//                   color="success"
//                   startIcon={<WhatsAppIcon />}
//                   className="whatsapp-button"
//                   fullWidth
//                   component="a"
//                   href={generateWhatsAppMessage()}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Contact on WhatsApp
//                 </Button>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
      
//       {/* Product Description Section */}
//       {product.description && (
//         <Grid container spacing={3} className="description-section">
//           <Grid item xs={12}>
//             <Card className="description-card">
//               <CardContent>
//                 <Typography variant="h5" component="h2" className="section-title">
//                   Product Description
//                 </Typography>
//                 <Divider className="section-divider-small" />
//                 <Typography variant="body1" className="long-description">
//                   {product.description}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       )}

//       <ReviewSection />
//     </Container>
//     </>
//   );
// };

// export default ProductPage;






import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Layout/Header';
import ReviewSection from './ReviewSection';
import Footer from '../Layout/Footer';
import toast from 'react-hot-toast';

// Icons (using Heroicons equivalents via React components)
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

// StarIcon for ratings
const StarIcon = ({ filled }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"} 
    stroke={filled ? "" : "currentColor"} 
    className={`w-5 h-5 ${filled ? "text-amber-400" : "text-gray-300"}`}
  >
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState('');
  const [viewingFullImage, setViewingFullImage] = useState(false);





  const handleAddToCart=async(e)=>{
    e.preventDefault();
    console.log(product.postImages[0]);
    const price=product.discount ? (product.price - (product.price * product.discount / 100)).toFixed(2) : product.price.toFixed(2);
    try {
      await axios.post(`http://localhost:4000/api/v1/user/addtocart/${id}`,{quantity:quantity,
        customization:customization,
        title:product.title,
        image:product.postImages[0],
        price:price,
      },{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      });
      toast.success("Added To Cart");
    } catch (error) {
      console.log(error);
    }
  }









  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/post/showpost/${id}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        });
        setProduct(response.data.post);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to load product data");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Calculate discounted price safely
  const discountedPrice = product && product.price
    ? (product.discount 
      ? (product.price - (product.price * product.discount / 100)).toFixed(2) 
      : product.price.toFixed(2))
    : "0.00";

  // Image slider controls
  const nextImage = () => {
    if (!product || !product.postImages) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === product.postImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    if (!product || !product.postImages) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? product.postImages.length - 1 : prevIndex - 1
    );
  };

  // Expanded image view toggle
  const toggleFullImage = () => {
    setViewingFullImage(!viewingFullImage);
  };

  // Quantity controls
  const increaseQuantity = () => product.quantity>=quantity ? setQuantity( quantity + 1):toast.error("Max Quantity");
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  
  // WhatsApp message generation
  const generateWhatsAppMessage = () => {
    if (!product) return "";
    const message = `Hi, I'm interested in buying ${quantity} of the ${product.name || product.title || "product"}${customization ? ` with this customization: ${customization}` : ''}. Could you provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/7405678171?text=${encodedMessage}`;
  };

  // Rating stars
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon key={star} filled={star <= rating} />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700 text-xl">Product not found</p>
      </div>
    );
  }

  // Modal for fullscreen image preview
  const FullscreenImageModal = () => {
    if (!viewingFullImage) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
        <button 
          className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
          onClick={toggleFullImage}
        >
          ✕
        </button>
        
        <div className="relative w-full max-w-5xl mx-auto">
          {product.postImages && product.postImages.length > 0 ? (
            <img 
              src={product.postImages[currentImageIndex]?.url} 
              alt={`${product.title || "Product"}`}
              className="mx-auto max-h-screen object-contain"
            />
          ) : null}
          
          {product.postImages && product.postImages.length > 1 && (
            <div className="absolute inset-x-0 top-1/2 flex items-center justify-between px-4 transform -translate-y-1/2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="bg-white bg-opacity-30 rounded-full p-2 hover:bg-opacity-50 transition-all focus:outline-none"
              >
                <ChevronLeftIcon />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="bg-white bg-opacity-30 rounded-full p-2 hover:bg-opacity-50 transition-all focus:outline-none"
              >
                <ChevronRightIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
    <div className="bg-gray-50 min-h-screen">
      {/* Full-screen image modal */}
      <FullscreenImageModal />
      
      {/* Header - placeholder for your Header component */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-gray-800 font-medium">Your Store Name</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Images */}
            <div className="w-full lg:w-3/5 p-4">
              {/* Featured Image */}
              <div className="relative mb-4 bg-gray-50 rounded-lg overflow-hidden">
                {product.postImages && product.postImages.length > 0 ? (
                  <div className="aspect-w-1 aspect-h-1">
                    <img 
                      src={product.postImages[currentImageIndex]?.url} 
                      alt={`${product.title || "Product"}`}
                      className="w-full h-full object-contain cursor-zoom-in"
                      onClick={toggleFullImage}
                    />
                  </div>
                ) : (
                  <div className="aspect-w-1 aspect-h-1 flex justify-center items-center bg-gray-100">
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}
                
                {/* Navigation arrows */}
                {product.postImages && product.postImages.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between px-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all focus:outline-none"
                    >
                      <ChevronLeftIcon />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all focus:outline-none"
                    >
                      <ChevronRightIcon />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Image thumbnails grid */}
              {product.postImages && product.postImages.length > 1 && (
                <div className="mt-2">
                  <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2">
                    {product.postImages.map((image, index) => (
                      <div 
                        key={index} 
                        className={`aspect-w-1 aspect-h-1 cursor-pointer rounded-md overflow-hidden border-2 ${
                          index === currentImageIndex ? 'border-indigo-600' : 'border-transparent hover:border-gray-300'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img 
                          src={`http://localhost:4000/${image}`} 
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right side - Product Info */}
            <div className="w-full lg:w-2/5 p-6 lg:border-l border-gray-200 bg-white">
              {/* Product header */}
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  {product.name || product.title || "Untitled Product"}
                </h1>
                <button className="text-gray-400 hover:text-red-500 focus:outline-none transition-colors">
                  <HeartIcon />
                </button>
              </div>

              {/* Rating */}
              {product.rating !== undefined && (
                <div className="mt-4 flex items-center">
                  {renderStars(product.rating)}
                  <span className="ml-2 text-sm text-gray-500">
                    ({product.reviewCount || 0} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mt-4">
                {product.price && (
                  <div className="flex items-baseline flex-wrap">
                    {product.discount ? (
                      <>
                        <span className="text-2xl font-bold text-indigo-600 mr-2">
                          ${discountedPrice}
                        </span>
                        <span className="text-lg text-gray-400 line-through">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="ml-2 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                          {product.discount}% OFF
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-indigo-600">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Availability */}
              {product.stock != "Out Of Stocks" && (
                <div className="mt-4">
                  {product.stock ? (
                    <span className="text-green-600 font-medium">In Stock</span>
                  ) : (
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  )}
                </div>
              )}

              {/* Tags */}
              {product.tag  && (
                <div className="mt-4 flex flex-wrap gap-2">
                 
                    <span 
                      key={product._id} 
                      className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800"
                    >
                      {product.tag}
                    </span>
                </div>
              )}

              {/* Divider */}
              <div className="mt-6 border-t border-gray-200"></div>

              {/* Short description */}
              {product.description && (
                <div className="mt-6">
                  <p className="text-gray-700 text-sm leading-6">
                    {product.description.length > 200 
                      ? `${product.description.substring(0, 200)}...` 
                      : product.description}
                  </p>
                </div>
              )}

              {/* Specifications */}
              {product.specification && (
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">Specifications</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-6">
                    {product.specification}
                  </p>
                </div>
              )}

              {/* Quantity selector */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button 
                    onClick={decreaseQuantity}
                    className="rounded-l-md bg-gray-100 py-2 px-3 border border-gray-300 text-gray-600 hover:bg-gray-200 focus:outline-none"
                  >
                    -
                  </button>
                  <div  className="w-12 text-center py-2 border-t border-b border-gray-300 bg-white text-gray-700">
                    {quantity}
                  </div>
                  <button 
                    onClick={increaseQuantity}
                    className="rounded-r-md bg-gray-100 py-2 px-3 border border-gray-300 text-gray-600 hover:bg-gray-200 focus:outline-none"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Customization */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customization Instructions
                </label>
                <textarea
                  rows="3"
                  placeholder="Tell us how you'd like to customize this product..."
                  className="mt-1 w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
                  value={customization}
                  onChange={(e) => setCustomization(e.target.value)}
                ></textarea>
              </div>

              {/* CTA Buttons */}
              <div className="mt-6 grid grid-cols-1 gap-4">
                <button 
                onClick={handleAddToCart}
                  className="inline-flex justify-center items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  <ShoppingCartIcon />
                  <span className="ml-2">Add to Cart</span>
                </button>
                
                <a 
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center px-5 py-3 border border-green-600 text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  <WhatsAppIcon />
                  <span className="ml-2">Contact on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Product description */}
        {product.description && (
          <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Product Description</h2>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        )}
       
      </main>

      <ReviewSection />
      <Footer />
    </div>
   
    </>
  );
};

export default ProductPage;