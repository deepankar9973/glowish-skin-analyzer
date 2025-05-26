import React from 'react';

const LandingPage = () => {
  const handleAnalyzeClick = () => {
    // This will navigate to next step (consent/questions flow)
    console.log('Starting skin analysis...');
  };

  return (
    <div className="min-h-screen bg-[#F2F3F7] p-2">
      <div className="max-w-sm mx-auto">
        {/* Hero Card with Face Analysis */}
        <div className="relative mb-4">
          <div className="bg-black rounded-3xl overflow-hidden relative h-96">
            {/* Background Image - Your face image will go here */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60"></div>
            
            {/* Top Left Branding */}
            <div className="absolute top-6 left-8 z-10">
              <p className="text-white text-xs opacity-100 leading-tight font-light">
                Skin analysis app by
              </p>
              <h1 className="text-white text-l font-bold mt-1" style={{fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '-0.04em'}}>
                GLOW.W.ISH
              </h1>
            </div>
            
            {/* Award Badges at Bottom */}
            <div className="absolute bottom-6 left-8 right-6 flex justify-between z-10">
              <div className="flex items-center text-white">
                <div className="w-56 h-16 mr-4 flex items-center justify-center">
                  {/* Laurel Icon - Using your asset */}
                  <img src="/assets/images/laurel-icon.png" alt="Award" className="auto h-auto opacity-100" />
                </div>
              
              </div>
              
              <div className="flex items-center text-white">
                
               
              </div>
            </div>
            
            {/* Face Image with Analysis Overlays */}
            <img 
              src="/assets/images/hero-face-analysis.jpg" 
              alt="AI Skin Analysis" 
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/05 z-5"></div>
            {/* Note: Your actual face image with overlays will be placed in public/assets/ folder */}
          </div>
        </div>

        {/* Main Content Section */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-[#DCDCDC]">
              {/* Main Headline */}
          <div className="mb-6">
            <h2 className="text-4xl font-black leading-none mb-3" style={{letterSpacing: '-0.03em', lineHeight: '1.1'}}>
              The best AI{' '}
              <br />
              Skincare{' '}
              <br />
              companion{' '}
              <span className="bg-[#6969FF] text-white px-4 py-2 rounded-xl text-2xl font-bold inline-block ml-.5">
                for you
              </span>
            </h2>
          </div>
            {/* Top Divider */}
          <div className="mb-2">
            <div className="w-full h-px bg-[#EBEBEB]"></div>
          </div>

          {/* Features */}
<div className="mb-4 px-6 overflow-hidden">
  <div
    className="flex animate-scroll"
    style={{
      whiteSpace: 'nowrap',
      display: 'inline-flex',
    }}
  >
    {/* Repeat the content twice for seamless scrolling */}
    {[...Array(2)].map((_, index) => (
      <React.Fragment key={index}>
        <p className="text-[#6969FF] font-regular text-m px-4 whitespace-nowrap" style={{ letterSpacing: '-0.02em' }}>
          Skin analysis • Routine • Product recommendation • Book 1-1 consultation
        </p>
        <p className="text-[#6969FF] font-regular text-m px-4 whitespace-nowrap" style={{ letterSpacing: '-0.02em' }}>
          Skin analysis • Routine • Product recommendation • Book 1-1 consultation
        </p>
        <p className="text-[#6969FF] font-regular text-m px-4 whitespace-nowrap" style={{ letterSpacing: '-0.02em' }}>
          Skin analysis • Routine • Product recommendation • Book 1-1 consultation
        </p>
      </React.Fragment>
    ))}
  </div>
</div>
 {/* Bottom Divider */}
          <div className="mb-6">
            <div className="w-full h-px bg-[#EBEBEB]"></div>
          </div>
<style jsx>{`
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .animate-scroll {
    animation: scroll 10s linear infinite;
  }
`}</style>
          
          {/* Social Proof */}
<div className="mb-8">
  <div className="flex items-center" style={{letterSpacing: '-0.01em'}}>
    <span className="text-2xl font-black text-gray-900 mr-1"style={{ letterSpacing: '-0.04em' }} >Trusted by</span>
    <img 
      src="/assets/images/trusted-users.png" 
      alt="1K+ users" 
      className="h-8 object-contain"
    />
    {/*<span className="text-2xl font-normal text-gray-900 ml-2">users</span>*/}
  </div>
</div>
          
          {/* CTA Button */}
          <button 
            onClick={handleAnalyzeClick}
            className="w-full bg-[#6969FF] text-white font-semibold py-5 px-6 rounded-2xl text-xl transition-all duration-200 hover:bg-[#6969FF]/90 active:scale-95"
          >
            Analyze your skin
          </button>

          {/* Sweet Message Below Button */}
<div className="mt-4 text-center">
  <p className="text-[#858585] text-sm font-light" style={{ letterSpacing: '-0.04em' }}>
    (With all my love — Ishika Garg)
  </p>
</div>
        </div>

        {/* Bottom spacing for mobile */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default LandingPage;