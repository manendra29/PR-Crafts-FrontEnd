// import React from "react";
// import "./BrandDesc.css";
// import { Container, Typography } from "@mui/material";

// const logos = [
//     { id: 1, img: "/images/happyCustomer.webp", text: "Happy Customers" },
//     { id: 2, img: "/images/happyCustomer.webp", text: "Follow us on Instagram" },
//   { id: 3, img: "/images/happyCustomer.webp", text: "Made in India" },
//   { id: 4, img: "/images/happyCustomer.webp", text: "Eco-Friendly Craft" },
//   { id: 5, img: "/images/happyCustomer.webp", text: "100% Handmade" },
//   { id: 6, img: "/images/happyCustomer.webp", text: "Fast Delivery" }
// ];

// const BrandDesc = () => {
//   return (
//     <Container className="brand-logos-container">
//    <svg className="decorative-svg" viewBox="0 0 100 15" xmlns="http://www.w3.org/2000/svg">
//           <path d="M10 7.5 L20 3 L30 7.5 L40 3 L50 7.5 L60 3 L70 7.5 L80 3 L90 7.5" 
//                 fill="none" stroke="#D7B377" strokeWidth="1" strokeLinecap="round" />
//         </svg>
//       <Typography variant="h4" className="title">
//  ✨Our Promise to You
//       </Typography>
//       <svg className="decorative-svg" viewBox="0 0 100 15" xmlns="http://www.w3.org/2000/svg">
//           <path d="M10 7.5 L20 12 L30 7.5 L40 12 L50 7.5 L60 12 L70 7.5 L80 12 L90 7.5" 
//                 fill="none" stroke="#D7B377" strokeWidth="1" strokeLinecap="round" />
//         </svg>
//       <div className="logos-grid">
//         {logos.map((logo) => (
//           <div key={logo.id} className="logo-card">
//             <img src={logo.img} alt={logo.text} className="logo-image" />
//             <br />
//            {logo.id ==1 && "1000+" } 
//             <Typography className="logo-text" >{logo.text}</Typography>
//             {logo.id !=1 && <br /> } 
//           </div>
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default BrandDesc;


























// import React from "react";
// import "./BrandDesc.css";
// import { Container, Typography } from "@mui/material";

// const logos = [
//   { id: 1, img: "/images/happy.jpg", text: "Happy Customers", prefix: "1000+" },
//   { id: 2, img: "/images/insta.jpg", text: "Follow us on Instagram" },
//   { id: 3, img: "/images/madeInIndia.jpg", text: "Made in India" },
//   { id: 4, img: "/images/eco.jpg", text: "Eco-Friendly Craft" },
//   { id: 5, img: "/images/handmade.jpg", text: "100% Handmade" },
//   { id: 6, img: "/images/delivery.jpg", text: "Fast Delivery" }
// ];

// const BrandDesc = () => {
//   return (
//     <Container className="brand-promise-container">
//       <div className="promise-header">
//         <div className="decorative-line left"></div>
//         <Typography variant="h5" className="promise-title">
//           Our Promise to You
//         </Typography>
//         <div className="decorative-line right"></div>
//       </div>
      
//       <div className="promise-grid">
//         {logos.map((logo) => (
//           <div key={logo.id} className="promise-item">
//             <div className="promise-image-container">
//               <img src={logo.img} alt={logo.text} className="promise-image" />
//             </div>
//             <div className="promise-text-container">
//               {logo.prefix && <span className="promise-prefix">{logo.prefix}</span>}
//               <Typography className="promise-text">{logo.text}</Typography>
//             </div>
//           </div>
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default BrandDesc;

























import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

// Import required for animation when elements come into view
import { useInView } from "react-intersection-observer";

const logos = [
  { id: 1, img: "/images/happy.jpg", text: "Happy Customers", prefix: "1000+" },
  { id: 2, img: "/images/insta.jpg", text: "Follow us on Instagram" },
  { id: 3, img: "/images/madeInIndia.jpg", text: "Made in India" },
  { id: 4, img: "/images/eco.jpg", text: "Eco-Friendly Craft" },
  { id: 5, img: "/images/handmade.jpg", text: "100% Handmade" },
  { id: 6, img: "/images/delivery.jpg", text: "Fast Delivery" }
];

const BrandDesc = () => {
  // For animating the section when it comes into view
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: { 
      width: "100%",
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  return (
    <div className="w-full bg-gray-50 py-16 dark:bg-gray-900">
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col items-center"
        >
          {/* Header with animated lines */}
          <div className="w-full flex items-center justify-center mb-12 px-4">
            <motion.div 
              className="h-px bg-gray-800 dark:bg-gray-200 mx-4"
              variants={lineVariants}
            ></motion.div>
            
            <Typography 
              variant="h5" 
              component={motion.h2}
              variants={itemVariants}
              className="text-center font-serif tracking-wider text-gray-900 dark:text-gray-100 whitespace-nowrap px-4"
            >
              Our Promise to You
            </Typography>
            
            <motion.div 
              className="h-px bg-gray-800 dark:bg-gray-200 mx-4"
              variants={lineVariants}
            ></motion.div>
          </div>
          
          {/* Grid layout with animations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {logos.map((logo) => (
              <motion.div
                key={logo.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2 } 
                }}
                className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-700 p-1">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    className="w-20 h-20 rounded-full overflow-hidden"
                  >
                    <img 
                      src={logo.img} 
                      alt={logo.text} 
                      className="w-full h-full object-cover filter hover:grayscale-0 transition-all duration-300" 
                    />
                  </motion.div>
                </div>
                <div className="text-center">
                  {logo.prefix && (
                    <span className="block text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {logo.prefix}
                    </span>
                  )}
                  <Typography className="text-gray-700 dark:text-gray-300 font-medium">
                    {logo.text}
                  </Typography>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default BrandDesc;