import React, { useRef, useState } from 'react';
import { gsap } from '../../motion/gsap';
import { useGSAP } from '@gsap/react';
import { Text } from '../../components/Text';
import { aboutData } from '../../data/about';
import { cn } from '../../utils/cn';

export const AboutIdentity: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [displayIndex, setDisplayIndex] = useState<number>(0);
  
  // Animate content change on the right side
  useGSAP(() => {
    if (contentRef.current) {
      if (hoveredIndex !== null) {
        // Fade in new content
        gsap.fromTo(contentRef.current, 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );
      } else {
        // Fade out when nothing is hovered
        gsap.to(contentRef.current, 
          { opacity: 0, y: 10, duration: 0.4, ease: 'power2.inOut' }
        );
      }
    }
  }, [hoveredIndex, displayIndex]);

  // Entrance animations
  useGSAP(() => {
    if (!containerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    // Reveal rows
    tl.fromTo('.identity-row', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="w-full min-h-[70vh] py-section-spacing px-page-gutter flex flex-col justify-center relative z-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-grid-gap items-start">
        
        {/* LEFT: Label (2 cols) */}
        <div className="md:col-span-2 hidden md:block">
          <Text as="span" variant="mono" className="text-foreground font-bold text-[11px] uppercase tracking-widest block pt-8">
            02 / Engineering
          </Text>
        </div>

        {/* CENTER/LEFT: Interactive Typographic List (6 cols) */}
        <div className="md:col-span-6 lg:col-span-6">
          <div 
            className="flex flex-col border-t border-white/10"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {aboutData.disciplines.map((d, i) => (
              <div 
                key={i} 
                className="identity-row group relative border-b border-white/10 py-6 md:py-10 cursor-pointer"
                onMouseEnter={() => {
                  setHoveredIndex(i);
                  setDisplayIndex(i);
                }}
              >
                <div className="flex items-center justify-between">
                  <h3 
                    className={cn(
                      "font-display font-bold uppercase tracking-tighter transition-all duration-500 will-change-transform transform-gpu",
                      hoveredIndex === i ? "translate-x-4 md:translate-x-8" : ""
                    )}
                    style={{
                      fontSize: 'clamp(2rem, 12vw, 7rem)',
                      lineHeight: 1,
                      WebkitTextStroke: hoveredIndex === i ? '0px transparent' : '1px rgba(255,255,255,0.3)',
                      color: hoveredIndex === i ? '#ffffff' : 'transparent',
                    }}
                  >
                    {d.title}
                  </h3>
                  
                  {/* Arrow Icon (Desktop Only) */}
                  <div className="hidden md:block overflow-hidden mr-4">
                    <svg 
                      width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className={cn(
                        "transition-transform duration-500 transform-gpu",
                        hoveredIndex === i ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
                      )}
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>

                {/* Mobile Description (Hidden on Desktop) */}
                <div className="md:hidden mt-6 flex flex-col gap-4">
                  <p className="font-mono text-sm text-foreground/80 leading-relaxed">
                    {d.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {d.focus.map((item, idx) => (
                      <span key={idx} className="font-mono text-[10px] text-muted uppercase tracking-wider border border-white/10 bg-white/5 px-3 py-1.5 rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Dynamic Description (4 cols) - Desktop Only */}
        <div className="hidden md:flex md:col-span-4 lg:col-span-4 flex-col justify-center h-full pl-0 lg:pl-12 pt-8">
          <div ref={contentRef} className="flex flex-col gap-8 will-change-transform transform-gpu opacity-0">
            <p className="font-mono text-base lg:text-lg text-foreground/90 leading-relaxed">
              {aboutData.disciplines[displayIndex].description}
            </p>
            <div className="flex flex-wrap gap-3">
              {aboutData.disciplines[displayIndex].focus.map((item, i) => (
                <span key={i} className="font-mono text-xs text-foreground uppercase tracking-wider border border-cyan-400/30 bg-cyan-400/5 px-4 py-2 rounded-full">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
