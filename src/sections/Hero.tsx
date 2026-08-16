import React, { useRef } from 'react';
import { gsap } from '../motion/gsap';
import { useGSAP } from '@gsap/react';
import { Text } from '../components/Text';
import { usePreloader } from '../hooks/usePreloader';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const introLineRef = useRef<HTMLDivElement>(null);
  const zahidRef = useRef<HTMLSpanElement>(null);
  const hasanRef = useRef<HTMLSpanElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const { isPreloaderComplete } = usePreloader();

  useGSAP(() => {
    if (!isPreloaderComplete || !containerRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const matchMediaFine = window.matchMedia('(pointer: fine)').matches;
    const tl = gsap.timeline();

    // ----------------------------------------------------
    // 1. ARRIVAL SEQUENCE (State 01)
    // ----------------------------------------------------
    if (prefersReducedMotion) {
      tl.to([zahidRef.current, hasanRef.current, metadataRef.current, scrollIndicatorRef.current, bgImageRef.current], { 
        opacity: 1, 
        duration: 0.8 
      });
    } else {
      // Background image entrance
      tl.fromTo(bgImageRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.5, ease: 'power2.out' }
      );

      // Left-side margin line entrance (starts thick, shrinks thin, then vanishes)
      if (introLineRef.current) {
        gsap.set(introLineRef.current, { width: '16px', scaleY: 0, opacity: 1 });
        
        // 1. Drop down thick
        tl.to(introLineRef.current, {
          scaleY: 1, 
          duration: 1.0, 
          ease: 'power3.out' 
        }, "-=2.0")
        // 2. Shrink to thin
        .to(introLineRef.current, {
          width: '1px',
          duration: 0.8,
          ease: 'power2.inOut'
        }, "-=0.2")
        // 3. Vanish upward
        .to(introLineRef.current, {
          scaleY: 0,
          opacity: 0,
          transformOrigin: 'bottom',
          duration: 1.0,
          ease: 'power4.inOut'
        }, "+=0.5");
      }

      // Masked reveal for massive typography
      tl.fromTo([zahidRef.current, hasanRef.current], 
        { y: '100%' },
        { y: '0%', duration: 1.6, stagger: 0.1, ease: 'power4.out' },
        "-=2.0" // overlap with background entrance
      );

      // Metadata and Scroll indicator establish
      tl.fromTo([metadataRef.current, scrollIndicatorRef.current],
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' },
        "-=1.0" // overlapping slightly with H1 finish
      );

      // ----------------------------------------------------
      // 2. POINTER PRESENCE (State 02) - Micro Parallax
      // ----------------------------------------------------
      if (matchMediaFine) {
        const xToZahid = gsap.quickTo(zahidRef.current, "x", { duration: 1, ease: "power2.out" });
        const yToZahid = gsap.quickTo(zahidRef.current, "y", { duration: 1, ease: "power2.out" });
        const xToHasan = gsap.quickTo(hasanRef.current, "x", { duration: 1, ease: "power2.out" });
        const yToHasan = gsap.quickTo(hasanRef.current, "y", { duration: 1, ease: "power2.out" });

        const onMouseMove = (e: MouseEvent) => {
          // Calculate normalized pointer position (-1 to 1)
          const normX = (e.clientX / window.innerWidth) * 2 - 1;
          const normY = (e.clientY / window.innerHeight) * 2 - 1;

          // Extremely subtle displacement (1-4px max) to feel physically grounded
          xToZahid(normX * -3);
          yToZahid(normY * -3);
          
          xToHasan(normX * -2); // Slight offset in magnitude for depth
          yToHasan(normY * -2);
        };
        window.addEventListener('mousemove', onMouseMove);
      }

      // ----------------------------------------------------
      // 3. SCROLL TRANSFORMATION (State 03) - Spatial Separation
      // ----------------------------------------------------
      const ScrollTrigger = gsap.core.globals().ScrollTrigger as any;
      
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // ZAHID drifts top-left (-X, -Y)
      scrollTl.to(zahidRef.current, { xPercent: -15, yPercent: -50, opacity: 0, ease: 'none' }, 0);
      
      // HASAN drifts bottom-right (+X, +Y)
      scrollTl.to(hasanRef.current, { xPercent: 15, yPercent: 50, opacity: 0, ease: 'none' }, 0);

      // Metadata dissolve early to clear the canvas
      scrollTl.to([metadataRef.current, scrollIndicatorRef.current], { opacity: 0, ease: 'none', duration: 0.2 }, 0);
    }
    
    return () => {
      // Cleanup logic if needed
    };
  }, [isPreloaderComplete]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100svh] flex flex-col justify-between px-page-gutter pt-32 pb-12 overflow-hidden bg-background"
    >
      {/* LAYER 0: The Photographic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-background">
        <img 
          ref={bgImageRef}
          src="/main.jpg" 
          alt="Zahid Hasan Background" 
          className="w-full h-full object-cover object-[center_40%] will-change-transform transform-gpu"
          style={{ opacity: isPreloaderComplete ? undefined : 0 }}
        />
        {/* Dark overlay to guarantee text readability and app aesthetics */}
        <div className="absolute inset-0 bg-background/70 md:bg-background/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/50" />
      </div>

      {/* Intro Vertical Line */}
      <div 
        ref={introLineRef}
        className="absolute top-0 left-[8vw] md:left-[12vw] h-full bg-white z-20 origin-top pointer-events-none will-change-transform transform-gpu"
        style={{ transform: 'scaleY(0)' }}
      />

      {/* LAYER 1: Support Metadata (Top Left) */}
      <div 
        ref={metadataRef} 
        className="opacity-0 max-w-sm relative z-10 pointer-events-none"
      >
        <Text as="p" variant="mono" className="text-white/80 leading-relaxed uppercase">
          Software Engineer
          <br />
          Systems & Interfaces
        </Text>
      </div>

      {/* LAYER 2: Massive Stacked H1 (Bottom/Center Left) */}
      <div className="relative z-10 flex-1 flex items-end md:items-center mt-12 md:mt-0 pointer-events-none">
        <h1 
          className="font-display font-bold uppercase select-none text-white drop-shadow-lg"
          style={{ 
            fontSize: 'clamp(5rem, 15vw, 15rem)', 
            lineHeight: 0.85,
            letterSpacing: '-0.03em'
          }}
          aria-label="Zahid Hasan"
        >
          {/* ZAHID */}
          <span className="block overflow-hidden relative">
            <span 
              ref={zahidRef} 
              className="block will-change-transform transform-gpu"
              style={{ opacity: isPreloaderComplete ? undefined : 0, transform: 'translateY(100%)' }}
              aria-hidden="true"
            >
              ZAHID
            </span>
          </span>
          {/* HASAN */}
          <span className="block overflow-hidden relative">
            <span 
              ref={hasanRef} 
              className="block will-change-transform transform-gpu"
              style={{ opacity: isPreloaderComplete ? undefined : 0, transform: 'translateY(100%)' }}
              aria-hidden="true"
            >
              HASAN
            </span>
          </span>
        </h1>
      </div>

      {/* LAYER 3: Scroll Indicator (Bottom Right) */}
      <div 
        ref={scrollIndicatorRef}
        className="opacity-0 pb-4 md:pb-8 flex-shrink-0 absolute bottom-12 right-page-gutter z-10"
      >
        <a 
          href="#about" 
          className="group flex flex-col items-center gap-2"
          data-cursor-interact="true"
        >
          <Text as="span" variant="mono" className="text-xs text-white/60 group-hover:text-white transition-colors duration-300">
            SCROLL TO EXPLORE
          </Text>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white animate-scroll-down origin-top" />
          </div>
        </a>
      </div>

    </section>
  );
};
