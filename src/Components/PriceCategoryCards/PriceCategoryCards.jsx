// import React, { useState } from 'react';
// import './PriceCategoryCards.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const PriceCategoryCards = () => {

//   const naviagteTo=useNavigate();
  
//   return (
//     <div className="container">
//       <h2 className="section-title">Shop By Price Range</h2>
//       <div className="cards-container">

//         <div className="price-card" onClick={()=>naviagteTo(`/undershop/${499}`)}>
//           <div className="card-content card-499">
//             <div className="card-info">
//               <h3>Under ₹499</h3>
              
//             </div>
//           </div>
//         </div>

    
//         <div className="price-card" onClick={()=>naviagteTo(`/undershop/${999}`)}>
//           <div className="card-content card-999">
//             <div className="card-info">
//               <h3>Under ₹999</h3>
              
//             </div>
//           </div>
//         </div>

      
//         <div className="price-card" onClick={()=>naviagteTo(`/undershop/${1999}`)}>
//           <div className="card-content card-1999">
//             <div className="card-info">
//               <h3>Under ₹1999</h3>
              
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PriceCategoryCards;





import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PriceCategoryCards = () => {
  const navigateTo = useNavigate();
  
  // Card hover animation
  const cardVariants = {
    initial: { scale: 1, boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.1)' },
    hover: { 
      scale: 1.05, 
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
      transition: { type: 'spring', stiffness: 300 }
    }
  };

  // Section title animation
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Individual card animations with staggered effect
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16 bg-gray-50">
      <motion.h2 
        className="text-3xl font-bold text-center mb-12 text-gray-900 relative"
        initial="hidden"
        animate="visible"
        variants={titleVariants}
      >
        <span className="relative inline-block">
          Shop By Price Range
          <motion.span 
            className="absolute bottom-0 left-0 w-full h-1 bg-black"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 1, duration: 0.8 }}
          />
        </span>
      </motion.h2>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Under ₹499 Card */}
        <motion.div 
          className="cursor-pointer h-64 relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg"
          onClick={() => navigateTo(`/undershop/${499}`)}
          variants={itemVariants}
          whileHover="hover"
          initial="initial"
          animate="visible"
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className="absolute inset-0 flex items-center justify-center p-6 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm text-white"
            variants={cardVariants}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Under ₹499</h3>
              <motion.div 
                className="w-16 h-1 bg-white mx-auto mt-2"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
              <motion.p 
                className="mt-4 opacity-90 text-sm"
                initial={{ opacity: 1 }}
                whileHover={{ opacity: 2 }}
              >
                Explore affordable options
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        {/* Under ₹999 Card */}
        <motion.div 
          className="cursor-pointer h-64 relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 shadow-lg"
          onClick={() => navigateTo(`/undershop/${999}`)}
          variants={itemVariants}
          whileHover="hover"
          initial="initial"
          animate="visible"
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className="absolute inset-0 flex items-center justify-center p-6 bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm text-white"
            variants={cardVariants}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Under ₹999</h3>
              <motion.div 
                className="w-16 h-1 bg-white mx-auto mt-2"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              />
              <motion.p 
                className="mt-4 opacity-90 text-sm"
                initial={{ opacity: 1 }}
                whileHover={{ opacity: 2 }}
              >
                Quality within your budget
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        {/* Under ₹1999 Card */}
        <motion.div 
          className="cursor-pointer h-64 relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-700 to-gray-600 shadow-lg"
          onClick={() => navigateTo(`/undershop/${1999}`)}
          variants={itemVariants}
          whileHover="hover"
          initial="initial"
          animate="visible"
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className="absolute inset-0 flex items-center justify-center p-6 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm text-white"
            variants={cardVariants}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Under ₹1999</h3>
              <motion.div 
                className="w-16 h-1 bg-white mx-auto mt-2"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
              <motion.p 
                className="mt-4 opacity-90 text-sm"
                initial={{ opacity: 1 }}
                whileHover={{ opacity: 2 }}
              >
                Premium craftsmanship
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PriceCategoryCards;