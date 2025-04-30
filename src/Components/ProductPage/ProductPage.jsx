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
//         const response = await axios.get(`https://pr-crafts-backend.vercel.app/api/v1/post/showpost/${id}`, {
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
//                     src={`https://pr-crafts-backend.vercel.app/${product.postImages[currentImageIndex]}`} 
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
//                         src={`https://pr-crafts-backend.vercel.app/${image}`} 
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
//                         src={`https://pr-crafts-backend.vercel.app/${image}`}
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






// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Header from '../Layout/Header';
// import ReviewSection from './ReviewSection';
// import Footer from '../Layout/Footer';
// import toast from 'react-hot-toast';

// // Icons (using Heroicons equivalents via React components)
// const HeartIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//   </svg>
// );

// const ShoppingCartIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//   </svg>
// );

// const WhatsAppIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
//     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//   </svg>
// );

// const ChevronLeftIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//   </svg>
// );

// const ChevronRightIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//   </svg>
// );

// // StarIcon for ratings
// const StarIcon = ({ filled }) => (
//   <svg 
//     xmlns="http://www.w3.org/2000/svg" 
//     viewBox="0 0 24 24" 
//     fill={filled ? "currentColor" : "none"} 
//     stroke={filled ? "" : "currentColor"} 
//     className={`w-5 h-5 ${filled ? "text-amber-400" : "text-gray-300"}`}
//   >
//     <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
//   </svg>
// );

// const ProductPage = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [customization, setCustomization] = useState('');
//   const [viewingFullImage, setViewingFullImage] = useState(false);





//   const handleAddToCart=async(e)=>{
//     e.preventDefault();
//     console.log(product.postImages[0]);
//     const price=product.discount ? (product.price - (product.price * product.discount / 100)).toFixed(2) : product.price.toFixed(2);
//     try {
//       await axios.post(`https://pr-crafts-backend.vercel.app/api/v1/user/addtocart/${id}`,{quantity:quantity,
//         customization:customization,
//         title:product.title,
//         image:product.postImages[0],
//         price:price,
//       },{
//         withCredentials:true,
//         headers:{
//           "Content-Type":"application/json"
//         }
//       });
//       toast.success("Added To Cart");
//     } catch (error) {
//       console.log(error);
//     }
//   }









  
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`https://pr-crafts-backend.vercel.app/api/v1/post/showpost/${id}`, {
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
//     fetchProduct();
//   }, [id]);

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

//   // Expanded image view toggle
//   const toggleFullImage = () => {
//     setViewingFullImage(!viewingFullImage);
//   };

//   // Quantity controls
//   const increaseQuantity = () => product.quantity>=quantity ? setQuantity( quantity + 1):toast.error("Max Quantity");
//   const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  
//   // WhatsApp message generation
//   const generateWhatsAppMessage = () => {
//     if (!product) return "";
//     const message = `Hi, I'm interested in buying ${quantity} of the ${product.name || product.title || "product"}${customization ? ` with this customization: ${customization}` : ''}. Could you provide more details?`;
//     const encodedMessage = encodeURIComponent(message);
//     return `https://wa.me/7405678171?text=${encodedMessage}`;
//   };

//   // Rating stars
//   const renderStars = (rating) => {
//     return (
//       <div className="flex">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <StarIcon key={star} filled={star <= rating} />
//         ))}
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-red-500 text-xl">{error}</p>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-700 text-xl">Product not found</p>
//       </div>
//     );
//   }

//   // Modal for fullscreen image preview
//   const FullscreenImageModal = () => {
//     if (!viewingFullImage) return null;
    
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
//         <button 
//           className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
//           onClick={toggleFullImage}
//         >
//           ✕
//         </button>
        
//         <div className="relative w-full max-w-5xl mx-auto">
//           {product.postImages && product.postImages.length > 0 ? (
//             <img 
//               src={product.postImages[currentImageIndex]?.url} 
//               alt={`${product.title || "Product"}`}
//               className="mx-auto max-h-screen object-contain"
//             />
//           ) : null}
          
//           {product.postImages && product.postImages.length > 1 && (
//             <div className="absolute inset-x-0 top-1/2 flex items-center justify-between px-4 transform -translate-y-1/2">
//               <button 
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   prevImage();
//                 }}
//                 className="bg-white bg-opacity-30 rounded-full p-2 hover:bg-opacity-50 transition-all focus:outline-none"
//               >
//                 <ChevronLeftIcon />
//               </button>
//               <button 
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   nextImage();
//                 }}
//                 className="bg-white bg-opacity-30 rounded-full p-2 hover:bg-opacity-50 transition-all focus:outline-none"
//               >
//                 <ChevronRightIcon />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <Header />
//     <div className="bg-gray-50 min-h-screen">
//       {/* Full-screen image modal */}
//       <FullscreenImageModal />
      
//       {/* Header - placeholder for your Header component */}
//       <header className="bg-white shadow">
//         <div className="container mx-auto px-4 py-4">
//           <h1 className="text-gray-800 font-medium">Your Store Name</h1>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="flex flex-col lg:flex-row">
//             {/* Left side - Images */}
//             <div className="w-full lg:w-3/5 p-4">
//               {/* Featured Image */}
//               <div className="relative mb-4 bg-gray-50 rounded-lg overflow-hidden">
//                 {product.postImages && product.postImages.length > 0 ? (
//                   <div className="aspect-w-1 aspect-h-1">
//                     <img 
//                       src={product.postImages[currentImageIndex]?.url} 
//                       alt={`${product.title || "Product"}`}
//                       className="w-full h-full object-contain cursor-zoom-in"
//                       onClick={toggleFullImage}
//                     />
//                   </div>
//                 ) : (
//                   <div className="aspect-w-1 aspect-h-1 flex justify-center items-center bg-gray-100">
//                     <p className="text-gray-500">No image available</p>
//                   </div>
//                 )}
                
//                 {/* Navigation arrows */}
//                 {product.postImages && product.postImages.length > 1 && (
//                   <div className="absolute inset-0 flex items-center justify-between px-4">
//                     <button 
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         prevImage();
//                       }}
//                       className="bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all focus:outline-none"
//                     >
//                       <ChevronLeftIcon />
//                     </button>
//                     <button 
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         nextImage();
//                       }}
//                       className="bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all focus:outline-none"
//                     >
//                       <ChevronRightIcon />
//                     </button>
//                   </div>
//                 )}
//               </div>
              
//               {/* Image thumbnails grid */}
//               {product.postImages && product.postImages.length > 1 && (
//                 <div className="mt-2">
//                   <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2">
//                     {product.postImages.map((image, index) => (
//                       <div 
//                         key={index} 
//                         className={`aspect-w-1 aspect-h-1 cursor-pointer rounded-md overflow-hidden border-2 ${
//                           index === currentImageIndex ? 'border-indigo-600' : 'border-transparent hover:border-gray-300'
//                         }`}
//                         onClick={() => setCurrentImageIndex(index)}
//                       >
//                         <img 
//                           src={`https://pr-crafts-backend.vercel.app/${image}`} 
//                           alt={`Thumbnail ${index + 1}`}
//                           className="w-full h-full object-cover" 
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Right side - Product Info */}
//             <div className="w-full lg:w-2/5 p-6 lg:border-l border-gray-200 bg-white">
//               {/* Product header */}
//               <div className="flex justify-between items-start">
//                 <h1 className="text-2xl font-bold text-gray-900 leading-tight">
//                   {product.name || product.title || "Untitled Product"}
//                 </h1>
//                 <button className="text-gray-400 hover:text-red-500 focus:outline-none transition-colors">
//                   <HeartIcon />
//                 </button>
//               </div>

//               {/* Rating */}
//               {product.rating !== undefined && (
//                 <div className="mt-4 flex items-center">
//                   {renderStars(product.rating)}
//                   <span className="ml-2 text-sm text-gray-500">
//                     ({product.reviewCount || 0} reviews)
//                   </span>
//                 </div>
//               )}

//               {/* Price */}
//               <div className="mt-4">
//                 {product.price && (
//                   <div className="flex items-baseline flex-wrap">
//                     {product.discount ? (
//                       <>
//                         <span className="text-2xl font-bold text-indigo-600 mr-2">
//                           ${discountedPrice}
//                         </span>
//                         <span className="text-lg text-gray-400 line-through">
//                           ${product.price.toFixed(2)}
//                         </span>
//                         <span className="ml-2 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
//                           {product.discount}% OFF
//                         </span>
//                       </>
//                     ) : (
//                       <span className="text-2xl font-bold text-indigo-600">
//                         ${product.price.toFixed(2)}
//                       </span>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Availability */}
//               {product.stock != "Out Of Stocks" && (
//                 <div className="mt-4">
//                   {product.stock ? (
//                     <span className="text-green-600 font-medium">In Stock</span>
//                   ) : (
//                     <span className="text-red-600 font-medium">Out of Stock</span>
//                   )}
//                 </div>
//               )}

//               {/* Tags */}
//               {product.tag  && (
//                 <div className="mt-4 flex flex-wrap gap-2">
                 
//                     <span 
//                       key={product._id} 
//                       className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800"
//                     >
//                       {product.tag}
//                     </span>
//                 </div>
//               )}

//               {/* Divider */}
//               <div className="mt-6 border-t border-gray-200"></div>

//               {/* Short description */}
//               {product.description && (
//                 <div className="mt-6">
//                   <p className="text-gray-700 text-sm leading-6">
//                     {product.description.length > 200 
//                       ? `${product.description.substring(0, 200)}...` 
//                       : product.description}
//                   </p>
//                 </div>
//               )}

//               {/* Specifications */}
//               {product.specification && (
//                 <div className="mt-6 bg-gray-50 rounded-lg p-4">
//                   <h3 className="font-medium text-gray-900">Specifications</h3>
//                   <p className="mt-2 text-sm text-gray-600 leading-6">
//                     {product.specification}
//                   </p>
//                 </div>
//               )}

//               {/* Quantity selector */}
//               <div className="mt-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Quantity
//                 </label>
//                 <div className="flex items-center">
//                   <button 
//                     onClick={decreaseQuantity}
//                     className="rounded-l-md bg-gray-100 py-2 px-3 border border-gray-300 text-gray-600 hover:bg-gray-200 focus:outline-none"
//                   >
//                     -
//                   </button>
//                   <div  className="w-12 text-center py-2 border-t border-b border-gray-300 bg-white text-gray-700">
//                     {quantity}
//                   </div>
//                   <button 
//                     onClick={increaseQuantity}
//                     className="rounded-r-md bg-gray-100 py-2 px-3 border border-gray-300 text-gray-600 hover:bg-gray-200 focus:outline-none"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* Customization */}
//               <div className="mt-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Customization Instructions
//                 </label>
//                 <textarea
//                   rows="3"
//                   placeholder="Tell us how you'd like to customize this product..."
//                   className="mt-1 w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
//                   value={customization}
//                   onChange={(e) => setCustomization(e.target.value)}
//                 ></textarea>
//               </div>

//               {/* CTA Buttons */}
//               <div className="mt-6 grid grid-cols-1 gap-4">
//                 <button 
//                 onClick={handleAddToCart}
//                   className="inline-flex justify-center items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
//                 >
//                   <ShoppingCartIcon />
//                   <span className="ml-2">Add to Cart</span>
//                 </button>
                
//                 <a 
//                   href={generateWhatsAppMessage()}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex justify-center items-center px-5 py-3 border border-green-600 text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
//                 >
//                   <WhatsAppIcon />
//                   <span className="ml-2">Contact on WhatsApp</span>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product description */}
//         {product.description && (
//           <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
//             <div className="p-6">
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Product Description</h2>
//               <div className="border-t border-gray-200 pt-4">
//                 <p className="text-gray-700 leading-relaxed">
//                   {product.description}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
       
//       </main>

//       <ReviewSection />
//       <Footer />
//     </div>
   
//     </>
//   );
// };

// export default ProductPage;








































// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Header from '../Layout/Header';
// import ReviewSection from './ReviewSection';
// import Footer from '../Layout/Footer';
// import toast from 'react-hot-toast';
// import { motion, AnimatePresence } from 'framer-motion';

// // Icons
// const HeartIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//   </svg>
// );

// const ShoppingCartIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//   </svg>
// );

// const WhatsAppIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
//     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//   </svg>
// );

// const ChevronLeftIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//   </svg>
// );

// const ChevronRightIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//   </svg>
// );

// // StarIcon for ratings
// const StarIcon = ({ filled }) => (
//   <svg 
//     xmlns="http://www.w3.org/2000/svg" 
//     viewBox="0 0 24 24" 
//     fill={filled ? "currentColor" : "none"} 
//     stroke={filled ? "" : "currentColor"} 
//     className={`w-5 h-5 ${filled ? "text-gray-800" : "text-gray-300"}`}
//   >
//     <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
//   </svg>
// );

// const ProductPage = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [customization, setCustomization] = useState('');
//   const [viewingFullImage, setViewingFullImage] = useState(false);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);

//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     setIsAddingToCart(true);
//     try {
//       const price = product.discount 
//         ? (product.price - (product.price * product.discount / 100)).toFixed(2) 
//         : product.price.toFixed(2);
      
//       await axios.post(`https://pr-crafts-backend.vercel.app/api/v1/user/addtocart/${id}`, {
//         quantity: quantity,
//         customization: customization,
//         title: product.title,
//         image: product.postImages[0],
//         price: price,
//       }, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });
      
//       toast.success("Added To Cart");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to add to cart");
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`https://pr-crafts-backend.vercel.app/api/v1/post/showpost/${id}`, {
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
//     fetchProduct();
//   }, [id]);

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

//   // Expanded image view toggle
//   const toggleFullImage = () => {
//     setViewingFullImage(!viewingFullImage);
//   };

//   // Quantity controls
//   const increaseQuantity = () => {
//     if (product.quantity >= quantity) {
//       setQuantity(quantity + 1);
//     } else {
//       toast.error("Max Quantity");
//     }
//   };
  
//   const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  
//   // WhatsApp message generation
//   const generateWhatsAppMessage = () => {
//     if (!product) return "";
//     const message = `Hi, I'm interested in buying ${quantity} of the ${product.name || product.title || "product"}${customization ? ` with this customization: ${customization}` : ''}. Could you provide more details?`;
//     const encodedMessage = encodeURIComponent(message);
//     return `https://wa.me/7405678171?text=${encodedMessage}`;
//   };

//   // Rating stars
//   const renderStars = (rating) => {
//     return (
//       <div className="flex">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <StarIcon key={star} filled={star <= rating} />
//         ))}
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="flex flex-col items-center">
//           <div className="w-16 h-16 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
//           <p className="mt-4 text-gray-800 font-medium">Loading product details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md"
//         >
//           <div className="mb-4 text-red-500">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
//           <p className="text-gray-600">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="mt-6 px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
//           >
//             Try Again
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md"
//         >
//           <div className="mb-4 text-gray-500">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25-2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
//           <p className="text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
//           <button 
//             onClick={() => window.history.back()}
//             className="mt-6 px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
//           >
//             Go Back
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   // Modal for fullscreen image preview
//   const FullscreenImageModal = () => {
//     if (!viewingFullImage) return null;
    
//     return (
//       <AnimatePresence>
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center backdrop-blur-sm"
//         >
//           <motion.button 
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.2 }}
//             className="absolute top-4 right-4 text-white text-2xl focus:outline-none bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-all"
//             onClick={toggleFullImage}
//           >
//             ✕
//           </motion.button>
          
//           <motion.div 
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ type: "spring", damping: 25 }}
//             className="relative w-full max-w-5xl mx-auto"
//           >
//             {product.postImages && product.postImages.length > 0 ? (
//               <img 
//                 src={product.postImages[currentImageIndex]?.url} 
//                 alt={`${product.title || "Product"}`}
//                 className="mx-auto max-h-screen object-contain"
//               />
//             ) : null}
            
//             {product.postImages && product.postImages.length > 1 && (
//               <div className="absolute inset-x-0 top-1/2 flex items-center justify-between px-4 transform -translate-y-1/2">
//                 <motion.button 
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     prevImage();
//                   }}
//                   className="bg-white bg-opacity-20 rounded-full p-3 hover:bg-opacity-30 transition-all focus:outline-none"
//                 >
//                   <ChevronLeftIcon />
//                 </motion.button>
//                 <motion.button 
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     nextImage();
//                   }}
//                   className="bg-white bg-opacity-20 rounded-full p-3 hover:bg-opacity-30 transition-all focus:outline-none"
//                 >
//                   <ChevronRightIcon />
//                 </motion.button>
//               </div>
//             )}
//           </motion.div>
//         </motion.div>
//       </AnimatePresence>
//     );
//   };

//   return (
//     <>
//       <Header />
//       <div className="bg-gray-50 min-h-screen">
//         {/* Full-screen image modal */}
//         <FullscreenImageModal />
        
//         <main className="container mx-auto px-4  md:pt">
//           <motion.section
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="bg-white rounded-xl shadow-xl overflow-hidden"
//           >
//             <div className="flex flex-col lg:flex-row">
//               {/* Left side - Images */}
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="w-full lg:w-3/5 p-4 md:p-6"
//               >
//                 {/* Featured Image */}
//                 <div className="relative mb-4 bg-gray-50 rounded-lg overflow-hidden shadow-inner">
//                   {product.postImages && product.postImages.length > 0 ? (
//                     <motion.div 
//                       className="aspect-w-1 aspect-h-1"
//                       layoutId={`product-image-${currentImageIndex}`}
//                     >
//                       <img 
//                         src={product.postImages[currentImageIndex]?.url} 
//                         alt={`${product.title || "Product"}`}
//                         className="w-full h-full object-contain cursor-zoom-in transition-all duration-300 hover:scale-105"
//                         onClick={toggleFullImage}
//                       />
//                     </motion.div>
//                   ) : (
//                     <div className="aspect-w-1 aspect-h-1 flex justify-center items-center bg-gray-100">
//                       <p className="text-gray-500">No image available</p>
//                     </div>
//                   )}
                  
//                   {/* Navigation arrows */}
//                   {product.postImages && product.postImages.length > 1 && (
//                     <div className="absolute inset-0 flex items-center justify-between px-4">
//                       <motion.button 
//                         whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.9)" }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           prevImage();
//                         }}
//                         className="bg-white bg-opacity-70 rounded-full p-2 shadow-lg hover:bg-opacity-100 transition-all focus:outline-none z-10"
//                       >
//                         <ChevronLeftIcon />
//                       </motion.button>
//                       <motion.button 
//                         whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.9)" }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           nextImage();
//                         }}
//                         className="bg-white bg-opacity-70 rounded-full p-2 shadow-lg hover:bg-opacity-100 transition-all focus:outline-none z-10"
//                       >
//                         <ChevronRightIcon />
//                       </motion.button>
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Image thumbnails grid */}
//                 {product.postImages && product.postImages.length > 1 && (
//                   <motion.div 
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 }}
//                     className="mt-4"
//                   >
//                     <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2">
//                       {product.postImages.map((image, index) => (
//                         <motion.div 
//                           key={index}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           className={`aspect-w-1 aspect-h-1 cursor-pointer rounded-md overflow-hidden border-2 transition-all duration-200 ${
//                             index === currentImageIndex ? 'border-black shadow-md' : 'border-transparent hover:border-gray-300'
//                           }`}
//                           onClick={() => setCurrentImageIndex(index)}
//                         >
//                           <img 
//                             src={`https://pr-crafts-backend.vercel.app/${image}`} 
//                             alt={`Thumbnail ${index + 1}`}
//                             className="w-full h-full object-cover transition-all duration-300" 
//                           />
//                         </motion.div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </motion.div>

