import React, { useRef } from 'react';
import { gsap } from '../motion/gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '../utils/cn';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({ text, className, delay = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const lines = containerRef.current?.querySelectorAll('.reveal-line');
    if (!lines) return;

    gsap.fromTo(lines, 
      { y: '100%' }, 
      {
        y: '0%',
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.1,
        delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  // Very simple line splitting logic based on <br/> or split manually
  // For a robust app, we'd use SplitText, but since it's a paid GSAP plugin, 
  // we do simple DOM-based line splits or require user to pass split arrays.
  // Here we assume the user passes text with \n for explicit line breaks.
  const lines = text.split('\n');

  return (
    <div ref={containerRef} className={cn("flex flex-col", className)}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden inline-block pb-1">
          <div className="reveal-line inline-block transform translate-y-full will-change-transform">
            {line}
          </div>
        </div>
      ))}
    </div>
  );
};
