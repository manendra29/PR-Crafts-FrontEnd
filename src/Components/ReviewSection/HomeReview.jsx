// import React from 'react';
// import Slider from 'react-slick';
// import { Card, CardContent, Typography } from '@mui/material';
// import StarIcon from '@mui/icons-material/Star';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import './HomeReview.css';

// const reviews = [
//   { name: "Aarohi Sharma", review: "Absolutely loved the handmade crafts! The quality is top-notch, and the owner is super talented." },
//   { name: "Riya Patel", review: "These paper crafts are beautifully crafted and make perfect gifts! Highly recommended." },
//   { name: "Sneha Kapoor", review: "The detailing in each craft is amazing. You can tell how much effort goes into making them." },
//   { name: "Neha Verma", review: "I ordered a customized paper bouquet, and it was stunning! So creative and unique." },
//   { name: "Ananya Sen", review: "Such beautiful and delicate work! The owner is really skilled and passionate about her work." },
//   { name: "Megha Das", review: "I have never seen such creative handmade crafts before. The owner is truly an artist." },
//   { name: "Priya Nair", review: "Every craft is made with love and care. I will definitely purchase again!" },
//   { name: "Sanya Mishra", review: "Very professional and talented. The crafts are well-made and look even better in person!" },
// ];

// const HomeReview = () => {
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     arrows: false,
//     pauseOnHover: false,
//   };

//   return (
//     <div className="review-section">
//       {/* Header Section */}
//       <div className="review-header">
//         <h2 className="review-title">
//           ⭐️ Hear What Our Happy Customers Say – <br />
//           Crafted with Love, Cherished Forever! 💖
//         </h2>
//       </div>

//       {/* Slider */}
//       <Slider {...settings}>
//         {reviews.map((review, index) => (
//           <Card key={index} className="review-card">
//             <CardContent>
//               <Typography variant="h6" className="review-name">{review.name}</Typography>
//               <div className="star-rating">
//                 {[...Array(5)].map((_, i) => (
//                   <StarIcon key={i} className="star-icon" />
//                 ))}
//               </div>
//               <Typography variant="body1" className="review-text">"{review.review}"</Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default HomeReview;




import React, { useEffect } from 'react';
import Slider from 'react-slick';
import StarIcon from '@mui/icons-material/Star';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const reviews = [
  { name: "Aarohi Sharma", review: "Absolutely loved the handmade crafts! The quality is top-notch, and the owner is super talented." },
  { name: "Riya Patel", review: "These paper crafts are beautifully crafted and make perfect gifts! Highly recommended." },
  { name: "Sneha Kapoor", review: "The detailing in each craft is amazing. You can tell how much effort goes into making them." },
  { name: "Neha Verma", review: "I ordered a customized paper bouquet, and it was stunning! So creative and unique." },
  { name: "Ananya Sen", review: "Such beautiful and delicate work! The owner is really skilled and passionate about her work." },
  { name: "Megha Das", review: "I have never seen such creative handmade crafts before. The owner is truly an artist." },
  { name: "Priya Nair", review: "Every craft is made with love and care. I will definitely purchase again!" },
  { name: "Sanya Mishra", review: "Very professional and talented. The crafts are well-made and look even better in person!" },
];

const HomeReview = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: true,
    dotsClass: "slick-dots custom-dots",
    customPaging: function() {
      return (
        <div className="w-3 h-3 mx-1 rounded-full bg-gray-300 hover:bg-black transition-colors duration-300"></div>
      );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="max-w-4xl mx-auto px-6 py-12 md:py-16"
    >
      {/* Header Section */}
      <motion.div 
        className="mb-10 text-center"
        variants={titleVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          ⭐️ Hear What Our Happy Customers Say – <br />
          <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-black after:opacity-10">
            Crafted with Love, Cherished Forever!
          </span> 💖
        </h2>
      </motion.div>

      {/* Slider */}
      <motion.div
        variants={cardVariants}
        className="relative"
      >
        <Slider {...settings} className="review-slider">
          {reviews.map((review, index) => (
            <div key={index} className="px-2">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg p-8 transition-shadow duration-300 hover:shadow-xl border border-gray-100"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold mb-4">
                    {review.name.charAt(0)}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{review.name}</h3>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic text-center">"{review.review}"</p>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
        
        {/* Custom slider animation overlay */}
        <div className="absolute top-1/2 left-0 w-16 h-64 -translate-y-1/2 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute top-1/2 right-0 w-16 h-64 -translate-y-1/2 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </motion.div>
    </motion.div>
  );
};

export default HomeReview;