import React, { useRef, useState, useEffect } from 'react';
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
  const location = useLocation();
  const navigate = useNavigate();
  
  useGSAP(() => {
    if (!lenis || !navRef.current) return;
    
    // Hide/show logic based on scroll direction
    // We use GSAP ScrollTrigger to easily detect scroll direction
    const showAnim = gsap.from(navRef.current, { 
      yPercent: -100,
      paused: true,
      duration: 0.4,
      ease: 'power3.out'
    }).progress(1);

    gsap.registerPlugin(gsap.core.globals().ScrollTrigger);
    const ScrollTrigger = gsap.core.globals().ScrollTrigger as any;

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self: any) => {
        // Toggle background state based on scroll position
        if (self.scrollY > 50 !== isScrolled) {
          setIsScrolled(self.scrollY > 50);
        }

        // Hide on scroll down, show on scroll up
        if (self.direction === 1 && self.scrollY > 100) {
          showAnim.reverse();
        } else {
          showAnim.play();
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t: any) => t.kill());
    };
  }, [lenis, isScrolled]);

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
      // Wait for React Router to render the Home page and DOM to update
      setTimeout(scrollToTarget, 300);
    } else {
      scrollToTarget();
    }
  };

  return (
    <header 
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-colors duration-500 py-6 px-page-gutter mix-blend-difference",
        isScrolled ? "bg-transparent" : "bg-transparent" // Keeping it transparent, mix-blend-difference handles visibility
      )}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
        
        {/* LEFT / ASYMMETRIC IDENTITY */}
        <div className="flex flex-col cursor-pointer" onClick={() => navigate('/')}>
          <Text as="h1" variant="label" className="font-bold">
            ZAHID HASAN
          </Text>
          <Text as="span" variant="mono" className="text-muted text-[10px] hidden md:block mt-1">
            SOFTWARE ENGINEER // BASED IN BD
          </Text>
        </div>

        {/* RIGHT / LINKS */}
        <nav className="flex items-center gap-8">
          
          <Magnetic strength={0.2}>
            <a 
              href="/#work" 
              onClick={(e) => handleHashLink(e, '#work')}
              className="group relative flex items-center justify-center p-2 -m-2"
            >
              <Text as="span" variant="label" className="text-xs group-hover:text-accent transition-colors">
                WORK
              </Text>
              <span className="absolute bottom-1 left-2 right-2 h-[1px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-smooth" />
            </a>
          </Magnetic>

          <Magnetic strength={0.2}>
            <Link 
              to="/contact"
              className="group relative flex items-center justify-center p-2 -m-2"
            >
              <Text as="span" variant="label" className="text-xs group-hover:text-accent transition-colors">
                CONTACT
              </Text>
              <span className="absolute bottom-1 left-2 right-2 h-[1px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-smooth" />
            </Link>
          </Magnetic>

          <Magnetic strength={0.2}>
            <Link 
              to="/resume"
              className="group relative flex items-center justify-center p-2 -m-2"
            >
              <Text as="span" variant="label" className="text-xs group-hover:text-accent transition-colors">
                RESUME
              </Text>
              <span className="absolute bottom-1 left-2 right-2 h-[1px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-smooth" />
            </Link>
          </Magnetic>

        </nav>
      </div>
    </header>
  );
};
