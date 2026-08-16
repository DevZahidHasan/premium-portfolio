import React, { useRef } from 'react';
import { gsap } from '../../motion/gsap';
import { useGSAP } from '@gsap/react';
import { WorkHeader } from './WorkHeader';
import { WorkGrid } from './WorkGrid';
import { FloatingCursors } from './FloatingCursors';
import { projects } from '../../data/projects';

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
      ref={containerRef}
      className="relative w-full bg-[#F8F9FA] pt-32 pb-48 z-10"
    >
      <FloatingCursors />
      
      <div className="relative z-10 w-full">
        <WorkHeader />
        <WorkGrid />
      </div>
    </section>
  );
};
