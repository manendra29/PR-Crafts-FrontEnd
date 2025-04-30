// import React, { useState, useEffect, useRef } from 'react';

// /**
//  * InstagramReelPlayer Component
//  * Custom component to display Instagram reels and posts
//  * 
//  * @param {Object} props - Component props
//  * @param {string} props.postId - Instagram post/reel ID
//  * @param {boolean} props.isReel - Whether the content is a reel or regular post
//  * @param {number} props.width - Width of the player
//  * @param {number} props.height - Height of the player (optional)
//  */
// const InstagramReelPlayer = ({ postId, isReel = false, width = 400, height }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const containerRef = useRef(null);
//   const calculatedHeight = height || (width * 1.25); // Default aspect ratio if height not provided
  
//   // Helper to check if in viewport
//   const isInViewport = (element) => {
//     if (!element) return false;
//     const rect = element.getBoundingClientRect();
//     return (
//       rect.top >= 0 &&
//       rect.left >= 0 &&
//       rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//       rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//     );
//   };

//   useEffect(() => {
//     // Function to load Instagram embed script
//     const loadInstagramEmbed = () => {
//       // Only load if not already loaded
//       if (!window.instgrm) {
//         const script = document.createElement('script');
//         script.src = '//www.instagram.com/embed.js';
//         script.async = true;
//         script.defer = true;
//         document.body.appendChild(script);
        
//         script.onload = () => {
//           if (window.instgrm) {
//             window.instgrm.Embeds.process();
//           }
//           setIsLoading(false);
//         };
        
//         script.onerror = () => {
//           console.error('Failed to load Instagram embed script');
//           setIsLoading(false);
//         };
//       } else {
//         // Script already loaded, just process embeds
//         window.instgrm.Embeds.process();
//         setIsLoading(false);
//       }
//     };

//     loadInstagramEmbed();
    
//     // Add intersection observer for play/pause on scroll
//     const observeVisibility = () => {
//       const options = {
//         root: null,
//         rootMargin: '0px',
//         threshold: 0.5, // At least 50% visible
//       };
      
//       const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//           // Autoplay when in view (for reels)
//           if (isReel && entry.isIntersecting) {
//             setIsPlaying(true);
//           } else if (isReel) {
//             setIsPlaying(false);
//           }
//         });
//       }, options);
      
//       if (containerRef.current) {
//         observer.observe(containerRef.current);
//       }
      
//       return () => {
//         if (containerRef.current) {
//           observer.unobserve(containerRef.current);
//         }
//       };
//     };
    
//     const cleanupObserver = observeVisibility();
    
//     return () => {
//       cleanupObserver();
//     };
//   }, [isReel, postId]);

//   // Toggle play state for reels
//   const togglePlayState = () => {
//     if (isReel) {
//       setIsPlaying(!isPlaying);
//     }
//   };

//   // Create direct embed URL
//   const embedUrl = isReel
//     ? `https://www.instagram.com/reel/${postId}/embed/`
//     : `https://www.instagram.com/p/${postId}/embed/`;

//   // Custom play UI overlay for reels
//   const renderPlayOverlay = () => {
//     if (!isReel) return null;
    
//     return (
//       <div 
//         className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/10 z-10"
//         onClick={togglePlayState}
//       >
//         {!isPlaying && (
//           <div className="bg-black/30 rounded-full p-4">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12 text-white">
//               <path d="M8 5v14l11-7z" />
//             </svg>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div 
//       ref={containerRef}
//       className="instagram-embed-container relative"
//       style={{ width: `${width}px`, height: `${calculatedHeight}px`, maxWidth: '100%' }}
//     >
//       {isLoading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
//         </div>
//       )}
      
//       {/* Fallback embed approach using Instagram's embed.js */}
//       <blockquote
//         className="instagram-media"
//         data-instgrm-permalink={`https://www.instagram.com/${isReel ? 'reel' : 'p'}/${postId}/`}
//         data-instgrm-version="14"
//         style={{
//           background: '#FFF',
//           border: 0,
//           borderRadius: '3px',
//           boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
//           margin: '0',
//           maxWidth: '100%',
//           minWidth: '100%',
//           padding: '0',
//           width: '100%',
//         }}
//       >
//         <div style={{ padding: '16px' }}>
//           <a
//             href={`https://www.instagram.com/${isReel ? 'reel' : 'p'}/${postId}/`}
//             style={{ background: '#FFFFFF', lineHeight: '0', padding: '0 0', textAlign: 'center', textDecoration: 'none', width: '100%' }}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
//               <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '40px', marginRight: '14px', width: '40px' }}></div>
//               <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
//                 <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '100px' }}></div>
//                 <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '60px' }}></div>
//               </div>
//             </div>
//             <div style={{ padding: '19% 0' }}></div>
//             <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}>
//               <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink">
//                 <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
//                   <g transform="translate(-511.000000, -20.000000)" fill="#000000">
//                     <g>
//                       <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path>
//                     </g>
//                   </g>
//                 </g>
//               </svg>
//             </div>
//             <div style={{ padding: '8px', }}>
//               <div style={{ color: '#3897f0', fontFamily: 'Arial, sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: '550', lineHeight: '18px' }}>
//                 View this post on Instagram
//               </div>
//             </div>
//           </a>
//         </div>
//       </blockquote>
      
