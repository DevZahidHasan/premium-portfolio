import React, { useRef } from 'react';
import { gsap } from '../../motion/gsap';
import { useGSAP } from '@gsap/react';
import { Text } from '../../components/Text';
import { educationData } from '../../data/education';

export const AboutEducation: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ScrollTrigger = gsap.core.globals().ScrollTrigger as any;

    itemsRef.current.forEach((item) => {
      if (!item) return;

      const line = item.querySelector('.edu-line');
      const year = item.querySelector('.edu-year');
      const institutionWrapper = item.querySelector('.edu-inst-wrapper');
      const institution = item.querySelector('.edu-institution');
      const degree = item.querySelector('.edu-degree');
      const metaColumn = item.querySelector('.edu-meta-col');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse' // Premium smooth entrance
        }
      });

      // 1. Line draws
      if (line) {
        tl.fromTo(line, 
          { scaleX: 0, transformOrigin: 'left' }, 
          { scaleX: 1, duration: 1.2, ease: 'power4.inOut' }
        );
      }

      // 2. Premium Mask Reveal for Massive Text
      if (institution) {
        tl.fromTo(institution,
          { y: '100%', rotateX: -15, opacity: 0 },
          { y: '0%', rotateX: 0, opacity: 1, duration: 1.4, ease: 'power4.out' },
          "-=0.8"
        );
      }

      // 3. Year and Degree reveal
      if (year || degree) {
        tl.fromTo([year, degree],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: 'power3.out' },
          "-=1.0"
        );
      }

      // 4. Parallax Scroll Animation (The "Scroll animation" requested)
      // Moving the massive text and the metadata at different speeds
      if (institutionWrapper) {
        gsap.to(institutionWrapper, {
          yPercent: -15, // Moves up slightly faster
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
          yPercent: 15, // Moves down slightly slower
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

  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full py-24 md:py-48 px-page-gutter relative z-10 min-h-screen flex flex-col justify-center bg-background overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-grid-gap items-start w-full">
        
        {/* TITLE: Spans full width now but aligns left */}
        <div className="md:col-span-12 mb-8 md:mb-16">
          <div ref={titleRef}>
            <Text as="span" variant="mono" className="text-muted text-[11px] uppercase tracking-widest block">
              05 / Foundation
            </Text>
          </div>
        </div>

        {/* MASSIVE EDITORIAL LIST (12 cols) */}
        <div className="md:col-span-12 flex flex-col gap-24 md:gap-32 w-full">
          {educationData.map((edu, index) => (
            <div 
              key={edu.id} 
              ref={el => itemsRef.current[index] = el}
              className="flex flex-col gap-8 md:gap-12 will-change-transform transform-gpu w-full"
            >
              {/* Animated Horizontal Line */}
              <div className="edu-line w-full h-[1px] bg-white/20 will-change-transform transform-gpu" />

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 w-full group cursor-crosshair">
                
                {/* Massive Institution Name with Mask Reveal Wrapper */}
                <div className="edu-inst-wrapper flex-1 overflow-hidden pb-4 md:pb-8 -mb-4 md:-mb-8 will-change-transform transform-gpu">
                  <h4 className="edu-institution font-display font-bold text-5xl md:text-[7vw] lg:text-[8vw] uppercase tracking-tighter text-foreground will-change-transform transform-gpu leading-[0.85] origin-bottom transition-all duration-500 ease-out group-hover:text-transparent group-hover:[-webkit-text-stroke:1px_rgba(255,255,255,0.5)] md:group-hover:[-webkit-text-stroke:2px_rgba(255,255,255,1)] group-hover:italic group-hover:translate-x-4">
                    {edu.institution}
                  </h4>
                </div>

                {/* Meta Information (Right aligned on desktop) */}
                <div className="edu-meta-col flex flex-col md:items-end gap-4 md:w-1/3 shrink-0 will-change-transform transform-gpu">
                  <div className="edu-year will-change-transform transform-gpu">
                    <Text as="span" variant="mono" className="text-white text-sm md:text-base uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10">
                      {edu.period}
                    </Text>
                  </div>
                  
                  <div className="edu-degree flex flex-col gap-2 will-change-transform transform-gpu md:text-right mt-4">
                    <p className="font-mono text-base md:text-xl text-foreground font-bold uppercase tracking-wider">
                      {edu.degree}
                    </p>
                    {edu.field && (
                      <p className="font-mono text-sm md:text-base text-muted uppercase tracking-widest">
                        {edu.field}
                      </p>
                    )}
                    {edu.description && (
                      <p className="font-mono text-xs text-muted/60 max-w-sm leading-relaxed mt-2 uppercase tracking-widest">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};
