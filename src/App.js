import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ConsentPage from './pages/ConsentPage';
import PhotoCaptureInfo from './pages/photo-capture/PhotoCaptureInfo';
import './App.css';
import PhotoReview from './pages/photo-capture/PhotoReview';

// Camera Permission Component
const CameraPermission = () => {
  const [isRequesting, setIsRequesting] = React.useState(false);
  const [permissionError, setPermissionError] = React.useState(null);

  const handleBackClick = () => {
    window.history.back();
  };

  const requestCameraPermission = async () => {
    setIsRequesting(true);
    setPermissionError(null);

    try {
      console.log('🎥 Requesting camera access...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      
      console.log('✅ Camera permission granted!');
      alert('Camera permission granted! 📸');
      
      // Stop the stream
      stream.getTracks().forEach(track => track.stop());
      
      // Navigate to camera capture after 2 seconds
      setTimeout(() => {
        window.location.href = '/camera/capture';
      }, 2000);
      
    } catch (error) {
      console.error('❌ Camera permission error:', error);
      
      if (error.name === 'NotAllowedError') {
        setPermissionError('Camera access was denied. Please enable camera permissions in your browser settings.');
      } else if (error.name === 'NotFoundError') {
        setPermissionError('No camera found on your device.');
      } else {
        setPermissionError(`Unable to access camera: ${error.message}`);
      }
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F3F7] p-4">
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-8 pt-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-[#6969FF] rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 15.2c1.9 0 3.5-1.6 3.5-3.5s-1.6-3.5-3.5-3.5-3.5 1.6-3.5 3.5 1.6 3.5 3.5 3.5zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
              <path d="M20 4h-3.2l-1.9-2H9.1L7.2 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h4.5l1.4-1.4h4.2L15.5 6H20v12z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Camera Access Required</h1>
          <p className="text-gray-600">We need access to your camera for skin analysis</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-[#DCDCDC]">
          {!permissionError ? (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Enable Camera Access</h2>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Click "Allow" when prompted by your browser</p>
                  <p>• Make sure you're in good lighting</p>
                  <p>• We'll guide you through 4 different angles</p>
                  <p>• Your photos are not stored permanently</p>
                </div>
              </div>

              <button 
                onClick={requestCameraPermission}
                disabled={isRequesting}
                className="w-full bg-[#6969FF] text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-200 hover:bg-[#6969FF]/90 active:scale-95 disabled:opacity-50 mb-4"
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
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">❌</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Camera Access Required</h2>
                <p className="text-red-600 text-sm mb-6">{permissionError}</p>
              </div>
              
              <button 
                onClick={() => setPermissionError(null)}
                className="w-full bg-[#6969FF] text-white font-semibold py-4 px-6 rounded-2xl text-lg mb-3"
              >
                Try Again
              </button>
            </>
          )}

          <button 
            onClick={handleBackClick}
            className="w-full bg-transparent text-[#6969FF] font-semibold py-4 px-6 rounded-2xl text-lg hover:bg-[#6969FF]/10"
          >
            Back to Photo Capture
          </button>
        </div>
      </div>
    </div>
  );
};

// 4-Angle Camera Capture Component  
const CameraCapture = () => {
  const [photos, setPhotos] = React.useState({
    front: null,
    right: null,
    left: null,
    closeup: null
  });
  const [currentAngle, setCurrentAngle] = React.useState('front');
  const [capturedPhoto, setCapturedPhoto] = React.useState(null);
  const [isCapturing, setIsCapturing] = React.useState(false);
  const [error, setError] = React.useState(null);
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const streamRef = React.useRef(null); // Keep stream reference stable

  // Angle configuration
  const angles = [
    { id: 'front', name: 'Front View', instruction: 'Look straight at the camera', guide: 'Center your face in the oval' },
    { id: 'right', name: 'Right Profile', instruction: 'Turn your head to the right', guide: 'Show your right side profile' },
    { id: 'left', name: 'Left Profile', instruction: 'Turn your head to the left', guide: 'Show your left side profile' },
    { id: 'closeup', name: 'Close-up', instruction: 'Move closer to the camera', guide: 'Focus on problem areas' }
  ];

  const currentAngleData = angles.find(angle => angle.id === currentAngle);
  const currentAngleIndex = angles.findIndex(angle => angle.id === currentAngle);
  const progress = (Object.values(photos).filter(photo => photo !== null).length / 4) * 100;
  const completedCount = Object.values(photos).filter(photo => photo !== null).length;

  // Initialize camera only once
  React.useEffect(() => {
    let mounted = true;
    
    const startCamera = async () => {
      try {
        console.log('📸 Starting camera...');
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'user', 
            width: { ideal: 1280 }, 
            height: { ideal: 720 } 
          }
        });
        
        if (!mounted) return; // Component unmounted
        
        streamRef.current = mediaStream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(console.error);
        }
        
        console.log('✅ Camera started successfully');
      } catch (err) {
        if (mounted) {
          console.error('❌ Camera start failed:', err);
          setError(`Camera failed: ${err.message}`);
        }
      }
    };

    startCamera();

    // Cleanup on unmount
    return () => {
      mounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []); // Only run once on mount

  // Handle video element changes without restarting stream
  React.useEffect(() => {
    if (videoRef.current && streamRef.current && !capturedPhoto) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(console.error);
    }
  }, [capturedPhoto]); // Only when capturedPhoto changes

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !streamRef.current) return;
    
    setIsCapturing(true);
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const photoData = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedPhoto(photoData);
    
    console.log(`📸 ${currentAngle} photo captured!`);
    
    setTimeout(() => setIsCapturing(false), 300);
  };

  const acceptPhoto = () => {
    const newPhotos = { ...photos, [currentAngle]: capturedPhoto };
    setPhotos(newPhotos);
    setCapturedPhoto(null); // This will trigger video to show again
    
    console.log(`✅ ${currentAngle} photo accepted`);
    
    const nextAngleIndex = currentAngleIndex + 1;
    if (nextAngleIndex < angles.length) {
      const nextAngle = angles[nextAngleIndex];
      setCurrentAngle(nextAngle.id);
      console.log(`➡️ Moving to ${nextAngle.name}`);
    } else {
      console.log('🎉 All photos captured! Moving to review...');
      localStorage.setItem('photo_front', newPhotos.front || '');
      localStorage.setItem('photo_right', newPhotos.right || '');
      localStorage.setItem('photo_left', newPhotos.left || '');
      localStorage.setItem('photo_closeup', newPhotos.closeup || '');
      
      window.location.href = '/photo-review';
    }
  };

  const retakePhoto = () => {
    console.log('🔄 Retake clicked');
    setCapturedPhoto(null); // Simply clear the photo - video will show automatically
  };

  const handleBackClick = () => window.history.back();
  
  const skipAngle = () => {
    const nextAngleIndex = currentAngleIndex + 1;
    if (nextAngleIndex < angles.length) {
      setCurrentAngle(angles[nextAngleIndex].id);
    }
  };

  const goToPreviousAngle = () => {
    if (currentAngleIndex > 0) {
      setCurrentAngle(angles[currentAngleIndex - 1].id);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#F2F3F7] p-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-red-600 mb-4">Camera Error</h1>
          <p className="text-gray-700 mb-4">{error}</p>
          <button onClick={handleBackClick} className="bg-[#6969FF] text-white px-6 py-3 rounded-lg">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="relative h-screen max-w-sm mx-auto">
        
        {/* Header with Progress */}
        <div className="absolute top-4 left-4 right-4 z-20">
          <div className="flex justify-between items-center mb-4">
            <button onClick={handleBackClick} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-white text-xl">←</span>
            </button>
            <div className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <span className="text-white text-sm font-medium">{completedCount}/4 Photos</span>
            </div>
          </div>

          <div className="w-full bg-white/20 rounded-full h-2 mb-2">
            <div className="bg-white rounded-full h-2 transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="text-center">
            <h2 className="text-white text-xl font-bold mb-1">{currentAngleData.name}</h2>
            <p className="text-white/80 text-sm">{currentAngleData.instruction}</p>
          </div>
        </div>

        {/* Camera Preview - Always present, just hidden when showing photo */}
        <div className="relative h-full">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ display: capturedPhoto ? 'none' : 'block' }}
          />
          
          {capturedPhoto && (
            <img 
              src={capturedPhoto} 
              alt="Captured" 
              className="w-full h-full object-cover"
            />
          )}
          
          {!capturedPhoto && (
            <>
              {/* Angle Guide */}
              <div className="absolute inset-0 flex items-center justify-center">
                {currentAngle === 'front' && (
                  <div className="w-64 h-80 border-2 border-white/50 rounded-3xl relative">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                      <span className="text-white text-sm bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">{currentAngleData.guide}</span>
                    </div>
                  </div>
                )}
                
                {(currentAngle === 'right' || currentAngle === 'left') && (
                  <div className="relative">
                    <div className="w-48 h-64 border-2 border-white/50 rounded-2xl transform rotate-12 relative">
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <span className="text-white text-sm bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">{currentAngleData.guide}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-3xl">
                      {currentAngle === 'right' ? '👉' : '👈'}
                    </div>
                  </div>
                )}
                
                {currentAngle === 'closeup' && (
                  <div className="w-80 h-60 border-2 border-white/50 rounded-2xl relative">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                      <span className="text-white text-sm bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">{currentAngleData.guide}</span>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl">🔍</div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="absolute bottom-8 left-4 right-4">
                <div className="flex justify-between items-center mb-4">
                  <button onClick={goToPreviousAngle} disabled={currentAngleIndex === 0} className="bg-white/20 text-white px-4 py-2 rounded-xl backdrop-blur-sm font-medium disabled:opacity-30">Previous</button>
                  <button onClick={skipAngle} className="bg-white/20 text-white px-4 py-2 rounded-xl backdrop-blur-sm font-medium">Skip</button>
                </div>

                <div className="flex justify-center">
                  <button onClick={capturePhoto} disabled={isCapturing} className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform disabled:opacity-50">
                    {isCapturing ? (
                      <div className="w-8 h-8 border-2 border-[#6969FF] border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <div className="w-16 h-16 bg-[#6969FF] rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl">📸</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

          {capturedPhoto && (
            <div className="absolute bottom-8 left-4 right-4 flex justify-between">
              <button onClick={retakePhoto} className="bg-white/20 text-white px-6 py-3 rounded-xl backdrop-blur-sm font-medium">Retake</button>
              <button onClick={acceptPhoto} className="bg-[#6969FF] text-white px-8 py-3 rounded-xl font-medium">Accept & Continue</button>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/consent" element={<ConsentPage />} />
        <Route path="/photo-capture" element={<PhotoCaptureInfo />} />
        <Route path="/camera/permission" element={<CameraPermission />} />
        <Route path="/camera/capture" element={<CameraCapture />} />
        <Route path="/photo-review" element={<PhotoReview />} />
      </Routes>
    </Router>
  );
}

export default App;