//       {/* Alternative direct iframe approach for more control over







import React, { useState, useEffect, useRef } from 'react';

/**
 * InstagramReelPlayer Component
 * Custom component to display Instagram reels and posts
 * 
 * @param {Object} props - Component props
 * @param {string} props.postId - Instagram post/reel ID
 * @param {boolean} props.isReel - Whether the content is a reel or regular post
 * @param {number} props.width - Width of the player
 * @param {number} props.height - Height of the player (optional)
 */
const InstagramReelPlayer = ({ postId, isReel = false, width = 400, height }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef(null);
  const calculatedHeight = height || (width * 1.25); // Default aspect ratio if height not provided
  
  // Helper to check if in viewport
  const isInViewport = (element) => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  useEffect(() => {
    // Function to load Instagram embed script
    const loadInstagramEmbed = () => {
      // Only load if not already loaded
      if (!window.instgrm) {
        const script = document.createElement('script');
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        
        script.onload = () => {
          if (window.instgrm) {
            window.instgrm.Embeds.process();
          }
          setIsLoading(false);
        };
        
        script.onerror = () => {
          console.error('Failed to load Instagram embed script');
          setIsLoading(false);
        };
      } else {
        // Script already loaded, just process embeds
        window.instgrm.Embeds.process();
        setIsLoading(false);
      }
    };

    loadInstagramEmbed();
    
    // Add intersection observer for play/pause on scroll
    const observeVisibility = () => {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // At least 50% visible
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // Autoplay when in view (for reels)
          if (isReel && entry.isIntersecting) {
            setIsPlaying(true);
          } else if (isReel) {
            setIsPlaying(false);
          }
        });
      }, options);
      
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
      
      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    };
    
    const cleanupObserver = observeVisibility();
    
    return () => {
      cleanupObserver();
    };
  }, [isReel, postId]);

  // Toggle play state for reels
  const togglePlayState = () => {
    if (isReel) {
      setIsPlaying(!isPlaying);
    }
  };

  // Create direct embed URL
  const embedUrl = isReel
    ? `https://www.instagram.com/reel/${postId}/embed/`
    : `https://www.instagram.com/p/${postId}/embed/`;

  // Custom play UI overlay for reels
  const renderPlayOverlay = () => {
    if (!isReel) return null;
    
    return (
      <div 
        className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/10 z-10"
        onClick={togglePlayState}
      >
        {!isPlaying && (
          <div className="bg-black/30 rounded-full p-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12 text-white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="instagram-embed-container relative"
      style={{ width: `${width}px`, height: `${calculatedHeight}px`, maxWidth: '100%' }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      )}
      
      {/* Fallback embed approach using Instagram's embed.js */}
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={`https://www.instagram.com/${isReel ? 'reel' : 'p'}/${postId}/`}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: '3px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '0',
          maxWidth: '100%',
          minWidth: '100%',
          padding: '0',
          width: '100%',
        }}
      >
        <div style={{ padding: '16px' }}>
          <a
            href={`https://www.instagram.com/${isReel ? 'reel' : 'p'}/${postId}/`}
            style={{ background: '#FFFFFF', lineHeight: '0', padding: '0 0', textAlign: 'center', textDecoration: 'none', width: '100%' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '40px', marginRight: '14px', width: '40px' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '100px' }}></div>
                <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '60px' }}></div>
              </div>
            </div>
            <div style={{ padding: '19% 0' }}></div>
            <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}>
              <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g transform="translate(-511.000000, -20.000000)" fill="#000000">
                    <g>
                      <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div style={{ padding: '8px', }}>
              <div style={{ color: '#3897f0', fontFamily: 'Arial, sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: '550', lineHeight: '18px' }}>
                View this post on Instagram
              </div>
            </div>
          </a>
        </div>
      </blockquote>
      
      {/* Alternative direct iframe approach for more control over reels */}
      {isReel && (
        <div className="absolute inset-0" style={{ display: isLoading ? 'none' : 'block' }}>
          <iframe
            src={isPlaying ? embedUrl : ''}
            className="w-full h-full"
            frameBorder="0"
            scrolling="no"
            allowTransparency="true"
            allow="autoplay; encrypted-media"
            title={`Instagram ${isReel ? 'Reel' : 'Post'}: ${postId}`}
            style={{ display: isPlaying ? 'block' : 'none' }}
            onLoad={() => setIsLoading(false)}
          />
          {renderPlayOverlay()}
        </div>
      )}
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-20">
          <div className="text-center">
            <div className="mb-2">
              <svg className="animate-spin h-10 w-10 text-pink-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="text-gray-600">Loading Instagram content...</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Usage examples:
// <InstagramReelPlayer postId="CqJkqlJJaJ0" isReel={true} width={400} />
// <InstagramReelPlayer postId="B_jxSHhAk9Z" isReel={false} width={500} height={600} />

export default InstagramReelPlayer;