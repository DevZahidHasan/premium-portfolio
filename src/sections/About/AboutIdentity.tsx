import React, { useRef, useState } from 'react';
import { gsap } from '../../motion/gsap';
import { useGSAP } from '@gsap/react';
import { Text } from '../../components/Text';
import { aboutData } from '../../data/about';

export const AboutIdentity: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const matchMediaFine = window.matchMedia('(pointer: fine)').matches;

    // Scroll reveal
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );

    if (matchMediaFine && !prefersReducedMotion) {
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        const onMouseEnter = () => {
          itemsRef.current.forEach((el, i) => {
            if (el && i !== index) {
              gsap.to(el, { opacity: 0.25, duration: 0.5, ease: 'power2.out' });
            }
          });
          
          gsap.to(item, { opacity: 1, duration: 0.5, ease: 'power2.out' });
          gsap.to(item.querySelector('.identity-content'), { 
            height: 'auto', 
            opacity: 1, 
            y: 0, 
            duration: 0.5, 
            ease: 'power2.out' 
          });
        };

        const onMouseLeave = () => {
          itemsRef.current.forEach((el) => {
            if (el) gsap.to(el, { opacity: 1, duration: 0.5, ease: 'power2.out' });
          });

          gsap.to(item.querySelector('.identity-content'), { 
            height: 0, 
            opacity: 0, 
            y: -10, 
            duration: 0.4, 
            ease: 'power2.inOut' 
          });
        };

        item.addEventListener('mouseenter', onMouseEnter);
        item.addEventListener('mouseleave', onMouseLeave);
      });
    }

  }, []);

  return (
    <section 
      ref={containerRef} 
      className="w-full min-h-[70vh] py-section-spacing px-page-gutter flex flex-col justify-center relative z-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-grid-gap items-start">
        
        {/* LEFT: Label (3 cols) */}
        <div className="md:col-span-3">
          <Text as="span" variant="mono" className="text-muted text-[11px] uppercase tracking-widest block mb-12 md:mb-0">
            02 / Engineering Identity
          </Text>
        </div>

        {/* RIGHT: Interactive Typographic System (9 cols) */}
        <div className="md:col-span-9" ref={listRef}>
          <div className="flex flex-col gap-12 md:gap-24 border-t border-white/10 pt-12">
            {aboutData.disciplines.map((discipline, index) => (
              <div 
                key={index} 
                ref={el => itemsRef.current[index] = el}
                className="group flex flex-col md:flex-row md:items-baseline gap-4 md:gap-16 cursor-default will-change-transform transform-gpu py-4"
              >
                <h3 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter text-foreground transition-transform duration-500 group-hover:translate-x-4">
                  {discipline.title}
                </h3>
                
                <div className="identity-content overflow-hidden opacity-0 h-0 -translate-y-2 flex-1 origin-top md:pb-2">
                  <div className="flex flex-col gap-4 max-w-lg">
                    <p className="font-mono text-sm md:text-base text-foreground/90 leading-relaxed">
                      {discipline.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {discipline.focus.map((item, i) => (
                        <span key={i} className="font-mono text-[10px] md:text-xs text-muted uppercase tracking-wider border border-white/10 px-2 py-1 rounded-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
