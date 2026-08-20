import React, { useRef } from 'react';
import { gsap } from '../../motion/gsap';
import { useGSAP } from '@gsap/react';
import { Text } from '../../components/Text';
import { educationData } from '../../data/education';

export const AboutEducation: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    itemsRef.current.forEach((item) => {
      if (!item) return;

      const line = item.querySelector('.edu-line');
      const year = item.querySelector('.edu-year');
      const institutionWrapper = item.querySelector('.edu-inst-wrapper');
      const degree = item.querySelector('.edu-degree');
      const metaColumn = item.querySelector('.edu-meta-col');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });

      // 1. Line draws
      if (line) {
        tl.fromTo(line, 
          { scaleX: 0, transformOrigin: 'left' }, 
          { scaleX: 1, duration: 1.2, ease: 'power4.inOut' }
        );
      }

      // 2. Year and Degree reveal
      if (year || degree) {
        tl.fromTo([year, degree],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: 'power3.out' },
          "-=0.6"
        );
      }

      // 3. Parallax Scroll Animation for wrappers
      if (institutionWrapper) {
        gsap.to(institutionWrapper, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }

      if (metaColumn) {
        gsap.to(metaColumn, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }
    });

    // 4. Scattered Character Animation (Scrub) triggered exactly like AboutIntro
    charsRef.current.forEach((char) => {
      if (!char) return;
      const rx = (Math.random() - 0.5) * 800; 
      const ry = (Math.random() - 0.5) * 800; 
      const rot = (Math.random() - 0.5) * 180;
      
      gsap.fromTo(char, 
        { 
          x: rx, 
          y: ry, 
          rotationZ: rot,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          rotationZ: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%', // Start converging when it enters viewport
            end: 'center center', // Finish converging when centered
            scrub: 1, 
          }
        }
      );
    });

  }, []);

  // Clear refs before each render to prevent duplicates on re-renders
  charsRef.current = [];

  return (
    <section 
      ref={containerRef}
      className="w-full py-24 md:py-48 px-page-gutter relative z-10 min-h-screen flex flex-col justify-center bg-background overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-grid-gap items-start w-full">
        
        {/* TITLE: Spans full width now but aligns left */}
        <div className="md:col-span-12 mb-8 md:mb-16">
          <div ref={titleRef}>
            <Text as="span" variant="mono" className="text-foreground font-bold text-[11px] uppercase tracking-widest block">
              05 / Foundation
            </Text>
          </div>
        </div>

        {/* MASSIVE EDITORIAL LIST (12 cols) */}
        <div className="md:col-span-12 flex flex-col gap-24 md:gap-32 w-full">
          {educationData.map((edu, index) => (
            <div 
              key={edu.id} 
              ref={(el) => { itemsRef.current[index] = el; }}
              className="flex flex-col gap-8 md:gap-12 will-change-transform transform-gpu w-full"
            >
              {/* Animated Horizontal Line */}
              <div className="edu-line w-full h-[1px] bg-white/20 will-change-transform transform-gpu" />

              <div className="flex flex-col md:flex-row md:items-stretch justify-between gap-8 md:gap-12 w-full group">
                
                {/* Massive Institution Name without overflow-hidden so characters can scatter */}
                <div className="edu-inst-wrapper flex-1 pb-4 md:pb-8 will-change-transform transform-gpu">
                  <h4 className="font-display font-bold text-[10vw] md:text-[6vw] lg:text-[7vw] uppercase tracking-tighter text-foreground will-change-transform transform-gpu leading-[0.95]">
                    {edu.institution.split(' ').map((word, wordIndex, arr) => (
                      <React.Fragment key={wordIndex}>
                        <span className="inline-block whitespace-nowrap">
                          {word.split('').map((char, charIndex) => (
                            <span 
                              key={charIndex}
                              ref={(el) => { if (el) charsRef.current.push(el); }}
                              className="inline-block will-change-transform transform-gpu"
                            >
                              {char}
                            </span>
                          ))}
                        </span>
                        {wordIndex < arr.length - 1 && ' '}
                      </React.Fragment>
                    ))}
                  </h4>
                </div>

                {/* Meta Information (Right aligned on desktop) */}
                <div className="edu-meta-col flex flex-col md:items-end justify-between gap-4 md:w-1/3 shrink-0 will-change-transform transform-gpu md:pt-4 pb-4 md:pb-8">
                  <div className="flex flex-col md:items-end w-full">
                    <div className="edu-year will-change-transform transform-gpu mb-4">
                      <Text as="span" variant="mono" className="text-white text-sm md:text-base uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10">
                        {edu.period}
                      </Text>
                    </div>
                    
                    <div className="edu-degree flex flex-col gap-2 will-change-transform transform-gpu md:text-right w-full">
                      <p className="font-mono text-base md:text-xl text-foreground font-bold uppercase tracking-wider">
                        {edu.degree}
                      </p>
                      {edu.field && (
                        <p className="font-mono text-sm md:text-base text-muted uppercase tracking-widest">
                          {edu.field}
                        </p>
                      )}
                    </div>
                  </div>

                  {edu.description && (
                    <div className="mt-auto w-full flex md:justify-end">
                      <p className="font-mono text-[10px] md:text-xs text-muted/60 max-w-sm leading-relaxed uppercase tracking-widest md:text-justify text-left">
                        {edu.description}
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};
