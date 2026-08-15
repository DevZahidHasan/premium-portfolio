import React, { useRef } from 'react';
import { gsap } from '../motion/gsap';
import { useGSAP } from '@gsap/react';

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
}

export const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.5 }) => {
  const magneticRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const element = magneticRef.current;
    if (!element) return;

    // We don't apply magnetic effect if user requested reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const xTo = gsap.quickTo(element, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(element, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * strength);
      yTo(y * strength);
    };

    const onMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element.removeEventListener('mousemove', onMouseMove);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }, { scope: magneticRef });

  return React.cloneElement(children, { ref: magneticRef });
};
