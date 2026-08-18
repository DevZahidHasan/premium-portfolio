import React, { useRef, useMemo } from 'react';
import { gsap } from '../motion/gsap';
import { useGSAP } from '@gsap/react';

interface NodeData {
  id: number;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

export const DigitalField: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Generate a sparse, static network of exactly 20 nodes
  const nodes = useMemo<NodeData[]>(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80, // Keep slightly away from extreme edges
      y: 10 + Math.random() * 80,
    }));
  }, []);

  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !svgRef.current) return;

    // 1. Slow inherent drift
    nodeRefs.current.forEach((node) => {
      if (!node) return;
      gsap.to(node, {
        x: `+=${(Math.random() - 0.5) * 30}`,
        y: `+=${(Math.random() - 0.5) * 30}`,
        duration: 10 + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    // 2. Gravitational influence from pointer
    const matchMedia = window.matchMedia('(pointer: fine)');
    if (!matchMedia.matches) return;

    // Create QuickTo instances for highly performant updates
    const quickTos = nodeRefs.current.map(node => {
      if (!node) return null;
      return {
        x: gsap.quickTo(node, "x", { duration: 0.8, ease: "power2.out" }),
        y: gsap.quickTo(node, "y", { duration: 0.8, ease: "power2.out" })
      };
    });

    const onMouseMove = (e: MouseEvent) => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      e.clientX - rect.left;
      e.clientY - rect.top;

      nodeRefs.current.forEach((node, i) => {
        if (!node || !quickTos[i]) return;
        
        // Get absolute position of node within SVG (approximated via percentages for simplicity, 
        // but for exact distance we get bounding box).
        // A simpler performant approach: we know nodes are absolutely positioned via % in SVG.
        // We calculate distance based on the node's original client coordinates.
        const nodeRect = node.getBoundingClientRect();
        const nodeAbsX = nodeRect.left + nodeRect.width / 2;
        const nodeAbsY = nodeRect.top + nodeRect.height / 2;

        const dx = e.clientX - nodeAbsX;
        const dy = e.clientY - nodeAbsY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 200px radius of influence
        if (distance < 200) {
          // Pull fraction: closer = stronger pull (max 20px displacement)
          const pull = (1 - distance / 200) * 20; 
          
          // Current offset applied by quickTo
          // We apply the offset relative to its drifting position
          const angle = Math.atan2(dy, dx);
          quickTos[i]!.x(Math.cos(angle) * pull);
          quickTos[i]!.y(Math.sin(angle) * pull);
        } else {
          // Release
          quickTos[i]!.x(0);
          quickTos[i]!.y(0);
        }
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      data-cursor-proximity="true"
    >
      <svg 
        ref={svgRef} 
        className="w-full h-full opacity-30" 
        style={{ filter: 'blur(0.5px)' }} // Adds slight atmospheric depth
      >
        {/* Draw subtle connections between nodes (optional, but requested architecture feel) */}
        {nodes.map((node, i) => {
          // Connect to next 2 nodes to create a sparse web
          const target1 = nodes[(i + 1) % nodes.length];
          const target2 = nodes[(i + 2) % nodes.length];
          
          return (
            <g key={`group-${node.id}`}>
              <line 
                x1={`${node.x}%`} y1={`${node.y}%`}
                x2={`${target1.x}%`} y2={`${target1.y}%`}
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="0.5"
              />
              <line 
                x1={`${node.x}%`} y1={`${node.y}%`}
                x2={`${target2.x}%`} y2={`${target2.y}%`}
                stroke="rgba(255, 255, 255, 0.03)"
                strokeWidth="0.5"
              />
              <circle
                ref={(el) => { nodeRefs.current[i] = el; }}
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r="1.5"
                fill="rgba(255, 255, 255, 0.15)"
                className="will-change-transform"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
