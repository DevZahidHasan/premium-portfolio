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
    
    const matchMediaFine = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (matchMediaFine && !prefersReducedMotion) {
      categoriesRef.current.forEach((categoryEl, index) => {
        if (!categoryEl) return;
        
        const titleEl = categoryEl.querySelector('.skill-title');
        const contentEl = categoryEl.querySelector('.skill-content');
        const skillsEl = categoryEl.querySelectorAll('.skill-item');
        
        // Initial setup for the content container
        gsap.set(contentEl, { height: 0, opacity: 0, overflow: 'hidden' });

        const onMouseEnter = () => {
          // Dim other categories
          categoriesRef.current.forEach((el, i) => {
            if (el && i !== index) gsap.to(el, { opacity: 0.25, duration: 0.4, ease: "power2.out" });
          });
          gsap.to(categoryEl, { opacity: 1, duration: 0.4, ease: "power2.out" });

          // Expand content
          gsap.to(contentEl, { height: 'auto', opacity: 1, duration: 0.5, ease: "power2.out" });
          
          // Stagger the skill items inward
          gsap.fromTo(skillsEl, 
            { y: 10, opacity: 0 }, 
            { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: "power3.out" }
          );
          
          gsap.to(titleEl, { x: 12, duration: 0.5, ease: "power3.out" });
        };

        const onMouseLeave = () => {
          // Restore all categories
          categoriesRef.current.forEach((el) => {
            if (el) gsap.to(el, { opacity: 1, duration: 0.6, ease: "power2.out" });
          });
          
          // Collapse content
          gsap.to(contentEl, { height: 0, opacity: 0, duration: 0.4, ease: "power2.inOut" });
          
          gsap.to(titleEl, { x: 0, duration: 0.5, ease: "power3.out" });
        };

        categoryEl.addEventListener('mouseenter', onMouseEnter);
        categoryEl.addEventListener('mouseleave', onMouseLeave);
      });
    }

  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full py-24 md:py-48 px-page-gutter relative z-10"
      id="skills"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-grid-gap items-start">
        
        {/* LEFT COLUMN: Title (2 cols on desktop) */}
        <div className="md:col-span-2">
          <Text as="span" variant="mono" className="text-muted text-[11px] uppercase tracking-widest block mb-12 md:mb-0">
            04 / Capabilities
          </Text>
        </div>

        {/* RIGHT COLUMN: Taxonomy (10 cols) */}
        <div className="md:col-span-10 flex flex-col border-t border-white/10 pt-8">
          {skillsData.map((category, index) => (
            <div 
              key={category.id} 
              ref={el => categoriesRef.current[index] = el}
              className="group relative border-b border-white/10 last:border-b-0 py-8 md:py-12 cursor-default will-change-transform transform-gpu"
            >
              <div className="flex flex-col gap-6">
                
                <h4 
                  className="skill-title font-display font-bold uppercase tracking-tighter text-foreground will-change-transform transform-gpu"
                  style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 0.9 }}
                >
                  {category.label}
                </h4>
                
                <div className="skill-content will-change-transform transform-gpu">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 pb-8">
                    {category.description && (
                      <p className="font-mono text-sm md:text-base text-foreground/70 max-w-sm leading-relaxed">
                        {category.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-x-6 gap-y-4">
                      {category.skills.map((skill, i) => (
                        <div 
                          key={i} 
                          className="skill-item font-mono text-xs md:text-sm uppercase tracking-widest text-foreground will-change-transform transform-gpu"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
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
