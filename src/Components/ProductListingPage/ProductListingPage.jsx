// import React, { useState } from 'react';
// import { Typography, Card, Box, Rating, Pagination } from '@mui/material';
// import './ProductListingPage.css';
// import { BestsellerCard } from '../BestsellerProducts/BestsellerProducts';
// import Header from '../Layout/Header';


// const ProductListingPage = ({ categoryName, tagLine, products }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortMethod, setSortMethod] = useState('all'); // Default sort method
//   const productsPerPage = 8;
  
  
//   const sortedProducts = [...products].sort((a, b) => {
//     if (sortMethod === 'price-low-high') {
//       return a.price - b.price;
//     } else if (sortMethod === 'price-high-low') {
//       return b.price - a.price;
//     }
//     return 0; // Default ordering for 'all'
//   });
  
//   // Calculate pagination
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
//   const pageCount = Math.ceil(sortedProducts.length / productsPerPage);
  
//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//     window.scrollTo(0, 0);
//   };

//   // Handle sort method change
//   const handleSortChange = (method) => {
//     setSortMethod(method);
//     setCurrentPage(1); // Reset to first page when sorting changes
//   };

//   return (
//     <>
//     <div style={{ marginBottom: "0.7rem" }}>
//       <Header />
//     </div>

    
//     <div className="category-page">
//       <div className="category-header">
//         <div className="category-title-container">
//           <Typography variant="h3" className="category-title">
//             {categoryName}
//           </Typography>
//           <Typography className="category-tagline">
//             {tagLine}
//           </Typography>
//         </div>
//         <div className="category-svg">
//           <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
//             <path 
//               fill="#333" 
//               d="M140,20 L160,20 L160,40 L140,40 Z M120,40 L140,40 L140,60 L120,60 Z M100,60 L120,60 L120,80 L100,80 Z M80,80 L100,80 L100,100 L80,100 Z M60,100 L80,100 L80,120 L60,120 Z M40,120 L60,120 L60,140 L40,140 Z M20,140 L40,140 L40,160 L20,160 Z"
//             />
//             <circle cx="160" cy="160" r="20" fill="#333" />
//             <path 
//               fill="none" 
//               stroke="#333" 
//               strokeWidth="8" 
//               d="M20,20 C60,40 140,40 180,20" 
//             />
//           </svg>
//         </div>
//       </div>
      
//       <div className="category-filters">
//         <div className="filter-container">
//           <div className="filter-label">Filter Products:</div>
//           <div className="filter-options">
//             <button 
//               className={`filter-btn ${sortMethod === 'all' ? 'active' : ''}`}
//               onClick={() => handleSortChange('all')}
//             >
//               All
//             </button>
//             <button 
//               className={`filter-btn ${sortMethod === 'price-low-high' ? 'active' : ''}`}
//               onClick={() => handleSortChange('price-low-high')}
//             >
//               Price: Low to High
//             </button>
//             <button 
//               className={`filter-btn ${sortMethod === 'price-high-low' ? 'active' : ''}`}
//               onClick={() => handleSortChange('price-high-low')}
//             >
//               Price: High to Low
//             </button>
//           </div>
//         </div>
//       </div>
      
//    {products.length===0 ?<h1 className="no_products">No Products Yet </h1> : <div className="products-grid">
//         {currentProducts.map(product => (
//           <BestsellerCard key={product.id} product={product} />
//         ))}
//       </div>
//    }
      
//       <div className="pagination-container">
//         <Pagination 
//           count={pageCount} 
//           page={currentPage} 
//           onChange={handlePageChange} 
//           color="standard" 
//           size="large"
//         />
//       </div>
//     </div>
//     </>
//   );
// };

// export default ProductListingPage;














// import React, { useState, useEffect } from 'react';
// import { Typography, Card, Box, Rating, Pagination } from '@mui/material';
// import { motion } from 'framer-motion';
// import { BestsellerCard } from '../BestsellerProducts/BestsellerProducts';
// import Header from '../Layout/Header';

// // Import Tailwind CSS
// import 'tailwindcss/tailwind.css';

// const ProductListingPage = ({ categoryName, tagLine, products }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortMethod, setSortMethod] = useState('all'); // Default sort method
//   const productsPerPage = 8;
  
//   const sortedProducts = [...products].sort((a, b) => {
//     if (sortMethod === 'price-low-high') {
//       return a.price - b.price;
//     } else if (sortMethod === 'price-high-low') {
//       return b.price - a.price;
//     }
//     return 0; // Default ordering for 'all'
//   });
  
//   // Calculate pagination
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
//   const pageCount = Math.ceil(sortedProducts.length / productsPerPage);
  
//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//     window.scrollTo(0, 0);
//   };

//   // Handle sort method change
//   const handleSortChange = (method) => {
//     setSortMethod(method);
//     setCurrentPage(1); // Reset to first page when sorting changes
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100
//       }
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <div className="mb-3">
//         <Header />
//       </div>

