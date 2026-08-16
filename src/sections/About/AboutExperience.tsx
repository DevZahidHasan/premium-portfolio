import React, { useRef } from 'react';
import { gsap } from '../../motion/gsap';
import { useGSAP } from '@gsap/react';
import { Text } from '../../components/Text';
import { experienceData } from '../../data/experience';

export const AboutExperience: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current || !leftColRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ScrollTrigger = gsap.core.globals().ScrollTrigger as any;

    if (!prefersReducedMotion) {
      // Pin the "03 / EXPERIENCE" title on desktop while the right side scrolls
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top+=120',
        end: 'bottom bottom',
        pin: leftColRef.current,
        pinSpacing: false,
      });

      // Premium Entrance Choreography for each row
      rowsRef.current.forEach((row) => {
        if (!row) return;
        
        const borderEl = row.querySelector('.exp-border');
        const metaEl = row.querySelectorAll('.exp-meta');
        const titleWrapper = row.querySelector('.exp-title-wrapper');
        const titleEl = row.querySelector('.exp-title');
        const contentEl = row.querySelector('.exp-content');
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 80%', 
            toggleActions: 'play none none reverse'
          }
        });

        // 1. Line draw
        if (borderEl) {
          tl.fromTo(borderEl,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 1, ease: 'power4.inOut' }
          );
        }

        // 2. Meta (Year/Role) fade in
        if (metaEl.length) {
          tl.fromTo(metaEl,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out' },
            "-=0.6"
          );
        }

        // 3. Company Title Mask Reveal
        if (titleEl) {
          tl.fromTo(titleEl,
            { y: '100%', rotateX: -10 },
            { y: '0%', rotateX: 0, duration: 1.2, ease: 'power4.out' },
            "-=0.8"
          );
        }

        // 4. Content fade up
        if (contentEl) {
          tl.fromTo(contentEl,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
            "-=1.0"
          );
        }
      });
    } else {
      gsap.set(containerRef.current, { opacity: 1 });
    }

  }, []);

  return (
    <section 
      ref={containerRef} 
      className="w-full py-24 md:py-48 px-page-gutter relative z-10 bg-background"
      id="experience"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-grid-gap">
        
        {/* LEFT COLUMN: Pinned Title */}
        <div className="md:col-span-3">
          <div ref={leftColRef} className="pt-2 pb-8">
            <Text as="span" variant="mono" className="text-muted text-[11px] uppercase tracking-widest block">
              03 / Experience
            </Text>
          </div>
        </div>

        {/* RIGHT COLUMN: Scrolling Timeline */}
        <div className="md:col-span-9 flex flex-col">
          {experienceData.map((exp, index) => (
            <div 
              key={exp.id} 
              ref={el => rowsRef.current[index] = el}
              className="relative py-12 md:py-24 group will-change-transform"
            >
              {/* Animated Top Border */}
              <div className="exp-border absolute top-0 left-0 w-full h-[1px] bg-white/10" />

              <div className="grid grid-cols-1 lg:grid-cols-9 gap-8 lg:gap-12">
                
                {/* Meta Column (Year & Role) */}
                <div className="lg:col-span-3 flex flex-col gap-2 pt-2">
                  <Text as="span" variant="mono" className="exp-meta text-muted text-[11px] uppercase tracking-widest block opacity-70">
                    {exp.period}
                  </Text>
                  <Text as="span" variant="mono" className="exp-meta text-foreground text-xs md:text-sm uppercase tracking-wider block">
                    {exp.role}
                  </Text>
                  {exp.location && (
                    <Text as="span" variant="mono" className="exp-meta text-muted/50 text-[10px] uppercase tracking-widest mt-1 block">
                      {exp.location}
                    </Text>
                  )}
                </div>

                {/* Content Column (Company, Description, Tech) */}
                <div className="lg:col-span-6 flex flex-col">
                  <div className="exp-title-wrapper overflow-hidden pb-4 -mb-4">
                    <h4 
                      className="exp-title font-display font-bold uppercase tracking-tight text-foreground transition-transform duration-500 group-hover:translate-x-2 will-change-transform transform-gpu origin-top"
                      style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: 0.9 }}
                    >
                      {exp.company}
                    </h4>
                  </div>
                  
                  <div className="exp-content flex flex-col mt-8 md:mt-12">
                    <p className="font-mono text-sm md:text-base text-foreground/80 mb-10 max-w-2xl leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Contributions */}
                    {exp.contributions && exp.contributions.length > 0 && (
                      <div className="mb-12">
                        <ul className="flex flex-col gap-6 border-t border-white/5 pt-6">
                          {exp.contributions.map((item, i) => (
                            <li key={i} className="flex items-start gap-6 group/item">
                              <span className="text-muted/40 font-mono text-[10px] uppercase tracking-widest mt-1 transition-colors duration-300 group-hover/item:text-foreground">0{i + 1}</span>
                              <p className="font-mono text-xs md:text-sm text-foreground/70 leading-relaxed max-w-xl transition-colors duration-300 group-hover/item:text-foreground/90">
                                {item}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="mt-auto pt-6 border-t border-white/5">
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span 
                              key={i}
                              className="font-mono text-[10px] uppercase tracking-widest text-muted border border-white/10 px-3 py-1.5 rounded-full transition-colors duration-300 hover:bg-white hover:text-black cursor-default"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
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
