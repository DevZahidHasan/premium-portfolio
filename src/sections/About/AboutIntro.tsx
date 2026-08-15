import React, { useRef } from 'react';
import { gsap } from '../../motion/gsap';
import { useGSAP } from '@gsap/react';
import { Text } from '../../components/Text';
import { aboutData } from '../../data/about';
import { DigitalField } from '../../components/DigitalField';

export const AboutIntro: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current || lineRefs.current.length === 0) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ScrollTrigger = gsap.core.globals().ScrollTrigger as any;

    // 1. Entrance Animation (Triggered when scrolled into view)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%', 
        toggleActions: 'play none none reverse' 
      }
    });

    tl.fromTo(fieldRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: 'power2.inOut' }
    );

    tl.fromTo(labelRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, ease: 'power2.out', duration: 1 },
      "-=1.5"
    );

    // Fade up the lines
    tl.fromTo(lineRefs.current, 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, stagger: 0.1, ease: 'power3.out', duration: 1.5 },
      "-=1.2"
    );

    tl.fromTo(bioRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, ease: 'power2.out', duration: 1 },
      "-=1.0"
    );

    // 2. Spatial Separation (Hero Style) Exit Scrub
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top', 
        end: 'bottom top',
        scrub: true,
      }
    });

    // Dynamically separate lines based on index so it works with any number of lines
    lineRefs.current.forEach((line, i) => {
      if (!line) return;
      const isEven = i % 2 === 0;
      scrollTl.to(line, {
        xPercent: isEven ? -10 - (i * 5) : 10 + (i * 5),
        yPercent: isEven ? -30 : 30,
        opacity: 0,
        ease: 'none'
      }, 0);
    });

    gsap.to(fieldRef.current, {
      y: 100,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Fix conflict: animate the first child instead of the ref itself, and only fade opacity
    if (labelRef.current?.firstElementChild) {
      gsap.to(labelRef.current.firstElementChild, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }

    if (bioRef.current?.firstElementChild) {
      gsap.to(bioRef.current.firstElementChild, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }

  }, []);

  return (
    <section 
      ref={containerRef} 
      className="w-full min-h-[100vh] pt-32 md:pt-48 pb-32 px-page-gutter flex flex-col justify-center relative overflow-hidden"
    >
      {/* Background Graphics (Hero style) */}
      <div ref={fieldRef} className="absolute inset-0 pointer-events-none opacity-50 z-0">
        <DigitalField />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-grid-gap items-center relative z-10">
        
        {/* LEFT: Label (2 cols) */}
        <div className="md:col-span-2 hidden md:block" ref={labelRef}>
          <div className="will-change-transform">
            <Text as="span" variant="mono" className="text-muted text-[11px] uppercase tracking-widest block pt-3">
              {aboutData.eyebrow}
            </Text>
          </div>
        </div>

        {/* CENTER: Massive Separating Statement (7 cols) */}
        <div className="md:col-span-7 lg:col-span-7">
          <h2 
            className="font-display font-bold uppercase tracking-tight text-foreground flex flex-col gap-2"
            style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 1 }} 
          >
            {aboutData.headline.map((line, i) => (
              <span 
                key={i} 
                ref={el => lineRefs.current[i] = el}
                className="block will-change-transform transform-gpu"
              >
                {line}
              </span>
            ))}
          </h2>
        </div>
        
        {/* RIGHT: Professional Bio (3 cols) */}
        <div className="md:col-span-3 lg:col-span-3 mt-12 md:mt-0" ref={bioRef}>
          <div className="flex flex-col gap-6 md:gap-8">
            <p className="font-mono text-sm md:text-base text-foreground/80 leading-relaxed">
              {aboutData.bio}
            </p>
            {aboutData.secondaryBio && (
              <p className="font-mono text-sm md:text-base text-foreground/80 leading-relaxed">
                {aboutData.secondaryBio}
              </p>
            )}
            
            <div className="flex flex-col gap-2 pt-8 border-t border-white/10 mt-auto">
              <Text as="span" variant="mono" className="text-[10px] md:text-[11px] uppercase tracking-widest text-muted/50 block mb-1">
                Location
              </Text>
              <Text as="span" variant="mono" className="text-xs md:text-sm text-foreground/90 block mb-4">
                {aboutData.location}
              </Text>
              
              <Text as="span" variant="mono" className="text-[10px] md:text-[11px] uppercase tracking-widest text-muted/50 block mb-1">
                Availability
              </Text>
              <Text as="span" variant="mono" className="text-xs md:text-sm text-foreground/90 block">
                {aboutData.availability}
              </Text>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
