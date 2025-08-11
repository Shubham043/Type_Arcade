// components/Preloader.js
import React from 'react';

const Preloader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        
        <p className="text-white text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default Preloader;