//               {/* Right side - Product Info */}
//               <motion.div 
//                 initial={{ opacity: 0, x: 30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.3, duration: 0.6 }}
//                 className="w-full lg:w-2/5 p-6 lg:border-l border-gray-200 bg-white"
//               >
//                 {/* Product header */}
//                 <div className="flex justify-between items-start">
//                   <motion.h1 
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.4 }}
//                     className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight"
//                   >
//                     {product.name || product.title || "Untitled Product"}
//                   </motion.h1>
//                   <motion.button 
//                     whileHover={{ scale: 1.1, color: "#f43f5e" }}
//                     whileTap={{ scale: 0.95 }}
//                     className="text-gray-400 hover:text-red-500 focus:outline-none transition-colors"
//                   >
//                     <HeartIcon />
//                   </motion.button>
//                 </div>

//                 {/* Rating */}
//                 {product.rating !== undefined && (
//                   <motion.div 
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.5 }}
//                     className="mt-4 flex items-center"
//                   >
//                     {renderStars(product.rating)}
//                     <span className="ml-2 text-sm text-gray-500">
//                       ({product.reviewCount || 0} reviews)
//                     </span>
//                   </motion.div>
//                 )}

//                 {/* Price */}
//                 <motion.div 
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.6 }}
//                   className="mt-6"
//                 >
//                   {product.price && (
//                     <div className="flex items-baseline flex-wrap">
//                       {product.discount ? (
//                         <>
//                           <span className="text-2xl md:text-3xl font-bold text-black mr-2">
//                             ${discountedPrice}
//                           </span>
//                           <span className="text-lg text-gray-400 line-through">
//                             ${product.price.toFixed(2)}
//                           </span>
//                           <motion.span 
//                             initial={{ scale: 0.8 }}
//                             animate={{ scale: 1 }}
//                             transition={{ delay: 0.7, type: "spring" }}
//                             className="ml-2 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white"
//                           >
//                             {product.discount}% OFF
//                           </motion.span>
//                         </>
//                       ) : (
//                         <span className="text-2xl md:text-3xl font-bold text-black">
//                           ${product.price.toFixed(2)}
//                         </span>
//                       )}
//                     </div>
//                   )}
//                 </motion.div>

//                 {/* Availability */}
//                 {product.stock != "Out Of Stocks" && (
//                   <motion.div 
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.7 }}
//                     className="mt-4"
//                   >
//                     {product.stock ? (
//                       <div className="flex items-center">
//                         <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
//                         <span className="text-green-600 font-medium">In Stock</span>
//                       </div>
//                     ) : (
//                       <div className="flex items-center">
//                         <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
//                         <span className="text-red-600 font-medium">Out of Stock</span>
//                       </div>
//                     )}
//                   </motion.div>
//                 )}

//                 {/* Tags */}
//                 {product.tag && (
//                   <motion.div 
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.8 }}
//                     className="mt-4 flex flex-wrap gap-2"
//                   >
//                     <motion.span 
//                       whileHover={{ scale: 1.05 }}
//                       className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 border border-gray-200"
//                     >
//                       {product.tag}
//                     </motion.span>
//                   </motion.div>
//                 )}

//                 {/* Divider */}
//                 <motion.div 
//                   initial={{ scaleX: 0 }}
//                   animate={{ scaleX: 1 }}
//                   transition={{ delay: 0.9 }}
//                   className="mt-6 border-t border-gray-200"
//                 ></motion.div>

//                 {/* Short description */}
//                 {product.description && (
//                   <motion.div 
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 1 }}
//                     className="mt-6"
//                   >
//                     <p className="text-gray-700 text-sm leading-relaxed">
//                       {product.description.length > 200 
//                         ? `${product.description.substring(0, 200)}...` 
//                         : product.description}
//                     </p>
//                   </motion.div>
//                 )}

//                 {/* Specifications */}
//                 {product.specification && (
//                   <motion.div 
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 1.1 }}
//                     className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-100"
//                   >
//                     <h3 className="font-medium text-gray-900">Specifications</h3>
//                     <p className="mt-2 text-sm text-gray-600 leading-relaxed">
//                       {product.specification}
//                     </p>
//                   </motion.div>
//                 )}

//                 {/* Quantity selector */}
//                 <motion.div 
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.2 }}
//                   className="mt-6"
//                 >
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Quantity
//                   </label>
//                   <div className="flex items-center">
//                     <motion.button 
//                       whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={decreaseQuantity}
//                       className="rounded-l-lg bg-white py-2 px-4 border border-gray-300 text-gray-600 hover:bg-gray-50 focus:outline-none transition-colors"
//                     >
//                       -
//                     </motion.button>
//                     <div className="w-16 text-center py-2 border-t border-b border-gray-300
//                     border-gray-300 bg-white text-gray-800">
//                       {quantity}
//                     </div>
//                     <motion.button 
//                       whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={increaseQuantity}
//                       className="rounded-r-lg bg-white py-2 px-4 border border-gray-300 text-gray-600 hover:bg-gray-50 focus:outline-none transition-colors"
//                     >
//                       +
//                     </motion.button>
//                   </div>
//                 </motion.div>

//                 {/* Customization input */}
//                 <motion.div 
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.3 }}
//                   className="mt-6"
//                 >
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Customization (Optional)
//                   </label>
//                   <textarea 
//                     value={customization}
//                     onChange={(e) => setCustomization(e.target.value)}
//                     placeholder="Add your personalization details or special requests here..."
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black transition-all text-sm"
//                     rows="3"
//                   ></textarea>
//                 </motion.div>

//                 {/* Action buttons */}
//                 <motion.div 
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.4 }}
//                   className="mt-8 flex flex-col sm:flex-row gap-4"
//                 >
//                   {/* Add to cart button */}
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={handleAddToCart}
//                     disabled={isAddingToCart}
//                     className="flex-1 flex justify-center items-center bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-70"
//                   >
//                     {isAddingToCart ? (
//                       <span className="flex items-center">
//                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Adding...
//                       </span>
//                     ) : (
//                       <span className="flex items-center">
//                         <ShoppingCartIcon />
//                         <span className="ml-2">Add to Cart</span>
//                       </span>
//                     )}
//                   </motion.button>
                  
//                   {/* WhatsApp button */}
//                   <motion.a
//                     href={generateWhatsAppMessage()}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="flex-1 flex justify-center items-center bg-green-500 text-white py-3 px-6 rounded-full font-medium hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                   >
//                     <WhatsAppIcon />
//                     <span className="ml-2">WhatsApp</span>
//                   </motion.a>
//                 </motion.div>
//               </motion.div>
//             </div>
//           </motion.section>

//           {/* Product description */}
//           {product.description && (
//             <motion.section
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1.5, duration: 0.6 }}
//               className="mt-8 bg-white rounded-xl shadow-lg p-6 md:p-8"
//             >
//               <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
//               <div className="prose prose-gray max-w-none">
//                 <p className="text-gray-700 leading-relaxed whitespace-pre-line">
//                   {product.description}
//                 </p>
//               </div>
//             </motion.section>
//           )}

//           {/* Reviews section */}
//           <motion.section
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.6, duration: 0.6 }}
//             className="mt-8"
//           >
//             <ReviewSection productId={id} />
//           </motion.section>

//           {/* Related products section could go here */}
//         </main>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ProductPage;






















// import React, { useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Header from '../Layout/Header';
// import ReviewSection from './ReviewSection';
// import Footer from '../Layout/Footer';
// import toast from 'react-hot-toast';
// import { motion, AnimatePresence } from 'framer-motion';

// // Icons
// const HeartIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//   </svg>
// );

// const ShoppingCartIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//   </svg>
// );

// const WhatsAppIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
//     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//   </svg>
// );

// const ChevronLeftIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//   </svg>
// );

// const ChevronRightIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//   </svg>
// );

// const PlayIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-16 h-16">
//     <path d="M8 5v14l11-7z" />
//   </svg>
// );

// const PauseIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-16 h-16">
//     <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
//   </svg>
// );

// const VideoIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
//   </svg>
// );

// // StarIcon for ratings
// const StarIcon = ({ filled }) => (
//   <svg 
//     xmlns="http://www.w3.org/2000/svg" 
//     viewBox="0 0 24 24" 
//     fill={filled ? "currentColor" : "none"} 
//     stroke={filled ? "" : "currentColor"} 
//     className={`w-5 h-5 ${filled ? "text-gray-800" : "text-gray-300"}`}
//   >
//     <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
//   </svg>
// );

// // Helper function to determine if a link is a YouTube URL
// const getYouTubeVideoId = (url) => {
//   if (!url) return null;
  
//   // Match formats like: 
//   // - https://www.youtube.com/watch?v=VIDEO_ID
//   // - https://youtu.be/VIDEO_ID
//   // - https://youtube.com/shorts/VIDEO_ID
//   const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube.com\/shorts\/)([^"&?\/\s]{11})/i;
//   const match = url.match(regex);
//   return match ? match[1] : null;
// };

// // Helper function to determine media type
// const getMediaType = (url) => {
//   if (!url) return 'unknown';
  
//   const youtubeId = getYouTubeVideoId(url);
//   if (youtubeId) return 'youtube';
  
//   if (url.includes('instagram.com')) return 'instagram';
//   if (url.includes('vimeo.com')) return 'vimeo';
//   if (url.match(/\.(mp4|webm|ogg)$/i)) return 'direct';
  
//   return 'unknown';
// };

// const ProductPage = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [customization, setCustomization] = useState('');
//   const [viewingFullImage, setViewingFullImage] = useState(false);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const [mediaType, setMediaType] = useState('unknown');
//   const [showingVideo, setShowingVideo] = useState(false);
//   const videoRef = useRef(null);

//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     setIsAddingToCart(true);
//     try {
//       const price = product.discount 
//         ? (product.price - (product.price * product.discount / 100)).toFixed(2) 
//         : product.price.toFixed(2);
      
//       await axios.post(`https://pr-crafts-backend.vercel.app/api/v1/user/addtocart/${id}`, {
//         quantity: quantity,
//         customization: customization,
//         title: product.title,
//         image: product.postImages[0],
//         price: price,
//       }, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });
      
//       toast.success("Added To Cart");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to add to cart");
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`https://pr-crafts-backend.vercel.app/api/v1/post/showpost/${id}`, {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json"
//           }
//         });
//         setProduct(response.data.post);
        
//         // Determine video media type if videoLink exists
//         if (response.data.post.videoLink) {
//           setMediaType(getMediaType(response.data.post.videoLink));
//         }
        
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         setError("Failed to load product data");
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   // Handle video playback
//   const toggleVideoPlayback = () => {
//     if (!videoRef.current) return;
    
//     if (isVideoPlaying) {
//       videoRef.current.pause();
//     } else {
//       videoRef.current.play();
//     }
    
//     setIsVideoPlaying(!isVideoPlaying);
//   };

//   // Toggle between showing image or video
//   const toggleMediaDisplay = () => {
//     if (product && product.videoLink) {
//       setShowingVideo(!showingVideo);
      
//       // Reset video playback when switching away
//       if (showingVideo && isVideoPlaying) {
//         setIsVideoPlaying(false);
//         if (videoRef.current) {
//           videoRef.current.pause();
//         }
//       }
//     }
//   };

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

//   // Expanded image view toggle
//   const toggleFullImage = () => {
//     setViewingFullImage(!viewingFullImage);
//   };

//   // Quantity controls
//   const increaseQuantity = () => {
//     if (product.quantity > quantity) {
//       setQuantity(quantity + 1);
//     } else {
//       toast.error("Max Quantity Reached");
//     }
//   };
  
//   const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  
//   // WhatsApp message generation
//   const generateWhatsAppMessage = () => {
//     if (!product) return "";
//     const message = `Hi, I'm interested in buying ${quantity} of the ${product.name || product.title || "product"}${customization ? ` with this customization: ${customization}` : ''}. Could you provide more details?`;
//     const encodedMessage = encodeURIComponent(message);
//     return `https://wa.me/7405678171?text=${encodedMessage}`;
//   };

//   // Rating stars
//   const renderStars = (rating) => {
//     return (
//       <div className="flex">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <StarIcon key={star} filled={star <= rating} />
//         ))}
//       </div>
//     );
//   };

//   // Render YouTube embedded player
//   const renderYouTubeEmbed = (videoId) => {
//     if (!videoId) return null;
    
//     return (
//       <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden shadow-lg">
//         <iframe
//           src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=${isVideoPlaying ? 1 : 0}`}
//           title="YouTube video player"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//           className="w-full h-full object-cover"
//         ></iframe>
//       </div>
//     );
//   };

//   // Render direct video player
//   const renderVideoPlayer = (url) => {
//     return (
//       <div className="relative w-full rounded-lg overflow-hidden shadow-lg bg-black">
//         <div className="aspect-w-16 aspect-h-9">
//           <video
//             ref={videoRef}
//             src={url}
//             className="w-full h-full object-contain"
//             poster={product?.postImages?.[0]?.url}
//             onPlay={() => setIsVideoPlaying(true)}
//             onPause={() => setIsVideoPlaying(false)}
//             onClick={toggleVideoPlayback}
//           />
          
//           {!isVideoPlaying && (
//             <div 
//               className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-30 transition-opacity hover:bg-opacity-40"
//               onClick={toggleVideoPlayback}
//             >
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="text-white opacity-80 hover:opacity-100"
//               >
//                 <PlayIcon />
//               </motion.div>
//             </div>
//           )}
//         </div>
        
//         {isVideoPlaying && (
//           <motion.button
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
//             onClick={toggleVideoPlayback}
//           >
//             <PauseIcon />
//           </motion.button>
//         )}
//       </div>
//     );
//   };

//   // Render the appropriate media element based on type
//   const renderMediaContent = () => {
//     if (!product || !product.videoLink) return null;
    
//     switch (mediaType) {
//       case 'youtube':
//         const youtubeId = getYouTubeVideoId(product.videoLink);
//         return renderYouTubeEmbed(youtubeId);
      
//       case 'direct':
//         return renderVideoPlayer(product.videoLink);
      
//       case 'instagram':
//       case 'vimeo':
//       case 'unknown':
//       default:
//         return (
//           <div className="flex items-center justify-center p-8 bg-gray-100 rounded-lg text-gray-500">
//             <p>External video link available via:</p>
//             <a 
//               href={product.videoLink} 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="ml-2 text-blue-600 hover:underline"
//             >
//               View Video
//             </a>
//           </div>
//         );
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="flex flex-col items-center">
//           <div className="w-16 h-16 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
//           <p className="mt-4 text-gray-800 font-medium">Loading product details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md"
//         >
//           <div className="mb-4 text-red-500">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
//           <p className="text-gray-600">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="mt-6 px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
//           >
//             Try Again
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md"
//         >
//           <div className="mb-4 text-gray-500">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25-2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
//           <p className="text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
//           <button 
//             onClick={() => window.history.back()}
//             className="mt-6 px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
//           >
//             Go Back
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   // Modal for fullscreen image preview
//   const FullscreenImageModal = () => {
//     if (!viewingFullImage) return null;
    
//     return (
//       <AnimatePresence>
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center backdrop-blur-sm"
//         >
//           <motion.button 
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.2 }}
//             className="absolute top-4 right-4 text-white text-2xl focus:outline-none bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-all"
//             onClick={toggleFullImage}
//           >
//             ✕
//           </motion.button>
          
//           <motion.div 
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ type: "spring", damping: 25 }}
//             className="relative w-full max-w-5xl mx-auto"
//           >
//             {product.postImages && product.postImages.length > 0 ? (
//               <img 
//                 src={product.postImages[currentImageIndex]?.url} 
//                 alt={`${product.title || "Product"}`}
//                 className="mx-auto max-h-screen object-contain"
//               />
//             ) : null}
            
//             {product.postImages && product.postImages.length > 1 && (
//               <div className="absolute inset-x-0 top-1/2 flex items-center justify-between px-4 transform -translate-y-1/2">
//                 <motion.button 
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     prevImage();
//                   }}
//                   className="bg-white bg-opacity-20 rounded-full p-3 hover:bg-opacity-30 transition-all focus:outline-none"
//                 >
//                   <ChevronLeftIcon />
//                 </motion.button>
//                 <motion.button 
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     nextImage();
//                   }}
//                   className="bg-white bg-opacity-20 rounded-full p-3 hover:bg-opacity-30 transition-all focus:outline-none"
//                 >
//                   <ChevronRightIcon />
//                 </motion.button>
//               </div>
//             )}
//           </motion.div>
//         </motion.div>
//       </AnimatePresence>
//     );
//   };

//   return (
//     <>
//       <Header />
//       <div className="bg-gray-50 min-h-screen">
//         {/* Full-screen image modal */}
//         <FullscreenImageModal />
        
//         <main className="container mx-auto px-4 py-6 md:py-8">
//           <motion.section
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="bg-white rounded-xl shadow-xl overflow-hidden"
//           >
//             <div className="flex flex-col lg:flex-row">
//               {/* Left side - Images & Video */}
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="w-full lg:w-3/5 p-4 md:p-6"
//               >
//                 {/* Media Toggle Buttons - Only show if there's a video */}
//                 {product.videoLink && (
//                   <div className="flex mb-4 space-x-2">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => setShowingVideo(false)}
//                       className={`py-2 px-4 rounded-full text-sm font-medium flex items-center ${
//                         !showingVideo
//                           ? 'bg-black text-white' 
//                           : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                       }`}
//                     >
//                       <span className="mr-2">Photos</span>
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
//                       </svg>
//                     </motion.button>
                    
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => setShowingVideo(true)}
//                       className={`py-2 px-4 rounded-full text-sm font-medium flex items-center ${
//                         showingVideo 
//                           ? 'bg-black text-white' 
//                           : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                       }`}
//                     >
//                       <span className="mr-2">Video</span>
//                       <VideoIcon />
//                     </motion.button>
//                   </div>
//                 )}
                
//                 {/* Featured Content Area - Shows either image or video */}
//                 <div className="relative mb-4 bg-gray-100 rounded-lg overflow-hidden shadow-inner">
//                   {showingVideo && product.videoLink ? (
//                     // Video content
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ duration: 0.5 }}
//                       className="w-full h-full"
//                     >
//                       {renderMediaContent()}
//                     </motion.div>
//                   ) : (
//                     // Image content
//                     <>
//                       {product.postImages && product.postImages.length > 0 ? (
//                         <motion.div 
//                           className="aspect-w-1 aspect-h-1"
//                           // Continuing from where the code left off...

//                           layoutId={`product-image-${currentImageIndex}`}
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <img 
//                             src={product.postImages[currentImageIndex]?.url} 
//                             alt={`${product.title || "Product"} - Image ${currentImageIndex + 1}`}
//                             className="object-contain w-full h-full cursor-pointer"
//                             onClick={toggleFullImage}
//                           />
//                         </motion.div>
//                       ) : (
//                         <div className="aspect-w-1 aspect-h-1 bg-gray-200 flex items-center justify-center">
//                           <p className="text-gray-500">No images available</p>
//                         </div>
//                       )}
                      