//       {/* Hero Category Image Section */}
//       <motion.div 
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden"
//       >
//         <img 
//           src="/images/happy.jpg"
//           alt={categoryName} 
//           className="w-full h-full object-cover brightness-75"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4">
//           <motion.div
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//             className="text-center"
//           >
//             <Typography variant="h2" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
//               {categoryName}
//             </Typography>
//             <Typography variant="h5" className="text-lg md:text-xl font-light">
//               {tagLine}
//             </Typography>
//           </motion.div>
//         </div>
//       </motion.div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <motion.div 
//           className="mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.5 }}
//         >
//           <div className="bg-white shadow-md rounded-lg p-4">
//             <div className="flex flex-col sm:flex-row items-center justify-between">
//               <div className="text-lg font-medium text-gray-700 mb-3 sm:mb-0">Filter Products:</div>
//               <div className="flex flex-wrap gap-2">
//                 <motion.button 
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className={`px-4 py-2 rounded-md transition-all duration-300 ${
//                     sortMethod === 'all' 
//                       ? 'bg-black text-white' 
//                       : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
//                   }`}
//                   onClick={() => handleSortChange('all')}
//                 >
//                   All
//                 </motion.button>
//                 <motion.button 
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className={`px-4 py-2 rounded-md transition-all duration-300 ${
//                     sortMethod === 'price-low-high' 
//                       ? 'bg-black text-white' 
//                       : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
//                   }`}
//                   onClick={() => handleSortChange('price-low-high')}
//                 >
//                   Price: Low to High
//                 </motion.button>
//                 <motion.button 
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className={`px-4 py-2 rounded-md transition-all duration-300 ${
//                     sortMethod === 'price-high-low' 
//                       ? 'bg-black text-white' 
//                       : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
//                   }`}
//                   onClick={() => handleSortChange('price-high-low')}
//                 >
//                   Price: High to Low
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
        
//         {products.length === 0 ? (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="flex justify-center items-center h-64 bg-white rounded-lg shadow-md"
//           >
//             <h1 className="text-3xl font-bold text-gray-700">No Products Yet</h1>
//           </motion.div>
//         ) : (
//           <motion.div 
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             {currentProducts.map((product) => (
//               <motion.div 
//                 key={product._id}
//                 variants={itemVariants}
//                 whileHover={{ 
//                   y: -8,
//                   boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
//                 }}
//                 className="transform transition-all duration-300"
//               >
//                 <BestsellerCard product={product} />
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
        
//         {pageCount > 1 && (
//           <motion.div 
//             className="flex justify-center mt-12"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.7, duration: 0.5 }}
//           >
//             <Pagination 
//               count={pageCount} 
//               page={currentPage} 
//               onChange={handlePageChange} 
//               color="standard" 
//               size="large"
//               sx={{
//                 '& .MuiPaginationItem-root': {
//                   color: '#333',
//                   fontWeight: 'medium',
//                   '&.Mui-selected': {
//                     backgroundColor: '#333',
//                     color: 'white',
//                     '&:hover': {
//                       backgroundColor: '#555',
//                     }
//                   },
//                   '&:hover': {
//                     backgroundColor: 'rgba(0, 0, 0, 0.1)',
//                   }
//                 }
//               }}
//             />
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductListingPage;



import React, { useState, useEffect } from 'react';
import { Typography, Card, Box, Rating, Pagination } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { BestsellerCard } from '../BestsellerProducts/BestsellerProducts';
import Header from '../Layout/Header';

// Import Tailwind CSS
import 'tailwindcss/tailwind.css';

const ProductListingPage = ({ categoryName, tagLine, products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortMethod, setSortMethod] = useState('all'); // Default sort method
  const productsPerPage = 8;
  
  const sortedProducts = [...products].sort((a, b) => {
    if (sortMethod === 'price-low-high') {
      return a.price - b.price;
    } else if (sortMethod === 'price-high-low') {
      return b.price - a.price;
    }
    return 0; // Default ordering for 'all'
  });
  
  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const pageCount = Math.ceil(sortedProducts.length / productsPerPage);
  
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  // Handle sort method change
  const handleSortChange = (method) => {
    setSortMethod(method);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        duration: 0.5,
        when: "beforeChildren"
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
        stiffness: 100
      }
    }
  };

  // Make sure animation is visible when component mounts
  useEffect(() => {
    // Force a re-render to trigger animations
    setCurrentPage(currentPage);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mb-3">
        <Header />
      </div>

      {/* Hero Category Image Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden"
      >
        <img 
          src="/images/happy.jpg"
          alt={categoryName} 
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <Typography variant="h2" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {categoryName}
            </Typography>
            <Typography variant="h5" className="text-lg md:text-xl font-light">
              {tagLine}
            </Typography>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="text-lg font-medium text-gray-700 mb-3 sm:mb-0">Filter Products:</div>
              <div className="flex flex-wrap gap-2">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    sortMethod === 'all' 
                      ? 'bg-black text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                  }`}
                  onClick={() => handleSortChange('all')}
                >
                  All
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    sortMethod === 'price-low-high' 
                      ? 'bg-black text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                  }`}
                  onClick={() => handleSortChange('price-low-high')}
                >
                  Price: Low to High
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    sortMethod === 'price-high-low' 
                      ? 'bg-black text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                  }`}
                  onClick={() => handleSortChange('price-high-low')}
                >
                  Price: High to Low
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
        
        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center h-64 bg-white rounded-lg shadow-md"
          >
            <h1 className="text-3xl font-bold text-gray-700">No Products Yet</h1>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={currentPage + sortMethod} // Force re-render on page/sort change
            >
              {currentProducts.map((product, index) => (
                <motion.div 
                  key={product._id}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className="transform transition-all duration-300"
                >
                  <BestsellerCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
        
        {pageCount > 1 && (
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Pagination 
              count={pageCount} 
              page={currentPage} 
              onChange={handlePageChange} 
              color="standard" 
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#333',
                  fontWeight: 'medium',
                  '&.Mui-selected': {
                    backgroundColor: '#333',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#555',
                    }
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  }
                }
              }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductListingPage;