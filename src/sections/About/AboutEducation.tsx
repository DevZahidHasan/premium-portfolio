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
      const institution = item.querySelector('.edu-institution');
      const degree = item.querySelector('.edu-degree');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          end: 'top 50%',
          scrub: 1, 
        }
      });

      // 1. Line draws
      tl.fromTo(line, 
        { scaleX: 0, transformOrigin: 'left' }, 
        { scaleX: 1, duration: 1, ease: 'power2.out' }
      );

      // 2. Year reveals
      tl.fromTo(year,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        "-=0.5"
      );

      // 3. Institution reveals
      tl.fromTo(institution,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        "-=0.3"
      );

      // 4. Degree reveals
      tl.fromTo(degree,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        "-=0.6"
      );
    });

  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full py-24 md:py-48 px-page-gutter relative z-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-grid-gap items-start">
        
        {/* LEFT COLUMN: Title (3 cols) */}
        <div className="md:col-span-3">
          <div ref={titleRef} className="pt-2 pb-8">
            <Text as="span" variant="mono" className="text-muted text-[11px] uppercase tracking-widest block">
              05 / Foundation
            </Text>
          </div>
        </div>

        {/* RIGHT COLUMN: Editorial Metadata (9 cols) */}
        <div className="md:col-span-9 flex flex-col gap-24">
          {educationData.map((edu, index) => (
            <div 
              key={edu.id} 
              ref={el => itemsRef.current[index] = el}
              className="flex flex-col gap-8 will-change-transform transform-gpu"
            >
              {/* Animated Horizontal Line */}
              <div className="edu-line w-full h-[1px] bg-white/10 will-change-transform transform-gpu" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline">
                {/* Year */}
                <div className="md:col-span-3 edu-year will-change-transform transform-gpu">
                  <Text as="span" variant="mono" className="text-muted text-sm uppercase tracking-widest">
                    {edu.period}
                  </Text>
                </div>
                
                {/* Institution & Degree */}
                <div className="md:col-span-9 flex flex-col gap-4">
                  <h4 className="edu-institution font-display font-bold text-3xl md:text-5xl uppercase tracking-tighter text-foreground will-change-transform transform-gpu">
                    {edu.institution}
                  </h4>
                  <div className="edu-degree flex flex-col gap-4 will-change-transform transform-gpu">
                    <p className="font-mono text-base md:text-lg text-foreground/90">
                      {edu.degree} {edu.field ? `— ${edu.field}` : ''}
                    </p>
                    {edu.description && (
                      <p className="font-mono text-sm text-foreground/60 max-w-lg leading-relaxed">
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