//                       {/* Image navigation controls */}
//                       {product.postImages && product.postImages.length > 1 && (
//                         <div className="absolute inset-x-0 top-1/2 flex items-center justify-between px-2 transform -translate-y-1/2">
//                           <motion.button 
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={prevImage}
//                             className="bg-white bg-opacity-70 rounded-full p-2 shadow-md hover:bg-opacity-90 transition-all focus:outline-none"
//                           >
//                             <ChevronLeftIcon />
//                           </motion.button>
//                           <motion.button 
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={nextImage}
//                             className="bg-white bg-opacity-70 rounded-full p-2 shadow-md hover:bg-opacity-90 transition-all focus:outline-none"
//                           >
//                             <ChevronRightIcon />
//                           </motion.button>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
                
//                 {/* Thumbnail Gallery */}
//                 {!showingVideo && product.postImages && product.postImages.length > 1 && (
//                   <div className="grid grid-cols-5 gap-2 mt-4">
//                     {product.postImages.map((image, index) => (
//                       <motion.div
//                         key={index}
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.97 }}
//                         onClick={() => setCurrentImageIndex(index)}
//                         className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden cursor-pointer ${
//                           currentImageIndex === index 
//                             ? 'ring-2 ring-black' 
//                             : 'ring-1 ring-gray-200 hover:ring-gray-400'
//                         }`}
//                       >
//                         <img 
//                           src={image?.url} 
//                           alt={`Thumbnail ${index + 1}`}
//                           className="object-cover w-full h-full"
//                         />
//                       </motion.div>
//                     ))}
//                   </div>
//                 )}
//               </motion.div>
              
//               {/* Right side - Product Info & Actions */}
//               <motion.div 
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="w-full lg:w-2/5 p-4 md:p-6 lg:border-l border-gray-200"
//               >
//                 {/* Category & Title */}
//                 <div className="mb-4">
//                   {product.category && (
//                     <span className="text-sm text-gray-500 uppercase tracking-wider">{product.category}</span>
//                   )}
//                   <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">{product.title}</h1>
//                 </div>
                
//                 {/* Rating */}
//                 {product.rating !== undefined && (
//                   <div className="flex items-center mb-4">
//                     {renderStars(product.rating)}
//                     <span className="ml-2 text-gray-600 text-sm">
//                       {product.rating.toFixed(1)} ({product.reviews?.length || 0} reviews)
//                     </span>
//                   </div>
//                 )}
                
//                 {/* Price */}
//                 <div className="mb-6">
//                   {product.discount ? (
//                     <div className="flex items-center">
//                       <p className="text-2xl font-bold text-black">₹{discountedPrice}</p>
//                       <p className="ml-3 text-gray-500 line-through">₹{product.price.toFixed(2)}</p>
//                       <span className="ml-2 bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-medium">
//                         {product.discount}% OFF
//                       </span>
//                     </div>
//                   ) : (
//                     <p className="text-2xl font-bold text-black">₹{product.price.toFixed(2)}</p>
//                   )}
                  
//                   {product.quantity <= 5 && product.quantity > 0 && (
//                     <p className="text-sm text-orange-600 mt-1">
//                       Only {product.quantity} left in stock!
//                     </p>
//                   )}
                  
//                   {product.quantity === 0 && (
//                     <p className="text-sm text-red-600 mt-1 font-medium">
//                       Out of stock
//                     </p>
//                   )}
//                 </div>
                
//                 {/* Description */}
//                 <div className="mb-6">
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
//                   <p className="text-gray-600 leading-relaxed">
//                     {product.description}
//                   </p>
//                 </div>
                
//                 {/* Additional Details */}
//                 {(product.size || product.material || product.dimensions) && (
//                   <div className="mb-6">
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">Details</h3>
//                     <div className="space-y-2">
//                       {product.size && (
//                         <div className="flex items-start">
//                           <span className="text-gray-500 w-24">Size:</span>
//                           <span className="text-gray-800">{product.size}</span>
//                         </div>
//                       )}
//                       {product.material && (
//                         <div className="flex items-start">
//                           <span className="text-gray-500 w-24">Material:</span>
//                           <span className="text-gray-800">{product.material}</span>
//                         </div>
//                       )}
//                       {product.dimensions && (
//                         <div className="flex items-start">
//                           <span className="text-gray-500 w-24">Dimensions:</span>
//                           <span className="text-gray-800">{product.dimensions}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
                
//                 {/* Add to Cart Form */}
//                 <form onSubmit={handleAddToCart} className="mb-6">
//                   {/* Quantity Selector */}
//                   <div className="mb-4">
//                     <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
//                       Quantity
//                     </label>
//                     <div className="flex items-center">
//                       <motion.button
//                         type="button"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={decreaseQuantity}
//                         className="w-10 h-10 flex items-center justify-center rounded-l-md bg-gray-100 border border-gray-300 text-gray-600 hover:bg-gray-200 transition-colors"
//                       >
//                         <span className="text-xl font-medium">−</span>
//                       </motion.button>
//                       <input
//                         type="number"
//                         id="quantity"
//                         name="quantity"
//                         min="1"
//                         max={product.quantity}
//                         value={quantity}
//                         onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
//                         className="w-14 h-10 text-center border-y border-gray-300 text-gray-700 focus:outline-none"
//                         readOnly
//                       />
//                       <motion.button
//                         type="button"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={increaseQuantity}
//                         className="w-10 h-10 flex items-center justify-center rounded-r-md bg-gray-100 border border-gray-300 text-gray-600 hover:bg-gray-200 transition-colors"
//                       >
//                         <span className="text-xl font-medium">+</span>
//                       </motion.button>
//                     </div>
//                   </div>
                  
//                   {/* Customization Input */}
//                   <div className="mb-6">
//                     <label htmlFor="customization" className="block text-gray-700 font-medium mb-2">
//                       Customization (Optional)
//                     </label>
//                     <textarea
//                       id="customization"
//                       name="customization"
//                       rows="3"
//                       placeholder="Add any special instructions or customization details here..."
//                       value={customization}
//                       onChange={(e) => setCustomization(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black resize-none"
//                     ></textarea>
//                   </div>
                  
//                   {/* Action Buttons */}
//                   <div className="flex flex-col space-y-3">
//                     <motion.button
//                       type="submit"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       disabled={isAddingToCart || product.quantity <= 0}
//                       className={`w-full px-6 py-3 rounded-md flex items-center justify-center font-medium ${
//                         product.quantity > 0
//                           ? 'bg-black text-white hover:bg-gray-800'
//                           : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                       } transition-colors`}
//                     >
//                       {isAddingToCart ? (
//                         <>
//                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                           Adding...
//                         </>
//                       ) : (
//                         <>
//                           <ShoppingCartIcon /> 
//                           <span className="ml-2">Add to Cart</span>
//                         </>
//                       )}
//                     </motion.button>
                    
//                     <motion.a
//                       href={generateWhatsAppMessage()}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="w-full px-6 py-3 rounded-md bg-green-500 text-white flex items-center justify-center font-medium hover:bg-green-600 transition-colors"
//                     >
//                       <WhatsAppIcon />
//                       <span className="ml-2">Ask via WhatsApp</span>
//                     </motion.a>
                    
//                     <motion.button
//                       type="button"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="w-full px-6 py-3 rounded-md border border-gray-300 text-gray-700 flex items-center justify-center font-medium hover:bg-gray-50 transition-colors"
//                     >
//                       <HeartIcon />
//                       <span className="ml-2">Add to Wishlist</span>
//                     </motion.button>
//                   </div>
//                 </form>
                
//                 {/* Delivery & Returns */}
//                 <div className="border-t border-gray-200 pt-6">
//                   <div className="space-y-4">
//                     <div className="flex items-start">
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 mt-0.5 mr-3">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
//                       </svg>
//                       <div>
//                         <h4 className="font-medium text-gray-800">Fast Delivery</h4>
//                         <p className="text-sm text-gray-600">Delivered within 4-7 business days</p>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-start">
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 mt-0.5 mr-3">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
//                       </svg>
//                       <div>
//                         <h4 className="font-medium text-gray-800">Easy Returns</h4>
//                         <p className="text-sm text-gray-600">30-day return policy for most items</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </motion.section>
          
//           {/* Reviews Section */}
//           <section className="mt-8 mb-12">
//             <ReviewSection productId={id} reviews={product.reviews || []} />
//           </section>
          
//           {/* Related Products */}
//           {/* Add related products component here */}
//         </main>
        
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default ProductPage;
















// import React, { useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Header from '../Layout/Header';
// import ReviewSection from './ReviewSection';
// import Footer from '../Layout/Footer';
// import toast from 'react-hot-toast';
// import { motion, AnimatePresence } from 'framer-motion';

// // Icons
// const HeartIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//   </svg>
// );

// const ShoppingCartIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//   </svg>
// );

// const WhatsAppIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//   </svg>
// );

// const ChevronLeftIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//   </svg>
// );

// const ChevronRightIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//   </svg>
// );

// const PlayIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12 sm:w-16 sm:h-16">
//     <path d="M8 5v14l11-7z" />
//   </svg>
// );

// const PauseIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12 sm:w-16 sm:h-16">
//     <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
//   </svg>
// );

// const VideoIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
//   </svg>
// );

// const InstagramIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0
//   0 0 0 2.881 1.44 1.44 0 000-2.881z" />
//   </svg>
// );

// // StarIcon for ratings
// const StarIcon = ({ filled }) => (
//   <svg 
//     xmlns="http://www.w3.org/2000/svg" 
//     viewBox="0 0 24 24" 
//     fill={filled ? "currentColor" : "none"} 
//     stroke={filled ? "" : "currentColor"} 
//     className={`w-4 h-4 sm:w-5 sm:h-5 ${filled ? "text-gray-800" : "text-gray-300"}`}
//   >
//     <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
//   </svg>
// );

// // Helper function to determine if a link is a YouTube URL
// const getYouTubeVideoId = (url) => {
//   if (!url) return null;
  
//   // Match formats like: 
//   // - https://www.youtube.com/watch?v=VIDEO_ID
//   // - https://youtu.be/VIDEO_ID
//   // - https://youtube.com/shorts/VIDEO_ID
//   const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube.com\/shorts\/)([^"&?\/\s]{11})/i;
//   const match = url.match(regex);
//   return match ? match[1] : null;
// };

// // Helper function to extract Instagram post ID
// const getInstagramPostId = (url) => {
//   if (!url) return null;
  
//   // Match formats like:
//   // - https://www.instagram.com/p/POSTID/
//   // - https://www.instagram.com/reel/POSTID/
//   // - https://instagram.com/p/POSTID/
//   // - https://www.instagram.com/p/POSTID/?igshid=something
//   const regex = /instagram\.com\/(?:p|reel)\/([^/?]+)/i;
//   const match = url.match(regex);
//   return match ? match[1] : null;
// };

// // Helper function to determine media type
// const getMediaType = (url) => {
//   if (!url) return 'unknown';
  
//   const youtubeId = getYouTubeVideoId(url);
//   if (youtubeId) return 'youtube';
  
//   const instagramId = getInstagramPostId(url);
//   if (instagramId) return 'instagram';
  
//   if (url.includes('vimeo.com')) return 'vimeo';
//   if (url.match(/\.(mp4|webm|ogg)$/i)) return 'direct';
  
//   return 'unknown';
// };

// const ProductPage = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [customization, setCustomization] = useState('');
//   const [viewingFullImage, setViewingFullImage] = useState(false);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const [mediaType, setMediaType] = useState('unknown');
//   const [showingVideo, setShowingVideo] = useState(false);
//   const videoRef = useRef(null);
//   const instagramRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     setIsAddingToCart(true);
//     try {
//       const price = product.discount 
//         ? (product.price - (product.price * product.discount / 100)).toFixed(2) 
//         : product.price.toFixed(2);
      
//       await axios.post(`https://pr-crafts-backend.vercel.app/api/v1/user/addtocart/${id}`, {
//         quantity: quantity,
//         customization: customization,
//         title: product.title,
//         image: product.postImages[0],
//         price: price,
//       }, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });
      
//       toast.success("Added To Cart");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to add to cart");
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`https://pr-crafts-backend.vercel.app/api/v1/post/showpost/${id}`, {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json"
//           }
//         });
//         setProduct(response.data.post);
        
//         // Determine video media type if videoLink exists
//         if (response.data.post.videoLink) {
//           const type = getMediaType(response.data.post.videoLink);
//           setMediaType(type);
          
//           // If media is Instagram, set showingVideo true by default
//           if (type === 'instagram') {
//             setShowingVideo(true);
//           }
//         }
        
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         setError("Failed to load product data");
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   // Handle Instagram embed script loading
//   useEffect(() => {
//     if (showingVideo && mediaType === 'instagram') {
//       // Load Instagram embed script if not already loaded
//       if (!document.getElementById('instagram-embed-script')) {
//         const script = document.createElement('script');
//         script.id = 'instagram-embed-script';
//         script.src = '//www.instagram.com/embed.js';
//         script.async = true;
        
//         script.onload = () => {
//           // Process Instagram embeds
//           if (window.instgrm) {
//             window.instgrm.Embeds.process();
//           }
//         };
        
//         document.body.appendChild(script);
//       } else if (window.instgrm) {
//         // Process Instagram embeds if script already loaded
//         window.instgrm.Embeds.process();
//       }
//     }
//   }, [showingVideo, mediaType, product]);

//   // Handle video playback
//   const toggleVideoPlayback = () => {
//     if (!videoRef.current) return;
    
//     if (isVideoPlaying) {
//       videoRef.current.pause();
//     } else {
//       videoRef.current.play();
//     }
    
//     setIsVideoPlaying(!isVideoPlaying);
//   };

//   // Toggle between showing image or video
//   const toggleMediaDisplay = () => {
//     if (product && product.videoLink) {
//       setShowingVideo(!showingVideo);
      
//       // Reset video playback when switching away
//       if (showingVideo && isVideoPlaying && mediaType === 'direct') {
//         setIsVideoPlaying(false);
//         if (videoRef.current) {
//           videoRef.current.pause();
//         }
//       }
//     }
//   };

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

//   // Expanded image view toggle
//   const toggleFullImage = () => {
//     setViewingFullImage(!viewingFullImage);
//   };

//   // Quantity controls
//   const increaseQuantity = () => {
//     if (product.quantity > quantity) {
//       setQuantity(quantity + 1);
//     } else {
//       toast.error("Max Quantity Reached");
//     }
//   };
  
//   const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  
//   // WhatsApp message generation
//   const generateWhatsAppMessage = () => {
//     if (!product) return "";
//     const message = `Hi, I'm interested in buying ${quantity} of the ${product.name || product.title || "product"}${customization ? ` with this customization: ${customization}` : ''}. Could you provide more details?`;
//     const encodedMessage = encodeURIComponent(message);
//     return `https://wa.me/7405678171?text=${encodedMessage}`;
//   };

//   // Rating stars
//   const renderStars = (rating) => {
//     return (
//       <div className="flex">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <StarIcon key={star} filled={star <= rating} />
//         ))}
//       </div>
//     );
//   };

//   // Render YouTube embedded player
//   const renderYouTubeEmbed = (videoId) => {
//     if (!videoId) return null;
    
//     return (
//       <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden shadow-lg">
//         <iframe
//           src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=${isVideoPlaying ? 1 : 0}`}
//           title="YouTube video player"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//           className="w-full h-full object-cover"
//         ></iframe>
//       </div>
//     );
//   };

//   // Render Instagram embedded player
//   const renderInstagramEmbed = (url) => {
//     if (!url) return null;
    
//     const instagramId = getInstagramPostId(url);
//     if (!instagramId) return null;
    
//     // Create embed URL
//     const embedUrl = `https://www.instagram.com/p/${instagramId}/embed/`;
    
//     return (
//       <div className="instagram-embed-container w-full rounded-lg overflow-hidden shadow-lg bg-white">
//         <div className={isMobile ? "aspect-w-4 aspect-h-5" : "aspect-w-1 aspect-h-1"}>
//           <iframe
//             ref={instagramRef}
//             src={embedUrl}
//             title="Instagram Post"
//             className="w-full h-full border-0"
//             allowTransparency="true"
//             allowFullScreen="true"
//             scrolling="no"
//             loading="lazy"
//           ></iframe>
//         </div>
        
//         <div className="flex justify-center items-center mt-2 p-2">
//           <a 
//             href={url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center text-gray-700 hover:text-pink-600 transition-colors text-sm"
//           >
//             <InstagramIcon />
//             <span className="ml-2">View on Instagram</span>
//           </a>
//         </div>
//       </div>
//     );
//   };

//   // Render direct video player
//   const renderVideoPlayer = (url) => {
//     return (
//       <div className="relative w-full rounded-lg overflow-hidden shadow-lg bg-black">
//         <div className="aspect-w-16 aspect-h-9">
//           <video
//             ref={videoRef}
//             src={url}
//             className="w-full h-full object-contain"
//             poster={product?.postImages?.[0]?.url}
//             onPlay={() => setIsVideoPlaying(true)}
//             onPause={() => setIsVideoPlaying(false)}
//             onClick={toggleVideoPlayback}
//             playsInline
//             preload="metadata"
//           />
          
//           {!isVideoPlaying && (
//             <div 
//               className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-30 transition-opacity hover:bg-opacity-40"
//               onClick={toggleVideoPlayback}
//             >
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="text-white opacity-80 hover:opacity-100"
//               >
//                 <PlayIcon />
//               </motion.div>
//             </div>
//           )}
//         </div>
        
//         {isVideoPlaying && (
//           <motion.button
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
//             onClick={toggleVideoPlayback}
//           >
//             <PauseIcon />
//           </motion.button>
//         )}
//       </div>
//     );
//   };

//   // Render the appropriate media element based on type
//   const renderMediaContent = () => {
//     if (!product || !product.videoLink) return null;
    
//     switch (mediaType) {
//       case 'youtube':
//         const youtubeId = getYouTubeVideoId(product.videoLink);
//         return renderYouTubeEmbed(youtubeId);
      
//       case 'instagram':
//         return renderInstagramEmbed(product.videoLink);
      
//       case 'direct':
//         return renderVideoPlayer(product.videoLink);
      
//       case 'vimeo':
//       case 'unknown':
//       default:
//         return (
//           <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg text-gray-500">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-3 text-gray-400">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
//             </svg>
//             <p className="text-center mb-3">External video link available</p>
//             <a 
//               href={product.videoLink} 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-sm"
//             >
//               View Video
//             </a>
//           </div>
//         );
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="flex flex-col items-center">
//           <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
//           <p className="mt-4 text-gray-800 font-medium">Loading product details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center max-w-md mx-4"
//         >
//           <div className="mb-4 text-red-500">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 sm:w-12 sm:h-12 mx-auto">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
//             </svg>
//           </div>
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Error</h2>
//           <p className="text-gray-600">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="mt-6 px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
//           >
//             Try Again
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center max-w-md mx-4"
//         >
//           <div className="mb-4 text-gray-500">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 sm:w-12 sm:h-12 mx-auto">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25-2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
//             </svg>
//           </div>
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>

//           <p className="text-gray-600">Sorry, we couldn't find the product you're looking for.</p>
//           <button 
//             onClick={() => window.history.back()}
//             className="mt-6 px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
//           >
//             Go Back
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Header />
      
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Back button */}
//         <div className="mb-4">
//           <button
//             onClick={() => window.history.back()}
//             className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
//           >
//             <ChevronLeftIcon />
//             <span className="ml-1">Back</span>
//           </button>
//         </div>
        
