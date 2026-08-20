import React, { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from '../motion/gsap';
import { useGSAP } from '@gsap/react';
import { useLenis } from '../hooks/useLenis';
import { Magnetic } from './Magnetic';
import { Text } from './Text';
import { cn } from '../utils/cn';

export const Navigation: React.FC = () => {
  const { lenis } = useLenis();
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navTheme, setNavTheme] = useState<'light' | 'dark'>('light'); // light = white bg, dark = black bg
  const location = useLocation();
  const navigate = useNavigate();
  
  useGSAP(() => {
    if (!lenis || !navRef.current) return;
    
    // Hide/show logic based on scroll direction
    const showAnim = gsap.from(navRef.current, { 
      yPercent: -100,
      paused: true,
      duration: 0.4,
      ease: 'power3.out'
    }).progress(1);

    gsap.registerPlugin((gsap as any).core.globals().ScrollTrigger);
    const ScrollTrigger = (gsap as any).core.globals().ScrollTrigger as any;

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self: any) => {
        if (self.scrollY > 50 !== isScrolled) {
          setIsScrolled(self.scrollY > 50);
        }

        if (self.direction === 1 && self.scrollY > 100) {
          showAnim.reverse();
        } else {
          showAnim.play();
        }
      }
    });

    // Robust scroll-based theme switching
    const handleScrollTheme = () => {
      let isOverLight = false;
      const lightSections = document.querySelectorAll('[data-theme="light"]');
      
      lightSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // The navbar is roughly 50px tall. We check if the section overlaps the navbar's space.
        if (rect.top <= 60 && rect.bottom >= 60) {
          isOverLight = true;
        }
      });
      
      setNavTheme(isOverLight ? 'dark' : 'light');
    };

    // Run once on mount and attach to scroll
    handleScrollTheme();
    window.addEventListener('scroll', handleScrollTheme, { passive: true });
    
    // Also attach to Lenis if available since it handles smooth scrolling
    if (lenis) {
      lenis.on('scroll', handleScrollTheme);
    }

    return () => {
      window.removeEventListener('scroll', handleScrollTheme);
      if (lenis) {
        lenis.off('scroll', handleScrollTheme);
      }
    };
  }, [lenis, location.pathname]);

  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    
    const scrollToTarget = () => {
      const el = document.querySelector(target) as HTMLElement;
      if (el) {
        if (lenis) {
          lenis.scrollTo(el, { offset: 0, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollToTarget, 300);
    } else {
      scrollToTarget();
    }
  };

  return (
    <header 
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 w-full z-50 py-3 md:py-4 px-page-gutter transition-colors duration-500",
        navTheme === 'light' ? "bg-white text-black shadow-sm" : "bg-black text-white"
      )}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0">
        
        {/* LEFT / ASYMMETRIC IDENTITY */}
        <div className="flex flex-col cursor-pointer" onClick={() => navigate('/')}>
          <Text as="h1" variant="label" className={cn("font-bold transition-colors duration-500", navTheme === 'light' ? "text-black" : "text-white")}>
            ZAHID HASAN
          </Text>
          <Text as="span" variant="mono" className={cn("text-[10px] hidden md:block mt-1 transition-colors duration-500", navTheme === 'light' ? "text-black/60" : "text-white/60")}>
            SOFTWARE ENGINEER // BASED IN BD
          </Text>
        </div>

        {/* RIGHT / LINKS */}
        <nav className="flex flex-wrap items-center gap-4 md:gap-8 mt-2 md:mt-0">
          
          <Magnetic strength={0.2}>
            <a 
              href="/#work" 
              onClick={(e) => handleHashLink(e, '#work')}
              className="group relative flex items-center justify-center p-2 -m-2"
            >
              <Text as="span" variant="label" className={cn("text-xs transition-colors duration-500", navTheme === 'light' ? "text-black group-hover:text-black/70" : "text-white group-hover:text-white/70")}>
                WORK
              </Text>
              <span className={cn("absolute bottom-1 left-2 right-2 h-[1px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-smooth", navTheme === 'light' ? "bg-black" : "bg-white")} />
            </a>
          </Magnetic>

          <Magnetic strength={0.2}>
            <Link 
              to="/contact"
              className="group relative flex items-center justify-center p-2 -m-2"
            >
              <Text as="span" variant="label" className={cn("text-xs transition-colors duration-500", navTheme === 'light' ? "text-black group-hover:text-black/70" : "text-white group-hover:text-white/70")}>
                CONTACT
              </Text>
              <span className={cn("absolute bottom-1 left-2 right-2 h-[1px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-smooth", navTheme === 'light' ? "bg-black" : "bg-white")} />
            </Link>
          </Magnetic>

          <Magnetic strength={0.2}>
            <Link 
              to="/resume"
              className="group relative flex items-center justify-center p-2 -m-2"
            >
              <Text as="span" variant="label" className={cn("text-xs transition-colors duration-500", navTheme === 'light' ? "text-black group-hover:text-black/70" : "text-white group-hover:text-white/70")}>
                RESUME
              </Text>
              <span className={cn("absolute bottom-1 left-2 right-2 h-[1px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-smooth", navTheme === 'light' ? "bg-black" : "bg-white")} />
            </Link>
          </Magnetic>

        </nav>
      </div>
    </header>
  );
};
