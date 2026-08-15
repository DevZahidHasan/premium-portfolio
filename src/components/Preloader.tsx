import React, { useRef, useState, useEffect } from 'react';
import { gsap } from '../motion/gsap';
import { useGSAP } from '@gsap/react';
import { Text } from './Text';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  // We can simulate waiting for critical assets, but bounded to a max time (e.g. 1.5s max wait)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500); // 500ms max artificial wait, in real scenario we check document.readyState

    if (document.readyState === 'complete') {
      setIsReady(true);
      clearTimeout(timer);
    } else {
      window.addEventListener('load', () => setIsReady(true));
    }
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    if (!isReady || !containerRef.current || !textRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    if (prefersReducedMotion) {
      // Immediate exit for reduced motion
      tl.to(containerRef.current, { opacity: 0, duration: 0.5, ease: 'power2.out' })
        .set(containerRef.current, { display: 'none' });
      return;
    }

    // Cinematic sequence
    const chars = textRef.current.querySelectorAll('.char');
    
    // 1. Initial Identity Establishes
    tl.fromTo(chars, 
      { y: 100, opacity: 0, rotateX: -90 },
      { y: 0, opacity: 1, rotateX: 0, stagger: 0.04, duration: 1, ease: 'power4.out' }
    )
    // 2. Short pause to absorb identity
    .to({}, { duration: 0.4 })
    // 3. Preloader Exits (Clip path reveal upwards)
    .to(containerRef.current, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 1.2,
      ease: 'power4.inOut'
    })
    // 4. Hide element completely
    .set(containerRef.current, { display: 'none' });

  }, [isReady]);

  const name = "ZAHID HASAN";

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background origin-top"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      <div ref={textRef} className="overflow-hidden flex perspective-[1000px]">
        {name.split('').map((char, i) => (
          <Text 
            key={i} 
            as="span" 
            variant="heading"
            className="char inline-block"
            style={char === ' ' ? { width: '0.2em' } : {}}
          >
            {char}
          </Text>
        ))}
      </div>
    </div>
  );
};
