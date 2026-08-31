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

      const imageContainer = item.querySelector('.project-img-container');
      const img = item.querySelector('img');
      const textContent = item.querySelector('.project-text-content');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });

      if (imageContainer && img) {
        tl.fromTo(imageContainer,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power4.inOut' }
        );
        tl.fromTo(img,
          { scale: 1.3 },
          { scale: 1, duration: 1.5, ease: 'power4.inOut' },
          "<"
        );
      } else {
        // Fallback if classes aren't found
        tl.fromTo(item, 
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
        );
      }

      if (textContent) {
        tl.fromTo(textContent,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          "-=1"
        );
      }
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
              <div className="block w-full transition-transform duration-500 hover:-translate-y-2 relative group">
                
                {/* Image Container - Click to view detail */}
                <Link 
                  to={`/project/${project.id}`} 
                  className="project-img-container block w-full aspect-[4/3] bg-[#F4F4F2] overflow-hidden mb-6 relative"
                  aria-label={`View ${project.title} details`}
                >
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                </Link>

                {/* Text Content */}
                <div className="project-text-content pb-2">
                  <h3 className="font-display font-bold text-2xl text-black mb-2 uppercase tracking-tight">
                    <Link 
                      to={`/project/${project.id}`} 
                      className="hover:underline underline-offset-4 decoration-black/30"
                    >
                      {project.title}
                    </Link>
                  </h3>
                  <p className="font-sans text-sm text-black/60 mb-6 max-w-md">
                    {project.about.substring(0, 80)}...
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.services.split(',').slice(0, 3).map((service, i) => (
                        <span key={i} className="font-mono text-[10px] uppercase tracking-widest font-medium text-black/50 border border-black/10 rounded-sm px-2 py-1">
                          {service.trim()}
                        </span>
                      ))}
                    </div>
                    
                    {/* Links */}
                    <div className="flex items-center gap-3 shrink-0">
                      {project.liveLink && (
                        <a 
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full font-mono text-[10px] tracking-widest uppercase hover:bg-black/80 transition-colors shadow-sm hover:shadow-md"
                        >
                          Live Site
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17l9.2-9.2M17 17V7H7"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* Load More Button inside Grid */}
        {visibleCount < projects.length && (
          <div 
            className={clsx(
              "flex flex-col items-center justify-center w-full min-h-[300px]",
              visibleProjects.length % 2 !== 0 ? "md:mt-24" : ""
            )}
          >
            <div ref={loadMoreBtnRef} className="will-change-transform transform-gpu relative z-20">
              <button 
                onClick={() => setVisibleCount(projects.length)}
                className="group flex flex-col items-center justify-center w-40 h-40 md:w-48 md:h-48 bg-black text-white rounded-full transition-all duration-500 ease-out shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:scale-110 hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] relative overflow-hidden"
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold text-white relative z-10 mb-2">
                  Load More
                </span>
                <span className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-white relative z-10 flex items-center gap-2">
                  Work
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-y-1">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
