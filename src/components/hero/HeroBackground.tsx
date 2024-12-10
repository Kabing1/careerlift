import React from 'react';

function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2c3e50] to-[#4ca1af]" />
      
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30" />
      
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=2400&q=80"
        alt=""
        className="h-full w-full object-cover object-center opacity-20 mix-blend-overlay"
        loading="eager"
        fetchpriority="high"
      />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"
        aria-hidden="true"
      />
    </div>
  );
}

export default React.memo(HeroBackground);