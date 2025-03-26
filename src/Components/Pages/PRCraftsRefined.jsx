import React, { useState } from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import BrandDesc from '../BrandDesc/BrandDesc';

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
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <Header />
      </div>
       
      <main className="flex-grow">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 sm:p-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">PR Crafts</h1>
              <p className="text-lg text-gray-700">Unleash your creativity with handmade crafts and DIY projects</p>
            </div>
            
            {/* Main Content Area */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Video Column - Placing video first for mobile */}
                <div className="lg:col-span-8 lg:order-2">
                  <div className="rounded-lg overflow-hidden border border-gray-100 shadow-sm bg-white">
                    <div className="aspect-video w-full">
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
                    <div className="p-4 sm:p-6">
                      <h2 className="font-bold text-xl text-gray-800 mb-2">{selectedVideo.title}</h2>
                      <p className="text-gray-600">{selectedVideo.description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Channel Info Column */}
                <div className="lg:col-span-4 lg:order-1">
                  <div className="p-6 border border-gray-100 rounded-lg bg-gray-50 sticky top-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">About PR Crafts</h2>
                    <div className="prose prose-sm text-gray-600">
                      <p className="font-medium text-gray-800">Welcome to PR Crafts! 🎨✨</p>
                      <p>At <span className="font-medium">PR Crafts</span>, we bring creativity to life! 🖌️✂️ Our channel is dedicated to teaching you how to make unique handmade gifts, creative DIY crafts, and beautiful paper creations.</p>
                      <h3 className="text-lg font-medium text-gray-800 mt-4">🔹 What You'll Learn</h3>
                      <ul className="pl-5 space-y-1 list-disc">
                        <li>Handmade gift ideas for special occasions 🎁</li>
                        <li>DIY home decor & aesthetic crafts 🏡</li>
                        <li>Paper art, chart paper crafts, and much more! 📜✂️</li>
                      </ul>
                      <p className="mt-4">Join us on this creative journey and make every occasion special with <span className="font-medium">handmade love</span>! ❤️</p>
                    </div>
                    <a 
                      href="https://www.youtube.com/@pr_craft__" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-6 block w-full py-3 bg-red-600 text-white text-center rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      Subscribe to Channel
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <BrandDesc />
      <Footer />
    </div>
  );
};

export default PRCraftsRefined;