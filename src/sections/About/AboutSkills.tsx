import React, { useRef } from 'react';
import { gsap } from '../../motion/gsap';
import { useGSAP } from '@gsap/react';
import { Text } from '../../components/Text';
import { skillsData } from '../../data/skills';

export const AboutSkills: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

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

      // 3. Stagger animate the columns
      columnsRef.current.forEach((col, index) => {
        if (!col) return;
        
        const divider = col.querySelector('.skill-divider');
        const desc = col.querySelector('.skill-desc');
        const items = col.querySelectorAll('.skill-item');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
          delay: index * 0.15
        });

        if (divider) {
          tl.fromTo(divider, 
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 1, ease: 'power4.inOut' }
          );
        }

        if (desc) {
          tl.fromTo(desc,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
            "-=0.6"
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

      // 4. Scrub scattered alphabet animation for Category Titles
      charsRef.current.forEach((char) => {
        if (!char) return;
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
              trigger: containerRef.current,
              start: 'top 85%',
              end: 'top 30%',
              scrub: 1, 
            }
          }
        );
      });
    }

  }, []);

  charsRef.current = [];

  return (
    <section 
      ref={containerRef}
      className="w-full py-24 md:py-48 px-page-gutter relative z-10 overflow-hidden bg-background"
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

      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-grid-gap items-start relative z-10 w-full">
        
        {/* TITLE: Spans full width */}
        <div ref={introRef} className="md:col-span-12 flex flex-col gap-6 mb-8 md:mb-16">
          <Text as="span" variant="mono" className="text-foreground font-bold text-[11px] uppercase tracking-widest block pt-2 opacity-0">
            04 / Capabilities
          </Text>
          <p className="font-mono text-sm md:text-base text-muted/60 uppercase tracking-widest leading-relaxed max-w-2xl opacity-0">
            Building highly interactive, scalable, and performant web applications with a focus on premium user experiences and robust architectures.
          </p>
        </div>

        {/* CLEAN 3-COLUMN GRID */}
        <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full pt-8">
          {skillsData.map((category, index) => (
            <div 
              key={category.id} 
              ref={(el) => { columnsRef.current[index] = el; }}
              className="flex flex-col w-full group relative bg-black/40 backdrop-blur-sm border border-white/5 p-8 rounded-sm"
            >
              
              {/* Category Header */}
              <div className="skill-header flex flex-col pb-6 mb-6 relative">
                <div className="skill-divider absolute bottom-0 left-0 w-full h-[1px] bg-white/20" />
                <div className="absolute bottom-0 left-0 h-[1px] bg-white scale-x-0 origin-left transition-transform duration-700 ease-out group-hover:scale-x-100" />
                
                <h4 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tighter text-foreground mb-4">
                  {category.label.replace(/\[|\]/g, '').split('').map((char, charIndex) => (
                    <span 
                      key={charIndex}
                      ref={(el) => { if (el) charsRef.current.push(el); }}
                      className="inline-block will-change-transform transform-gpu"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </h4>
                {category.description && (
                  <p className="skill-desc font-mono text-[10px] md:text-xs text-muted/80 uppercase tracking-widest leading-relaxed">
                    {category.description.replace(/\[|\]/g, '')}
                  </p>
                )}
              </div>

              {/* Skills List */}
              <ul className="flex flex-col gap-4">
                {category.skills.map((skill, i) => (
                  <li 
                    key={i} 
                    className="skill-item flex items-center cursor-default overflow-hidden group/item"
                  >
                    <div className="relative flex items-center justify-center w-3 h-3 overflow-hidden mr-3">
                      <span className="absolute left-0 w-1 h-1 rounded-full bg-white/40 transition-all duration-500 group-hover/item:scale-0 group-hover/item:opacity-0" />
                      <span className="absolute -left-4 text-[8px] text-white opacity-0 transition-all duration-500 group-hover/item:left-0 group-hover/item:opacity-100 font-mono">
                        {">"}
                      </span>
                    </div>
                    <span className="font-mono text-sm md:text-base text-foreground/90 uppercase tracking-widest transition-all duration-500 group-hover/item:text-white group-hover/item:translate-x-2">
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
