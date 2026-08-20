import React, { useRef } from 'react';
import { gsap } from '../../motion/gsap';
import { useGSAP } from '@gsap/react';
import { philosophyData } from '../../data/philosophy';
import { Text } from '../../components/Text';

export const AboutPhilosophy: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);

  const labelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ScrollTrigger = (gsap as any).core.globals().ScrollTrigger as any;

    const totalDuration = philosophyData.length;

    // Fade out the label as we scroll deep into the philosophy chapter
    gsap.to(labelRef.current, {
      opacity: 0,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: true,
      }
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${totalDuration * 100}%`,
      pin: true,
      scrub: 1, 
      refreshPriority: 1,
      animation: (() => {
        const tl = gsap.timeline();
        
        wordsRef.current.forEach((wordElement, index) => {
          if (!wordElement) return;
          
          index === philosophyData.length - 1;
          wordElement.querySelector('h2');
          wordElement.querySelector('.phil-desc');

          if (index === 0) {
            tl.to(wordElement, {
              scale: 1.15,
              opacity: 0,
              duration: 1,
              ease: 'power2.inOut'
            });
          } else {
            tl.fromTo(wordElement,
              { scale: 0.9, opacity: 0 },
              { scale: 1, opacity: 1, duration: 1, ease: 'power2.inOut' },
              "<0.4"
            );
            
            // Allow the last word to smoothly fade out before unpinning
            tl.to(wordElement, {
              scale: 1.15,
              opacity: 0,
              duration: 1,
              ease: 'power2.inOut'
            });
          }
        });
        
        return tl;
      })()
    });

  }, []);

  return (
    <section 
      ref={containerRef} 
      className="w-full h-screen relative bg-background overflow-hidden flex items-center justify-center pt-24"
      data-cursor-text="THINK"
      data-cursor-expand="true"
    >
      {/* Absolute positioning for the label so it stays pinned at the top-left */}
      <div 
        ref={labelRef} 
        className="absolute top-24 left-page-gutter z-20 will-change-transform transform-gpu"
      >
        <Text as="span" variant="mono" className="text-foreground font-bold text-[11px] uppercase tracking-widest block">
          06 / How I Think
        </Text>
      </div>

      {philosophyData.map((item, index) => (
        <div 
          key={item.id}
          ref={(el) => { wordsRef.current[index] = el; }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 will-change-transform transform-gpu"
          style={{ 
            opacity: index === 0 ? 1 : 0, 
            pointerEvents: 'none' 
          }}
        >
          <h2 className="font-display font-bold uppercase tracking-tighter text-fluid-display leading-none text-foreground mix-blend-difference will-change-transform transform-gpu">
            {item.word}
          </h2>
          {item.statement && (
            <p className="phil-desc font-mono text-sm md:text-base text-foreground/80 mt-12 max-w-lg will-change-transform transform-gpu leading-relaxed">
              {item.statement}
            </p>
          )}
        </div>
      ))}
    </section>
  );
};
