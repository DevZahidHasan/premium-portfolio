import React, { useRef } from 'react';
import { gsap } from '../../motion/gsap';
import { useGSAP } from '@gsap/react';
import { Text } from '../../components/Text';
import { FloatingSnippets } from '../../components/FloatingSnippets';
import { experienceData } from '../../data/experience';

export const AboutExperience: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


    if (!prefersReducedMotion) {
      // Premium Entrance Choreography for each row
      rowsRef.current.forEach((row) => {
        if (!row) return;
        
        const borderEl = row.querySelector('.exp-border');
        const metaEl = row.querySelectorAll('.exp-meta');
        const titleChars = row.querySelectorAll('.exp-char');
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

        // 3. Content fade up
        if (contentEl) {
          tl.fromTo(contentEl,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
            "-=0.8"
          );
        }

        // 4. Scattered Character Animation (Scrub) for this row's title
        titleChars.forEach((char) => {
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
                trigger: row,
                start: 'top 95%',
                end: 'top 20%',
                scrub: 1, 
              }
            }
          );
        });

      });
    } else {
      gsap.set(containerRef.current, { opacity: 1 });
    }

  }, []);

  charsRef.current = [];

  return (
    <section 
      ref={containerRef} 
      className="w-full py-24 md:py-48 px-page-gutter relative z-10 bg-background overflow-hidden"
      id="experience"
    >
      <FloatingSnippets />
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-grid-gap relative z-10 w-full">
        
        {/* TITLE: Top spanning label */}
        <div className="md:col-span-12 mb-16 md:mb-32">
          <Text as="span" variant="mono" className="text-foreground text-[11px] uppercase tracking-widest block font-bold">
            03 / Experience
          </Text>
        </div>

        {/* EXPERIENCES LIST */}
        <div className="md:col-span-12 flex flex-col gap-32 md:gap-64 w-full">
          {experienceData.map((exp, index) => (
            <div 
              key={exp.id} 
              ref={(el) => { rowsRef.current[index] = el; }}
              className="flex flex-col md:flex-row items-start justify-between gap-12 md:gap-24 w-full group relative"
            >
              
              {/* LEFT SIDE: Sticky Company Name & Tech Stack */}
              <div className="w-full md:w-5/12 flex flex-col items-start relative h-full">
                <div className="md:sticky md:top-32 flex flex-col w-full pb-8 md:pb-0">
                  <div className="exp-title-wrapper pb-4">
                    <h4 className="font-display font-bold text-[12vw] md:text-[6vw] lg:text-[6vw] uppercase tracking-tighter text-foreground leading-[0.9] will-change-transform transform-gpu origin-top">
                      {exp.company.split(' ').map((word, wordIndex, arr) => (
                        <React.Fragment key={wordIndex}>
                          <span className="inline-block whitespace-nowrap">
                            {word.split('').map((char, charIndex) => (
                              <span 
                                key={charIndex}
                                ref={(el) => { if (el) charsRef.current.push(el); }}
                                className="exp-char inline-block will-change-transform transform-gpu"
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
                  
                  {/* Technologies */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="exp-content mt-8 md:mt-12 flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span 
                          key={i}
                          className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted/70 border border-white/10 px-4 py-2 rounded-full transition-colors duration-300 hover:bg-white hover:text-black cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT SIDE: Role, Meta, Description, Contributions */}
              <div className="w-full md:w-7/12 flex flex-col mt-4 md:mt-0">
                
                {/* Role & Year Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
                  <div className="exp-meta flex flex-col gap-2">
                    <h5 className="font-mono text-2xl md:text-4xl font-bold uppercase text-foreground tracking-tight">
                      {exp.role}
                    </h5>
                    {exp.location && (
                      <span className="font-mono text-xs md:text-sm text-muted/60 uppercase tracking-widest">
                        {exp.location}
                      </span>
                    )}
                  </div>
                  <div className="exp-meta shrink-0">
                    <Text as="span" variant="mono" className="text-white text-xs md:text-sm uppercase tracking-widest bg-white/5 px-6 py-3 rounded-full border border-white/10 inline-block">
                      {exp.period}
                    </Text>
                  </div>
                </div>

                {/* Animated Line */}
                <div className="exp-border w-full h-[1px] bg-white/20 mb-8 md:mb-12 will-change-transform transform-gpu" />
                
                {/* Main Description */}
                <div className="exp-content flex flex-col gap-12">
                  <p className="font-mono text-sm md:text-lg text-foreground/80 leading-relaxed text-left md:text-justify uppercase tracking-wider">
                    {exp.description}
                  </p>

                  {/* Contributions List */}
                  {exp.contributions && exp.contributions.length > 0 && (
                    <div className="flex flex-col gap-8 md:gap-12">
                      {exp.contributions.map((item, i) => (
                        <div key={i} className="flex gap-6 md:gap-8 group/item">
                          <span className="text-muted/40 font-mono text-[10px] md:text-xs uppercase tracking-widest mt-1 md:mt-1.5 transition-colors duration-300 group-hover/item:text-foreground">
                            0{i + 1}
                          </span>
                          <p className="font-mono text-xs md:text-base text-muted/70 leading-relaxed text-left md:text-justify uppercase tracking-wider transition-colors duration-300 group-hover/item:text-foreground/90">
                            {item}
                          </p>
                        </div>
                      ))}
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
