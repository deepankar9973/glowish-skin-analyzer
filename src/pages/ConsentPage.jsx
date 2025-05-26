import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConsentPage = () => {
  const navigate = useNavigate();
  const [isAccepted, setIsAccepted] = useState(false);

  const handleBackClick = () => {
    navigate('/');
    console.log('Going back to landing page');
  };

  const handleConsentClick = () => {
    console.log('User consented, moving to next page');
    // navigate('/questions'); // We'll add this later when questions page is ready
  };

  return (
    <div className="min-h-screen bg-[#F2F3F7] p-4">
      <div className="max-w-sm mx-auto">
        
        {/* Hero Image with Back Navigation */}
        <div className="relative mb-4">
          <div className="rounded-3xl overflow-hidden">
            <img 
              src="/assets/images/consent-hero.jpg" 
              alt="Privacy and Skincare" 
              className="w-full h-64 object-cover"
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
          <div className="mb-4">
            <h1 className="text-4xl font-black leading-none mb-3" style={{letterSpacing: '-0.04em', lineHeight: '1.2'}}>
              We care about<br />
              your privacy
            </h1>
          </div>
          
          {/* Top Divider */}
          <div className="mb-2">
            <div className="w-full h-px bg-[#EBEBEB]"></div>
          </div>
          
          {/* Subtitle */}
          <div className="mb-4 px10">
            <p className="text-[#6969FF] font-regular text-m" style={{ letterSpacing: '-0.02em' }}>
              Please review & accept the terms below:
            </p>
          </div>
          
          {/* Bottom Divider */}
          <div className="mb-4">
            <div className="w-full h-px bg-[#EBEBEB]"></div>
          </div>
          
          {/* Privacy Points */}
          <div className="mb-8">
            <p className="text-gray-800 text-regular font-bold mb-4 leading-relaxed" style={{ letterSpacing: '-0.05em' }}>
              To give you smart, personalized skincare advice, we use a quick selfie-based scan. But here's the deal:
            </p>
            
                        <ul className="space-y-2 text-gray-700 text-regular leading-relaxed" style={{ letterSpacing: '-0.04em' }}>
              <li className="flex items-start">
                <span className="text-gray-600 mr-3 flex-shrink-0 mt-0.5 text-xl">•</span>
                <span>We do NOT store your selfie — it's deleted right after analysis.</span>
              </li>
              
              <li className="flex items-start">
                <span className="text-gray-600 mr-3 flex-shrink-0 mt-0.5 text-xl">•</span>
                <span>Your personal info (like name, email) is processed only to personalize your experience.</span>
              </li>
              
              <li className="flex items-start">
                <span className="text-gray-600 mr-3 flex-shrink-0 mt-0.5 text-xl">•</span>
                <span>Used strictly for analysis, never for ads.</span>
              </li>
              
              <li className="flex items-start">
                <span className="text-gray-600 mr-3 flex-shrink-0 mt-0.5 text-xl">•</span>
                <span>You must be 18+ to proceed.</span>
              </li>
            </ul>
          </div>

          
          {/* Consent Button */}
          <button 
            onClick={handleConsentClick}
            className="w-full bg-[#6969FF] text-white font-semibold py-5 px-6 rounded-2xl text-xl transition-all duration-200 hover:bg-[#6969FF]/90 active:scale-95"
          >
            I consent
          </button>
          
        </div>

        {/* Bottom spacing for mobile */}
        <div className="h-8"></div>
        
      </div>
    </div>
  );
};

export default ConsentPage;