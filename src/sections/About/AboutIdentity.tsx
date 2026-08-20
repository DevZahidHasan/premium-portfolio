import React, { useRef } from 'react';
import { gsap } from '../../motion/gsap';
import { useGSAP } from '@gsap/react';
import { Text } from '../../components/Text';
import { aboutData } from '../../data/about';

export const AboutIdentity: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const borderRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.matchMedia('(pointer: fine)').matches;

    // Premium Scroll Reveal
    if (!prefersReducedMotion) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      // 1. Line draw
      if (borderRef.current) {
        tl.fromTo(borderRef.current, 
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 1.2, ease: 'power4.inOut' }
        );
      }

      // 2. Label fade in
      if (labelRef.current) {
        tl.fromTo(labelRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          "-=0.6"
        );
      }

      // 3. Staggered Mask Reveal for Massive Typography
      const titles = gsap.utils.toArray('.identity-title-reveal', containerRef.current);
      if (titles.length > 0) {
        tl.fromTo(titles,
          { y: '100%', rotateX: -10 },
          { y: '0%', rotateX: 0, stagger: 0.1, duration: 1.2, ease: 'power4.out' },
          "-=0.8"
        );
      }
    } else {
      gsap.set(containerRef.current, { opacity: 1 });
    }

    // Hover interactions (Desktop only via matchMedia)
    let mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        const titleEl = item.querySelector('.identity-title-reveal');

        const onMouseEnter = () => {
          itemsRef.current.forEach((el, i) => {
            if (el && i !== index) {
              gsap.to(el, { opacity: 0.2, duration: prefersReducedMotion ? 0 : 0.5, ease: 'power2.out' });
            }
          });
          
          gsap.to(item, { opacity: 1, duration: prefersReducedMotion ? 0 : 0.5, ease: 'power2.out' });
          gsap.to(item.querySelector('.identity-content'), { 
            height: 'auto', 
            opacity: 1, 
            y: 0, 
            duration: prefersReducedMotion ? 0 : 0.5, 
            ease: 'power2.out' 
          });
        };

        const onMouseLeave = () => {
          itemsRef.current.forEach((el) => {
            if (el) gsap.to(el, { opacity: 1, duration: prefersReducedMotion ? 0 : 0.5, ease: 'power2.out' });
          });

          gsap.to(item.querySelector('.identity-content'), { 
            height: 0, 
            opacity: 0, 
            y: -10, 
            duration: prefersReducedMotion ? 0 : 0.4, 
            ease: 'power2.inOut' 
          });
        };

        if (titleEl) {
          titleEl.addEventListener('mouseenter', onMouseEnter);
          titleEl.addEventListener('mouseleave', onMouseLeave);
        }

        // Store the listeners on the element for cleanup
        (titleEl as any)._onMouseEnter = onMouseEnter;
        (titleEl as any)._onMouseLeave = onMouseLeave;
      });
      
      // Return cleanup function for matchMedia context
      return () => {
        itemsRef.current.forEach((item) => {
          if (!item) return;
          const titleEl = item.querySelector('.identity-title-reveal');
          if (titleEl && (titleEl as any)._onMouseEnter) {
            titleEl.removeEventListener('mouseenter', (titleEl as any)._onMouseEnter);
            titleEl.removeEventListener('mouseleave', (titleEl as any)._onMouseLeave);
          }
        });
      };
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile - ensure everything is visible and spacing is tight
      gsap.set('.identity-content', { clearProps: 'all' });
      gsap.set('.identity-title-reveal h3', { clearProps: 'all' });
    });

  }, []);

  return (
    <section 
      ref={containerRef} 
      className="w-full min-h-[70vh] py-section-spacing px-page-gutter flex flex-col justify-center relative z-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-grid-gap items-start">
        
        {/* LEFT: Label (3 cols) */}
        <div className="md:col-span-3" ref={labelRef}>
          <Text as="span" variant="mono" className="text-muted text-[11px] uppercase tracking-widest block mb-12 md:mb-0">
            02 / Engineering Identity
          </Text>
        </div>

        {/* RIGHT: Interactive Typographic System (9 cols) */}
        <div className="md:col-span-9" ref={listRef}>
          <div className="flex flex-col gap-12 md:gap-24 pt-12 relative">
            {/* Animated Border */}
            <div ref={borderRef} className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />

            {aboutData.disciplines.map((discipline, index) => (
              <div 
                key={index} 
                ref={(el) => { itemsRef.current[index] = el; }}
                className="group flex flex-col md:flex-row md:items-baseline gap-4 md:gap-16 cursor-default will-change-transform transform-gpu py-4"
              >
                {/* Overflow hidden mask wrapper for premium reveal */}
                <div className="overflow-hidden pb-4 -mb-4">
                  <div className="identity-title-reveal will-change-transform transform-gpu origin-top">
                    <h3 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter text-foreground transition-transform duration-500 group-hover:translate-x-4">
                      {discipline.title}
                    </h3>
                  </div>
                </div>
                
                <div className="identity-content overflow-hidden md:opacity-0 md:h-0 md:-translate-y-2 flex-1 origin-top md:pb-2">
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
