// import React, { useState, useEffect, useRef } from 'react';
// import { IconButton } from '@mui/material';
// import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
// import './ImageSlider.css';
// import axios from 'axios';

// const ImageSlider = ({ images = [] }) => {
 
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const sliderRef = useRef(null);
//   const timeoutRef = useRef(null);

//   useEffect(()=>{
//     const fetch=async()=>{
//       try {
//         const response=await axios.get("https://pr-crafts-backend.vercel.app/api/v1/post/slider",{
//         withCredentials:true,
//         headers:{
//           "Content-Type":"application/json"
//         }
//       });
//       console.log(response.data.sliders)
//       setSlidesData(response.data.sliders);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetch();
//   },[])


//  const [slidesData,setSlidesData]=useState([]);

//   const resetTimeout = () => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//   };

//   useEffect(() => {
//     resetTimeout();
//     timeoutRef.current = setTimeout(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
//     }, 4000);

//     return () => resetTimeout();
//   }, [currentIndex]);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + slidesData.length) % slidesData.length);
//   };

//   return (
//     <div className="slider-container">
//       <div 
//         className="slider" 
//         ref={sliderRef}
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {slidesData.map((slide, index) => (
//           <div className="slide" key={index}>
//             <img src={`https://pr-crafts-backend.vercel.app/${slide.images[0]}`} alt={slide._id} />
//             <div className="slide-content">
//               <h2>{slide.title!==undefined?slide.title:"Pr Crafts"}</h2> 
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="slider-controls">
//         <IconButton className="slider-arrow" onClick={prevSlide}>
//           <ArrowBackIos />
//         </IconButton>
//         <div className="slider-dots">
//           {slidesData.map((_, index) => (
//             <span 
//               key={index} 
//               className={`slider-dot ${currentIndex === index ? 'active' : ''}`}
//               onClick={() => setCurrentIndex(index)}
//             />
//           ))}
//         </div>
//         <IconButton className="slider-arrow" onClick={nextSlide}>
//           <ArrowForwardIos />
//         </IconButton>
//       </div>
//     </div>
//   );
// };

// export default ImageSlider;





// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';

// const ImageSlider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const sliderRef = useRef(null);
//   const timeoutRef = useRef(null);
//   const [slidesData, setSlidesData] = useState([]);
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const response = await axios.get("https://pr-crafts-backend.vercel.app/api/v1/post/slider", {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json"
//           }
//         });
//         setSlidesData(response.data.sliders);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetch();
//   }, []);

//   const resetTimeout = () => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//   };

//   useEffect(() => {
//     resetTimeout();
//     if (slidesData.length > 0) {
//       timeoutRef.current = setTimeout(() => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
//       }, 4000);
//     }

//     return () => resetTimeout();
//   }, [currentIndex, slidesData.length]);

//   const handleTouchStart = (e) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (touchStart - touchEnd > 50) {
//       // Swipe left
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
//     }

//     if (touchStart - touchEnd < -50) {
//       // Swipe right
//       setCurrentIndex((prevIndex) => (prevIndex - 1 + slidesData.length) % slidesData.length);
//     }
//   };

//   if (slidesData.length === 0) {
//     return <div className="w-full h-64 bg-gray-100 flex items-center justify-center">Loading...</div>;
//   }

//   return (
//     <div className="relative w-full overflow-hidden">
//       {/* Main slider container - with increased height */}
//       <div 
//         className="flex transition-transform duration-500 ease-in-out w-full h-full"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         ref={sliderRef}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         {slidesData.map((slide, index) => (
//           <div 
//             className="min-w-full w-full flex-shrink-0 relative" 
//             key={index}
//           >
//             <div className="w-full h-60 md:h-[28rem] lg:h-[calc(70vh+100px)] xl:h-[calc(80vh+40px)]">
//               <img 
//                 src={slide.image?.url || "./public/images/srk.webp"} 
//                 alt={slide.title || "Pr Crafts"}
//                 className="w-full h-full object-cover object-center"
//               />
//             </div>
//             {/* Title positioned at bottom left */}
//             <div className="absolute bottom-0 left-0 p-4 md:p-6 bg-gradient-to-t from-black to-transparent w-full">
//               <h2 className="text-xl md:text-3xl font-bold text-white">
//                 {slide.title !== undefined ? slide.title : "Pr Crafts"}
//               </h2>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Indicator dots */}
//       <div className="absolute bottom-16 md:bottom-20 left-0 right-0">
//         <div className="flex justify-center space-x-2">
//           {slidesData.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentIndex(index)}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 currentIndex === index ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageSlider;





















import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesData, setSlidesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  const timeoutRef = useRef(null);
  const sliderRef = useRef(null);

  // Track window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://pr-crafts-backend.vercel.app/api/v1/post/slider", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        });
        setSlidesData(response.data.sliders);
      } catch (error) {
        console.error("Failed to fetch slider data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    if (slidesData.length > 0 && isAutoPlaying) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
      }, 4000);
    }

    return () => resetTimeout();
  }, [currentIndex, slidesData.length, isAutoPlaying]);

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slidesData.length) % slidesData.length);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
  };

  const handleTouchStart = (e) => {
    setIsAutoPlaying(false);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      goToNextSlide();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      goToPrevSlide();
    }
    
    // Resume autoplay after 5 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  if (loading) {
    return (
      <div className="w-full h-48 sm:h-64 md:h-80 bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (slidesData.length === 0) {
    return <div className="w-full h-48 sm:h-64 md:h-80 bg-gray-100 flex items-center justify-center">No slides available</div>;
  }

  // Determine height based on screen size for better fit
  const getSliderHeight = () => {
    if (windowWidth < 640) { // Mobile
      return 'h-[50vh] min-h-48';
    } else if (windowWidth < 768) { // Small tablet
      return 'h-[60vh] min-h-64';
    } else if (windowWidth < 1024) { // Large tablet
      return 'h-[65vh] min-h-80';
    } else if (windowWidth < 1280) { // Small desktop
      return 'h-[70vh] min-h-96';
    } else { // Large desktop
      return 'h-[87vh] min-h-96';
    }
  };

  return (
    <div 
  className={`relative w-full overflow-hidden rounded-none sm:rounded-lg shadow-xl group ${isAutoPlaying ? '' : 'paused'}`}
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
  ref={sliderRef}
>

      {/* Main slider container */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0.3, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.3, scale: 1.08 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={`w-full ${getSliderHeight()} relative overflow-hidden`}>
            <motion.img 
              src={slidesData[currentIndex].image?.url || "./public/images/srk.webp"} 
              alt={slidesData[currentIndex].title || "PR Crafts"}
              className="w-full h-full object-cover object-center"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
            />
            
            {/* Overlay with gradient - stronger on mobile for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70 sm:from-black/10 sm:to-black/60"></div>
            
            {/* Title with animated entry - adjusted positioning for mobile */}
            <motion.div 
              className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-6 lg:p-8 w-full"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-tight">
                {slidesData[currentIndex].title !== undefined ? slidesData[currentIndex].title : "PR Crafts"}
              </h2>
              {slidesData[currentIndex].description && (
                <p className="text-xs sm:text-sm md:text-base text-white/80 mt-1 sm:mt-2 md:mt-4 max-w-md line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                  {slidesData[currentIndex].description}
                </p>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows - hidden on smallest screens, visible on touch or hover for larger screens */}
      <button 
        onClick={goToPrevSlide}
        className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full p-1 sm:p-2 md:p-3 transition-all duration-300 opacity-80 sm:opacity-0 group-hover:opacity-100 shadow-lg hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" />
      </button>
      
      <button 
        onClick={goToNextSlide}
        className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full p-1 sm:p-2 md:p-3 transition-all duration-300 opacity-80 sm:opacity-0 group-hover:opacity-100 shadow-lg hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <motion.div 
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "linear", repeat: isAutoPlaying ? Infinity : 0 }}
          key={`progress-${currentIndex}`}
        />
      </div>

      {/* Indicator dots - positioned higher on mobile for better visibility */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 left-0 right-0 z-10">
        <div className="flex justify-center space-x-2 sm:space-x-3">
          {slidesData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="group"
              aria-label={`Go to slide ${index + 1}`}
            >
              <motion.div 
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-white' : 'bg-white/40'
                }`}
                whileHover={{ scale: 1.5 }}
                animate={currentIndex === index ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5, repeat: currentIndex === index ? Infinity : 0, repeatDelay: 1 }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile swipe indicator - only shows on initial load for small screens */}
      {windowWidth < 640 && (
        <motion.div
          className="absolute bottom-24 left-0 right-0 flex justify-center items-center text-white text-xs"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <motion.div
            animate={{ x: [0, 10, 0, -10, 0] }}
            transition={{ repeat: 2, duration: 1.5 }}
            className="flex items-center space-x-1"
          >
            <span>Swipe</span>
            <ChevronRight className="w-3 h-3" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ImageSlider;