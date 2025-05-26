import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhotoCapture } from '../../contexts/PhotoCaptureContext';

const CameraPermission = () => {
  const navigate = useNavigate();
  const { state, actions } = usePhotoCapture();
  const [isRequesting, setIsRequesting] = useState(false);
  const [permissionError, setPermissionError] = useState(null);

  const handleBackClick = () => {
    navigate('/photo-capture');
  };

  const requestCameraPermission = async () => {
    setIsRequesting(true);
    setPermissionError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      // Permission granted
      actions.setCameraPermission('granted');
      
      // Stop the stream (we'll create a new one in camera page)
      stream.getTracks().forEach(track => track.stop());
      
      // Navigate to camera capture
      setTimeout(() => {
        navigate('/photo-capture');
      }, 1000);
      
    } catch (error) {
      console.log('Camera permission error:', error);
      actions.setCameraPermission('denied');
      
      if (error.name === 'NotAllowedError') {
        setPermissionError('Camera access was denied. Please enable camera permissions in your browser settings.');
      } else if (error.name === 'NotFoundError') {
        setPermissionError('No camera found on your device.');
      } else {
        setPermissionError('Unable to access camera. Please try again.');
      }
    } finally {
      setIsRequesting(false);
    }
  };

  const handleTryAgain = () => {
    setPermissionError(null);
    actions.setCameraPermission(null);
  };

  return (
    <div className="min-h-screen bg-[#F2F3F7] p-4">
      <div className="max-w-sm mx-auto">
        
        {/* Hero Section */}
        <div className="relative mb-6">
          <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 h-64 flex items-center justify-center">
            
            {/* Back Navigation */}
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

            {/* Camera Icon */}
            <div className="text-white text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 15.2c1.9 0 3.5-1.6 3.5-3.5s-1.6-3.5-3.5-3.5-3.5 1.6-3.5 3.5 1.6 3.5 3.5 3.5zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
                  <path d="M20 4h-3.2l-1.9-2H9.1L7.2 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h4.5l1.4-1.4h4.2L15.5 6H20v12z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Camera Access</h2>
              <p className="text-white/80 text-sm">We need camera access for skin analysis</p>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-[#DCDCDC]">
          
          {!permissionError ? (
            <>
              {/* Title */}
              <div className="mb-6">
                <h1 className="text-3xl font-black leading-none mb-3" style={{letterSpacing: '-0.03em', lineHeight: '1.1'}}>
                  Enable Camera Access
                </h1>
              </div>
              
              {/* Divider */}
              <div className="mb-6">
                <div className="w-full h-px bg-[#EBEBEB]"></div>
              </div>
              
              {/* Instructions */}
              <div className="mb-8">
                <p className="text-gray-800 text-sm font-medium mb-4 leading-relaxed">
                  To capture your photos for skin analysis, we need access to your camera.
                </p>
                
                <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
                  <li className="flex items-start">
                    <span className="text-gray-600 text-lg mr-3 flex-shrink-0 mt-0.5">•</span>
                    <span>Click <strong>"Allow Camera Access"</strong> when prompted</span>
                  </li>
                  
                  <li className="flex items-start">
                    <span className="text-gray-600 text-lg mr-3 flex-shrink-0 mt-0.5">•</span>
                    <span>Make sure you're in a <strong>well-lit environment</strong></span>
                  </li>
                  
                  <li className="flex items-start">
                    <span className="text-gray-600 text-lg mr-3 flex-shrink-0 mt-0.5">•</span>
                    <span>We'll guide you through <strong>4 different angles</strong></span>
                  </li>
                  
                  <li className="flex items-start">
                    <span className="text-gray-600 text-lg mr-3 flex-shrink-0 mt-0.5">•</span>
                    <span>Your photos are <strong>not stored</strong> - used only for analysis</span>
                  </li>
                </ul>
              </div>
              
              {/* Enable Camera Button */}
              <button 
                onClick={requestCameraPermission}
                disabled={isRequesting}
                className="w-full bg-[#6969FF] text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-200 hover:bg-[#6969FF]/90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRequesting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Requesting Access...
                  </div>
                ) : (
                  'Enable Camera Access'
                )}
              </button>
            </>
          ) : (
            <>
              {/* Error State */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Camera Access Required</h2>
                <p className="text-red-600 text-sm mb-6">{permissionError}</p>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={handleTryAgain}
                  className="w-full bg-[#6969FF] text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-200 hover:bg-[#6969FF]/90 active:scale-95"
                >
                  Try Again
                </button>
                
                <button 
                  onClick={() => navigate('/upload')}
                  className="w-full bg-transparent text-[#6969FF] font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-200 hover:bg-[#6969FF]/10 active:scale-95"
                >
                  Upload Photos Instead
                </button>
              </div>
            </>
          )}
          
        </div>

        {/* Bottom spacing */}
        <div className="h-8"></div>
        
      </div>
    </div>
  );
};

export default CameraPermission;