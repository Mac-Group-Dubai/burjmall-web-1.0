import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const banners = [
    '/banner1.jpg',
    '/banner2.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentBanner((prev) => (prev + 1) % banners.length);
          setIsTransitioning(false);
        }, 500);
      }
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(interval);
  }, [isTransitioning, banners.length]);

  const goToBanner = (index: number) => {
    if (index !== currentBanner && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentBanner(index);
        setIsTransitioning(false);
      }, 500);
    }
  };

  return (
    <div className="relative h-[416px] overflow-hidden">
      {/* Banner Images with Enhanced Transitions */}
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentBanner 
              ? 'opacity-100 scale-100 translate-x-0' 
              : 'opacity-0 scale-105 translate-x-4'
          }`}
          style={{
            transform: index === currentBanner 
              ? 'scale(1) translateX(0)' 
              : 'scale(1.05) translateX(4px)',
            zIndex: index === currentBanner ? 10 : 5
          }}
        >
          <img
            src={banner}
            alt={`Banner ${index + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Subtle overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        </div>
      ))}
      
      {/* Top-Left Promotional Badges */}
      <div className="absolute top-6 left-6 z-20 space-y-4">
        {/* Up to 40% OFF Badge */}
        <div className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg animate-pulse">
          Up to 40% OFF
        </div>
      </div>
      
      {/* Enhanced Slider Pagination */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToBanner(index)}
            className={`transition-all duration-500 ease-in-out transform hover:scale-110 ${
              index === currentBanner 
                ? 'w-12 h-2 bg-burj-orange shadow-lg' 
                : 'w-8 h-2 bg-white bg-opacity-70 hover:bg-opacity-100'
            } rounded-full`}
          />
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={() => goToBanner((currentBanner - 1 + banners.length) % banners.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={() => goToBanner((currentBanner + 1) % banners.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Hero;
