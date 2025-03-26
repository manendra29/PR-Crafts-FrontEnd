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
//         const response=await axios.get("http://localhost:4000/api/v1/post/slider",{
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
//             <img src={`http://localhost:4000/${slide.images[0]}`} alt={slide._id} />
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





import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const timeoutRef = useRef(null);
  const [slidesData, setSlidesData] = useState([]);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/post/slider", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        });
        setSlidesData(response.data.sliders);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    if (slidesData.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
      }, 4000);
    }

    return () => resetTimeout();
  }, [currentIndex, slidesData.length]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      setCurrentIndex((prevIndex) => (prevIndex - 1 + slidesData.length) % slidesData.length);
    }
  };

  if (slidesData.length === 0) {
    return <div className="w-full h-64 bg-gray-100 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Main slider container - with increased height */}
      <div 
        className="flex transition-transform duration-500 ease-in-out w-full h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slidesData.map((slide, index) => (
          <div 
            className="min-w-full w-full flex-shrink-0 relative" 
            key={index}
          >
            <div className="w-full h-60 md:h-[28rem] lg:h-[calc(70vh+100px)] xl:h-[calc(80vh+40px)]">
              <img 
                src={slide.image?.url || "./public/images/srk.webp"} 
                alt={slide.title || "Pr Crafts"}
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Title positioned at bottom left */}
            <div className="absolute bottom-0 left-0 p-4 md:p-6 bg-gradient-to-t from-black to-transparent w-full">
              <h2 className="text-xl md:text-3xl font-bold text-white">
                {slide.title !== undefined ? slide.title : "Pr Crafts"}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-16 md:bottom-20 left-0 right-0">
        <div className="flex justify-center space-x-2">
          {slidesData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;