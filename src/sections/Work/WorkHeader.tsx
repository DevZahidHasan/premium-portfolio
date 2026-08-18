import React, { useRef } from 'react';

import { useGSAP } from '@gsap/react';

export const WorkHeader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Disabled for debugging
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center justify-center pt-32 pb-16 relative z-10">
      <div className="overflow-hidden pb-4 md:pb-8">
        <h2 className="work-title font-display font-bold text-5xl md:text-[8vw] lg:text-[10vw] uppercase tracking-tighter text-black will-change-transform transform-gpu origin-bottom">
          Selected Work
        </h2>
      </div>
      
      {/* Decorative arrow pointing down to grid */}
      <div className="mt-8 md:mt-16 text-black opacity-50 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </div>
    </div>
  );
};