//         {/* Product details section */}
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
//             {/* Product image/video section */}
//             <div className="relative bg-gray-100 p-4 sm:p-6">
//               <AnimatePresence mode="wait">
//                 {showingVideo && product.videoLink ? (
//                   <motion.div
//                     key="video"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="w-full max-w-full md:min-h-[600px] flex items-center justify-center"
//                   >
//                     <div className="w-full h-full">
//                       {renderMediaContent()}
//                     </div>
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     key="image"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="relative"
//                   >
//                     {/* Main product image */}
//                     <div className="aspect-w-1 aspect-h-1 w-full rounded-lg overflow-hidden bg-gray-200">
//                       {product.postImages && product.postImages.length > 0 && (
//                         <>
//                           <img
//                             src={product.postImages[currentImageIndex].url}
//                             alt={product.title}
//                             className="w-full h-full object-contain cursor-pointer"
//                             onClick={toggleFullImage}
//                           />
//                           {viewingFullImage && (
//                             <div
//                               className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
//                               onClick={toggleFullImage}
//                             >
//                               <div className="relative max-w-5xl max-h-full">
//                                 <img
//                                   src={product.postImages[currentImageIndex].url}
//                                   alt={product.title}
//                                   className="max-w-full max-h-[90vh] object-contain"
//                                 />
//                                 <button
//                                   className="absolute top-5 right-5 text-white p-2 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80"
//                                   onClick={toggleFullImage}
//                                 >
//                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                                   </svg>
//                                 </button>
//                               </div>
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </div>
                    
//                     {/* Image navigation */}
//                     {product.postImages && product.postImages.length > 1 && (
//                       <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
//                         <button
//                           onClick={prevImage}
//                           className="p-1 rounded-full bg-white shadow-md text-gray-800 pointer-events-auto hover:bg-gray-100 transition-colors"
//                         >
//                           <ChevronLeftIcon />
//                         </button>
//                         <button
//                           onClick={nextImage}
//                           className="p-1 rounded-full bg-white shadow-md text-gray-800 pointer-events-auto hover:bg-gray-100 transition-colors"
//                         >
//                           <ChevronRightIcon />
//                         </button>
//                       </div>
//                     )}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
              
//               {/* Thumbnail row */}
//               <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
//                 {product.postImages && product.postImages.map((image, index) => (
//                   <div
//                     key={index}
//                     className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded border-2 overflow-hidden cursor-pointer ${
//                       !showingVideo && currentImageIndex === index ? 'border-gray-800' : 'border-transparent'
//                     }`}
//                     onClick={() => {
//                       setShowingVideo(false);
//                       setCurrentImageIndex(index);
//                     }}
//                   >
//                     <img
//                       src={image.url}
//                       alt={`Thumbnail ${index + 1}`}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 ))}
                
//                 {/* Video thumbnail if available */}
//                 {product.videoLink && (
//                   <div
//                     className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded border-2 overflow-hidden cursor-pointer ${
//                       showingVideo ? 'border-gray-800' : 'border-transparent'
//                     }`}
//                     onClick={toggleMediaDisplay}
//                   >
//                     <div className="w-full h-full bg-gray-200 relative flex items-center justify-center">
//                       {product.postImages && product.postImages.length > 0 && (
//                         <img
//                           src={product.postImages[0].url}
//                           alt="Video thumbnail"
//                           className="w-full h-full object-cover opacity-80"
//                         />
//                       )}
//                       <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
//                         <VideoIcon />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             {/* Product info section */}
//             <div className="p-4 sm:p-6 lg:p-8">
//               <div className="border-b pb-4 mb-4">
//                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                
//                 <div className="flex items-center mb-2">
//                   {product.ratings && renderStars(product.ratings)}
//                   <span className="text-sm text-gray-500 ml-2">
//                     {product.numOfReviews} {product.numOfReviews === 1 ? 'review' : 'reviews'}
//                   </span>
//                 </div>
                
//                 <div className="flex items-center">
//                   {product.discount ? (
//                     <div className="flex items-baseline">
//                       <span className="text-2xl sm:text-3xl font-bold text-gray-900">₹{discountedPrice}</span>
//                       <span className="ml-2 text-lg text-gray-500 line-through">₹{product.price.toFixed(2)}</span>
//                       <span className="ml-2 text-sm font-medium text-green-600">{product.discount}% off</span>
//                     </div>
//                   ) : (
//                     <span className="text-2xl sm:text-3xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
//                   )}
//                 </div>
                
//                 {product.quantity <= 5 && product.quantity > 0 && (
//                   <p className="mt-2 text-sm text-orange-600">
//                     Only {product.quantity} {product.quantity === 1 ? 'item' : 'items'} left in stock!
//                   </p>
//                 )}
                
//                 {product.quantity === 0 && (
//                   <p className="mt-2 text-sm text-red-600 font-medium">
//                     Out of stock
//                   </p>
//                 )}
//               </div>
              
//               {/* Product description */}
//               <div className="mb-6">
//                 <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
//                 <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
//               </div>
              
//               {/* Product features */}
//               {product.features && product.features.length > 0 && (
//                 <div className="mb-6">
//                   <h2 className="text-lg font-semibold text-gray-900 mb-2">Features</h2>
//                   <ul className="list-disc list-inside text-gray-700 space-y-1">
//                     {product.features.map((feature, index) => (
//                       <li key={index}>{feature}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
              
//               {/* Add to cart form */}
//               {product.quantity > 0 && (
//                 <form onSubmit={handleAddToCart} className="mt-6 space-y-6">
//                   {/* Quantity selector */}
//                   <div>
//                     <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
//                       Quantity
//                     </label>
//                     <div className="flex items-center">
//                       <button
//                         type="button"
//                         onClick={decreaseQuantity}
//                         className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 text-gray-500 hover:bg-gray-100"
//                       >
//                         -
//                       </button>
//                       <input
//                         type="number"
//                         id="quantity"
//                         name="quantity"
//                         value={quantity}
//                         onChange={(e) => setQuantity(Math.min(Math.max(1, parseInt(e.target.value) || 1), product.quantity))}
//                         className="w-16 h-10 text-center border-t border-b border-gray-300 focus:ring-0 focus:outline-none"
//                         min="1"
//                         max={product.quantity}
//                         readOnly
//                       />
//                       <button
//                         type="button"
//                         onClick={increaseQuantity}
//                         className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
                  
//                   {/* Customization field */}
//                   {product.customizationAvailable && (
//                     <div>
//                       <label htmlFor="customization" className="block text-sm font-medium text-gray-700 mb-2">
//                         Customization
//                       </label>
//                       <textarea
//                         id="customization"
//                         name="customization"
//                         value={customization}
//                         onChange={(e) => setCustomization(e.target.value)}
//                         placeholder="Add your customization details here..."
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
//                         rows="3"
//                       ></textarea>
//                     </div>
//                   )}
                  
//                   {/* Action buttons */}
//                   <div className="flex flex-col sm:flex-row gap-4">
//                     <button
//                       type="submit"
//                       disabled={isAddingToCart || product.quantity === 0}
//                       className={`flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none ${
//                         (isAddingToCart || product.quantity === 0) ? 'opacity-70 cursor-not-allowed' : ''
//                       }`}
//                     >
//                       {isAddingToCart ? (
//                         <span className="flex items-center">
//                           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                           Adding...
//                         </span>
//                       ) : (
//                         <>
//                           <ShoppingCartIcon />
//                           <span className="ml-2">Add to Cart</span>
//                         </>
//                       )}
//                     </button>
                    
//                     {/* WhatsApp button */}
//                     <a
//                       href={generateWhatsAppMessage()}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none"
//                     >
//                       <WhatsAppIcon />
//                       <span className="ml-2">Buy via WhatsApp</span>
//                     </a>
//                   </div>
//                 </form>
//               )}
              
//               {/* Out of stock message */}
//               {product.quantity === 0 && (
//                 <div className="mt-6">
//                   <div className="p-4 bg-gray-100 rounded-lg text-center">
//                     <p className="text-gray-700 font-medium">This product is currently out of stock.</p>
//                     <p className="text-sm text-gray-600 mt-1">Please check back later or contact us for more information.</p>
                    
//                     <a
//                       href={`https://wa.me/7405678171?text=${encodeURIComponent(`Hi, I'm interested in ${product.title} which is currently out of stock. When will it be available again?`)}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="mt-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none"
//                     >
//                       <WhatsAppIcon />
//                       <span className="ml-2">Notify Me</span>
//                     </a>
//                   </div>
//                 </div>
//               )}
              
//               {/* Additional information */}
//               <div className="mt-8 pt-6 border-t border-gray-200">
//                 <div className="flex flex-wrap gap-4 text-sm">
//                   {product.category && (
//                     <div>
//                       <span className="font-medium text-gray-700">Category:</span>{' '}
//                       <span className="text-gray-600">{product.category}</span>
//                     </div>
//                   )}
                  
//                   {product.tags && product.tags.length > 0 && (
//                     <div>
//                       <span className="font-medium text-gray-700">Tags:</span>{' '}
//                       <span className="text-gray-600">{product.tags.join(', ')}</span>
//                     </div>
//                   )}
                  
//                   {product.materials && product.materials.length > 0 && (
//                     <div>
//                       <span className="font-medium text-gray-700">Materials:</span>{' '}
//                       <span className="text-gray-600">{product.materials.join(', ')}</span>
//                     </div>
//                   )}
                  
//                   {product.dimensions && (
//                     <div>
//                       <span className="font-medium text-gray-700">Dimensions:</span>{' '}
//                       <span className="text-gray-600">{product.dimensions}</span>
//                     </div>
//                   )}
                  
//                   {product.weight && (
//                     <div>
//                       <span className="font-medium text-gray-700">Weight:</span>{' '}
//                       <span className="text-gray-600">{product.weight}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Reviews section */}
//         <div className="mt-10">
//           <ReviewSection productId={id} />
//         </div>
        
//         {/* Related products section */}
//         {product.relatedProducts && product.relatedProducts.length > 0 && (
//           <div className="mt-12">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">You may also like</h2>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//               {product.relatedProducts.map((relatedProduct) => (
//                 <motion.div 
//                   key={relatedProduct._id} 
//                   whileHover={{ y: -5 }}
//                   className="bg-white rounded-lg shadow-sm overflow-hidden"
//                 >
//                   <a href={`/product/${relatedProduct._id}`} className="block">
//                     <div className="aspect-w-1 aspect-h-1 bg-gray-200">
//                       <img
//                         src={relatedProduct.image}
//                         alt={relatedProduct.title}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="p-4">
//                       <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{relatedProduct.title}</h3>
//                       <p className="mt-1 text-sm font-semibold text-gray-900">₹{relatedProduct.price.toFixed(2)}</p>
//                     </div>
//                   </a>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         )}
//       </main>
      
//       <Footer />
//     </div>
//   );
// };

// export default ProductPage;










































// import React, { useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Header from '../Layout/Header';
// import ReviewSection from './ReviewSection';
// import Footer from '../Layout/Footer';
// import toast from 'react-hot-toast';
// import { motion, AnimatePresence } from 'framer-motion';

// // Icons
// const HeartIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//   </svg>
// );

// const ShoppingCartIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//   </svg>
// );

// const WhatsAppIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//   </svg>
// );

// const ChevronLeftIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//   </svg>
// );

// const ChevronRightIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//   </svg>
// );

// const PlayIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12 sm:w-16 sm:h-16">
//     <path d="M8 5v14l11-7z" />
//   </svg>
// );

// const PauseIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12 sm:w-16 sm:h-16">
//     <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
//   </svg>
// );

// const VideoIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
//   </svg>
// );

// const ImageIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
//   </svg>
// );

// const InstagramIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
//   </svg>
// );

// // StarIcon for ratings
// const StarIcon = ({ filled }) => (
//   <svg 
//     xmlns="http://www.w3.org/2000/svg" 
//     viewBox="0 0 24 24" 
//     fill={filled ? "currentColor" : "none"} 
//     stroke={filled ? "" : "currentColor"} 
//     className={`w-4 h-4 sm:w-5 sm:h-5 ${filled ? "text-gray-800" : "text-gray-300"}`}
//   >
//     <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
//   </svg>
// );

// // Helper function to determine if a link is a YouTube URL
// const getYouTubeVideoId = (url) => {
//   if (!url) return null;
  
//   // Match formats like: 
//   // - https://www.youtube.com/watch?v=VIDEO_ID
//   // - https://youtu.be/VIDEO_ID
//   // - https://youtube.com/shorts/VIDEO_ID
//   const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube.com\/shorts\/)([^"&?\/\s]{11})/i;
//   const match = url.match(regex);
//   return match ? match[1] : null;
// };

// // Helper function to extract Instagram post ID
// const getInstagramPostId = (url) => {
//   if (!url) return null;
  
//   // Match formats like:
//   // - https://www.instagram.com/p/POSTID/
//   // - https://www.instagram.com/reel/POSTID/
//   // - https://instagram.com/p/POSTID/
//   // - https://www.instagram.com/p/POSTID/?igshid=something
//   const regex = /instagram\.com\/(?:p|reel)\/([^/?]+)/i;
//   const match = url.match(regex);
//   return match ? match[1] : null;
// };


// // Helper function to determine media type
// const getMediaType = (url) => {
//   if (!url) return 'unknown';
  
//   const youtubeId = getYouTubeVideoId(url);
//   if (youtubeId) return 'youtube';
  
//   const instagramId = getInstagramPostId(url);
//   if (instagramId) return 'instagram';
  
//   if (url.includes('vimeo.com')) return 'vimeo';
//   if (url.match(/\.(mp4|webm|ogg)$/i)) return 'direct';
  
//   return 'unknown';
// };

// const ProductPage = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [customization, setCustomization] = useState('');
//   const [viewingFullImage, setViewingFullImage] = useState(false);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const [mediaType, setMediaType] = useState('unknown');
//   const [showingVideo, setShowingVideo] = useState(false);
//   const videoRef = useRef(null);
//   const instagramRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);
//   const [activeTab, setActiveTab] = useState('image');

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       setScreenWidth(window.innerWidth);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     setIsAddingToCart(true);
//     try {
//       const price = product.discount 
//         ? (product.price - (product.price * product.discount / 100)).toFixed(2) 
//         : product.price.toFixed(2);
      
//       await axios.post(`https://pr-crafts-backend.vercel.app/api/v1/user/addtocart/${id}`, {
//         quantity: quantity,
//         customization: customization,
//         title: product.title,
//         image: product.postImages[0],
//         price: price,
//       }, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });
      
