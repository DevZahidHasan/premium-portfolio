import React, { useRef, useState } from 'react';
import { gsap } from '../../motion/gsap';
import { useGSAP } from '@gsap/react';
import { Text } from '../../components/Text';
import { skillsData } from '../../data/skills';

export const AboutSkills: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      
      // 1. Background Image Parallax
      if (bgImageRef.current) {
        gsap.fromTo(bgImageRef.current,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }

      // 2. Animate Left Intro Text Entrance
      if (introRef.current) {
        gsap.fromTo(introRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
            }
          }
        );
      }

      // 3. Stagger animate the columns entrance & add Scroll Parallax
      columnsRef.current.forEach((col, index) => {
        if (!col) return;
        
        const divider = col.querySelector('.skill-divider');
        const header = col.querySelector('.skill-header');
        const items = col.querySelectorAll('.skill-item');

        // ENTRANCE ANIMATION
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
          delay: index * 0.15 // Premium staggered delay between columns
        });

        if (divider) {
          tl.fromTo(divider, 
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 1, ease: 'power4.inOut' }
          );
        }

        if (header) {
          tl.fromTo(header,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
            "-=0.6"
          );
        }

        if (items.length) {
          tl.fromTo(items,
            { x: -10, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: 'power2.out' },
            "-=0.4"
          );
        }

        // SCROLL PARALLAX ANIMATION
        gsap.to(col, {
          y: index % 2 === 0 ? -40 : 40, // Outer columns move up, center column moves down
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1, // Smooth scrubbing
          }
        });
      });
    }

  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full py-24 md:py-32 px-page-gutter relative z-10 overflow-hidden"
      id="capabilities"
    >
      {/* PARALLAX BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          ref={bgImageRef}
          src="/skills.jpg" 
          alt="Skills Background" 
          className="absolute inset-0 w-full h-[130%] object-cover object-center will-change-transform transform-gpu opacity-70"
        />
        {/* Lighter Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-background/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background z-20 opacity-80" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-grid-gap items-start relative z-10">
        
        {/* LEFT COLUMN: Title & Intro (3 cols on desktop) */}
        <div ref={introRef} className="md:col-span-3 flex flex-col gap-6">
          <Text as="span" variant="mono" className="text-muted text-[11px] uppercase tracking-widest block pt-2 opacity-0">
            04 / Capabilities
          </Text>
          <p className="font-mono text-xs text-muted/60 uppercase tracking-widest leading-relaxed max-w-[250px] opacity-0">
            Building highly interactive, scalable, and performant web applications with a focus on premium user experiences and robust architectures.
          </p>
        </div>

        {/* RIGHT COLUMN: Precise Technical Grid (9 cols) */}
        <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-8 pt-8 md:pt-0" onMouseLeave={() => setHoveredCol(null)}>
          {skillsData.map((category, index) => {
            const isHovered = hoveredCol === index;
            const isDimmed = hoveredCol !== null && hoveredCol !== index;
            
            return (
              <div 
                key={category.id} 
                ref={(el) => { columnsRef.current[index] = el; }}
                onMouseEnter={() => setHoveredCol(index)}
                className={`flex flex-col transition-opacity duration-500 will-change-transform ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
              >
                {/* Category Header */}
                <div className="skill-header pb-6 mb-6 relative opacity-0">
                  <div className="skill-divider absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
                  <div className="absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-500 ease-out" style={{ width: isHovered ? '100%' : '0%' }} />
                  
                  <h4 className="font-mono text-sm md:text-base uppercase tracking-widest text-foreground font-bold transition-colors duration-300" style={{ color: isHovered ? '#fff' : '' }}>
                    {category.label.replace(/\[|\]/g, '')}
                  </h4>
                  {category.description && (
                    <p className="font-mono text-[10px] text-muted/70 uppercase tracking-widest mt-3 leading-relaxed">
                      {category.description.replace(/\[|\]/g, '')}
                    </p>
                  )}
                </div>

                {/* Skills List */}
                <ul className="flex flex-col gap-3">
                  {category.skills.map((skill, i) => (
                    <li 
                      key={i} 
                      className="skill-item group flex items-center gap-4 cursor-default py-1 overflow-hidden opacity-0"
                    >
                      <div className="relative flex items-center justify-center w-4 h-4 overflow-hidden">
                        {/* Default Dot */}
                        <span className="absolute left-0 w-1.5 h-1.5 rounded-full bg-white/60 transition-all duration-500 group-hover:scale-0 group-hover:opacity-0" />
                        {/* Hover Arrow */}
                        <span className="absolute -left-4 text-[10px] text-white opacity-0 transition-all duration-500 group-hover:left-0 group-hover:opacity-100 font-mono">
                          {">"}
                        </span>
                      </div>
                      {/* Text Translation */}
                      <span className="font-mono text-xs md:text-sm tracking-wider text-foreground/95 transition-all duration-500 group-hover:text-white group-hover:translate-x-2">
                        {skill.replace(/\[|\]/g, '')}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};
