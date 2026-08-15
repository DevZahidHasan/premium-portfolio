import React from 'react';
import { TextReveal } from '../components/TextReveal';
import { Magnetic } from '../components/Magnetic';
import { Hero } from './Hero';

export const FoundationPlayground: React.FC = () => {
  return (
    <>
      <Hero />
      <div className="min-h-screen py-section-spacing px-page-gutter">
      {/* 1. TYPOGRAPHY & TEXT REVEAL QA */}
      <section id="work" className="mb-section-spacing">
        <p className="text-muted text-sm font-mono tracking-widest mb-4 uppercase">01. Typography Foundation</p>
        <TextReveal 
          text="Zahid Hasan\nSoftware Engineer." 
          className="text-fluid-display font-display text-accent mb-8" 
        />
        
        <TextReveal 
          text="Building premium digital products\nand cinematic frontend experiences." 
          className="text-fluid-heading font-heading text-foreground mb-8" 
          delay={0.2}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-grid-gap max-w-4xl">
          <p className="text-fluid-body font-body text-muted leading-relaxed">
            This is Geist, the secondary/UI font. It brings a technical, highly engineered feel that perfectly contrasts the massive Satoshi display typography. It reads well in paragraphs and technical descriptions.
          </p>
          <div className="font-mono text-xs text-muted bg-white/5 p-4 rounded">
            <span className="text-interaction">const</span> architecture = {'{'}
            <br />
            &nbsp;&nbsp;frontend: <span className="text-accent">"React + Vite"</span>,
            <br />
            &nbsp;&nbsp;motion: <span className="text-accent">"GSAP + Lenis"</span>,
            <br />
            {'}'};
          </div>
        </div>
      </section>

      {/* 2. SPACING & GRID QA */}
      <section id="about" className="mb-section-spacing py-20 border-y border-white/10">
        <p className="text-muted text-sm font-mono tracking-widest mb-8 uppercase">02. Fluid Spacing & Grid</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-grid-gap">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="aspect-square bg-white/5 flex items-center justify-center p-4 relative group cursor-none" data-cursor-text="VIEW" data-cursor-expand="true" data-cursor-interact>
              <span className="font-mono text-muted group-hover:text-accent transition-colors duration-500">Col {i}</span>
            </div>
          ))}
        </div>
        <p className="font-mono text-xs text-muted mt-4">
          Hover over the blocks on a desktop device to see the custom cursor expanding with text.
        </p>
      </section>

      {/* 3. MAGNETIC INTERACTION QA */}
      <section id="contact" className="h-[50vh] flex flex-col items-center justify-center">
        <p className="text-muted text-sm font-mono tracking-widest mb-12 uppercase">03. Magnetic Physics</p>
        
        <Magnetic strength={0.4}>
          <button 
            className="w-40 h-40 rounded-full border border-white/20 bg-transparent text-foreground font-body flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-500 relative"
            data-cursor-expand="true"
            data-cursor-interact
          >
            <span className="z-10 relative">Get in touch</span>
          </button>
        </Magnetic>
      </section>
    </div>
    </>
  );
};