//       toast.success("Added To Cart");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to add to cart");
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`https://pr-crafts-backend.vercel.app/api/v1/post/showpost/${id}`, {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json"
//           }
//         });
//         setProduct(response.data.post);
        
//         // Determine video media type if videoLink exists
//         if (response.data.post.videoLink) {
//           const type = getMediaType(response.data.post.videoLink);
//           setMediaType(type);
          
//           // Set appropriate tab and showing video state
//           if (type === 'instagram' || type === 'youtube') {
//             setActiveTab('video');
//             setShowingVideo(true);
//           }
//         }
        
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         setError("Failed to load product data");
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   // Handle Instagram embed script loading
//   useEffect(() => {
//     if (showingVideo && mediaType === 'instagram') {
//       // Load Instagram embed script if not already loaded
//       if (!document.getElementById('instagram-embed-script')) {
//         const script = document.createElement('script');
//         script.id = 'instagram-embed-script';
//         script.src = '//www.instagram.com/embed.js';
//         script.async = true;
        
//         script.onload = () => {
//           // Process Instagram embeds
//           if (window.instgrm) {
//             window.instgrm.Embeds.process();
//           }
//         };
        
//         document.body.appendChild(script);
//       } else if (window.instgrm) {
//         // Process Instagram embeds if script already loaded
//         window.instgrm.Embeds.process();
//       }
//     }
//   }, [showingVideo, mediaType, product]);

//   // Handle video playback
//   const toggleVideoPlayback = () => {
//     if (!videoRef.current) return;
    
//     if (isVideoPlaying) {
//       videoRef.current.pause();
//     } else {
//       videoRef.current.play();
//     }
    
//     setIsVideoPlaying(!isVideoPlaying);
//   };

//   // Toggle between showing image or video
//   const toggleMediaDisplay = (type) => {
//     if (type === 'video' && product?.videoLink) {
//       setActiveTab('video');
//       setShowingVideo(true);
//     } else {
//       setActiveTab('image');
//       setShowingVideo(false);
      
//       // Reset video playback when switching to images
//       if (showingVideo && isVideoPlaying && mediaType === 'direct') {
//         setIsVideoPlaying(false);
//         if (videoRef.current) {
//           videoRef.current.pause();
//         }
//       }
//     }
//   };

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

//   // Expanded image view toggle
//   const toggleFullImage = () => {
//     setViewingFullImage(!viewingFullImage);
//   };

//   // Quantity controls
//   const increaseQuantity = () => {
//     if (product.quantity > quantity) {
//       setQuantity(quantity + 1);
//     } else {
//       toast.error("Max Quantity Reached");
//     }
//   };
  
//   const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  
//   // WhatsApp message generation
//   const generateWhatsAppMessage = () => {
//     if (!product) return "";
//     const message = `Hi, I'm interested in buying ${quantity} of the ${product.name || product.title || "product"}${customization ? ` with this customization: ${customization}` : ''}. Could you provide more details?`;
//     const encodedMessage = encodeURIComponent(message);
//     return `https://wa.me/7405678171?text=${encodedMessage}`;
//   };

//   // Rating stars
//   const renderStars = (rating) => {
//     return (
//       <div className="flex">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <StarIcon key={star} filled={star <= rating} />
//         ))}
//       </div>
//     );
//   };

//   // Render YouTube embedded player
//   const renderYouTubeEmbed = (videoId) => {
//     if (!videoId) return null;
    
//     return (
//       <div className="w-full rounded-lg overflow-hidden shadow-lg">
//         <div className="aspect-w-16 aspect-h-9 lg:min-h-[500px]">
//           <iframe
//             src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=${isVideoPlaying ? 1 : 0}`}
//             title="YouTube video player"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             className="w-full h-full object-cover"
//           ></iframe>
//         </div>
//       </div>
//     );
//   };

//   // Render Instagram embedded player with improved height
//   // const renderInstagramEmbed = (url) => {
//   //   if (!url) return null;
    
//   //   const instagramId = getInstagramPostId(url);
//   //   if (!instagramId) return null;
    
//   //   // Create embed URL
//   //   const embedUrl = `https://www.instagram.com/p/${instagramId}/embed/`;
    
//   //   // Calculate responsive height based on screen width
//   //   const getHeight = () => {
//   //     if (screenWidth < 480) return "600px";  // Mobile
//   //     if (screenWidth < 768) return "700px";  // Tablet
//   //     return "750px";  // Desktop
//   //   };
    
//   //   return (
//   //     <div className="instagram-embed-container w-full rounded-lg overflow-hidden shadow-lg bg-white">
//   //       <div className="relative" style={{ height: getHeight() }}>
//   //         <iframe
//   //           ref={instagramRef}
//   //           src={embedUrl}
//   //           title="Instagram Post"
//   //           className="w-full h-full border-0"
//   //           allowTransparency="true"
//   //           allowFullScreen="true"
//   //           scrolling="no"
//   //           loading="lazy"
//   //         ></iframe>
//   //       </div>
        
//   //       <div className="flex justify-center items-center mt-2 p-2">
//   //         <a 
//   //           href={url}
//   //           target="_blank"
//   //           rel="noopener noreferrer"
//   //           className="flex items-center text-gray-700 hover:text-pink-600 transition-colors text-sm"
//   //         >
//   //           <InstagramIcon />
//   //           <span className="ml-2">View on Instagram</span>
//   //         </a>
//   //       </div>
//   //     </div>
//   //   );
//   // };







//   const renderInstagramEmbed = (url) => {
//     if (!url) return null;
    
//     const instagramId = getInstagramPostId(url);
//     if (!instagramId) return null;
    
//     // Create embed URL
//     const embedUrl = `https://www.instagram.com/p/${instagramId}/embed/`;
    
//     // Calculate responsive height based on screen width
//     const getHeight = () => {
//       if (screenWidth < 480) return "600px";  // Mobile
//       if (screenWidth < 768) return "700px";  // Tablet
//       return "400px";  // Desktop - reduced from 750px to 550px
//     };
    
//     return (
//       <div className="instagram-embed-container w-full md:w-4/5 lg:w-3/4 mx-auto rounded-lg overflow-hidden shadow-lg bg-white">
//         <div className="relative" style={{ height: getHeight() }}>
//           <iframe
//             ref={instagramRef}
//             src={embedUrl}
//             title="Instagram Post"
//             className="w-full h-full border-0"
//             allowTransparency="true"
//             allowFullScreen="true"
//             scrolling="no"
//             loading="lazy"
//           ></iframe>
//         </div>
        
//         <div className="flex justify-center items-center mt-2 p-2">
//           <a 
//             href={url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center text-gray-700 hover:text-pink-600 transition-colors text-sm"
//           >
//             <InstagramIcon />
//             <span className="ml-2">View on Instagram</span>
//           </a>
//         </div>
//       </div>
//     );
//   }

//   // Render direct video player
//   const renderVideoPlayer = (url) => {
//     return (
//       <div className="relative w-full rounded-lg overflow-hidden shadow-lg bg-black">
//         <div className="aspect-w-16 aspect-h-9 lg:min-h-[500px]">
//           <video
//             ref={videoRef}
//             src={url}
//             className="w-full h-full object-contain"
//             poster={product?.postImages?.[0]?.url}
//             onPlay={() => setIsVideoPlaying(true)}
//             onPause={() => setIsVideoPlaying(false)}
//             onClick={toggleVideoPlayback}
//             playsInline
//             preload="metadata"
//           />
          
//           {!isVideoPlaying && (
//             <div 
//               className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-30 transition-opacity hover:bg-opacity-40"
//               onClick={toggleVideoPlayback}
//             >
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="text-white opacity-80 hover:opacity-100"
//               >
//                 <PlayIcon />
//               </motion.div>
//             </div>
//           )}
//         </div>
        
//         {isVideoPlaying && (
//           <motion.button
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
//             onClick={toggleVideoPlayback}
//           >
//             <PauseIcon />
//           </motion.button>
//         )}
//       </div>
//     );
//   };

//   // Render the appropriate media element based on type
//   const renderMediaContent = () => {
//     if (!product || !product.videoLink) return null;
    
//     switch (mediaType) {
//       case 'youtube':
//         const youtubeId = getYouTubeVideoId(product.videoLink);
//         return renderYouTubeEmbed(youtubeId);
      
//       case 'instagram':
//         return renderInstagramEmbed(product.videoLink);
      
//       case 'direct':
//         return renderVideoPlayer(product.videoLink);
      
//       case 'vimeo':
//       case 'unknown':
//       default:
//         return (
//           <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg text-gray-500">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-3 text-gray-400">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
//             </svg>
//             <p className="text-center mb-3">External video link available</p>
//             <a 
//               href={product.videoLink} 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-sm"
//             >
//               View Video
//             </a>
//           </div>
//         );
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="flex flex-col items-center">
//           <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
//           <p className="mt-4 text-gray-800 font-medium">Loading product details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center max-w-md mx-4"
//         >
//           <div className="mb-4 text-red-500">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 sm:w-12 sm:h-12 mx-auto">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
//             </svg>
//           </div>
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Error</h2>
//           <p className="text-gray-600">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="mt-6 px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
//           >
//             Try Again
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center max-w-md mx-4"
//         >
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
//           <p className="text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
//           <button 
//             onClick={() => window.history.back()}
//             className="mt-6 px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
//           >
//             Go Back
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <div className="container mx-auto px-4 py-8 max-w-7xl">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Product Images and Video Section */}
//           <div className="space-y-4">
//             {/* Media Tab Controls */}
//             {product.videoLink && (
//               <div className="flex space-x-2 mb-4">
//                 <button 
//                   onClick={() => toggleMediaDisplay('image')}
//                   className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'image' 
//                     ? 'bg-black text-white' 
//                     : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
//                 >
//                   <ImageIcon />
//                   <span className="ml-2">Photos</span>
//                 </button>
//                 <button 
//                   onClick={() => toggleMediaDisplay('video')}
//                   className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'video' 
//                     ? 'bg-black text-white' 
//                     : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
//                 >
//                   <VideoIcon />
//                   <span className="ml-2">Video</span>
//                 </button>
//               </div>
//             )}

//             {/* Image Gallery or Video Player */}
//             <AnimatePresence mode="wait">
//               {!showingVideo ? (
//                 <motion.div 
//                   key="image-gallery"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="relative"
//                 >
//                   {/* Main Product Image */}
//                   <div className="relative aspect-w-1 aspect-h-1 lg:min-h-[500px] overflow-hidden rounded-lg bg-gray-50">
//                     {product.postImages && product.postImages.length > 0 && (
//                       <img
//                         src={product.postImages[currentImageIndex]?.url}
//                         alt={product.title || "Product Image"}
//                         className={`w-full h-full object-contain transition-transform duration-300 cursor-pointer ${viewingFullImage ? 'scale-150' : 'scale-100'}`}
//                         onClick={toggleFullImage}
//                       />
//                     )}
                    
//                     {/* Image Navigation Arrows */}
//                     {product.postImages && product.postImages.length > 1 && (
//                       <>
//                         <button 
//                           onClick={prevImage}
//                           className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-800 p-2 rounded-full shadow transition-all"
//                         >
//                           <ChevronLeftIcon />
//                         </button>
//                         <button 
//                           onClick={nextImage}
//                           className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-800 p-2 rounded-full shadow transition-all"
//                         >
//                           <ChevronRightIcon />
//                         </button>
//                       </>
//                     )}
//                   </div>
                  
//                   {/* Thumbnail Preview */}
//                   {product.postImages && product.postImages.length > 1 && (
//                     <div className="flex mt-4 space-x-2 overflow-x-auto pb-2 hide-scrollbar">
//                       {product.postImages.map((image, index) => (
//                         <div 
//                           key={index} 
//                           className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 ${
//                             index === currentImageIndex ? 'border-gray-800' : 'border-transparent'
//                           }`}
//                           onClick={() => setCurrentImageIndex(index)}
//                         >
//                           <img 
//                             src={image} 
//                             alt={`Thumbnail ${index + 1}`}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="video-player"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   {renderMediaContent()}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Product Details Section */}
//           <div className="space-y-6">
//             {/* Product Title and Rating */}
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              
//               <div className="flex items-center space-x-4">
//                 {product.ratings && (
//                   <div className="flex items-center">
//                     {renderStars(product.ratings)}
//                     <span className="ml-2 text-sm text-gray-500">({product.numOfReviews || 0} reviews)</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Price Information */}
//             <div className="flex items-baseline">
//               <div className="text-xl sm:text-2xl font-bold text-gray-900">
//                 ₹{discountedPrice}
//               </div>
              
//               {product.discount > 0 && (
//                 <>
//                   <div className="ml-3 text-base sm:text-lg text-gray-500 line-through">
//                     ₹{product.price.toFixed(2)}
//                   </div>
//                   <div className="ml-3 px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded">
//                     {product.discount}% OFF
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Stock Information */}
//             <div className="flex items-center">
//               <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                 product.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//               }`}>
//                 {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
//               </span>
              
//               {product.quantity > 0 && (
//                 <span className="ml-2 text-sm text-gray-500">
//                   ({product.quantity} available)
//                 </span>
//               )}
//             </div>

//             {/* Product Description */}
//             <div className="prose prose-sm sm:prose max-w-none text-gray-700">
//               <h3 className="text-lg font-medium text-gray-900">Description</h3>
//               <p>{product.description || "No description available."}</p>
//             </div>

//             {/* Form for Adding to Cart */}
//             <form onSubmit={handleAddToCart} className="space-y-6">
//               {/* Quantity Selector */}
//               <div>
//                 <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
//                   Quantity
//                 </label>
//                 <div className="flex items-center">
//                   <button 
//                     type="button"
//                     onClick={decreaseQuantity}
//                     className="w-10 h-10 bg-gray-100 rounded-l border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors"
//                   >
//                     <span className="text-xl font-medium">-</span>
//                   </button>
                  
//                   <input
//                     type="number"
//                     id="quantity"
//                     name="quantity"
//                     min="1"
//                     max={product.quantity}
//                     value={quantity}
//                     onChange={(e) => setQuantity(Math.min(product.quantity, Math.max(1, parseInt(e.target.value) || 1)))}
//                     className="w-16 h-10 text-center border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
//                   />
                  
//                   <button 
//                     type="button"
//                     onClick={increaseQuantity}
//                     className="w-10 h-10 bg-gray-100 rounded-r border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors"
//                   >
//                     <span className="text-xl font-medium">+</span>
//                   </button>
//                 </div>
//               </div>

//               {/* Customization Field */}
//               <div>
//                 <label htmlFor="customization" className="block text-sm font-medium text-gray-700 mb-2">
//                   Customization (Optional)
//                 </label>
//                 <textarea
//                   id="customization"
//                   name="customization"
//                   rows="3"
//                   value={customization}
//                   onChange={(e) => setCustomization(e.target.value)}
//                   placeholder="Add any special instructions or customizations here..."
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
//                 ></textarea>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
//                 <button
//                   type="submit"
//                   disabled={isAddingToCart || product.quantity < 1}
//                   className={`flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
//                     product.quantity < 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-900'
//                   } transition-colors`}
//                 >
//                   {isAddingToCart ? (
//                     <span className="flex items-center">
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Adding...
//                     </span>
//                   ) : (
//                     <>
//                       <ShoppingCartIcon />
//                       <span className="ml-2">Add to Cart</span>
//                     </>
//                   )}
//                 </button>
                
//                 <a
//                   href={generateWhatsAppMessage()}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex-1 flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
//                 >
//                   <WhatsAppIcon />
//                   <span className="ml-2">Inquire on WhatsApp</span>
//                 </a>
//               </div>
//             </form>

//             {/* Additional Product Information */}
//             {product.additionalInfo && (
//               <div className="border-t border-gray-200 pt-4">
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">Additional Information</h3>
//                 <div className="prose prose-sm sm:prose max-w-none text-gray-700">
//                   <p>{product.additionalInfo}</p>
//                 </div>
//               </div>
//             )}

//             {/* Shipping and Returns Policy */}
//             <div className="border-t border-gray-200 pt-4">
//               <h3 className="text-lg font-medium text-gray-900 mb-2">Shipping & Returns</h3>
//               <div className="prose prose-sm sm:prose max-w-none text-gray-700">
//                 <p>
//                   Standard shipping takes 5-7 business days. We accept returns within 14 days of delivery.
//                   Contact us for return shipping instructions.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Reviews Section */}
//         <div className="mt-16">
//           <ReviewSection productId={id} reviews={product.reviews || []} />
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ProductPage;






















































// import React, { useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Header from '../Layout/Header';
// import ReviewSection from './ReviewSection';
// import Footer from '../Layout/Footer';
// import toast from 'react-hot-toast';
// import { motion, AnimatePresence } from 'framer-motion';
// import InstagramReelPlayer from './InstagramReelPlayer'; // Import the new component

// // Icons remain the same as your original code
// const HeartIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//   </svg>
// );

// const ShoppingCartIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//   </svg>
// );

// const WhatsAppIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//   </svg>
// );

// const ChevronLeftIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//   </svg>
// );

// const ChevronRightIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//   </svg>
// );

// const PlayIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12 sm:w-16 sm:h-16">
//     <path d="M8 5v14l11-7z" />
//   </svg>
// );

// const PauseIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12 sm:w-16 sm:h-16">
//     <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
//   </svg>
// );

// const VideoIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
//   </svg>
// );

// const ImageIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
//   </svg>
// );

// const InstagramIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6">
//     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
//   </svg>
// );

// // StarIcon for ratings
// const StarIcon = ({ filled }) => (
//   <svg 
//     xmlns="http://www.w3.org/2000/svg" 
//     viewBox="0 0 24 24" 
//     fill={filled ? "currentColor" : "none"} 
//     stroke={filled ? "" : "currentColor"} 
//     className={`w-4 h-4 sm:w-5 sm:h-5 ${filled ? "text-gray-800" : "text-gray-300"}`}
//   >
//     <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
//   </svg>
// );

// // Helper function to determine if a link is a YouTube URL
// const getYouTubeVideoId = (url) => {
//   if (!url) return null;
  
//   // Match formats like: 
//   // - https://www.youtube.com/watch?v=VIDEO_ID
//   // - https://youtu.be/VIDEO_ID
//   // - https://youtube.com/shorts/VIDEO_ID
//   const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube.com\/shorts\/)([^"&?\/\s]{11})/i;
//   const match = url.match(regex);
//   return match ? match[1] : null;
// };

// // Helper function to extract Instagram post ID
// const getInstagramPostId = (url) => {
//   if (!url) return null;
  
//   // Match formats like:
//   // - https://www.instagram.com/p/POSTID/
//   // - https://www.instagram.com/reel/POSTID/
//   // - https://instagram.com/p/POSTID/
//   // - https://www.instagram.com/p/POSTID/?igshid=something
//   const regex = /instagram\.com\/(?:p|reel)\/([^/?]+)/i;
//   const match = url.match(regex);
//   return match ? match[1] : null;
// };

// // Helper function to determine media type
// const getMediaType = (url) => {
//   if (!url) return 'unknown';
  
//   const youtubeId = getYouTubeVideoId(url);
//   if (youtubeId) return 'youtube';
  
//   const instagramId = getInstagramPostId(url);
//   if (instagramId) return 'instagram';
  
//   if (url.includes('vimeo.com')) return 'vimeo';
//   if (url.match(/\.(mp4|webm|ogg)$/i)) return 'direct';
  
//   return 'unknown';
// };

// const ProductPage = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [customization, setCustomization] = useState('');
//   const [viewingFullImage, setViewingFullImage] = useState(false);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const [mediaType, setMediaType] = useState('unknown');
//   const [showingVideo, setShowingVideo] = useState(false);
//   const videoRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);
//   const [activeTab, setActiveTab] = useState('image');

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       setScreenWidth(window.innerWidth);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     setIsAddingToCart(true);
//     try {
//       const price = product.discount 
//         ? (product.price - (product.price * product.discount / 100)).toFixed(2) 
//         : product.price.toFixed(2);
      
//       await axios.post(`https://pr-crafts-backend.vercel.app/api/v1/user/addtocart/${id}`, {
//         quantity: quantity,
//         customization: customization,
//         title: product.title,
//         image: product.postImages[0],
//         price: price,
//       }, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });
      
