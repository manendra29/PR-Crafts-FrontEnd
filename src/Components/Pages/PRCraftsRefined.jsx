// import React, { useState } from 'react';
// import Header from '../Layout/Header';
// import Footer from '../Layout/Footer';
// import BrandDesc from '../BrandDesc/BrandDesc';

// const PRCraftsRefined = () => {
//   // Sample video data
//   const [videos, setVideos] = useState([
//     {
//       id: 1,
//       title: "DIY Paper Flowers Tutorial",
//       thumbnail: "https://www.livemint.com/lm-img/img/2024/05/23/600x338/CRICKET-IND-IPL-T20-HYDERABAD-KOLKATA-95_1716427886047_1716427965399.jpg",
//       embedUrl: "https://www.youtube.com/embed/0ErlKdAirGQ",
//       description: "Learn how to create beautiful paper flowers for your home decor."
//     },
//     // You can add more videos here
//   ]);
  
//   const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
//         <Header />
//       </div>
       
//       <main className="flex-grow">
//         <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//             {/* Hero Section */}
//             <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 sm:p-10">
//               <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">PR Crafts</h1>
//               <p className="text-lg text-gray-700">Unleash your creativity with handmade crafts and DIY projects</p>
//             </div>
            
//             {/* Main Content Area */}
//             <div className="p-6">
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//                 {/* Video Column - Placing video first for mobile */}
//                 <div className="lg:col-span-8 lg:order-2">
//                   <div className="rounded-lg overflow-hidden border border-gray-100 shadow-sm bg-white">
//                     <div className="aspect-video w-full">
//                       <iframe
//                         width="100%"
//                         height="100%"
//                         src={selectedVideo.embedUrl}
//                         title={selectedVideo.title}
//                         frameBorder="0"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                         allowFullScreen
//                         className="h-full w-full"
//                       ></iframe>
//                     </div>
//                     <div className="p-4 sm:p-6">
//                       <h2 className="font-bold text-xl text-gray-800 mb-2">{selectedVideo.title}</h2>
//                       <p className="text-gray-600">{selectedVideo.description}</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Channel Info Column */}
//                 <div className="lg:col-span-4 lg:order-1">
//                   <div className="p-6 border border-gray-100 rounded-lg bg-gray-50 sticky top-6">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-4">About PR Crafts</h2>
//                     <div className="prose prose-sm text-gray-600">
//                       <p className="font-medium text-gray-800">Welcome to PR Crafts! 🎨✨</p>
//                       <p>At <span className="font-medium">PR Crafts</span>, we bring creativity to life! 🖌️✂️ Our channel is dedicated to teaching you how to make unique handmade gifts, creative DIY crafts, and beautiful paper creations.</p>
//                       <h3 className="text-lg font-medium text-gray-800 mt-4">🔹 What You'll Learn</h3>
//                       <ul className="pl-5 space-y-1 list-disc">
//                         <li>Handmade gift ideas for special occasions 🎁</li>
//                         <li>DIY home decor & aesthetic crafts 🏡</li>
//                         <li>Paper art, chart paper crafts, and much more! 📜✂️</li>
//                       </ul>
//                       <p className="mt-4">Join us on this creative journey and make every occasion special with <span className="font-medium">handmade love</span>! ❤️</p>
//                     </div>
//                     <a 
//                       href="https://www.youtube.com/@pr_craft__" 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="mt-6 block w-full py-3 bg-red-600 text-white text-center rounded-lg font-medium hover:bg-red-700 transition-colors"
//                     >
//                       Subscribe to Channel
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
      
//       <BrandDesc />
//       <Footer />
//     </div>
//   );
// };

// export default PRCraftsRefined;
























import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import BrandDesc from '../BrandDesc/BrandDesc';
import { PlayCircle } from 'lucide-react';

const PRCraftsRefined = () => {
  // Sample video data
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "DIY Paper Flowers Tutorial",
      thumbnail: "https://www.livemint.com/lm-img/img/2024/05/23/600x338/CRICKET-IND-IPL-T20-HYDERABAD-KOLKATA-95_1716427886047_1716427965399.jpg",
      embedUrl: "https://www.youtube.com/embed/0ErlKdAirGQ",
      description: "Learn how to create beautiful paper flowers for your home decor."
    },
    // You can add more videos here
  ]);
  
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-hidden">
     <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4 -ml-8">
  <Header />
