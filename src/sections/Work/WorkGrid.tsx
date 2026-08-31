import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { projects } from '../../data/projects';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

export const WorkGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const loadMoreBtnRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(3);

  useGSAP(() => {
    if (!containerRef.current || itemsRef.current.length === 0) return;

    itemsRef.current.forEach((item) => {
      if (!item) return;

      gsap.fromTo(item, 
        { 
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    // Scattered Character Animation for "Selected Work"
    if (headerRef.current && charsRef.current.length > 0) {
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
              trigger: headerRef.current, // Use the header container as the trigger
              start: 'top 85%', // Start converging when it enters viewport
              end: 'center center', // Finish converging when centered
              scrub: 1, 
            }
          }
        );
      });
    }

    // Floating animation for Load More button
    if (loadMoreBtnRef.current) {
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        gsap.to(loadMoreBtnRef.current, {
          y: -10,
          duration: 1.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        });
      });

      return () => mm.revert();
    }

  }, [visibleCount]); // Re-run animations when visible count changes

  // Clean up chars array on each render to prevent duplicates
  charsRef.current = [];
  
  // Clean up items array to only hold currently rendered items
  itemsRef.current = [];

  const headlineText = "Selected Work";
  
  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <div ref={containerRef} className="w-full px-page-gutter pb-32 md:pb-64 relative z-10 flex flex-col items-center">
      
      {/* "Selected Work" Header */}
      <div ref={headerRef} className="w-full max-w-7xl mx-auto flex justify-center mb-32 relative z-20 h-32 items-center">
        <h2 className="font-display font-bold text-5xl md:text-7xl text-black flex gap-4 md:gap-8">
          {headlineText.split(' ').map((word, wordIndex) => (
            <React.Fragment key={wordIndex}>
              <span className="inline-block whitespace-nowrap">
                {word.split('').map((char, charIndex) => (
                  <span 
                    key={charIndex}
                    ref={(el) => { if (el) charsRef.current.push(el); }}
                    className="inline-block will-change-transform transform-gpu"
                  >
                    {char}
                  </span>
                ))}
              </span>
            </React.Fragment>
          ))}
        </h2>
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 relative z-10">
        {visibleProjects.map((project, index) => {
          // Asymmetric grid: even items left, odd items right and pushed down
          const isEven = index % 2 === 0;
          
          return (
            <div 
              key={project.id}
              ref={(el) => { itemsRef.current[index] = el; }}
              className={clsx(
                "flex flex-col group will-change-transform transform-gpu",
                !isEven ? "md:mt-24" : ""
              )}
            >
              <div className="flex items-center gap-4 mb-2 ml-2">
                <span className="text-[10px] font-mono text-black/40">Project {index + 1}</span>
                {project.projectType === 'personal' ? (
                  <span className="px-3 py-1 rounded-full border border-black/10 text-[11px] font-mono font-bold tracking-wider uppercase bg-white text-black/60">
                    {project.projectType}
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full border border-black text-[11px] font-mono font-bold tracking-wider uppercase bg-black text-white">
                    {project.projectType || 'Enterprise'}
                  </span>
                )}
              </div>
              
              {/* Card Container */}
              <div 
                className="block w-full bg-white rounded-[32px] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.03] transition-transform duration-500 hover:-translate-y-2 relative group"
              >
                {/* Main clickable area for the whole card */}
                <Link to={`/project/${project.id}`} className="absolute inset-0 z-10 rounded-[32px]" aria-label={`View ${project.title} details`} />
                
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
                    
                    {/* Links */}
                    <div className="flex items-center gap-3 relative z-20">
                      {project.liveLink && (
                        <a 
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded-full font-mono text-[10px] tracking-wider uppercase hover:bg-black/80 transition-colors"
                        >
                          Live Site
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17l9.2-9.2M17 17V7H7"/>
                          </svg>
                        </a>
                      )}
                      
                      {/* Project Detail Link Icon */}
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-black/40 group-hover:text-black transition-colors pointer-events-none">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17l9.2-9.2M17 17V7H7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Load More Button */}
      {visibleCount < projects.length && (
        <div className="w-full flex justify-center mt-16 md:mt-32 relative z-20">
          <div ref={loadMoreBtnRef} className="will-change-transform transform-gpu">
            <button 
              onClick={() => setVisibleCount(projects.length)}
              className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-mono text-xs tracking-widest uppercase hover:bg-black/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Load More Work
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