//       toast.success("Added To Cart");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to add to cart");
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`https://pr-crafts-backend.vercel.app/api/v1/post/showpost/${id}`, {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json"
//           }
//         });
//         setProduct(response.data.post);
        
//         // Determine video media type if videoLink exists
//         if (response.data.post.videoLink) {
//           const type = getMediaType(response.data.post.videoLink);
//           setMediaType(type);
          
//           // Set appropriate tab and showing video state
//           if (type === 'instagram' || type === 'youtube') {
//             setActiveTab('video');
//             setShowingVideo(true);
//           }
//         }
        
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         setError("Failed to load product data");
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   // Handle video playback for direct videos
//   const toggleVideoPlayback = () => {
//     if (mediaType === 'direct' && videoRef.current) {
//       if (isVideoPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsVideoPlaying(!isVideoPlaying);
//     }
//   };

//   // Toggle between showing image or video
//   const toggleMediaDisplay = (type) => {
//     if (type === 'video' && product?.videoLink) {
//       setActiveTab('video');
//       setShowingVideo(true);
//     } else {
//       setActiveTab('image');
//       setShowingVideo(false);
      
//       // Reset video playback when switching to images
//       if (showingVideo && isVideoPlaying) {
//         setIsVideoPlaying(false);
//         if (videoRef.current && mediaType === 'direct') {
//           videoRef.current.pause();
//         }
//       }
//     }
//   };

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

//   // Expanded image view toggle
//   const toggleFullImage = () => {
//     setViewingFullImage(!viewingFullImage);
//   };

//   // Quantity controls
//   const increaseQuantity = () => {
//     if (product.quantity > quantity) {
//       setQuantity(quantity + 1);
//     } else {
//       toast.error("Max Quantity Reached");
//     }
//   };
  
//   const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  
//   // WhatsApp message generation
//   const generateWhatsAppMessage = () => {
//     if (!product) return "";
//     const message = `Hi, I'm interested in buying ${quantity} of the ${product.name || product.title || "product"}${customization ? ` with this customization: ${customization}` : ''}. Could you provide more details?`;
//     const encodedMessage = encodeURIComponent(message);
//     return `https://wa.me/7405678171?text=${encodedMessage}`;
//   };

//   // Rating stars
//   const renderStars = (rating) => {
//     return (
//       <div className="flex">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <StarIcon key={star} filled={star <= rating} />
//         ))}
//       </div>
//     );
//   };

//  // Render YouTube embedded player
//  const renderYouTubeEmbed = (videoId) => {
//   if (!videoId) return null;
  
//   return (
//     <div className="relative w-full pt-[56.25%]">
//       <iframe
//         className="absolute top-0 left-0 w-full h-full"
//         src={`https://www.youtube.com/embed/${videoId}`}
//         title="YouTube video player"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       ></iframe>
//     </div>
//   );
// };

// // Render Instagram embed or player
// const renderInstagramEmbed = (postId) => {
//   if (!postId) return null;
  
//   // Determine if it's a reel or regular post
//   const isReel = product?.videoLink?.includes('/reel/');
  
//   return (
//     <InstagramReelPlayer 
//       postId={postId} 
//       isReel={isReel}
//       width={isMobile ? screenWidth - 40 : 500}
//     />
//   );
// };

// // Render appropriate video based on media type
// const renderVideoContent = () => {
//   if (!product?.videoLink) return null;
  
//   switch (mediaType) {
//     case 'youtube':
//       const youtubeId = getYouTubeVideoId(product.videoLink);
//       return renderYouTubeEmbed(youtubeId);
    
//     case 'instagram':
//       const instagramId = getInstagramPostId(product.videoLink);
//       return renderInstagramEmbed(instagramId);
    
//     case 'direct':
//       return (
//         <div className="relative w-full">
//           <video
//             ref={videoRef}
//             src={product.videoLink}
//             className="w-full h-auto rounded-lg"
//             controls={false}
//             onPlay={() => setIsVideoPlaying(true)}
//             onPause={() => setIsVideoPlaying(false)}
//             onClick={toggleVideoPlayback}
//           />
//           {!isVideoPlaying && (
//             <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg cursor-pointer" onClick={toggleVideoPlayback}>
//               <PlayIcon />
//             </div>
//           )}
//           {isVideoPlaying && (
//             <div className="absolute inset-0 flex items-center justify-center bg-transparent rounded-lg cursor-pointer" onClick={toggleVideoPlayback}>
//               <PauseIcon />
//             </div>
//           )}
//         </div>
//       );
    
//     default:
//       return <div className="text-center p-4">Video format not supported</div>;
//   }
// };

// if (loading) {
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
//     </div>
//   );
// }

// if (error || !product) {
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="text-center">
//         <h2 className="text-xl font-semibold text-red-600">Error loading product</h2>
//         <p className="mt-2 text-gray-600">{error || "Product not found"}</p>
//       </div>
//     </div>
//   );
// }

// return (
//   <div className="bg-white min-h-screen">
//     <Header />
    
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col md:flex-row md:space-x-8">
//         {/* Product Image/Video Section */}
//         <div className="md:w-1/2 mb-8 md:mb-0">
//           <div className="mb-4 flex space-x-2 justify-center">
//             <button 
//               onClick={() => toggleMediaDisplay('image')}
//               className={`flex items-center px-3 py-1 border rounded-md ${activeTab === 'image' ? 'bg-black text-white' : 'text-black'}`}
//             >
//               <ImageIcon />
//               <span className="ml-1">Photos</span>
//             </button>
            
//             {product.videoLink && (
//               <button 
//                 onClick={() => toggleMediaDisplay('video')}
//                 className={`flex items-center px-3 py-1 border rounded-md ${activeTab === 'video' ? 'bg-black text-white' : 'text-black'}`}
//               >
//                 <VideoIcon />
//                 <span className="ml-1">Video</span>
//               </button>
//             )}
            
//             {product.instagramLink && (
//               <a 
//                 href={product.instagramLink} 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="flex items-center px-3 py-1 border rounded-md text-black hover:bg-gray-100"
//               >
//                 <InstagramIcon />
//                 <span className="ml-1">Post</span>
//               </a>
//             )}
//           </div>

//           {/* Media Display */}
//           <div className="relative overflow-hidden rounded-lg">
//             <AnimatePresence>
//               {showingVideo ? (
//                 <motion.div
//                   key="video"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="w-full"
//                 >
//                   {renderVideoContent()}
//                 </motion.div>
//               ) : (
//                 <>
//                   <motion.div
//                     key="image"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="relative"
//                   >
//                     <div className="relative aspect-square overflow-hidden">
//                       <img 
//                         src={product.postImages[currentImageIndex]?.url} 
//                         alt={product.title} 
//                         className="w-full h-full object-cover cursor-pointer"
//                         onClick={toggleFullImage}
//                       />
//                     </div>
                    
//                     {/* Image Navigation */}
//                     {product.postImages.length > 1 && (
//                       <div className="absolute inset-0 flex items-center justify-between px-2">
//                         <button 
//                           onClick={prevImage}
//                           className="p-1 rounded-full bg-white/60 hover:bg-white text-black shadow"
//                         >
//                           <ChevronLeftIcon />
//                         </button>
//                         <button 
//                           onClick={nextImage}
//                           className="p-1 rounded-full bg-white/60 hover:bg-white text-black shadow"
//                         >
//                           <ChevronRightIcon />
//                         </button>
//                       </div>
//                     )}
                    
//                     {/* Image Counter */}
//                     {product.postImages.length > 1 && (
//                       <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-0.5 rounded text-xs">
//                         {currentImageIndex + 1} / {product.postImages.length}
//                       </div>
//                     )}
//                   </motion.div>
                  
//                   {/* Thumbnail Navigation for multiple images */}
//                   {product.postImages.length > 1 && (
//                     <div className="flex space-x-2 mt-2 overflow-x-auto pb-2">
//                       {product.postImages.map((image, index) => (
//                         <div 
//                           key={index}
//                           className={`w-16 h-16 rounded-md overflow-hidden flex-shrink-0 cursor-pointer border-2 ${
//                             currentImageIndex === index ? 'border-black' : 'border-transparent'
//                           }`}
//                           onClick={() => setCurrentImageIndex(index)}
//                         >
//                           <img 
//                             src={image} 
//                             alt={`Thumbnail ${index + 1}`} 
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* Product Information */}
//         <div className="md:w-1/2">
//           <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">{product.title}</h1>
          
//           <div className="flex items-center space-x-2 mt-2">
//             {renderStars(product.ratings || 5)}
//             <span className="text-sm text-gray-500">{product.numOfReviews || 0} reviews</span>
//           </div>
          
//           <div className="mt-4 flex items-center">
//             <span className="text-2xl font-bold text-gray-900">₹{discountedPrice}</span>
//             {product.discount > 0 && (
//               <>
//                 <span className="ml-2 text-lg text-gray-500 line-through">₹{product.price.toFixed(2)}</span>
//                 <span className="ml-2 text-sm text-green-600">{product.discount}% OFF</span>
//               </>
//             )}
//           </div>
          
//           <div className="mt-4">
//             <p className="text-gray-700">{product.description}</p>
//           </div>
          
//           {/* Stock Status */}
//           <div className="mt-4">
//             <p className={`text-sm font-medium ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
//               {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
//             </p>
//           </div>
          
//           {/* Add to Cart Form */}
//           <form onSubmit={handleAddToCart} className="mt-6">
//             <div className="mb-4">
//               <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
//                 Quantity
//               </label>
//               <div className="flex items-center border border-gray-300 rounded-md w-32">
//                 <button 
//                   type="button" 
//                   onClick={decreaseQuantity}
//                   className="w-8 h-8 flex items-center justify-center"
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   id="quantity"
//                   min="1"
//                   max={product.quantity}
//                   value={quantity}
//                   onChange={(e) => setQuantity(Math.min(parseInt(e.target.value) || 1, product.quantity))}
//                   className="w-16 text-center border-0 focus:ring-0"
//                 />
//                 <button 
//                   type="button" 
//                   onClick={increaseQuantity}
//                   className="w-8 h-8 flex items-center justify-center"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
            
//             {/* Customization */}
//             <div className="mb-4">
//               <label htmlFor="customization" className="block text-sm font-medium text-gray-700 mb-1">
//                 Customization (Optional)
//               </label>
//               <textarea
//                 id="customization"
//                 value={customization}
//                 onChange={(e) => setCustomization(e.target.value)}
//                 placeholder="Add any personalization details here..."
//                 className="w-full border border-gray-300 rounded-md p-2 focus:ring-black focus:border-black"
//                 rows="3"
//               ></textarea>
//             </div>
            
//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
//               <button
//                 type="submit"
//                 disabled={isAddingToCart || product.quantity < 1}
//                 className={`flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//                   product.quantity < 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
//                 }`}
//               >
//                 <ShoppingCartIcon />
//                 <span className="ml-2">
//                   {isAddingToCart ? 'Adding...' : 'Add to Cart'}
//                 </span>
//               </button>
              
//               <a
//                 href={generateWhatsAppMessage()}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
//               >
//                 <WhatsAppIcon />
//                 <span className="ml-2">Chat on WhatsApp</span>
//               </a>
//             </div>
//           </form>
          
//           {/* Wishlist Button */}
//           <button className="flex items-center mt-4 text-gray-600 hover:text-gray-900">
//             <HeartIcon />
//             <span className="ml-2">Add to Wishlist</span>
//           </button>
//         </div>
//       </div>
      
//       {/* Reviews Section */}
//       <div className="mt-12">
//         <h2 className="text-xl font-semibold border-b pb-2">Customer Reviews</h2>
//         <ReviewSection productId={id} />
//       </div>
//     </div>

//     {/* Fullscreen Image Modal */}
//     <AnimatePresence>
//       {viewingFullImage && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
//           onClick={toggleFullImage}
//         >
//           <div className="relative w-full max-w-4xl">
//             <motion.img
//               src={product.postImages[currentImageIndex]?.url}
//               alt={product.title}
//               className="w-full h-auto"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.8 }}
//             />
            
//             {/* Full Image Navigation */}
//             {product.postImages.length > 1 && (
//               <div className="absolute inset-0 flex items-center justify-between px-4">
//                 <button 
//                   onClick={e => {
//                     e.stopPropagation();
//                     prevImage();
//                   }}
//                   className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white"
//                 >
//                   <ChevronLeftIcon />
//                 </button>
//                 <button 
//                   onClick={e => {
//                     e.stopPropagation();
//                     nextImage();
//                   }}
//                   className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white"
//                 >
//                   <ChevronRightIcon />
//                 </button>
//               </div>
//             )}
            
//             {/* Close button */}
//             <button
//               className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white"
//               onClick={toggleFullImage}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
    
//     <Footer />
//   </div>
// );
// };

// export default ProductPage;




































































// import React, { useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Header from '../Layout/Header';
// import ReviewSection from './ReviewSection';
// import Footer from '../Layout/Footer';
// import toast from 'react-hot-toast';
// import { motion, AnimatePresence } from 'framer-motion';

// // Icons
// const HeartIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//   </svg>
// );

// const ShoppingCartIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//   </svg>
// );

// const WhatsAppIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
//     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//   </svg>
// );
// const InstagramIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
//     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
//   </svg>
// );

// const ChevronLeftIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//   </svg>
// );

// const ChevronRightIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//   </svg>
// );

// const PlayIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-16 h-16">
//     <path d="M8 5v14l11-7z" />
//   </svg>
// );

// const PauseIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-16 h-16">
//     <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
//   </svg>
// );

// const VideoIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
//   </svg>
// );

// // StarIcon for ratings
// const StarIcon = ({ filled }) => (
//   <svg 
//     xmlns="http://www.w3.org/2000/svg" 
//     viewBox="0 0 24 24" 
//     fill={filled ? "currentColor" : "none"} 
//     stroke={filled ? "" : "currentColor"} 
//     className={`w-5 h-5 ${filled ? "text-gray-800" : "text-gray-300"}`}
//   >
//     <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
//   </svg>
// );

// // Helper function to determine if a link is a YouTube URL
// const getYouTubeVideoId = (url) => {
//   if (!url) return null;
  
//   // Match formats like: 
//   // - https://www.youtube.com/watch?v=VIDEO_ID
//   // - https://youtu.be/VIDEO_ID
//   // - https://youtube.com/shorts/VIDEO_ID
//   const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube.com\/shorts\/)([^"&?\/\s]{11})/i;
//   const match = url.match(regex);
//   return match ? match[1] : null;
// };

// const getInstagramId = (url) => {
//   if (!url) return null;
  
//   // Match Instagram post or reel URLs to extract the shortcode
//   const regex = /instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/i;
//   const match = url.match(regex);
//   return match ? match[1] : null;
// };


// const renderInstagramEmbed = (postId) => {
//   if (!postId) return null;
  
//   return (
//     <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden shadow-lg flex items-center justify-center bg-gray-100">
//       <iframe
//         src={`https://www.instagram.com/p/${postId}/embed/captioned`}
//         className="w-full h-full border-none overflow-hidden"
//         scrolling="no"
//         allowTransparency="true"
//         allowFullScreen="true"
//         frameBorder="0"
//         title="Instagram Reel"
//       ></iframe>
//     </div>
//   );
// };

// const getMediaType = (url) => {
//   if (!url) return 'unknown';
  
//   const youtubeId = getYouTubeVideoId(url);
//   if (youtubeId) return 'youtube';
  
//   // Specific check for Instagram reels/posts
//   if (url.includes('instagram.com/reel/') || 
//       url.includes('instagram.com/p/')) return 'instagram';
  
//   if (url.includes('vimeo.com')) return 'vimeo';
//   if (url.match(/\.(mp4|webm|ogg)$/i)) return 'direct';
  
//   return 'unknown';
// };




// const ProductPage = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [customization, setCustomization] = useState('');
//   const [viewingFullImage, setViewingFullImage] = useState(false);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const [mediaType, setMediaType] = useState('unknown');
//   const [showingVideo, setShowingVideo] = useState(false);
//   const videoRef = useRef(null);

//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     setIsAddingToCart(true);
//     try {
//       const price = product.discount 
//         ? (product.price - (product.price * product.discount / 100)).toFixed(2) 
//         : product.price.toFixed(2);
      
//       await axios.post(`https://pr-crafts-backend.vercel.app/api/v1/user/addtocart/${id}`, {
//         quantity: quantity,
//         customization: customization,
//         title: product.title,
//         image: product.postImages[0],
//         price: price,
//       }, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });
      
