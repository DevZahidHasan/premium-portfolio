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
    <div ref={containerRef} className="w-full px-page-gutter pb-32 md:pb-48 relative z-10 flex flex-col gap-32 md:gap-48 mt-16">
      {projects.map((project, index) => {
        return (
          <div 
            key={project.id}
            ref={el => itemsRef.current[index] = el}
            className="flex flex-col group w-full max-w-7xl mx-auto will-change-transform transform-gpu"
            data-cursor-interact="true"
            data-cursor-text="VIEW"
            data-cursor-expand="true"
          >
            {/* Top Meta Info (Client / Year) */}
            <div className="flex justify-between items-end mb-6 w-full px-2 border-b border-black/10 pb-4">
              <span className="font-mono text-sm tracking-widest uppercase text-black/60">
                {String(index + 1).padStart(2, '0')} / {project.client || 'Client'}
              </span>
              <span className="font-mono text-sm tracking-widest uppercase text-black/60">
                {project.year}
              </span>
            </div>
            
            {/* Project Image Container */}
            <a 
              href={project.liveLink || project.github || '#'} 
              target="_blank" 
              rel="noreferrer"
              className="block relative w-full aspect-video bg-[#E9ECEF] overflow-hidden group-hover:shadow-2xl transition-shadow duration-700 ease-out"
            >
              <div className="project-image-wrapper absolute -inset-8 will-change-transform transform-gpu">
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                />
              </div>
            </a>

            {/* Project Details */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mt-8 px-2">
              <div className="flex flex-col gap-2">
                <h3 className="font-display font-bold text-4xl md:text-5xl text-black uppercase tracking-tighter">
                  {project.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3 md:max-w-[300px] md:justify-end">
                {project.services.split(',').map((service, i) => (
                  <span key={i} className="font-mono text-xs uppercase tracking-widest text-black/70">
                    {service.trim()}{i < project.services.split(',').length - 1 ? ' /' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
