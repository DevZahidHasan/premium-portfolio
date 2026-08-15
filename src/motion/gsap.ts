import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register plugins globally
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Set default easing and durations for consistent physics
gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
});

// Configure ScrollTrigger defaults
ScrollTrigger.defaults({
  // marker: process.env.NODE_ENV === 'development', // Useful for debugging
});

export { gsap, ScrollTrigger };
