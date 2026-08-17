import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const projectIndex = projects.findIndex(p => p.id === id);
  const project = projects[projectIndex];
  
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
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
      <div className="w-full min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <h1 className="text-4xl font-display font-bold">Project Not Found</h1>
        <Link to="/" className="mt-8 border border-black px-4 py-2 rounded">Go Home</Link>
      </div>
    );
  }

  // Get 2 other projects for the "More Work" section
  const moreWork = projects.filter(p => p.id !== id).slice(0, 2);

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] pt-32 pb-32 text-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between items-start gap-12 mb-16">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-black/50 mb-4 block">
              Project {String(projectIndex + 1).padStart(2, '0')}
            </span>
            <h1 className="font-display font-bold text-5xl md:text-7xl mb-6">
              {project.title}
            </h1>
            <p className="font-sans text-lg md:text-xl text-black/70 leading-relaxed mb-8">
              {project.about}
            </p>
            {project.liveLink && (
              <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-black text-white rounded-full font-mono text-xs uppercase tracking-widest transition-transform hover:-translate-y-1"
              >
                View Live Site
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17l9.2-9.2M17 17V7H7"/>
                </svg>
              </a>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-12 lg:min-w-[300px]">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-black/50 block mb-2">Role</span>
              <p className="font-sans text-sm font-medium text-black/80">{project.services}</p>
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-black/50 block mb-3">Stack</span>
              <div className="flex flex-wrap gap-2 max-w-[200px]">
                {project.technologies.map(tech => (
                  <span key={tech} className="font-sans text-[11px] font-medium text-black/60 border border-black/10 rounded px-2 py-1 bg-white">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div className="w-full rounded-[32px] overflow-hidden bg-[#F4F4F2] mb-32 relative aspect-[16/9] md:aspect-[21/9]">
          <img 
            src={project.thumbnail} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overview & Goal */}
        <div className="max-w-4xl mx-auto mb-32 flex flex-col gap-24">
          <div>
            <h3 className="font-mono text-sm uppercase tracking-widest text-black/50 mb-6">Overview</h3>
            <p className="font-sans text-lg md:text-xl text-black/80 leading-relaxed">
              {project.overview}
            </p>
          </div>
          
          <div>
            <h3 className="font-mono text-sm uppercase tracking-widest text-black/50 mb-6">Goal</h3>
            <p className="font-sans text-lg md:text-xl text-black/80 leading-relaxed">
              {project.goal}
            </p>
          </div>

          {project.approach && (
            <div>
              <h3 className="font-mono text-sm uppercase tracking-widest text-black/50 mb-6">Approach</h3>
              <p className="font-sans text-lg md:text-xl text-black/80 leading-relaxed">
                {project.approach}
              </p>
            </div>
          )}
        </div>

        {/* Screens Carousel */}
        {(project.screens || project.images) && (project.screens || project.images)!.length > 0 && (
          <div className="w-full mb-48">
            <div className="flex items-center justify-between mb-8 border-b border-black/10 pb-4">
              <h3 className="font-mono text-sm uppercase tracking-widest text-black/50">Screens</h3>
              
              {/* Carousel Navigation Buttons */}
              <div className="flex gap-2">
                <button 
                  onClick={scrollLeft}
                  className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-black/60 hover:bg-black hover:text-white hover:border-black transition-colors"
                  aria-label="Previous screen"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button 
                  onClick={scrollRight}
                  className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-black/60 hover:bg-black hover:text-white hover:border-black transition-colors"
                  aria-label="Next screen"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
                <div key={idx} className="flex-none w-[85%] md:w-[70%] lg:w-[60%] snap-center">
                  <div className="w-full aspect-[16/9] bg-[#F4F4F2] rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.03]">
                    <img src={screen} alt={`Screen ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* More Work */}
        <div className="w-full">
          <h3 className="font-mono text-sm uppercase tracking-widest text-black/50 mb-12 border-b border-black/10 pb-4">More Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {moreWork.map((pw, i) => (
              <Link 
                key={pw.id} 
                to={`/project/${pw.id}`}
                className="block w-full bg-white rounded-[32px] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.03] transition-transform duration-500 hover:-translate-y-2 relative group"
              >
                <div className="w-full aspect-[4/3] rounded-[24px] bg-[#F4F4F2] overflow-hidden mb-6 relative">
                  <img src={pw.thumbnail} alt={pw.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                </div>
                <div className="px-2 pb-2">
                  <h4 className="font-display font-bold text-xl text-black mb-1">{pw.title}</h4>
                  <p className="font-sans text-sm text-black/60 mb-6">{pw.about.substring(0, 60)}...</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {pw.services.split(',').slice(0, 2).map((service, j) => (
                        <span key={j} className="font-sans text-[11px] font-medium text-black/60 border border-black/10 rounded px-2 py-1">
                          {service.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
