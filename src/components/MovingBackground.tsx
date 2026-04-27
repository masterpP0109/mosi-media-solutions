import React from 'react';
import './MovingBackground.css';

const MovingBackground: React.FC = () => {
  return (
    <div className="moving-background-container">
      <div className="moving-track">
        <img src="/images/hero-bg.jpg" alt="Background 1" />
        <img src="/images/services-photo.jpg" alt="Background 2" />
        <img src="/assets/about-team.jpg" alt="Background 3" />
        <img src="/assets/services-av.jpg" alt="Background 4" />
        <img src="/assets/services-events.jpg" alt="Background 5" />
        {/* Duplicates for seamless loop */}
        <img src="/images/hero-bg.jpg" alt="Background 1" />
        <img src="/images/services-photo.jpg" alt="Background 2" />
        <img src="/assets/about-team.jpg" alt="Background 3" />
        <img src="/assets/services-av.jpg" alt="Background 4" />
        <img src="/assets/services-events.jpg" alt="Background 5" />
      </div>
    </div>
  );
};

export default MovingBackground;