//       toast.success("Added To Cart");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to add to cart");
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`https://pr-crafts-backend.vercel.app/api/v1/post/showpost/${id}`, {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json"
//           }
//         });
//         setProduct(response.data.post);
        
//         // Determine video media type if videoLink exists
//         if (response.data.post.videoLink) {
//           const type = getMediaType(response.data.post.videoLink);
//           setMediaType(type);
          
//           // Auto show video if it's an Instagram reel
//           if (type === 'instagram') {
//             setShowingVideo(true);
//           }
//         }
        
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         setError("Failed to load product data");
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`https://pr-crafts-backend.vercel.app/api/v1/post/showpost/${id}`, {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json"
//           }
//         });
//         setProduct(response.data.post);
        
//         // Determine video media type if videoLink exists
//         if (response.data.post.videoLink) {
//           setMediaType(getMediaType(response.data.post.videoLink));
//         }
        
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         setError("Failed to load product data");
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   // Handle video playback
//   const toggleVideoPlayback = () => {
//     if (!videoRef.current) return;
    
//     if (isVideoPlaying) {
//       videoRef.current.pause();
//     } else {
//       videoRef.current.play();
//     }
    
//     setIsVideoPlaying(!isVideoPlaying);
//   };

//   // Toggle between showing image or video
//   const toggleMediaDisplay = () => {
//     if (product && product.videoLink) {
//       setShowingVideo(!showingVideo);
      
//       // Reset video playback when switching away
//       if (showingVideo && isVideoPlaying) {
//         setIsVideoPlaying(false);
//         if (videoRef.current) {
//           videoRef.current.pause();
//         }
//       }
//     }
//   };

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

//   // Expanded image view toggle
//   const toggleFullImage = () => {
//     setViewingFullImage(!viewingFullImage);
//   };

//   // Quantity controls
//   const increaseQuantity = () => {
//     if (product.quantity > quantity) {
//       setQuantity(quantity + 1);
//     } else {
//       toast.error("Max Quantity Reached");
//     }
//   };
  
//   const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  
//   // WhatsApp message generation
//   const generateWhatsAppMessage = () => {
//     if (!product) return "";
//     const message = `Hi, I'm interested in buying ${quantity} of the ${product.name || product.title || "product"}${customization ? ` with this customization: ${customization}` : ''}. Could you provide more details?`;
//     const encodedMessage = encodeURIComponent(message);
//     return `https://wa.me/7405678171?text=${encodedMessage}`;
//   };

//   // Rating stars
//   const renderStars = (rating) => {
//     return (
//       <div className="flex">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <StarIcon key={star} filled={star <= rating} />
//         ))}
//       </div>
//     );
//   };

//   const renderMediaContent = () => {
//     if (!product || !product.videoLink) return null;
    
//     switch (mediaType) {
//       case 'youtube':
//         const youtubeId = getYouTubeVideoId(product.videoLink);
//         return renderYouTubeEmbed(youtubeId);
      
//       case 'instagram':
//         const instagramId = getInstagramId(product.videoLink);
//         return renderInstagramEmbed(instagramId);
      
//       case 'direct':
//         return renderVideoPlayer(product.videoLink);
      
//       case 'vimeo':
//       case 'unknown':
//       default:
//         return (
//           <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg text-gray-500">
//             <p className="mb-3">External video link available:</p>
//             <a 
//               href={product.videoLink} 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//             >
//               View Video
//             </a>
//           </div>
//         );
//     }
//   };

//   // Render YouTube embedded player
//   // const renderYouTubeEmbed = (videoId) => {
//   //   if (!videoId) return null;
    
//   //   return (
//   //     <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden shadow-lg">
//   //       <iframe
//   //         src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=${isVideoPlaying ? 1 : 0}`}
//   //         title="YouTube video player"
//   //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//   //         allowFullScreen
//   //         className="w-full h-full object-cover"
//   //       ></iframe>
//   //     </div>
//   //   );
//   // };



//   // const renderYouTubeEmbed = (videoId) => {
//   //   if (!videoId) return null;
    
//   //   return (
//   //     <div className="w-full rounded-lg overflow-hidden shadow-lg">
//   //       {/* Fixed aspect ratio container with responsive height */}
//   //       <div className="relative w-full md:h-96 h-60">
//   //         <iframe
//   //           src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=${isVideoPlaying ? 1 : 0}`}
//   //           title="YouTube video player"
//   //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//   //           allowFullScreen
//   //           className="absolute inset-0 w-full h-full object-cover"
//   //         ></iframe>
//   //       </div>
//   //     </div>
//   //   );
//   // };


//   // const renderYouTubeEmbed = (videoId) => {
//   //   if (!videoId) return null;
    
//   //   return (
//   //     <div className="w-full rounded-lg overflow-hidden shadow-lg">
//   //       {/* Fixed aspect ratio container with responsive height */}
//   //       <div className="relative w-full md:h-96 h-60">
//   //         <iframe
//   //           src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&playsinline=1&autoplay=${isVideoPlaying ? 1 : 0}`}
//   //           title="YouTube video player"
//   //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//   //           allowFullScreen
//   //           className="absolute inset-0 w-full h-full object-cover"
//   //         ></iframe>
          
//   //         {/* Overlay play button that works on both desktop and mobile */}
//   //         {!isVideoPlaying && (
//   //           <div 
//   //             className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-30 transition-opacity hover:bg-opacity-40 z-10"
//   //             onClick={() => setIsVideoPlaying(true)}
//   //             onTouchEnd={(e) => {
//   //               e.preventDefault();
//   //               e.stopPropagation();
//   //               setIsVideoPlaying(true);
//   //             }}
//   //           >
//   //             <motion.div
//   //               whileHover={{ scale: 1.1 }}
//   //               whileTap={{ scale: 0.9 }}
//   //               className="text-white opacity-80 hover:opacity-100 p-4"
//   //             >
//   //               <PlayIcon size={48} />
//   //             </motion.div>
//   //           </div>
//   //         )}
//   //       </div>
//   //     </div>
//   //   );
//   // };

//   // // Render direct video player
//   // const renderVideoPlayer = (url) => {
//   //   return (
//   //     <div className="relative w-full rounded-lg overflow-hidden shadow-lg bg-black">
//   //       <div className="aspect-w-16 aspect-h-9">
//   //         <video
//   //           ref={videoRef}
//   //           src={url}
//   //           className="w-full h-full object-contain"
//   //           poster={product?.postImages?.[0]?.url}
//   //           onPlay={() => setIsVideoPlaying(true)}
//   //           onPause={() => setIsVideoPlaying(false)}
//   //           onClick={toggleVideoPlayback}
//   //         />
          
//   //         {!isVideoPlaying && (
//   //           <div 
//   //             className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-30 transition-opacity hover:bg-opacity-40"
//   //             onClick={toggleVideoPlayback}
//   //           >
//   //             <motion.div
//   //               whileHover={{ scale: 1.1 }}
//   //               whileTap={{ scale: 0.9 }}
//   //               className="text-white opacity-80 hover:opacity-100"
//   //             >
//   //               <PlayIcon />
//   //             </motion.div>
//   //           </div>
//   //         )}
//   //       </div>
        
//   //       {isVideoPlaying && (
//   //         <motion.button
//   //           initial={{ opacity: 0 }}
//   //           animate={{ opacity: 1 }}
//   //           whileHover={{ scale: 1.1 }}
//   //           whileTap={{ scale: 0.9 }}
//   //           className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
//   //           onClick={toggleVideoPlayback}
//   //         >
//   //           <PauseIcon />
//   //         </motion.button>
//   //       )}
//   //     </div>
//   //   );
//   // };

















//   // const renderYouTubeEmbed = (videoId) => {
//   //   if (!videoId) return null;
    
//   //   return (
//   //     <div className="w-full rounded-lg overflow-hidden shadow-lg">
//   //       {/* Fixed aspect ratio container with responsive height */}
//   //       <div className="relative w-full md:h-96 h-60">
//   //         <iframe
//   //           src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&playsinline=1&autoplay=${isVideoPlaying ? 1 : 0}`}
//   //           title="YouTube video player"
//   //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//   //           allowFullScreen
//   //           className="absolute inset-0 w-full h-full object-cover"
//   //         ></iframe>
          
//   //         {/* Overlay play button that works on both desktop and mobile */}
//   //         {!isVideoPlaying && (
//   //           <div 
//   //             className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-30 transition-opacity hover:bg-opacity-40 z-10"
//   //             onClick={() => setIsVideoPlaying(true)}
//   //             onTouchEnd={(e) => {
//   //               e.preventDefault();
//   //               e.stopPropagation();
//   //               setIsVideoPlaying(true);
//   //             }}
//   //           >
//   //             <motion.div
//   //               whileHover={{ scale: 1.1 }}
//   //               whileTap={{ scale: 0.9 }}
//   //               className="text-white opacity-80 hover:opacity-100 p-4"
//   //             >
//   //               <PlayIcon size={48} />
//   //             </motion.div>
//   //           </div>
//   //         )}
//   //       </div>
//   //     </div>
//   //   );
//   // };
  
//   // // Render direct video player
//   // const renderVideoPlayer = (url) => {
//   //   // Add a touch listener state to handle mobile interactions better
//   //   const handleVideoTouch = (e) => {
//   //     e.preventDefault();
//   //     toggleVideoPlayback();
//   //   };
    
//   //   return (
//   //     <div className="relative w-full rounded-lg overflow-hidden shadow-lg bg-black">
//   //       <div className="aspect-w-16 aspect-h-9">
//   //         <video
//   //           ref={videoRef}
//   //           src={url}
//   //           className="w-full h-full object-contain"
//   //           poster={product?.postImages?.[0]?.url}
//   //           onPlay={() => setIsVideoPlaying(true)}
//   //           onPause={() => setIsVideoPlaying(false)}
//   //           onClick={toggleVideoPlayback}
//   //           playsInline // Add playsInline for better iOS support
//   //         />
          
//   //         {/* Play button overlay when video is paused */}
//   //         {!isVideoPlaying && (
//   //           <div 
//   //             className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-30 transition-opacity hover:bg-opacity-40"
//   //             onClick={toggleVideoPlayback}
//   //             onTouchEnd={handleVideoTouch}
//   //           >
//   //             <motion.div
//   //               whileHover={{ scale: 1.1 }}
//   //               whileTap={{ scale: 0.9 }}
//   //               className="text-white opacity-80 hover:opacity-100"
//   //             >
//   //               <PlayIcon />
//   //             </motion.div>
//   //           </div>
//   //         )}
//   //       </div>
        
//   //       {/* Always visible control bar when video is playing */}
//   //       {isVideoPlaying && (
//   //         <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent z-10">
//   //           <motion.button
//   //             initial={{ opacity: 0 }}
//   //             animate={{ opacity: 1 }}
//   //             whileHover={{ scale: 1.1 }}
//   //             whileTap={{ scale: 0.9 }}
//   //             className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
//   //             onClick={toggleVideoPlayback}
//   //             onTouchEnd={handleVideoTouch}
//   //           >
//   //             <PauseIcon />
//   //           </motion.button>
//   //         </div>
//   //       )}
//   //     </div>
//   //   );
//   // };



//   const renderYouTubeEmbed = (videoId) => {
//   if (!videoId) return null;
  
//   return (
//     <div className="w-full rounded-lg overflow-hidden shadow-lg">
//       {/* Fixed aspect ratio container with responsive height */}
//       <div className="relative w-full md:h-96 h-60">
//         <iframe
//           src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&playsinline=1&autoplay=${isVideoPlaying ? 1 : 0}`}
//           title="YouTube video player"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//           className="absolute inset-0 w-full h-full object-cover"
//         ></iframe>
        
//         {/* Overlay play button that works on both desktop and mobile */}
//         {!isVideoPlaying && (
//           <div 
//             className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-30 transition-opacity hover:bg-opacity-40 z-10"
//             onClick={() => setIsVideoPlaying(true)}
//             onTouchEnd={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               setIsVideoPlaying(true);
//             }}
//           >
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               className="text-white opacity-80 hover:opacity-100 p-4"
//             >
//               <PlayIcon size={48} />
//             </motion.div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Render direct video player
// const renderVideoPlayer = (url) => {
//   // Add a touch listener state to handle mobile interactions better
//   const handleVideoTouch = (e) => {
//     e.preventDefault();
//     toggleVideoPlayback();
//   };
  
//   return (
//     <div className="relative w-full rounded-lg overflow-hidden shadow-lg bg-black">
//       <div className="aspect-w-16 aspect-h-9">
//         <video
//           ref={videoRef}
//           src={url}
//           className="w-full h-full object-contain"
//           poster={product?.postImages?.[0]?.url}
//           onPlay={() => setIsVideoPlaying(true)}
//           onPause={() => setIsVideoPlaying(false)}
//           onClick={toggleVideoPlayback}
//           playsInline // Add playsInline for better iOS support
//         />
        
//         {/* Play button overlay when video is paused */}
//         {!isVideoPlaying && (
//           <div 
//             className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-30 transition-opacity hover:bg-opacity-40"
//             onClick={toggleVideoPlayback}
//             onTouchEnd={handleVideoTouch}
//           >
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               className="text-white opacity-80 hover:opacity-100"
//             >
//               <PlayIcon />
//             </motion.div>
//           </div>
//         )}
//       </div>
      
//       {/* Always visible control bar when video is playing */}
//       {isVideoPlaying && (
//         <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent z-10">
//           <motion.button
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
//             onClick={toggleVideoPlayback}
//             onTouchEnd={handleVideoTouch}
//           >
//             <PauseIcon />
//           </motion.button>
//         </div>
//       )}
//     </div>
//   );
// };

//   // Render the appropriate media element based on type
//   // const renderMediaContent = () => {
//   //   if (!product || !product.videoLink) return null;
    
//   //   switch (mediaType) {
//   //     case 'youtube':
//   //       const youtubeId = getYouTubeVideoId(product.videoLink);
//   //       return renderYouTubeEmbed(youtubeId);
      
//   //     case 'direct':
//   //       return renderVideoPlayer(product.videoLink);
      
//   //     case 'instagram':
//   //     case 'vimeo':
//   //     case 'unknown':
//   //     default:
//   //       return (
//   //         <div className="flex items-center justify-center p-8 bg-gray-100 rounded-lg text-gray-500">
//   //           <p>External video link available via:</p>
//   //           <a 
//   //             href={product.videoLink} 
//   //             target="_blank" 
//   //             rel="noopener noreferrer"
//   //             className="ml-2 text-blue-600 hover:underline"
//   //           >
//   //             View Video
//   //           </a>
//   //         </div>
//   //       );
//   //   }
//   // };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="flex flex-col items-center">
//           <div className="w-16 h-16 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
//           <p className="mt-4 text-gray-800 font-medium">Loading product details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md"
//         >
//           <div className="mb-4 text-red-500">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
//           <p className="text-gray-600">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="mt-6 px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
//           >
//             Try Again
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md"
//         >
//           <div className="mb-4 text-gray-500">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25-2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
//           <p className="text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
//           <button 
//             onClick={() => window.history.back()}
//             className="mt-6 px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
//           >
//             Go Back
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   // Modal for fullscreen image preview
//   const FullscreenImageModal = () => {
//     if (!viewingFullImage) return null;
    
//     return (
//       <AnimatePresence>
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center backdrop-blur-sm"
//         >
//           <motion.button 
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.2 }}
//             className="absolute top-4 right-4 text-white text-2xl focus:outline-none bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-all"
//             onClick={toggleFullImage}
//           >
//             ✕
//           </motion.button>
          
//           <motion.div 
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ type: "spring", damping: 25 }}
//             className="relative w-full max-w-5xl mx-auto"
//           >
//             {product.postImages && product.postImages.length > 0 ? (
//               <img 
//                 src={product.postImages[currentImageIndex]?.url} 
//                 alt={`${product.title || "Product"}`}
//                 className="mx-auto max-h-screen object-contain"
//               />
//             ) : null}
            
//             {product.postImages && product.postImages.length > 1 && (
//               <div className="absolute inset-x-0 top-1/2 flex items-center justify-between px-4 transform -translate-y-1/2">
//                 <motion.button 
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     prevImage();
//                   }}
//                   className="bg-white bg-opacity-20 rounded-full p-3 hover:bg-opacity-30 transition-all focus:outline-none"
//                 >
//                   <ChevronLeftIcon />
//                 </motion.button>
//                 <motion.button 
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     nextImage();
//                   }}
//                   className="bg-white bg-opacity-20 rounded-full p-3 hover:bg-opacity-30 transition-all focus:outline-none"
//                 >
//                   <ChevronRightIcon />
//                 </motion.button>
//               </div>
//             )}
//           </motion.div>
//         </motion.div>
//       </AnimatePresence>
//     );
//   };

//   const renderVideoToggleButton = () => {
//     return (
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => setShowingVideo(true)}
//         className={`py-2 px-4 rounded-full text-sm font-medium flex items-center ${
//           showingVideo 
//             ? mediaType === 'instagram' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-black text-white'
//             : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//         }`}
//       >
//         <span className="mr-2">{mediaType === 'instagram' ? 'Reel' : 'Video'}</span>
//         {mediaType === 'instagram' ? (
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
//             <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"/>
//           </svg>
//         ) : (
//           <VideoIcon />
//         )}
//       </motion.button>
//     );
//   };

//   return (
//     <>
//       <Header />
//       <div className="bg-gray-50 min-h-screen">
//         {/* Full-screen image modal */}
//         <FullscreenImageModal />
        
//         <main className="container mx-auto px-4 py-6 md:py-8">
//           <motion.section
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="bg-white rounded-xl shadow-xl overflow-hidden"
//           >
//             <div className="flex flex-col lg:flex-row">
//               {/* Left side - Images & Video */}
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="w-full lg:w-3/5 p-4 md:p-6"
//               >
//                 {/* Media Toggle Buttons - Only show if there's a video */}
//                 {/* {product.videoLink && (
//                   <div className="flex mb-4 space-x-2">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => setShowingVideo(false)}
//                       className={`py-2 px-4 rounded-full text-sm font-medium flex items-center ${
//                         !showingVideo
//                           ? 'bg-black text-white' 
//                           : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                       }`}
//                     >
//                       <span className="mr-2">Photos</span>
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
//                       </svg>
//                     </motion.button>
                    
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => setShowingVideo(true)}
//                       className={`py-2 px-4 rounded-full text-sm font-medium flex items-center ${
//                         showingVideo 
//                           ? 'bg-black text-white' 
//                           : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                       }`}
//                     >
//                       <span className="mr-2">Video</span>
//                       <VideoIcon />
//                     </motion.button>
//                   </div>
//                 )} */}





//                 {product.videoLink && (
//   <div className="flex mb-4 space-x-2">
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       onClick={() => setShowingVideo(false)}
//       className={`py-2 px-4 rounded-full text-sm font-medium flex items-center ${
//         !showingVideo
//           ? 'bg-black text-white' 
//           : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//       }`}
//     >
//       <span className="mr-2">Photos</span>
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
//       </svg>
//     </motion.button>
    
//     {renderVideoToggleButton()}
//   </div>
// )}

                
//                 {/* Featured Content Area - Shows either image or video */}
//                 <div className="relative mb-4 bg-gray-100 rounded-lg overflow-hidden shadow-inner">
//                   {showingVideo && product.videoLink ? (
//                     // Video content
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ duration: 0.5 }}
//                       className="w-full h-full"
//                     >
//                       {renderMediaContent()}
//                     </motion.div>
//                   ) : (
//                     // Image content
//                     <>
//                       {product.postImages && product.postImages.length > 0 ? (
//                         <motion.div 
//                           className="aspect-w-1 aspect-h-1"
//                           // Continuing from where the code left off...

//                           layoutId={`product-image-${currentImageIndex}`}
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <img 
//                             src={product.postImages[currentImageIndex]?.url} 
//                             alt={`${product.title || "Product"} - Image ${currentImageIndex + 1}`}
//                             className="object-contain w-full h-full cursor-pointer"
//                             onClick={toggleFullImage}
//                           />
//                         </motion.div>
//                       ) : (
//                         <div className="aspect-w-1 aspect-h-1 bg-gray-200 flex items-center justify-center">
//                           <p className="text-gray-500">No images available</p>
//                         </div>
//                       )}
                      
//                       {/* Image navigation controls */}
//                       {product.postImages && product.postImages.length > 1 && (
//                         <div className="absolute inset-x-0 top-1/2 flex items-center justify-between px-2 transform -translate-y-1/2">
//                           <motion.button 
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={prevImage}
//                             className="bg-white bg-opacity-70 rounded-full p-2 shadow-md hover:bg-opacity-90 transition-all focus:outline-none"
//                           >
//                             <ChevronLeftIcon />
//                           </motion.button>
//                           <motion.button 
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={nextImage}
//                             className="bg-white bg-opacity-70 rounded-full p-2 shadow-md hover:bg-opacity-90 transition-all focus:outline-none"
//                           >
//                             <ChevronRightIcon />
//                           </motion.button>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
                
//                 {/* Thumbnail Gallery */}
//                 {!showingVideo && product.postImages && product.postImages.length > 1 && (
//                   <div className="grid grid-cols-5 gap-2 mt-4">
//                     {product.postImages.map((image, index) => (
//                       <motion.div
//                         key={index}
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.97 }}
//                         onClick={() => setCurrentImageIndex(index)}
//                         className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden cursor-pointer ${
//                           currentImageIndex === index 
//                             ? 'ring-2 ring-black' 
//                             : 'ring-1 ring-gray-200 hover:ring-gray-400'
//                         }`}
//                       >
//                         <img 
//                           src={image?.url} 
//                           alt={`Thumbnail ${index + 1}`}
//                           className="object-cover w-full h-full"
//                         />
//                       </motion.div>
//                     ))}
//                   </div>
//                 )}
//               </motion.div>
              
//               {/* Right side - Product Info & Actions */}
//               <motion.div 
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="w-full lg:w-2/5 p-4 md:p-6 lg:border-l border-gray-200"
//               >
//                 {/* Category & Title */}
//                 <div className="mb-4">
//                   {product.category && (
//                     <span className="text-sm text-gray-500 uppercase tracking-wider">{product.category}</span>
//                   )}
//                   <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">{product.title}</h1>
//                 </div>
                
//                 {/* Rating */}
//                 {product.rating !== undefined && (
//                   <div className="flex items-center mb-4">
//                     {renderStars(product.rating)}
//                     <span className="ml-2 text-gray-600 text-sm">
//                       {product.rating.toFixed(1)} ({product.reviews?.length || 0} reviews)
//                     </span>
//                   </div>
//                 )}
                
//                 {/* Price */}
//                 <div className="mb-6">
//                   {product.discount ? (
//                     <div className="flex items-center">
//                       <p className="text-2xl font-bold text-black">₹{discountedPrice}</p>
//                       <p className="ml-3 text-gray-500 line-through">₹{product.price.toFixed(2)}</p>
//                       <span className="ml-2 bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-medium">
//                         {product.discount}% OFF
//                       </span>
//                     </div>
//                   ) : (
//                     <p className="text-2xl font-bold text-black">₹{product.price.toFixed(2)}</p>
//                   )}
                  
//                   {product.quantity <= 5 && product.quantity > 0 && (
//                     <p className="text-sm text-orange-600 mt-1">
//                       Only {product.quantity} left in stock!
//                     </p>
//                   )}
                  
//                   {product.quantity === 0 && (
//                     <p className="text-sm text-red-600 mt-1 font-medium">
//                       Out of stock
//                     </p>
//                   )}
//                 </div>
                
//                 {/* Description */}
//                 <div className="mb-6">
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
//                   <p className="text-gray-600 leading-relaxed">
//                     {product.description}
//                   </p>
//                 </div>
                
//                 {/* Additional Details */}
//                 {(product.size || product.material || product.dimensions) && (
//                   <div className="mb-6">
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">Details</h3>
//                     <div className="space-y-2">
//                       {product.size && (
//                         <div className="flex items-start">
//                           <span className="text-gray-500 w-24">Size:</span>
//                           <span className="text-gray-800">{product.size}</span>
//                         </div>
//                       )}
//                       {product.material && (
//                         <div className="flex items-start">
//                           <span className="text-gray-500 w-24">Material:</span>
//                           <span className="text-gray-800">{product.material}</span>
//                         </div>
//                       )}
//                       {product.dimensions && (
//                         <div className="flex items-start">
//                           <span className="text-gray-500 w-24">Dimensions:</span>
//                           <span className="text-gray-800">{product.dimensions}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
                
//                 {/* Add to Cart Form */}
//                 <form onSubmit={handleAddToCart} className="mb-6">
//                   {/* Quantity Selector */}
//                   <div className="mb-4">
//                     <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
//                       Quantity
//                     </label>
//                     <div className="flex items-center">
//                       <motion.button
//                         type="button"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={decreaseQuantity}
//                         className="w-10 h-10 flex items-center justify-center rounded-l-md bg-gray-100 border border-gray-300 text-gray-600 hover:bg-gray-200 transition-colors"
//                       >
//                         <span className="text-xl font-medium">−</span>
//                       </motion.button>
//                       <input
//                         type="number"
//                         id="quantity"
//                         name="quantity"
//                         min="1"
//                         max={product.quantity}
//                         value={quantity}
//                         onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
//                         className="w-14 h-10 text-center border-y border-gray-300 text-gray-700 focus:outline-none"
//                         readOnly
//                       />
//                       <motion.button
//                         type="button"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={increaseQuantity}
//                         className="w-10 h-10 flex items-center justify-center rounded-r-md bg-gray-100 border border-gray-300 text-gray-600 hover:bg-gray-200 transition-colors"
//                       >
//                         <span className="text-xl font-medium">+</span>
//                       </motion.button>
//                     </div>
//                   </div>
                  
