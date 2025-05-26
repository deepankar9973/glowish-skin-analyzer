import React from 'react';
import { useNavigate } from 'react-router-dom';

const PhotoCapturePage = () => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate('/consent');
    console.log('Going back to consent page');
  };

  const handleTakeSelfieClick = () => {
    console.log('Opening camera for selfie');
    // navigate('/camera'); // We'll add this later
  };

  const handleUploadPhotosClick = () => {
    console.log('Opening photo upload');
    // navigate('/upload'); // We'll add this later
  };

  return (
    <div className="min-h-screen bg-[#F2F3F7] p-4">
      <div className="max-w-sm mx-auto">
        
        {/* Hero Image with Back Navigation */}
        <div className="relative mb-4">
          <div className="rounded-3xl overflow-hidden">
            <img 
              src="/assets/images/photo-capture-hero.jpg" 
              alt="Face Analysis Guide" 
              className="w-full h-80 object-cover object-center"
            />
            
            {/* Back Navigation - Inside Image */}
            <div className="absolute top-4 left-4 z-10">
              <button 
                onClick={handleBackClick}
                className="flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <img 
                  src="/assets/images/back-icon.svg" 
                  alt="Back" 
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-[#E6E6E6]">
          
          {/* Main Headline */}
          <div className="mb-6">
            <h1 className="text-4xl font-black leading-none mb-3" style={{letterSpacing: '-0.03em', lineHeight: '1.1'}}>
              Take a selfie
            </h1>
          </div>
          
          {/* Top Divider */}
          <div className="mb-2">
            <div className="w-full h-px bg-[#EBEBEB]"></div>
          </div>
          
          {/* Subtitle */}
          <div className="mb-2 px-0">
            <p className="text-[#6969FF] font-regular text-m" style={{ letterSpacing: '-0.02em' }}>
              Please follow the following guidelines: 
            </p>
          </div>
          
          {/* Bottom Divider */}
          <div className="mb-4">
            <div className="w-full h-px bg-[#EBEBEB]"></div>
          </div>
          
          {/* Guidelines */}
          <div className="mb-8">
            <p className="text-gray-800 text-regular font-bold mb-4 leading-relaxed"style={{ letterSpacing: '-0.05em' }}>
              We needs to access your camera to provide a personalized experience:
            </p>
            <ul className="space-y-2 text-gray-700 text-regular leading-relaxed" style={{ letterSpacing: '-0.04em' }}>
              <li className="flex items-start">
                <span className="text-gray-600 mr-3 flex-shrink-0 mt-0.5 text-xl">•</span>
                <span>Remove your glasses: Works best without makeup.</span>
              </li>
              
              <li className="flex items-start">
                <span className="text-gray-600 mr-3 flex-shrink-0 mt-0.5 text-xl">•</span>
                <span>Pull your hair back.</span>
              </li>
              
              <li className="flex items-start">
                <span className="text-gray-600 mr-3 flex-shrink-0 mt-0.5 text-xl">•</span>
                <span>Face the camera and keep your expression neutral.</span>
              </li>
              
              <li className="flex items-start">
                <span className="text-gray-600 mr-3 flex-shrink-0 mt-0.5 text-xl">•</span>
                <span>Stay in a well-lighted environment: preferably with natural light.</span>
              </li>
            </ul>
          </div>


          
          
          {/* Take Selfie Button */}
          <button 
            onClick={handleTakeSelfieClick}
            className="w-full bg-[#6969FF] text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-200 hover:bg-[#6969FF]/90 active:scale-95 mb-4"
          >
            Take a selfie
          </button>
          
          {/* Upload Photos Button */}
          <button 
            onClick={handleUploadPhotosClick}
            className="w-full bg-transparent text-[#6969FF] font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-200 hover:bg-[#6969FF]/10 active:scale-95 border-0"
          >
            Upload photos
          </button>
          
        </div>

        {/* Bottom spacing for mobile */}
        <div className="h-8"></div>
        
      </div>
    </div>
  );
};

export default PhotoCapturePage;