import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { WorkGrid } from './WorkGrid';
import { FloatingCursors } from './FloatingCursors';


export const WorkContainer: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !backgroundRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

  }, []);

  return (
    <section 
      id="work"
      ref={containerRef}
      className="relative w-full bg-[#F8F9FA] z-10"
    >
      <FloatingCursors />
      
      {/* "Let's Work Together" Pre-Work Hero */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-4">
        <h2 className="font-display font-bold text-6xl md:text-8xl text-black text-center leading-tight tracking-tight max-w-4xl">
          Let's <span className="font-serif italic text-cyan-400 font-normal">create</span><br/>
          something together.
        </h2>
        <Link 
          to="/contact"
          className="mt-12 px-8 py-3 rounded-full border border-cyan-400 text-black font-mono text-sm hover:bg-cyan-50 transition-colors"
        >
          Contact
        </Link>
      </div>

      <div className="relative z-10 w-full">
        <WorkGrid />
      </div>
    </section>
  );
};