//                   {/* Customization Input */}
//                   <div className="mb-6">
//                     <label htmlFor="customization" className="block text-gray-700 font-medium mb-2">
//                       Customization (Optional)
//                     </label>
//                     <textarea
//                       id="customization"
//                       name="customization"
//                       rows="3"
//                       placeholder="Add any special instructions or customization details here..."
//                       value={customization}
//                       onChange={(e) => setCustomization(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black resize-none"
//                     ></textarea>
//                   </div>
                  
//                   {/* Action Buttons */}
//                   <div className="flex flex-col space-y-3">
//                     <motion.button
//                       type="submit"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       disabled={isAddingToCart || product.quantity <= 0}
//                       className={`w-full px-6 py-3 rounded-md flex items-center justify-center font-medium ${
//                         product.quantity > 0
//                           ? 'bg-black text-white hover:bg-gray-800'
//                           : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                       } transition-colors`}
//                     >
//                       {isAddingToCart ? (
//                         <>
//                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                           Adding...
//                         </>
//                       ) : (
//                         <>
//                           <ShoppingCartIcon /> 
//                           <span className="ml-2">Add to Cart</span>
//                         </>
//                       )}
//                     </motion.button>
                    
//                     <motion.a
//                       href={generateWhatsAppMessage()}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="w-full px-6 py-3 rounded-md bg-green-500 text-white flex items-center justify-center font-medium hover:bg-green-600 transition-colors"
//                     >
//                       <WhatsAppIcon />
//                       <span className="ml-2">Ask via WhatsApp</span>
//                     </motion.a>
                    
//                     <motion.button
//                       type="button"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="w-full px-6 py-3 rounded-md border border-gray-300 text-gray-700 flex items-center justify-center font-medium hover:bg-gray-50 transition-colors"
//                     >
//                       <HeartIcon />
//                       <span className="ml-2">Add to Wishlist</span>
//                     </motion.button>
//                   </div>
//                 </form>
                
//                 {/* Delivery & Returns */}
//                 <div className="border-t border-gray-200 pt-6">
//                   <div className="space-y-4">
//                     <div className="flex items-start">
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 mt-0.5 mr-3">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
//                       </svg>
//                       <div>
//                         <h4 className="font-medium text-gray-800">Fast Delivery</h4>
//                         <p className="text-sm text-gray-600">Delivered within 4-7 business days</p>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-start">
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 mt-0.5 mr-3">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
//                       </svg>
//                       <div>
//                         <h4 className="font-medium text-gray-800">Easy Returns</h4>
//                         <p className="text-sm text-gray-600">30-day return policy for most items</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </motion.section>
          
//           {/* Reviews Section */}
//           <section className="mt-8 mb-12">
//             <ReviewSection productId={id} reviews={product.reviews || []} />
//           </section>
          
//           {/* Related Products */}
//           {/* Add related products component here */}
//         </main>
        
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default ProductPage;













































































































































































































import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Layout/Header';
import ReviewSection from './ReviewSection';
import Footer from '../Layout/Footer';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
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
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-16 h-16">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-16 h-16">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const VideoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

// StarIcon for ratings
const StarIcon = ({ filled }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"} 
    stroke={filled ? "" : "currentColor"} 
    className={`w-5 h-5 ${filled ? "text-gray-800" : "text-gray-300"}`}
  >
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);

// Helper function to determine if a link is a YouTube URL
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  
  // Match formats like: 
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://youtube.com/shorts/VIDEO_ID
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube.com\/shorts\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const getInstagramId = (url) => {
  if (!url) return null;
  
  // Match Instagram post or reel URLs to extract the shortcode
  const regex = /instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/i;
  const match = url.match(regex);
  return match ? match[1] : null;
};


const renderInstagramEmbed = (postId) => {
  if (!postId) return null;
  
  return (
    <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden shadow-lg flex items-center justify-center bg-gray-100">
      <iframe
        src={`https://www.instagram.com/p/${postId}/embed/captioned`}
        className="w-full h-full border-none overflow-hidden"
        scrolling="no"
        allowTransparency="true"
        allowFullScreen="true"
        frameBorder="0"
        title="Instagram Reel"
      ></iframe>
    </div>
  );
};

const getMediaType = (url) => {
  if (!url) return 'unknown';
  
  const youtubeId = getYouTubeVideoId(url);
  if (youtubeId) return 'youtube';
  
  // Specific check for Instagram reels/posts
  if (url.includes('instagram.com/reel/') || 
      url.includes('instagram.com/p/')) return 'instagram';
  
  if (url.includes('vimeo.com')) return 'vimeo';
  if (url.match(/\.(mp4|webm|ogg)$/i)) return 'direct';
  
  return 'unknown';
};




const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState('');
  const [viewingFullImage, setViewingFullImage] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [mediaType, setMediaType] = useState('unknown');
  const [showingVideo, setShowingVideo] = useState(false);
  const videoRef = useRef(null);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setIsAddingToCart(true);
    try {
      const price = product.discount 
        ? (product.price - (product.price * product.discount / 100)).toFixed(2) 
        : product.price.toFixed(2);
      
      await axios.post(`https://pr-crafts-backend.vercel.app/api/v1/user/addtocart/${id}`, {
        quantity: quantity,
        customization: customization,
        title: product.title,
        image: product.postImages[0],
        price: price,
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      toast.success("Added To Cart");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://pr-crafts-backend.vercel.app/api/v1/post/showpost/${id}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        });
        setProduct(response.data.post);
        
        // Determine video media type if videoLink exists
        if (response.data.post.videoLink) {
          const type = getMediaType(response.data.post.videoLink);
          setMediaType(type);
          
          // Auto show video if it's an Instagram reel
          if (type === 'instagram') {
            setShowingVideo(true);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to load product data");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://pr-crafts-backend.vercel.app/api/v1/post/showpost/${id}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        });
        setProduct(response.data.post);
        
        // Determine video media type if videoLink exists
        if (response.data.post.videoLink) {
          setMediaType(getMediaType(response.data.post.videoLink));
        }
        
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to load product data");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle video playback
  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    
    if (isVideoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    
    setIsVideoPlaying(!isVideoPlaying);
  };

  // Toggle between showing image or video
  const toggleMediaDisplay = () => {
    if (product && product.videoLink) {
      setShowingVideo(!showingVideo);
      
      // Reset video playback when switching away
      if (showingVideo && isVideoPlaying) {
        setIsVideoPlaying(false);
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }
    }
  };

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
  const increaseQuantity = () => {
    if (product.quantity > quantity) {
      setQuantity(quantity + 1);
    } else {
      toast.error("Max Quantity Reached");
    }
  };
  
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

  const renderMediaContent = () => {
    if (!product || !product.videoLink) return null;
    
    switch (mediaType) {
      case 'youtube':
        const youtubeId = getYouTubeVideoId(product.videoLink);
        return renderYouTubeEmbed(youtubeId);
      
      case 'instagram':
        const instagramId = getInstagramId(product.videoLink);
        return renderInstagramEmbed(instagramId);
      
      case 'direct':
        return renderVideoPlayer(product.videoLink);
      
      case 'vimeo':
      case 'unknown':
      default:
        return (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg text-gray-500">
            <p className="mb-3">External video link available:</p>
            <a 
              href={product.videoLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              View Video
            </a>
          </div>
        );
    }
  };



  const renderYouTubeEmbed = (videoId) => {
  if (!videoId) return null;
  
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg">
      {/* Fixed aspect ratio container with responsive height */}
      <div className="relative w-full md:h-96 h-60">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&playsinline=1&autoplay=${isVideoPlaying ? 1 : 0}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full object-cover"
        ></iframe>
        
        {/* Overlay play button that works on both desktop and mobile */}
        {!isVideoPlaying && (
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-30 transition-opacity hover:bg-opacity-40 z-10"
            onClick={() => setIsVideoPlaying(true)}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsVideoPlaying(true);
            }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white opacity-80 hover:opacity-100 p-4"
            >
              <PlayIcon size={48} />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

// Render direct video player
const renderVideoPlayer = (url) => {
  // Add a touch listener state to handle mobile interactions better
  const handleVideoTouch = (e) => {
    e.preventDefault();
    toggleVideoPlayback();
  };
  
  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-lg bg-black">
      <div className="aspect-w-16 aspect-h-9">
        <video
          ref={videoRef}
          src={url}
          className="w-full h-full object-contain"
          poster={product?.postImages?.[0]?.url}
          onPlay={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
          onClick={toggleVideoPlayback}
          playsInline // Add playsInline for better iOS support
        />
        
        {/* Play button overlay when video is paused */}
        {!isVideoPlaying && (
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-30 transition-opacity hover:bg-opacity-40"
            onClick={toggleVideoPlayback}
            onTouchEnd={handleVideoTouch}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white opacity-80 hover:opacity-100"
            >
              <PlayIcon />
            </motion.div>
          </div>
        )}
      </div>
      
      {/* Always visible control bar when video is playing */}
      {isVideoPlaying && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent z-10">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            onClick={toggleVideoPlayback}
            onTouchEnd={handleVideoTouch}
          >
            <PauseIcon />
          </motion.button>
        </div>
      )}
    </div>
  );
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-800 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md"
        >
          <div className="mb-4 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md"
        >
          <div className="mb-4 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25-2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => window.history.back()}
            className="mt-6 px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  // Modal for fullscreen image preview
  const FullscreenImageModal = () => {
    if (!viewingFullImage) return null;
    
    return (
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center backdrop-blur-sm"
        >
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 right-4 text-white text-2xl focus:outline-none bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-all"
            onClick={toggleFullImage}
          >
            ✕
          </motion.button>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-5xl mx-auto"
          >
            {product.postImages && product.postImages.length > 0 ? (
              <img 
                src={product.postImages[currentImageIndex]?.url} 
                alt={`${product.title || "Product"}`}
                className="mx-auto max-h-screen object-contain"
              />
            ) : null}
            
            {product.postImages && product.postImages.length > 1 && (
              <div className="absolute inset-x-0 top-1/2 flex items-center justify-between px-4 transform -translate-y-1/2">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="bg-white bg-opacity-20 rounded-full p-3 hover:bg-opacity-30 transition-all focus:outline-none"
                >
                  <ChevronLeftIcon />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="bg-white bg-opacity-20 rounded-full p-3 hover:bg-opacity-30 transition-all focus:outline-none"
                >
                  <ChevronRightIcon />
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  const renderVideoToggleButton = () => {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowingVideo(true)}
        className={`py-2 px-4 rounded-full text-sm font-medium flex items-center ${
          showingVideo 
            ? mediaType === 'instagram' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-black text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <span className="mr-2">{mediaType === 'instagram' ? 'Reel' : 'Video'}</span>
        {mediaType === 'instagram' ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"/>
          </svg>
        ) : (
          <VideoIcon />
        )}
      </motion.button>
    );
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen">
        {/* Full-screen image modal */}
        <FullscreenImageModal />
        
        <main className="container mx-auto px-4 py-6 md:py-8">
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Left side - Images & Video */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full lg:w-3/5 p-4 md:p-6"
              >




                {product.videoLink && (
  <div className="flex mb-4 space-x-2">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setShowingVideo(false)}
      className={`py-2 px-4 rounded-full text-sm font-medium flex items-center ${
        !showingVideo
          ? 'bg-black text-white' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      <span className="mr-2">Photos</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    </motion.button>
    
    {renderVideoToggleButton()}
  </div>
)}

                
                {/* Featured Content Area - Shows either image or video */}
                <div className="relative mb-4 bg-gray-100 rounded-lg overflow-hidden shadow-inner">
                  {showingVideo && product.videoLink ? (
                    // Video content
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full"
                    >
                      {renderMediaContent()}
                    </motion.div>
                  ) : (
                    // Image content
                    <>
                      {product.postImages && product.postImages.length > 0 ? (
                        <motion.div 
                          className="aspect-w-1 aspect-h-1"
                          // Continuing from where the code left off...

                          layoutId={`product-image-${currentImageIndex}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img 
                            src={product.postImages[currentImageIndex]?.url} 
                            alt={`${product.title || "Product"} - Image ${currentImageIndex + 1}`}
                            className="object-contain w-full h-full cursor-pointer"
                            onClick={toggleFullImage}
                          />
                        </motion.div>
                      ) : (
                        <div className="aspect-w-1 aspect-h-1 bg-gray-200 flex items-center justify-center">
                          <p className="text-gray-500">No images available</p>
                        </div>
                      )}
                      
                      {/* Image navigation controls */}
                      {product.postImages && product.postImages.length > 1 && (
                        <div className="absolute inset-x-0 top-1/2 flex items-center justify-between px-2 transform -translate-y-1/2">
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={prevImage}
                            className="bg-white bg-opacity-70 rounded-full p-2 shadow-md hover:bg-opacity-90 transition-all focus:outline-none"
                          >
                            <ChevronLeftIcon />
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={nextImage}
                            className="bg-white bg-opacity-70 rounded-full p-2 shadow-md hover:bg-opacity-90 transition-all focus:outline-none"
                          >
                            <ChevronRightIcon />
                          </motion.button>
                        </div>
                      )}
                    </>
                  )}
                </div>
                
                {/* Thumbnail Gallery */}
                {!showingVideo && product.postImages && product.postImages.length > 1 && (
                  <div className="grid grid-cols-5 gap-2 mt-4">
                    {product.postImages.map((image, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden cursor-pointer ${
                          currentImageIndex === index 
                            ? 'ring-2 ring-black' 
                            : 'ring-1 ring-gray-200 hover:ring-gray-400'
                        }`}
                      >
                        <img 
                          src={image?.url} 
                          alt={`Thumbnail ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
              
              {/* Right side - Product Info & Actions */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full lg:w-2/5 p-4 md:p-6 lg:border-l border-gray-200"
              >
                {/* Category & Title */}
                <div className="mb-4">
                  {product.category && (
                    <span className="text-sm text-gray-500 uppercase tracking-wider">{product.category}</span>
                  )}
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">{product.title}</h1>
                </div>
                
                {/* Rating */}
                {product.rating !== undefined && (
                  <div className="flex items-center mb-4">
                    {renderStars(product.rating)}
                    <span className="ml-2 text-gray-600 text-sm">
                      {product.rating.toFixed(1)} ({product.reviews?.length || 0} reviews)
                    </span>
                  </div>
                )}
                
                {/* Price */}
                <div className="mb-6">
                  {product.discount ? (
                    <div className="flex items-center">
                      <p className="text-2xl font-bold text-black">₹{discountedPrice}</p>
                      <p className="ml-3 text-gray-500 line-through">₹{product.price.toFixed(2)}</p>
                      <span className="ml-2 bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-medium">
                        {product.discount}% OFF
                      </span>
                    </div>
                  ) : (
                    <p className="text-2xl font-bold text-black">₹{product.price.toFixed(2)}</p>
                  )}
                  
                  {product.quantity <= 5 && product.quantity > 0 && (
                    <p className="text-sm text-orange-600 mt-1">
                      Only {product.quantity} left in stock!
                    </p>
                  )}
                  
                  {product.quantity === 0 && (
                    <p className="text-sm text-red-600 mt-1 font-medium">
                      Out of stock
                    </p>
                  )}
                </div>
                
                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                
                {/* Additional Details */}
                {(product.size || product.material || product.dimensions) && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Details</h3>
                    <div className="space-y-2">
                      {product.size && (
                        <div className="flex items-start">
                          <span className="text-gray-500 w-24">Size:</span>
                          <span className="text-gray-800">{product.size}</span>
                        </div>
                      )}
                      {product.material && (
                        <div className="flex items-start">
                          <span className="text-gray-500 w-24">Material:</span>
                          <span className="text-gray-800">{product.material}</span>
                        </div>
                      )}
                      {product.dimensions && (
                        <div className="flex items-start">
                          <span className="text-gray-500 w-24">Dimensions:</span>
                          <span className="text-gray-800">{product.dimensions}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Add to Cart Form */}
                <form onSubmit={handleAddToCart} className="mb-6">
                  {/* Quantity Selector */}
                  <div className="mb-4">
                    <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={decreaseQuantity}
                        className="w-10 h-10 flex items-center justify-center rounded-l-md bg-gray-100 border border-gray-300 text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        <span className="text-xl font-medium">−</span>
                      </motion.button>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        max={product.quantity}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        className="w-14 h-10 text-center border-y border-gray-300 text-gray-700 focus:outline-none"
                        readOnly
                      />
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={increaseQuantity}
                        className="w-10 h-10 flex items-center justify-center rounded-r-md bg-gray-100 border border-gray-300 text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        <span className="text-xl font-medium">+</span>
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Customization Input */}
                  <div className="mb-6">
                    <label htmlFor="customization" className="block text-gray-700 font-medium mb-2">
                      Customization (Optional)
                    </label>
                    <textarea
                      id="customization"
                      name="customization"
                      rows="3"
                      placeholder="Add any special instructions or customization details here..."
                      value={customization}
                      onChange={(e) => setCustomization(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black resize-none"
                    ></textarea>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-3">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isAddingToCart || product.quantity <= 0}
                      className={`w-full px-6 py-3 rounded-md flex items-center justify-center font-medium ${
                        product.quantity > 0
                          ? 'bg-black text-white hover:bg-gray-800'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      } transition-colors`}
                    >
                      {isAddingToCart ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Adding...
                        </>
                      ) : (
                        <>
                          <ShoppingCartIcon /> 
                          <span className="ml-2">Add to Cart</span>
                        </>
                      )}
                    </motion.button>
                    
                    <motion.a
                      href={generateWhatsAppMessage()}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3 rounded-md bg-green-500 text-white flex items-center justify-center font-medium hover:bg-green-600 transition-colors"
                    >
                      <WhatsAppIcon />
                      <span className="ml-2">Ask via WhatsApp</span>
                    </motion.a>
                    
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3 rounded-md border border-gray-300 text-gray-700 flex items-center justify-center font-medium hover:bg-gray-50 transition-colors"
                    >
                      <HeartIcon />
                      <span className="ml-2">Add to Wishlist</span>
                    </motion.button>
                  </div>
                </form>
                
                {/* Delivery & Returns */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 mt-0.5 mr-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                      <div>
                        <h4 className="font-medium text-gray-800">Fast Delivery</h4>
                        <p className="text-sm text-gray-600">Delivered within 4-7 business days</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 mt-0.5 mr-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                      </svg>
                      <div>
                        <h4 className="font-medium text-gray-800">Easy Returns</h4>
                        <p className="text-sm text-gray-600">30-day return policy for most items</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
          
          {/* Reviews Section */}
          <section className="mt-8 mb-12">
            <ReviewSection productId={id} reviews={product.reviews || []} />
          </section>
          
          {/* Related Products */}
          {/* Add related products component here */}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ProductPage;














