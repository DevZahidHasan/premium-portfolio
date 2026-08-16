import React, { useRef, useState } from 'react';
import { gsap } from '../motion/gsap';
import { useGSAP } from '@gsap/react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!cursorRef.current || !haloRef.current) return;

    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
    gsap.set(haloRef.current, { xPercent: -50, yPercent: -50, scale: 0 });

    // Use highly performant quickTo instead of creating new tweens
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power2.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power2.out" });
    
    // Halo has slightly more inertia for physical feel
    const haloXTo = gsap.quickTo(haloRef.current, "x", { duration: 0.4, ease: "power3.out" });
    const haloYTo = gsap.quickTo(haloRef.current, "y", { duration: 0.4, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      haloXTo(e.clientX);
      haloYTo(e.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Magnetic interactive elements (links, buttons)
      const interactable = target.closest('[data-cursor-interact]') as HTMLElement;
      // Proximity areas (Digital Field)
      const proximity = target.closest('[data-cursor-proximity]') as HTMLElement;

      if (interactable) {
        gsap.to(cursorRef.current, {
          scale: 3,
          backgroundColor: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          duration: 0.3,
          ease: 'power3.out'
        });
        gsap.to(haloRef.current, { scale: 0, opacity: 0, duration: 0.2 });
      } else if (proximity) {
        gsap.to(cursorRef.current, {
          scale: 1,
          backgroundColor: 'var(--cursor)',
          border: '0px solid transparent',
          duration: 0.3
        });
        gsap.to(haloRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactable = target.closest('[data-cursor-interact]') as HTMLElement;
      const proximity = target.closest('[data-cursor-proximity]') as HTMLElement;

      if (interactable || proximity) {
        gsap.to(cursorRef.current, {
          scale: 1,
          backgroundColor: 'var(--cursor)',
          border: '0px solid transparent',
          duration: 0.3,
          ease: 'power3.out'
        });
        gsap.to(haloRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.3
        });
      }
    };

    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <>
      {/* Subtle Halo for Proximity Field */}
      <div 
        ref={haloRef}
        className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-[9998] mix-blend-difference opacity-0"
        style={{ 
          willChange: 'transform',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)'
        }}
      />
      {/* Precision Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cursor rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};
