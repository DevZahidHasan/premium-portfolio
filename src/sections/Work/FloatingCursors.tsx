import React, { useRef, useEffect } from 'react';
import { gsap } from '../../motion/gsap';

interface FakeCursor {
  id: number;
  name: string;
  color: string;
  initialX: string;
  initialY: string;
}

const cursors: FakeCursor[] = [
  { id: 1, name: 'Zahid', color: '#D946EF', initialX: '15%', initialY: '20%' }, // Fuchsia/Pink
  { id: 2, name: 'Hasan', color: '#3B82F6', initialX: '75%', initialY: '15%' }, // Blue
  { id: 3, name: 'Zahid', color: '#10B981', initialX: '65%', initialY: '45%' }, // Emerald/Green
  { id: 4, name: 'Hasan', color: '#06B6D4', initialX: '55%', initialY: '85%' }, // Cyan
  { id: 5, name: 'Zahid', color: '#F59E0B', initialX: '25%', initialY: '70%' }, // Amber
  { id: 6, name: 'Hasan', color: '#EF4444', initialX: '85%', initialY: '90%' }, // Red
  { id: 7, name: 'Zahid', color: '#8B5CF6', initialX: '10%', initialY: '60%' }, // Purple
  { id: 8, name: 'Hasan', color: '#14B8A6', initialX: '45%', initialY: '30%' }, // Teal
  { id: 9, name: 'Zahid', color: '#F43F5E', initialX: '90%', initialY: '40%' }, // Rose
  { id: 10, name: 'Hasan', color: '#84CC16', initialX: '35%', initialY: '10%' }, // Lime
];

export const FloatingCursors: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    cursorRefs.current.forEach((cursor, index) => {
      if (!cursor) return;

      // Create a floating animation that loops randomly
      const moveCursor = () => {
        const randomX = gsap.utils.random(-100, 100);
        const randomY = gsap.utils.random(-100, 100);
        const randomDuration = gsap.utils.random(4, 8);
        const randomDelay = gsap.utils.random(0, 2);

        gsap.to(cursor, {
          x: `+=${randomX}`,
          y: `+=${randomY}`,
          duration: randomDuration,
          delay: randomDelay,
          ease: 'sine.inOut',
          onComplete: moveCursor,
        });
      };

      // Entrance animation disabled for debugging
      moveCursor();
    });

    return () => {
      gsap.killTweensOf(cursorRefs.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {cursors.map((cursorData, index) => (
        <div
          key={cursorData.id}
          ref={el => cursorRefs.current[index] = el}
          className="absolute flex flex-col items-start drop-shadow-md will-change-transform transform-gpu"
          style={{
            left: cursorData.initialX,
            top: cursorData.initialY,
          }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="transform -rotate-12"
          >
            <path 
              d="M5.5 3L18.5 11.5L12 13L9.5 20L5.5 3Z" 
              fill={cursorData.color} 
              stroke="white" 
              strokeWidth="1.5"
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <div 
            className="px-3 py-1 rounded-full text-white text-[10px] font-mono font-bold tracking-widest uppercase ml-3 -mt-1"
            style={{ backgroundColor: cursorData.color }}
          >
            {cursorData.name}
          </div>
        </div>
      ))}
    </div>
  );
};