</div>


       
      <main className="flex-grow">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <motion.div 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Hero Section */}
            <motion.div 
              className="relative bg-gradient-to-r from-gray-100 to-white dark:from-gray-800 dark:to-black p-8 sm:p-12 overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                <motion.h1 
                  className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-3"
                  animate={{ 
                    textShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 2px 5px rgba(0,0,0,0.2)", "0px 0px 0px rgba(0,0,0,0)"],
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                >
                  PR Crafts
                </motion.h1>
                <motion.p 
                  className="text-lg md:text-xl text-gray-700 dark:text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Unleash your creativity with handmade crafts and DIY projects
                </motion.p>
              </motion.div>
              
              {/* Background patterns */}
              <motion.div 
                className="absolute top-0 right-0 w-72 h-72 opacity-10 dark:opacity-5"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M39.9,-68.3C52.5,-62.8,64.2,-54.1,73.8,-42.3C83.3,-30.6,90.8,-15.3,92.1,0.8C93.5,16.9,88.7,33.7,79.1,47.1C69.5,60.5,55.2,70.3,40.4,75.9C25.6,81.5,10.3,82.7,-5.1,81C-20.4,79.2,-35.8,74.5,-48.4,65.8C-61.1,57.2,-71,44.7,-77.1,30.6C-83.1,16.5,-85.4,0.7,-83.9,-14.9C-82.5,-30.5,-77.3,-46,-67.8,-57.8C-58.3,-69.7,-44.6,-77.8,-30.4,-80.7C-16.3,-83.5,-1.7,-81.1,11.1,-76.6C23.9,-72.1,47.8,-65.6,61.2,-55.3C74.6,-45,80.3,-30.9,86.9,-15.5C93.5,-0.1,100.9,16.7,98.2,30.9C95.5,45.1,82.7,56.7,68.3,64.3C53.9,71.9,38,75.6,22.7,76.8C7.4,78,-7.3,76.8,-20.5,72.3C-33.8,67.8,-45.7,59.9,-56.9,50.4C-68.1,40.8,-78.7,29.5,-85.1,15.9C-91.4,2.3,-93.4,-13.7,-87,-25.9C-80.7,-38.1,-65.9,-46.5,-51.7,-52.2C-37.5,-57.9,-23.8,-60.9,-9.8,-65.5C4.1,-70.1,18.2,-76.3,27.7,-73.5C37.2,-70.8,42.3,-59.1,50.8,-49.7C59.3,-40.3,71.2,-33.2,73.6,-23.7C76,-14.3,68.9,-2.7,67.1,12.1C65.4,27,69.1,45.1,62.9,56.6C56.7,68.2,40.7,73.2,24.8,78.1C8.9,83,-6.7,87.9,-20.2,85.5C-33.7,83,-45.1,73.3,-55.1,62.5C-65.1,51.8,-73.8,40,-78.8,26.6C-83.9,13.2,-85.4,-1.7,-83.7,-16.7C-82,-31.7,-77.2,-46.7,-67.8,-58.4C-58.5,-70.1,-44.7,-78.6,-30.6,-79.6C-16.4,-80.7,-2,-74.3,12.1,-70.6C26.2,-66.9,39.9,-65.9,46.9,-58.2C53.8,-50.5,53.8,-36.1,58.8,-22.9C63.8,-9.7,73.8,2.4,77.2,16.2C80.5,30,77.2,45.7,68.9,57.7C60.5,69.7,47.2,78.1,33.1,82.8C18.9,87.5,3.9,88.5,-7.4,83.5C-18.7,78.5,-26.4,67.5,-35.8,58C-45.2,48.5,-56.3,40.4,-65.7,29.3C-75.1,18.3,-83,4.3,-82.7,-9.4C-82.4,-23.1,-74,-36.6,-63.5,-46.3C-53,-56.1,-40.4,-62.1,-27.5,-67.3C-14.7,-72.5,-1.5,-76.8,12.8,-77.9C27.1,-79,42.4,-76.9,53.2,-69.1C64,-61.3,70.4,-47.7,79.6,-33.9C88.8,-20.1,100.9,-6,103.6,9.8C106.3,25.7,99.7,43.2,89.2,57.8C78.6,72.4,64.1,84,48.1,90.5C32.1,97,14.5,98.3,-4.3,101.2C-23.1,104.1,-43.1,108.5,-56.9,101.9C-70.7,95.3,-78.3,77.6,-81.8,60C-85.3,42.5,-84.8,25,-83.8,9.5C-82.9,-6,-81.6,-19.6,-77.3,-33.8C-73,-48,-65.8,-62.9,-54.1,-70.5C-42.4,-78.1,-26.4,-78.3,-10.7,-78.6C4.9,-78.8,20.6,-79,34.7,-74.8C48.8,-70.5,61.3,-61.8,67.5,-49.5C73.8,-37.2,73.7,-21.4,74.8,-5.9C75.9,9.6,78.1,22.7,74.1,33.3C70.1,43.9,59.9,51.9,48.4,58.5C36.9,65.1,24.2,70.2,10.7,74.2C-2.8,78.3,-17.2,81.3,-30.4,78.6C-43.5,75.9,-55.5,67.5,-66.4,56.7C-77.2,45.9,-86.9,32.8,-90.8,17.9C-94.7,3,-92.7,-13.7,-87.7,-29.3C-82.7,-44.9,-74.7,-59.5,-62.6,-71.6C-50.5,-83.8,-34.3,-93.5,-18.5,-95.6C-2.8,-97.8,12.6,-92.3,26.8,-87.2C41,-82.1,54,-77.2,62.8,-68.2C71.6,-59.3,76.1,-46.1,82.9,-32.7C89.6,-19.2,98.5,-5.4,98.5,8.5C98.5,22.4,89.5,36.6,78.5,47.5C67.5,58.4,54.5,66.1,40.8,71.9C27.1,77.7,12.8,81.5,-0.2,81.7C-13.2,81.9,-24.9,78.5,-37.2,73.2C-49.5,67.9,-62.3,60.7,-71.2,49.8C-80.1,38.9,-85.1,24.4,-89.3,9.3C-93.5,-5.8,-97,-21.4,-93.9,-35.9C-90.8,-50.4,-81.1,-63.7,-68.3,-70.9C-55.5,-78.1,-39.5,-79.2,-24.8,-78.7C-10.1,-78.2,3.2,-76.2,17.7,-74.5C32.2,-72.8,47.8,-71.5,59.4,-64.4C71,-57.3,78.5,-44.4,82.9,-30.4C87.2,-16.4,88.5,-1.2,86.7,13.3C84.9,27.8,80.1,41.6,71.8,52.9C63.5,64.2,51.7,73.1,38.8,79.3C25.9,85.5,12,89,0.2,88.8C-11.7,88.6,-21.5,84.8,-32.8,79.5C-44.1,74.3,-57,67.6,-68.5,57.9C-79.9,48.2,-89.9,35.7,-95.6,21.1C-101.3,6.6,-102.7,-10,-98.6,-24.5C-94.5,-39,-84.9,-51.3,-73.2,-59.3C-61.4,-67.3,-47.4,-71,-35.5,-77.4C-23.5,-83.7,-13.6,-92.7,0,-92.7C13.6,-92.7,31,-83.7,39.9,-68.3Z" transform="translate(100 100)" />
                </svg>
              </motion.div>
            </motion.div>
            
            {/* Main Content Area */}
            <div className="p-6 sm:p-8">
              <motion.div 
                variants={staggerChildren}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Video Column - Placing video first for mobile */}
                <motion.div 
                  variants={slideUp}
                  className="lg:col-span-8 lg:order-2"
                >
                  <motion.div 
                    className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="aspect-video w-full relative">
                      <iframe
                        width="100%"
                        height="100%"
                        src={selectedVideo.embedUrl}
                        title={selectedVideo.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full"
                      ></iframe>
                    </div>
                    <motion.div 
                      className="p-6 sm:p-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.h2 
                        className="font-bold text-2xl text-gray-800 dark:text-white mb-3"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {selectedVideo.title}
                      </motion.h2>
                      <motion.p 
                        className="text-gray-600 dark:text-gray-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {selectedVideo.description}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                </motion.div>
                
                {/* Channel Info Column */}
                <motion.div 
                  variants={slideUp}
                  className="lg:col-span-4 lg:order-1"
                >
                  <motion.div 
                    className="p-6 sm:p-8 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 shadow-lg sticky top-6"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.h2 
                      className="text-2xl font-bold text-gray-800 dark:text-white mb-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      About PR Crafts
                    </motion.h2>
                    <motion.div 
                      className="prose prose-sm max-w-none text-gray-600 dark:text-gray-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                    >
                      <motion.p 
                        className="font-medium text-gray-800 dark:text-gray-200"
                        whileHover={{ x: 3 }}
                      >
                        Welcome to PR Crafts! 🎨✨
                      </motion.p>
                      <motion.p>
                        At <span className="font-medium">PR Crafts</span>, we bring creativity to life! 🖌️✂️ Our channel is dedicated to teaching you how to make unique handmade gifts, creative DIY crafts, and beautiful paper creations.
                      </motion.p>
                      <motion.h3 
                        className="text-lg font-medium text-gray-800 dark:text-gray-200 mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        🔹 What You'll Learn
                      </motion.h3>
                      <motion.ul 
                        className="pl-5 space-y-2 list-disc mt-3"
                        variants={staggerChildren}
                        initial="hidden"
                        animate="visible"
                      >
                        <motion.li variants={fadeIn}>Handmade gift ideas for special occasions 🎁</motion.li>
                        <motion.li variants={fadeIn}>DIY home decor & aesthetic crafts 🏡</motion.li>
                        <motion.li variants={fadeIn}>Paper art, chart paper crafts, and much more! 📜✂️</motion.li>
                      </motion.ul>
                      <motion.p 
                        className="mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        Join us on this creative journey and make every occasion special with <span className="font-medium">handmade love</span>! ❤️
                      </motion.p>
                    </motion.div>
                    <motion.a 
                      href="https://www.youtube.com/@pr_craft__" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-8 flex items-center justify-center w-full py-3 bg-black text-white text-center rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-md group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <PlayCircle className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                      <span>Subscribe to Channel</span>
                    </motion.a>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <BrandDesc />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default PRCraftsRefined;