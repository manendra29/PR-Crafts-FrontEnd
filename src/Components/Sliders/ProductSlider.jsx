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

// import React, { useEffect, useRef, useState } from 'react';
// import './ProductSlider.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const ProductSlider = () => {
//   const [products, setProducts] = useState([]);
//   const sliderRef = useRef(null);
//   const navigateTo=useNavigate();
//   useEffect(()=>{
//     const fetch=async(req,res,next)=>{
//       try {
//         const response=await axios.get("https://pr-crafts-backend.vercel.app/api/v1/post/allcategory",{
//           withCredentials:true,
//         headers:{
//           "Content-Type":"application/json"
//         }
//         });
//         setProducts(response.data.categories);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetch();
//   },[])


//   return (
//     <section className="craft-categories">
//       <h2 className="category-title">Explore Our Craft Collections</h2>
      
//       <div className="category-slider-container">
//         <div className="category-slider" ref={sliderRef}>
//           {products.map((product) => (
//             <div key={product._id} className="category-item" onClick={()=>{navigateTo(`/category/${product.title}`)}}>
//               <div className="category-image-wrapper">
//                 <img 
//                   src={product.image?.url} 
//                   alt={product.title} 
//                   className="category-image" 
//                 />
//               </div>
//               <span className="category-name">{product.title}</span>
//             </div>
//           ))}
//         </div>
//         <div className="scroll-indicator">
//           <span>← Swipe to explore →</span>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductSlider;









// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const ProductSlider = () => {
//   const [products, setProducts] = useState([]);
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const sliderRef = useRef(null);
//   const navigateTo = useNavigate();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("https://pr-crafts-backend.vercel.app/api/v1/post/allcategory", {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json"
//           }
//         });
//         setProducts(response.data.categories);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const scroll = (direction) => {
//     const container = sliderRef.current;
//     const scrollAmount = container.clientWidth * 0.8;
    
//     if (direction === 'left') {
//       container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//       setScrollPosition(Math.max(0, scrollPosition - 1));
//     } else {
//       container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//       setScrollPosition(scrollPosition + 1);
//     }
//   };

//   const handleScroll = () => {
//     const container = sliderRef.current;
//     if (container) {
//       const maxScrollPosition = container.scrollWidth - container.clientWidth;
//       const currentScrollPosition = container.scrollLeft;
//       const normalizedPosition = Math.floor(currentScrollPosition / (container.clientWidth * 0.8));
//       setScrollPosition(normalizedPosition);
//     }
//   };

//   useEffect(() => {
//     const container = sliderRef.current;
//     if (container) {
//       container.addEventListener('scroll', handleScroll);
//       return () => container.removeEventListener('scroll', handleScroll);
//     }
//   }, []);

//   return (
//     <section className="py-16 px-4 bg-white">
//       <div className="max-w-6xl mx-auto">
//         <motion.h2 
//           className="text-3xl md:text-4xl font-bold mb-8 text-center text-black"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           Explore Our Craft Collections
//         </motion.h2>
        
//         <div className="relative">
//           {/* Navigation Buttons */}
//           <motion.button 
//             className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full text-white -ml-3 shadow-lg transition-all duration-300 ${scrollPosition === 0 ? 'opacity-40 cursor-not-allowed' : 'opacity-80'}`}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => scroll('left')}
//             disabled={scrollPosition === 0}
//           >
//             <ChevronLeft size={24} />
//           </motion.button>
          
//           <motion.button 
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full text-white -mr-3 shadow-lg transition-all duration-300 opacity-80"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => scroll('right')}
//           >
//             <ChevronRight size={24} />
//           </motion.button>
          
//           {/* Slider Container */}
//           <div 
//             ref={sliderRef} 
//             className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-6"
//             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//           >
//             {products.map((product, index) => (
//               <motion.div
//                 key={product._id}
//                 className="flex-none w-64 md:w-72 cursor-pointer snap-start"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 whileHover={{ y: -5, transition: { duration: 0.2 } }}
//                 onClick={() => navigateTo(`/category/${product.title}`)}
//               >
//                 <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
//                   <div className="relative h-56 overflow-hidden">
//                     <motion.img 
//                       src={product.image?.url} 
//                       alt={product.title}
//                       className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ duration: 0.7 }}
//                       loading="lazy"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
//                   </div>
//                   <div className="p-4 bg-white flex-grow flex items-center justify-center">
//                     <h3 className="text-lg font-medium text-center text-black tracking-wide">{product.title}</h3>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
          
//           {/* Dots Navigation */}
//           <div className="flex justify-center mt-6 gap-2">
//             {products.length > 0 && Array.from({ length: Math.ceil(products.length / 4) }).map((_, i) => (
//               <button
//                 key={i}
//                 className={`w-2 h-2 rounded-full transition-all duration-300 ${scrollPosition === i ? 'bg-black w-6' : 'bg-gray-300'}`}
//                 onClick={() => {
//                   const container = sliderRef.current;
//                   container.scrollTo({ left: i * container.clientWidth * 0.8, behavior: 'smooth' });
//                   setScrollPosition(i);
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductSlider;











// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const ProductSlider = () => {
//   const [products, setProducts] = useState([]);
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);
//   const sliderRef = useRef(null);
//   const sectionRef = useRef(null);
//   const navigateTo = useNavigate();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("https://pr-crafts-backend.vercel.app/api/v1/post/allcategory", {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json"
//           }
//         });
//         setProducts(response.data.categories);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Intersection Observer to trigger animation when element is in viewport
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.unobserve(entry.target);
//         }
//       },
//       { threshold: 0.1 } // Trigger when 10% of the element is visible
//     );
    
//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }
    
//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   const scroll = (direction) => {
//     const container = sliderRef.current;
//     const scrollAmount = container.clientWidth * 0.8;
    
//     if (direction === 'left') {
//       container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//       setScrollPosition(Math.max(0, scrollPosition - 1));
//     } else {
//       container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//       setScrollPosition(scrollPosition + 1);
//     }
//   };

//   const handleScroll = () => {
//     const container = sliderRef.current;
//     if (container) {
//       const maxScrollPosition = container.scrollWidth - container.clientWidth;
//       const currentScrollPosition = container.scrollLeft;
//       const normalizedPosition = Math.floor(currentScrollPosition / (container.clientWidth * 0.8));
//       setScrollPosition(normalizedPosition);
//     }
//   };

//   useEffect(() => {
//     const container = sliderRef.current;
//     if (container) {
//       container.addEventListener('scroll', handleScroll);
//       return () => container.removeEventListener('scroll', handleScroll);
//     }
//   }, []);

//   // Container animations
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         duration: 0.8,
//         when: "beforeChildren",
//         staggerChildren: 0.1
//       }
//     }
//   };

//   // Title animation
//   const titleVariants = {
//     hidden: { y: -50, opacity: 0 },
//     visible: { 
//       y: 0, 
//       opacity: 1,
//       transition: { 
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//         duration: 0.7
//       }
//     }
//   };

//   // Slider animation
//   const sliderVariants = {
//     hidden: { y: 50, opacity: 0 },
//     visible: { 
//       y: 0, 
//       opacity: 1,
//       transition: { 
//         type: "spring",
//         stiffness: 50,
//         damping: 20,
//         duration: 0.8,
//         delay: 0.3
//       }
//     }
//   };

//   // Card animation
//   const cardVariants = {
//     hidden: { scale: 0.8, opacity: 0 },
//     visible: { 
//       scale: 1, 
//       opacity: 1,
//       transition: { duration: 0.5 }
//     }
//   };

//   return (
//     <motion.section 
//       ref={sectionRef}
//       className="py-16 px-4 bg-white"
//       variants={containerVariants}
//       initial="hidden"
//       animate={isVisible ? "visible" : "hidden"}
//     >
//       <div className="max-w-6xl mx-auto">
//         <motion.h2 
//           className="text-3xl md:text-4xl font-bold mb-8 text-center text-black"
//           variants={titleVariants}
//         >
//           Explore Our Craft Collections
//         </motion.h2>
        
//         <motion.div className="relative" variants={sliderVariants}>
//           {/* Navigation Buttons */}
//           <motion.button 
//             className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full text-white -ml-3 shadow-lg transition-all duration-300 ${scrollPosition === 0 ? 'opacity-40 cursor-not-allowed' : 'opacity-80'}`}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => scroll('left')}
//             disabled={scrollPosition === 0}
//           >
//             <ChevronLeft size={24} />
//           </motion.button>
          
//           <motion.button 
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full text-white -mr-3 shadow-lg transition-all duration-300 opacity-80"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => scroll('right')}
//           >
//             <ChevronRight size={24} />
//           </motion.button>
          
//           {/* Slider Container */}
//           <div 
//             ref={sliderRef} 
//             className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-6"
//             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//           >
//             {products.map((product, index) => (
//               <motion.div
//                 key={product._id}
//                 className="flex-none w-64 md:w-72 cursor-pointer snap-start"
//                 variants={cardVariants}
//                 whileHover={{ y: -5, transition: { duration: 0.2 } }}
//                 onClick={() => navigateTo(`/category/${product.title}`)}
//               >
//                 <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
//                   <div className="relative h-56 overflow-hidden">
//                     <motion.img 
//                       src={product.image?.url} 
//                       alt={product.title}
//                       className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
//                       loading="lazy"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
//                   </div>
//                   <div className="p-4 bg-white flex-grow flex items-center justify-center">
//                     <h3 className="text-lg font-medium text-center text-black tracking-wide">{product.title}</h3>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
          
