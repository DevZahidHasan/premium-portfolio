import React, { useRef } from 'react';
import { gsap } from '../../motion/gsap';
import { useGSAP } from '@gsap/react';
import { projects } from '../../data/projects';
import { Text } from '../../components/Text';
import clsx from 'clsx';

export const WorkGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      
      const imageWrapper = item.querySelector('.project-image-wrapper');
      
      // Entrance animation disabled for debugging
      
      // Subtle Parallax on the image wrapper
      if (imageWrapper) {
        // Even indices move slightly slower, odd indices move slightly faster
        const yPercent = index % 2 === 0 ? 15 : -15;
        
        gsap.to(imageWrapper, {
          yPercent,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="w-full px-page-gutter pb-32 md:pb-64 relative z-10 flex flex-col items-center">
      
      {/* "Selected Work" Header */}
      <div className="w-full max-w-7xl mx-auto flex justify-center mb-32">
        <h2 className="font-display font-bold text-5xl md:text-7xl text-black">
          Selected Work
        </h2>
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24">
        {projects.map((project, index) => {
          // Asymmetric grid: even items left, odd items right and pushed down
          const isEven = index % 2 === 0;
          
          return (
            <div 
              key={project.id}
              ref={el => itemsRef.current[index] = el}
              className={clsx(
                "flex flex-col group will-change-transform transform-gpu",
                !isEven ? "md:mt-48" : ""
              )}
            >
              <div className="text-[10px] font-mono text-black/40 mb-2 ml-2">Project {index + 1}</div>
              
              {/* Card */}
              <a 
                href={`#project-${project.id}`}
                className="block w-full bg-white rounded-[32px] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.03] transition-transform duration-500 hover:-translate-y-2 relative"
              >
                {/* Image Container */}
                <div className="w-full aspect-[4/3] rounded-[24px] bg-[#F4F4F2] overflow-hidden mb-6 relative">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Text Content */}
                <div className="px-2 pb-2">
                  <h3 className="font-display font-bold text-xl text-black mb-1">
                    {project.title}
                  </h3>
                  <p className="font-sans text-sm text-black/60 mb-6">
                    {project.about.substring(0, 60)}...
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {project.services.split(',').slice(0, 2).map((service, i) => (
                        <span key={i} className="font-sans text-[11px] font-medium text-black/60 border border-black/10 rounded px-2 py-1">
                          {service.trim()}
                        </span>
                      ))}
                    </div>
                    
                    {/* Link Icon */}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-black/40 group-hover:text-black transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17l9.2-9.2M17 17V7H7"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
