import React, { useRef } from 'react';
import { gsap } from '../../motion/gsap';
import { useGSAP } from '@gsap/react';
import { Text } from '../../components/Text';
import { skillsData } from '../../data/skills';

export const AboutSkills: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ScrollTrigger = gsap.core.globals().ScrollTrigger as any;

    if (!prefersReducedMotion) {
      // Animate categories fading and sliding up sequentially
      gsap.fromTo(categoriesRef.current, 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.15, 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );

      // Stagger animate individual skill items within each category
      categoriesRef.current.forEach(cat => {
        if (!cat) return;
        const items = cat.querySelectorAll('.skill-item');
        const divider = cat.querySelector('.skill-divider');
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cat,
            start: 'top 85%',
          }
        });

        if (divider) {
          tl.fromTo(divider, 
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.8, ease: 'power4.inOut' }
          );
        }

        if (items.length) {
          tl.fromTo(items,
            { x: -10, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power2.out' },
            "-=0.4"
          );
        }
      });
    }

  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full py-24 md:py-48 px-page-gutter relative z-10 bg-background"
      id="capabilities"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-grid-gap items-start">
        
        {/* LEFT COLUMN: Title (3 cols on desktop) */}
        <div className="md:col-span-3">
          <Text as="span" variant="mono" className="text-muted text-[11px] uppercase tracking-widest block mb-12 md:mb-0 pt-2">
            04 / Capabilities
          </Text>
        </div>

        {/* RIGHT COLUMN: Precise Technical Grid (9 cols) */}
        <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pt-8 md:pt-0">
          {skillsData.map((category, index) => (
            <div 
              key={category.id} 
              ref={el => categoriesRef.current[index] = el}
              className="flex flex-col will-change-transform opacity-0"
            >
              {/* Category Header */}
              <div className="pb-6 mb-6 relative">
                <div className="skill-divider absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
                <h4 className="font-mono text-sm md:text-base uppercase tracking-widest text-foreground font-bold">
                  {category.label.replace(/\[|\]/g, '')}
                </h4>
                {category.description && (
                  <p className="font-mono text-[10px] text-muted/70 uppercase tracking-widest mt-3 leading-relaxed">
                    {category.description.replace(/\[|\]/g, '')}
                  </p>
                )}
              </div>

              {/* Skills List */}
              <ul className="flex flex-col gap-4">
                {category.skills.map((skill, i) => (
                  <li 
                    key={i} 
                    className="skill-item group flex items-center gap-4 cursor-default"
                  >
                    <div className="relative flex items-center justify-center w-2 h-2">
                      <span className="absolute w-1 h-1 rounded-full bg-white/20 transition-all duration-300 group-hover:scale-150 group-hover:bg-white" />
                    </div>
                    <span className="font-mono text-xs md:text-sm tracking-wider text-foreground/70 transition-colors duration-300 group-hover:text-foreground">
                      {skill.replace(/\[|\]/g, '')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};
