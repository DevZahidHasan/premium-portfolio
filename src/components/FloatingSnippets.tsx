import React, { useRef, useMemo } from 'react';
import { gsap } from '../motion/gsap';
import { useGSAP } from '@gsap/react';

// VS Code Dark Theme Colors
const C = {
  kw: '#569CD6', // Keyword
  fn: '#DCDCAA', // Function
  vr: '#9CDCFE', // Variable
  ty: '#4EC9B0', // Type
  st: '#CE9178', // String
  pu: '#D4D4D4', // Punctuation
  tg: '#569CD6', // JSX Tag
  nm: '#B5CEA8', // Number
};

type ColorKey = keyof typeof C;
type Token = { t: string; c: ColorKey };

const SNIPPETS: Token[][] = [
  [{ t: "const ", c: "kw" }, { t: "[", c: "pu" }, { t: "state", c: "vr" }, { t: ", ", c: "pu" }, { t: "setState", c: "fn" }, { t: "] = ", c: "pu" }, { t: "useState", c: "fn" }, { t: "(", c: "pu" }, { t: "null", c: "kw" }, { t: ");", c: "pu" }],
  [{ t: "useEffect", c: "fn" }, { t: "(() => { subscribe(); }, []);", c: "pu" }],
  [{ t: "export const ", c: "kw" }, { t: "Hero", c: "fn" }, { t: ": ", c: "pu" }, { t: "React.FC", c: "ty" }, { t: " = () => {", c: "pu" }],
  [{ t: "<", c: "pu" }, { t: "div ", c: "tg" }, { t: "className", c: "vr" }, { t: "=", c: "pu" }, { t: "\"absolute inset-0 z-0\"", c: "st" }, { t: " />", c: "pu" }],
  [{ t: "gsap", c: "vr" }, { t: ".", c: "pu" }, { t: "fromTo", c: "fn" }, { t: "(", c: "pu" }, { t: "ref.current", c: "vr" }, { t: ", { y: ", c: "pu" }, { t: "100", c: "nm" }, { t: " }, { y: ", c: "pu" }, { t: "0", c: "nm" }, { t: " });", c: "pu" }],
  [{ t: "function ", c: "kw" }, { t: "optimizeRender", c: "fn" }, { t: "(", c: "pu" }, { t: "nodes", c: "vr" }, { t: ": ", c: "pu" }, { t: "Node", c: "ty" }, { t: "[]) { ... }", c: "pu" }],
  [{ t: "interface ", c: "kw" }, { t: "Props ", c: "ty" }, { t: "{ ", c: "pu" }, { t: "children", c: "vr" }, { t: ": ", c: "pu" }, { t: "ReactNode", c: "ty" }, { t: "; }", c: "pu" }],
  [{ t: "import { ", c: "kw" }, { t: "useGSAP", c: "vr" }, { t: " } from ", c: "kw" }, { t: "'@gsap/react'", c: "st" }, { t: ";", c: "pu" }],
  [{ t: "const ", c: "kw" }, { t: "data", c: "vr" }, { t: " = ", c: "pu" }, { t: "await ", c: "kw" }, { t: "fetchMetrics", c: "fn" }, { t: "();", c: "pu" }],
  [{ t: "type ", c: "kw" }, { t: "AppState", c: "ty" }, { t: " = ", c: "pu" }, { t: "Readonly", c: "ty" }, { t: "<{ ", c: "pu" }, { t: "user", c: "vr" }, { t: ": ", c: "pu" }, { t: "User", c: "ty" }, { t: " }>;", c: "pu" }],
  [{ t: "const ", c: "kw" }, { t: "tl", c: "vr" }, { t: " = ", c: "pu" }, { t: "gsap", c: "vr" }, { t: ".", c: "pu" }, { t: "timeline", c: "fn" }, { t: "({ scrub: ", c: "pu" }, { t: "true", c: "kw" }, { t: " });", c: "pu" }],
  [{ t: "<", c: "pu" }, { t: "Text ", c: "tg" }, { t: "variant", c: "vr" }, { t: "=", c: "pu" }, { t: "\"mono\"", c: "st" }, { t: ">", c: "pu" }, { t: "ENGINEERING", c: "pu" }, { t: "</", c: "pu" }, { t: "Text", c: "tg" }, { t: ">", c: "pu" }],
  [{ t: "return ", c: "kw" }, { t: "<", c: "pu" }, { t: "DigitalField ", c: "ty" }, { t: "data", c: "vr" }, { t: "=", c: "pu" }, { t: "{", c: "pu" }, { t: "metrics", c: "vr" }, { t: "}", c: "pu" }, { t: " />;", c: "pu" }],
  [{ t: "const ", c: "kw" }, { t: "ScrollTrigger", c: "ty" }, { t: " = ", c: "pu" }, { t: "gsap", c: "vr" }, { t: ".", c: "pu" }, { t: "core", c: "vr" }, { t: ".", c: "pu" }, { t: "globals", c: "fn" }, { t: "().", c: "pu" }, { t: "ScrollTrigger", c: "vr" }, { t: ";", c: "pu" }],
];

export const FloatingSnippets: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const snippetsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Generate random data for snippets (position, text, timing)
  const snippetData = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const isLeftZone = Math.random() > 0.5;
      const leftPos = isLeftZone 
        ? 2 + Math.random() * 20 
        : 75 + Math.random() * 20;

      return {
        id: i,
        tokens: SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)],
        top: 2 + Math.random() * 95,
        left: leftPos,
        delay: Math.random() * 6,
        duration: 2 + Math.random() * 4,
      };
    });
  }, []);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    snippetsRef.current.forEach((snippet, i) => {
      if (!snippet) return;
      const data = snippetData[i];
      
      gsap.fromTo(snippet, 
        { opacity: 0, y: 15 },
        {
          opacity: 0.9,
          y: -20,
          duration: data.duration,
          delay: data.delay,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        }
      );
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
      {snippetData.map((data, i) => (
        <div
          key={data.id}
          ref={(el) => { snippetsRef.current[i] = el; }}
          className="absolute font-mono text-[9px] md:text-[11px] tracking-widest whitespace-pre will-change-transform transform-gpu flex flex-row"
          style={{ 
            top: `${data.top}%`, 
            left: `${data.left}%`, 
            opacity: 0,
            padding: '4px 8px',
          }}
        >
          {data.tokens.map((token, j) => (
            <span key={j} style={{ color: C[token.c] }}>
              {token.t}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};
