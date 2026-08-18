import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { personalInfo } from '../../data/projects';
import { Magnetic } from '../../components/Magnetic';
import { FloatingCursors } from '../Work/FloatingCursors';

export const ContactContainer: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !infoRef.current) return;

    // Create a timeline for entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.to('.contact-word', {
      y: 0,
      rotate: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
    })
    .fromTo(infoRef.current.children, {
      y: 40,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
    }, "-=0.8");

  }, []);

  // Helper to find specific social link
  const githubLink = personalInfo.socials.find(s => s.name.toLowerCase() === 'github')?.url || '#';
  const linkedinLink = personalInfo.socials.find(s => s.name.toLowerCase() === 'linkedin')?.url || '#';

  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100dvh] bg-[#F8F9FA] text-black flex flex-col justify-between pt-32 pb-8 px-page-gutter z-20 overflow-hidden"
    >
      <FloatingCursors />
      
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full">
        
        <div className="mb-6 md:mb-10 overflow-hidden flex items-center gap-4" ref={el => { if (el) el.style.opacity = '1' }}>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <p className="font-mono text-xs md:text-sm tracking-widest uppercase text-black/50">
            Available for new opportunities
          </p>
        </div>
        
        <h2 
          ref={textRef}
          className="font-display font-bold text-[12vw] md:text-[8rem] lg:text-[9rem] 2xl:text-[10rem] leading-[0.9] tracking-tighter text-black max-w-7xl flex flex-wrap gap-x-4 lg:gap-x-8 mt-2"
        >
          {["Let's", "make", "something", "great."].map((word, i) => (
            <div key={i} className="overflow-hidden pb-2 md:pb-4">
              <span className="contact-word inline-block will-change-transform transform-gpu translate-y-full rotate-[10deg] opacity-0">
                {word}
              </span>
            </div>
          ))}
        </h2>

        <div className="mt-8 md:mt-12">
          <Magnetic strength={0.1}>
            <button 
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-4 md:gap-6 px-6 py-4 md:px-10 md:py-6 rounded-full bg-black text-white group hover:bg-black/90 transition-colors relative overflow-hidden"
              data-cursor-interact="true"
            >
              <span className="font-display text-base sm:text-xl md:text-3xl transition-transform duration-300 group-hover:-translate-y-full absolute inset-0 flex items-center px-6 md:px-10">
                {personalInfo.email}
              </span>
              <span className="font-display text-base sm:text-xl md:text-3xl opacity-0">
                {personalInfo.email}
              </span>
              <span className="font-display text-base sm:text-xl md:text-3xl transition-transform duration-300 translate-y-full group-hover:translate-y-0 absolute inset-0 flex items-center px-6 md:px-10 text-cyan-400">
                {copied ? "Copied!" : "Click to copy"}
              </span>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 z-10 relative">
                {copied ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                )}
              </div>
            </button>
          </Magnetic>
        </div>

      </div>

      <div 
        ref={infoRef}
        className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mt-auto gap-6 md:gap-12 border-t border-black/10 pt-6 md:pt-8"
      >
        <div className="flex flex-col gap-1 md:gap-2 w-full md:w-auto">
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-black/40">Location</p>
          <p className="font-sans text-sm md:text-lg font-medium">Dhaka, Bangladesh</p>
        </div>

        <div className="flex items-center justify-start md:justify-center gap-4 md:gap-6 w-full md:w-auto">
          <Magnetic strength={0.3}>
            <a 
              href={githubLink}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300"
              aria-label="GitHub"
              data-cursor-interact="true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path></svg>
            </a>
          </Magnetic>
          
          <Magnetic strength={0.3}>
            <a 
              href={linkedinLink}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-black/10 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors duration-300"
              aria-label="LinkedIn"
              data-cursor-interact="true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </Magnetic>

          <Magnetic strength={0.3}>
            <a 
              href="https://www.facebook.com/zahid.hasan.437885/"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-black/10 flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors duration-300"
              aria-label="Facebook"
              data-cursor-interact="true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </Magnetic>
        </div>

        <div className="flex flex-col items-start md:items-end gap-1 md:gap-2 w-full md:w-auto">
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-black/40">Local Time</p>
          <p className="font-sans text-sm md:text-lg font-medium tracking-tight">GMT+6</p>
        </div>
      </div>
    </section>
  );
};
