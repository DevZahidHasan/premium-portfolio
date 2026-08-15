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
    
    const matchMedia = gsap.matchMedia();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ScrollTrigger = gsap.core.globals().ScrollTrigger as any;

    if (!prefersReducedMotion) {
      matchMedia.add("(min-width: 768px)", () => {
        // Pin the "03 / EXPERIENCE" title on desktop while the right side scrolls
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top+=120',
          end: 'bottom bottom',
          pin: leftColRef.current,
          pinSpacing: false,
        });

        // Active State Choreography for each row
        rowsRef.current.forEach((row, index) => {
          if (!row) return;
          
          const yearEl = row.querySelector('.exp-year');
          const titleEl = row.querySelector('.exp-title');
          const contentEl = row.querySelector('.exp-content');
          
          // Initial state before it enters center
          gsap.set(row, { opacity: 0.35 });
          gsap.set([yearEl, titleEl], { y: 10 });
          gsap.set(contentEl, { opacity: 0, y: 15 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: 'top 65%', 
              end: 'top 35%', 
              scrub: true,
            }
          });

          // Animate TO active state
          tl.to(row, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0)
            .to([yearEl, titleEl], { y: 0, duration: 0.5, ease: 'power2.out' }, 0)
            .to(contentEl, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0);
          
          // Animate TO past state (dimming further out)
          const outTl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: 'bottom 45%', 
              end: 'bottom 15%',
              scrub: true,
            }
          });

          outTl.to(row, { opacity: 0.25, duration: 0.5, ease: 'power2.in' }, 0)
               .to([yearEl, titleEl], { y: -10, duration: 0.5, ease: 'power2.in' }, 0);
        });
      });
      
      // Mobile choreography (simplified)
      matchMedia.add("(max-width: 767px)", () => {
        rowsRef.current.forEach((row) => {
          if (!row) return;
          gsap.fromTo(row, 
            { opacity: 0.3, y: 20 },
            { 
              opacity: 1, y: 0, 
              duration: 1,
              scrollTrigger: {
                trigger: row,
                start: 'top 85%',
                end: 'top 50%',
                scrub: true,
              }
            }
          );
        });
      });
    }

    return () => matchMedia.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="w-full py-24 md:py-48 px-page-gutter"
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
        <div className="md:col-span-9 flex flex-col gap-32 md:gap-48 border-t border-white/10 pt-8">
          {experienceData.map((exp, index) => (
            <div 
              key={exp.id} 
              ref={el => rowsRef.current[index] = el}
              className="flex flex-col gap-6 md:gap-12 group will-change-transform transform-gpu"
            >
              {/* Header: Period & Company */}
              <div className="flex flex-col gap-4 transition-colors duration-500">
                <Text as="span" variant="mono" className="exp-year text-muted text-sm md:text-base will-change-transform opacity-70">
                  {exp.period}
                </Text>
                
                <div className="flex flex-col exp-title will-change-transform">
                  <h4 
                    className="font-display font-bold uppercase tracking-tight text-foreground"
                    style={{ fontSize: 'clamp(2rem, 4vw, 5rem)', lineHeight: 0.9 }}
                  >
                    {exp.company}
                  </h4>
                  <Text as="span" variant="mono" className="text-foreground/80 text-base md:text-lg mt-2">
                    {exp.role} {exp.location ? `— ${exp.location}` : ''}
                  </Text>
                </div>
              </div>

              {/* Body: Description */}
              <div className="exp-content will-change-transform">
                <p className="font-mono text-base md:text-lg text-foreground/70 mb-10 max-w-2xl leading-relaxed">
                  {exp.description}
                </p>

                {/* Contributions */}
                {exp.contributions && exp.contributions.length > 0 && (
                  <div className="mb-10">
                    <ul className="flex flex-col gap-4">
                      {exp.contributions.map((item, i) => (
                        <li key={i} className="flex items-start gap-6 border-t border-white/10 pt-4">
                          <span className="text-muted font-mono text-xs mt-1 opacity-50">0{i + 1}</span>
                          <p className="font-mono text-sm md:text-base text-foreground/80 leading-relaxed max-w-2xl">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div>
                    <Text as="span" variant="mono" className="text-[11px] uppercase tracking-widest text-muted/50 mb-4 block">
                      Technologies
                    </Text>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span 
                          key={i}
                          className="font-mono text-[11px] uppercase tracking-wider text-muted border border-white/10 px-3 py-1.5 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};
