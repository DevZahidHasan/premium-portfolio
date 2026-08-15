import React, { useRef } from 'react';
import { gsap } from '../../motion/gsap';
import { useGSAP } from '@gsap/react';
import { philosophyData } from '../../data/philosophy';
import { Text } from '../../components/Text';

export const AboutPhilosophy: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);
  const workTransitionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ScrollTrigger = gsap.core.globals().ScrollTrigger as any;

    const totalDuration = philosophyData.length + 1;

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
      animation: (() => {
        const tl = gsap.timeline();
        
        wordsRef.current.forEach((wordElement, index) => {
          if (!wordElement) return;
          
          const isLastWord = index === philosophyData.length - 1;
          const textEl = wordElement.querySelector('h2');
          const statementEl = wordElement.querySelector('.phil-desc');

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
            
            if (!isLastWord) {
              tl.to(wordElement, {
                scale: 1.15,
                opacity: 0,
                duration: 1,
                ease: 'power2.inOut'
              });
            }
          }

          if (isLastWord) {
            // Compress and move text to transition into Phase 6
            tl.to(statementEl, { opacity: 0, duration: 0.5, ease: 'power2.inOut' });

            tl.to(textEl, {
              letterSpacing: '-0.05em',
              scale: 0.15,
              x: '-40vw',
              y: '-40vh',
              opacity: 0,
              duration: 1.5,
              ease: 'power3.inOut'
            }, "<");

            if (workTransitionRef.current) {
              tl.fromTo(workTransitionRef.current,
                { opacity: 0, scale: 0.9, x: '-40vw', y: '-40vh' },
                { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
                "-=0.5"
              );
            }
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
        <Text as="span" variant="mono" className="text-muted text-[11px] uppercase tracking-widest block">
          06 / How I Think
        </Text>
      </div>

      {philosophyData.map((item, index) => (
        <div 
          key={item.id}
          ref={el => wordsRef.current[index] = el}
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

      {/* The label that emerges to transition into Phase 6 */}
      <div 
        ref={workTransitionRef} 
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 will-change-transform transform-gpu"
      >
        <Text as="span" variant="mono" className="text-muted text-xs uppercase tracking-widest block">
          Selected Work
        </Text>
      </div>
    </section>
  );
};
