import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { gsap, ScrollTrigger } from '../motion/gsap';
import { useGSAP } from '@gsap/react';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const projectIndex = projects.findIndex(p => p.id === id);
  const project = projects[projectIndex];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const moreWorkRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Premium GSAP Choreography
  useGSAP(() => {
    if (!project || !containerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set('.proj-anim', { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Header Entrance (Title & Metadata)
    tl.fromTo('.proj-badge', 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 0.6 }
    )
    .fromTo('.proj-title-char', 
      { y: '100%', opacity: 0 }, 
      { y: '0%', opacity: 1, duration: 1.1, stagger: 0.03, ease: 'power4.out' },
      '-=0.4'
    )
    .fromTo('.proj-header-content', 
      { opacity: 0, y: 25 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
      '-=0.7'
    );

    // 2. Hero Image Entrance with ScrollTrigger
    if (heroContainerRef.current && heroImgRef.current) {
      gsap.fromTo(heroContainerRef.current,
        { clipPath: 'inset(20% 0% 20% 0%)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.4,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: heroContainerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(heroImgRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          duration: 1.4,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: heroContainerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // 3. Narrative Sections Reveal on Scroll
    if (narrativeRef.current) {
      const rows = narrativeRef.current.querySelectorAll('.narrative-row');
      rows.forEach((row) => {
        gsap.fromTo(row,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }

    // 4. More Work Reveal
    if (moreWorkRef.current) {
      gsap.fromTo(moreWorkRef.current.querySelectorAll('.more-work-card'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: moreWorkRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

  }, { scope: containerRef, dependencies: [id, project] });

  // Handle escape key for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [id]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -(window.innerWidth * 0.6), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: window.innerWidth * 0.6, behavior: 'smooth' });
    }
  };

  if (!project) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] text-black">
        <h1 className="text-4xl font-display font-bold mb-4">Project Not Found</h1>
        <Link to="/" className="border border-black px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  // Get 2 other projects for the "More Work" section
  const moreWork = projects.filter(p => p.id !== id).slice(0, 2);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-[#F8F9FA] pt-28 md:pt-36 pb-32 text-black overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* =======================================================
            HEADER: 12-Column Editorial Grid
        ======================================================= */}
        <div ref={headerRef} className="w-full mb-16 md:mb-24 flex flex-col">
          
          {/* Top Label & Category */}
          <div className="w-full flex items-center justify-between pb-6 mb-4 border-b border-black/10">
            <span className="proj-badge font-mono text-xs uppercase tracking-[0.25em] text-black/50 font-bold">
              Project {String(projectIndex + 1).padStart(2, '0')}
            </span>
            <span className="proj-badge font-mono text-xs uppercase tracking-[0.25em] text-black/50">
              {project.category || project.projectType || 'Case Study'}
            </span>
          </div>

          {/* Massive Display Title */}
          <div className="overflow-hidden py-2 mb-8 md:mb-12">
            <h1 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[7.5vw] leading-[0.88] uppercase tracking-tighter text-black">
              {project.title.split('').map((char, i) => (
                <span key={i} className="proj-title-char inline-block will-change-transform transform-gpu">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>
          </div>
          
          {/* Content & Metadata Split Grid (12 Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 w-full items-start">
            
            {/* Left Col: Lead Description & CTA (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-start w-full">
              <p className="proj-header-content font-sans text-lg md:text-2xl text-black/80 leading-relaxed mb-8 text-left max-w-2xl font-light">
                {project.about}
              </p>
              
              <div className="proj-header-content flex flex-wrap items-center gap-4">
                {project.liveLink && (
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-black text-white rounded-full font-mono text-xs uppercase tracking-widest transition-transform hover:-translate-y-1 hover:shadow-xl hover:bg-black/85"
                  >
                    View Live Site
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17l9.2-9.2M17 17V7H7"/>
                    </svg>
                  </a>
                )}
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 border border-black/20 text-black rounded-full font-mono text-xs uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
                  >
                    Source Code
                  </a>
                )}
              </div>
            </div>

            {/* Right Col: Structured Metadata (5 cols) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full proj-header-content border-t lg:border-t-0 border-black/10 pt-8 lg:pt-0">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 block mb-2 font-bold">
                  Role / Scope
                </span>
                <p className="font-sans text-sm md:text-base font-medium text-black/90 leading-snug">
                  {project.services}
                </p>
              </div>

              {project.year && (
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 block mb-2 font-bold">
                    Timeline
                  </span>
                  <p className="font-sans text-sm md:text-base font-medium text-black/90">
                    {project.year}
                  </p>
                </div>
              )}

              <div className="sm:col-span-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 block mb-3 font-bold">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="font-mono text-[10px] uppercase tracking-wider text-black/70 border border-black/15 bg-white/60 px-3 py-1.5 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* =======================================================
            MAIN HERO IMAGE: Cinematic Widescreen Viewport
        ======================================================= */}
        <div 
          ref={heroContainerRef}
          className="w-full bg-[#EAEAEA] mb-32 relative aspect-[16/9] md:aspect-[21/9] cursor-zoom-in group will-change-transform transform-gpu overflow-hidden border border-black/5"
          onClick={() => setSelectedImage(project.thumbnail)}
        >
          <img 
            ref={heroImgRef}
            src={project.thumbnail} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03] will-change-transform transform-gpu"
          />
          <div className="absolute bottom-4 right-4 bg-black/70 text-white font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
            Click to Expand
          </div>
        </div>

        {/* =======================================================
            NARRATIVE SECTIONS: Overview, Goal, Architecture
        ======================================================= */}
        <div ref={narrativeRef} className="w-full max-w-7xl mb-32 flex flex-col gap-16 md:gap-24">
          
          {/* Overview */}
          {project.overview && (
            <div className="narrative-row grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 pt-8 border-t border-black/10">
              <div className="lg:col-span-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-black/40 font-bold block">
                  01 / Overview
                </span>
              </div>
              <div className="lg:col-span-8">
                <p className="font-sans text-base md:text-xl text-black/80 leading-relaxed text-left">
                  {project.overview}
                </p>
              </div>
            </div>
          )}

          {/* Goal */}
          {project.goal && (
            <div className="narrative-row grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 pt-8 border-t border-black/10">
              <div className="lg:col-span-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-black/40 font-bold block">
                  02 / Objectives & Goal
                </span>
              </div>
              <div className="lg:col-span-8">
                <p className="font-sans text-base md:text-xl text-black/80 leading-relaxed text-left">
                  {project.goal}
                </p>
              </div>
            </div>
          )}

          {/* Approach / Architecture */}
          {project.approach && (
            <div className="narrative-row grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 pt-8 border-t border-black/10">
              <div className="lg:col-span-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-black/40 font-bold block">
                  03 / Architecture & Approach
                </span>
              </div>
              <div className="lg:col-span-8">
                <p className="font-sans text-base md:text-xl text-black/80 leading-relaxed text-left">
                  {project.approach}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* =======================================================
            SCREENS CAROUSEL: Project Showcase
        ======================================================= */}
        {(project.screens || project.images) && (project.screens || project.images)!.length > 0 && (
          <div className="w-full mb-48">
            <div className="flex items-center justify-between mb-8 border-b border-black/10 pb-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-black/40 font-bold">
                04 / Visual Records
              </span>
              
              {/* Carousel Controls */}
              <div className="flex gap-2">
                <button 
                  onClick={scrollLeft}
                  className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center text-black/60 hover:bg-black hover:text-white transition-colors"
                  aria-label="Previous screen"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button 
                  onClick={scrollRight}
                  className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center text-black/60 hover:bg-black hover:text-white transition-colors"
                  aria-label="Next screen"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div 
              ref={carouselRef}
              className="w-full flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar cursor-grab active:cursor-grabbing" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
              `}</style>
              {(project.screens || project.images)!.map((screen, idx) => (
                <div key={idx} className="flex-none w-[88%] md:w-[75%] lg:w-[65%] snap-center">
                  <div 
                    className="w-full aspect-[16/9] bg-[#EAEAEA] overflow-hidden border border-black/10 cursor-zoom-in group relative"
                    onClick={() => setSelectedImage(screen)}
                  >
                    <img 
                      src={screen} 
                      alt={`Screen ${idx + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =======================================================
            MORE WORK: Clean Editorial Gallery
        ======================================================= */}
        <div ref={moreWorkRef} className="w-full border-t border-black/10 pt-16">
          <div className="flex items-center justify-between mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-black/40 font-bold">
              05 / Selected Projects
            </span>
            <Link 
              to="/" 
              className="font-mono text-xs uppercase tracking-widest text-black hover:underline"
            >
              All Projects &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {moreWork.map((pw) => (
              <Link 
                key={pw.id} 
                to={`/project/${pw.id}`}
                className="more-work-card block w-full transition-transform duration-500 hover:-translate-y-2 relative group"
              >
                <div className="w-full aspect-[4/3] bg-[#EAEAEA] overflow-hidden mb-6 relative border border-black/5">
                  <img 
                    src={pw.thumbnail} 
                    alt={pw.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
                  />
                </div>
                <div className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display font-bold text-2xl md:text-3xl text-black uppercase tracking-tight group-hover:text-black/80 transition-colors">
                      {pw.title}
                    </h4>
                    <span className="font-mono text-xs text-black/40 uppercase tracking-widest">
                      {pw.year || '2025'}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-black/60 mb-4 max-w-md line-clamp-2">
                    {pw.about}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pw.services.split(',').slice(0, 3).map((service, j) => (
                      <span key={j} className="font-mono text-[10px] uppercase tracking-widest font-medium text-black/50 border border-black/10 rounded-sm px-2.5 py-1">
                        {service.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* =======================================================
          LIGHTBOX: Fullscreen Image View
      ======================================================= */}
      <div 
        className={clsx(
          "fixed inset-0 z-[100] flex items-center justify-center bg-[#F8F9FA]/95 backdrop-blur-xl transition-all duration-500 cursor-zoom-out",
          selectedImage ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSelectedImage(null)}
      >
        <div 
          className={clsx(
            "relative w-full h-full max-w-[92vw] max-h-[92vh] p-4 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            selectedImage ? "scale-100 translate-y-0 opacity-100" : "scale-[0.95] translate-y-8 opacity-0"
          )}
        >
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Fullscreen view" 
              className="max-w-full max-h-full object-contain rounded-none shadow-2xl border border-black/10"
            />
          )}
          
          <button 
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-black text-white rounded-full hover:bg-black/80 transition-colors shadow-lg"
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            aria-label="Close fullscreen"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
