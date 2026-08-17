import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { personalInfo } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

export const ContactContainer: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !textRef.current || !linksRef.current) return;

    // Split text for animation
    const text = textRef.current;
    const chars = text.innerText.split('');
    text.innerText = '';
    
    chars.forEach((char) => {
      const span = document.createElement('span');
      span.innerText = char === ' ' ? '\u00A0' : char;
      span.className = 'inline-block will-change-transform transform-gpu translate-y-full opacity-0';
      text.appendChild(span);
    });

    const spans = text.querySelectorAll('span');

    // Create a scroll-triggered timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%', // Start animation when the top of the contact section is 80% down the viewport
        end: 'bottom bottom',
        toggleActions: 'play none none reverse',
      }
    });

    tl.to(spans, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.05,
      ease: 'power4.out',
    })
    .fromTo(linksRef.current, {
      y: 30,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    }, "-=0.8");

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section 
      id="contact"
      ref={containerRef}
      className="relative w-full min-h-[80vh] bg-background text-foreground flex flex-col justify-between pt-32 pb-12 px-page-gutter z-20 overflow-hidden"
    >
      <div className="flex-1 flex flex-col justify-center items-center w-full">
        <p className="font-mono text-sm tracking-widest uppercase text-white/50 mb-8">
          Got a project in mind?
        </p>
        
        <a 
          href={`mailto:${personalInfo.email}`}
          data-cursor-interact="true"
          data-cursor-text="EMAIL"
          className="group block relative"
        >
          <h2 
            ref={textRef}
            className="font-display font-bold text-6xl md:text-[9rem] lg:text-[12rem] text-white leading-none tracking-tighter hover:text-cyan-400 transition-colors duration-500"
          >
            LET'S TALK
          </h2>
        </a>
      </div>

      <div 
        ref={linksRef}
        className="w-full flex flex-col md:flex-row justify-between items-center mt-32 gap-8 border-t border-white/10 pt-8"
      >
        <div className="flex items-center gap-2 font-mono text-xs text-white/50">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          AVAILABLE FOR FREELANCE
        </div>

        <div className="flex items-center gap-8 font-mono text-sm uppercase tracking-widest text-white/70">
          {personalInfo.socials.map((social) => (
            <a 
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              data-cursor-interact="true"
            >
              {social.name}
            </a>
          ))}
          <a 
            href={`mailto:${personalInfo.email}`}
            className="hover:text-white transition-colors"
            data-cursor-interact="true"
          >
            EMAIL
          </a>
        </div>

        <div className="font-mono text-xs text-white/40">
          © {new Date().getFullYear()} {personalInfo.name}
        </div>
      </div>
    </section>
  );
};