//           {/* Dots Navigation */}
//           <div className="flex justify-center mt-6 gap-2">
//             {products.length > 0 && Array.from({ length: Math.ceil(products.length / 4) }).map((_, i) => (
//               <button
//                 key={i}
//                 className={`w-2 h-2 rounded-full transition-all duration-300 ${scrollPosition === i ? 'bg-black w-6' : 'bg-gray-300'}`}
//                 onClick={() => {
//                   const container = sliderRef.current;
//                   container.scrollTo({ left: i * container.clientWidth * 0.8, behavior: 'smooth' });
//                   setScrollPosition(i);
//                 }}
//               />
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </motion.section>
//   );
// };

// export default ProductSlider;























import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);
  const navigateTo = useNavigate();

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://pr-crafts-backend.vercel.app/api/v1/post/allcategory", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        });
        setProducts(response.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  // Intersection Observer to trigger animation when element is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const scroll = (direction) => {
    const container = sliderRef.current;
    // Adjust scroll amount based on device type - show 2 cards on mobile, 4 on desktop
    const cardsPerView = isMobile ? 2 : 4;
    const scrollAmount = container.clientWidth / cardsPerView * cardsPerView;
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setScrollPosition(Math.max(0, scrollPosition - 1));
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(scrollPosition + 1);
    }
  };

  const handleScroll = () => {
    const container = sliderRef.current;
    if (container) {
      const cardsPerView = isMobile ? 2 : 4;
      const scrollAmount = container.clientWidth / cardsPerView * cardsPerView;
      const currentScrollPosition = container.scrollLeft;
      const normalizedPosition = Math.round(currentScrollPosition / scrollAmount);
      setScrollPosition(normalizedPosition);
    }
  };

  useEffect(() => {
    const container = sliderRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile]);

  // Container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  // Title animation
  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.7
      }
    }
  };

  // Slider animation
  const sliderVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 50,
        damping: 20,
        duration: 0.8,
        delay: 0.3
      }
    }
  };

  // Card animation
  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -10,
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      }
    }
  };

  // Button animation
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, backgroundColor: "rgba(0,0,0,0.7)" },
    tap: { scale: 0.9 }
  };

  // Navigation dots animation
  const dotVariants = {
    inactive: { width: 8, backgroundColor: "#CBD5E0" },
    active: { 
      width: 24, 
      backgroundColor: "#000000",
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="py-16 px-4 bg-white"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-8 text-center text-black"
          variants={titleVariants}
        >
          Explore Our Craft Collections
        </motion.h2>
        
        <motion.div className="relative" variants={sliderVariants}>
          {/* Navigation Buttons */}
          <motion.button 
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 p-2 rounded-full text-white -ml-3 shadow-lg transition-all duration-300 ${scrollPosition === 0 ? 'opacity-40 cursor-not-allowed' : 'opacity-80'}`}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => scroll('left')}
            disabled={scrollPosition === 0}
          >
            <ChevronLeft size={24} />
          </motion.button>
          
          <motion.button 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 p-2 rounded-full text-white -mr-3 shadow-lg transition-all duration-300 opacity-80"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => scroll('right')}
          >
            <ChevronRight size={24} />
          </motion.button>
          
          {/* Slider Container */}
          <div 
            ref={sliderRef} 
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-3 md:gap-4 pb-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                className="flex-none w-[calc(50%-6px)] md:w-72 cursor-pointer snap-start"
                variants={cardVariants}
                whileHover="hover"
                onClick={() => navigateTo(`/category/${product.title}`)}
              >
                <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <motion.img 
                      src={product.image?.url} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                      whileHover={{ 
                        scale: 1.15,
                        transition: { duration: 0.7 }
                      }}
                      loading="lazy"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0"
                      whileHover={{ opacity: 1, transition: { duration: 0.3 } }}
                    />
                  </div>
                  <motion.div 
                    className="p-4 bg-white flex-grow flex items-center justify-center"
                    whileHover={{ backgroundColor: "#f9fafb", transition: { duration: 0.3 } }}
                  >
                    <h3 className="text-lg font-medium text-center text-black tracking-wide">{product.title}</h3>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Dots Navigation */}
          <div className="flex justify-center mt-6 gap-2">
            {products.length > 0 && 
              Array.from({ 
                length: Math.ceil(products.length / (isMobile ? 2 : 4)) 
              }).map((_, i) => (
                <motion.button
                  key={i}
                  variants={dotVariants}
                  animate={scrollPosition === i ? "active" : "inactive"}
                  className="h-2 rounded-full"
                  onClick={() => {
                    const container = sliderRef.current;
                    const cardsPerView = isMobile ? 2 : 4;
                    const scrollAmount = container.clientWidth / cardsPerView * cardsPerView;
                    container.scrollTo({ left: i * scrollAmount, behavior: 'smooth' });
                    setScrollPosition(i);
                  }}
                />
              ))
            }
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProductSlider;