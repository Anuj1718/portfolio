import React from "react";

// Soot Sprite (Susuwatari) - fuzzy black ball with white eyes
const SootSprite = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 40 40" className={className} style={style}>
    {/* Fuzzy body */}
    <circle cx="20" cy="20" r="14" className="fill-foreground/80" />
    {/* Eyes */}
    <circle cx="14" cy="18" r="3" className="fill-background" />
    <circle cx="26" cy="18" r="3" className="fill-background" />
    <circle cx="14" cy="18" r="1.5" className="fill-foreground" />
    <circle cx="26" cy="18" r="1.5" className="fill-foreground" />
    {/* Tiny legs/spikes */}
    <line x1="10" y1="30" x2="8" y2="36" className="stroke-foreground/80" strokeWidth="2" strokeLinecap="round" />
    <line x1="15" y1="32" x2="14" y2="38" className="stroke-foreground/80" strokeWidth="2" strokeLinecap="round" />
    <line x1="25" y1="32" x2="26" y2="38" className="stroke-foreground/80" strokeWidth="2" strokeLinecap="round" />
    <line x1="30" y1="30" x2="32" y2="36" className="stroke-foreground/80" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Floating Leaf
const Leaf = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor">
    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
  </svg>
);

// Magical Dust Particle
const DustParticle = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <div 
    className={`rounded-full bg-primary/60 ${className}`} 
    style={style}
  />
);

// Mini Totoro Silhouette
const MiniTotoro = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 50 60" className={className} style={style} fill="currentColor">
    {/* Ears */}
    <ellipse cx="15" cy="8" rx="6" ry="10" />
    <ellipse cx="35" cy="8" rx="6" ry="10" />
    {/* Body */}
    <ellipse cx="25" cy="38" rx="22" ry="22" />
    {/* Belly */}
    <ellipse cx="25" cy="42" rx="14" ry="12" className="fill-background/30" />
  </svg>
);

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soot Sprites */}
      <SootSprite 
        className="absolute w-8 h-8 animate-wobble" 
        style={{ top: '15%', left: '8%', animationDelay: '0s' }} 
      />
      <SootSprite 
        className="absolute w-6 h-6 animate-wobble" 
        style={{ top: '45%', right: '12%', animationDelay: '0.5s' }} 
      />
      <SootSprite 
        className="absolute w-7 h-7 animate-wobble" 
        style={{ bottom: '25%', left: '5%', animationDelay: '1s' }} 
      />
      <SootSprite 
        className="absolute w-5 h-5 animate-wobble" 
        style={{ top: '70%', right: '8%', animationDelay: '1.5s' }} 
      />

      {/* Floating Leaves */}
      <Leaf 
        className="absolute w-6 h-6 text-primary/50 animate-leaf-fall" 
        style={{ top: '10%', left: '25%', animationDelay: '0s' }} 
      />
      <Leaf 
        className="absolute w-5 h-5 text-primary/40 animate-leaf-fall" 
        style={{ top: '5%', right: '30%', animationDelay: '2s' }} 
      />
      <Leaf 
        className="absolute w-4 h-4 text-primary/30 animate-leaf-fall" 
        style={{ top: '8%', left: '60%', animationDelay: '4s' }} 
      />
      <Leaf 
        className="absolute w-5 h-5 text-primary/45 animate-leaf-fall" 
        style={{ top: '3%', right: '15%', animationDelay: '6s' }} 
      />

      {/* Magical Dust */}
      <DustParticle 
        className="absolute w-2 h-2 animate-sparkle" 
        style={{ top: '20%', left: '15%', animationDelay: '0s' }} 
      />
      <DustParticle 
        className="absolute w-1.5 h-1.5 animate-sparkle" 
        style={{ top: '35%', right: '20%', animationDelay: '0.7s' }} 
      />
      <DustParticle 
        className="absolute w-2 h-2 animate-sparkle" 
        style={{ top: '55%', left: '10%', animationDelay: '1.4s' }} 
      />
      <DustParticle 
        className="absolute w-1.5 h-1.5 animate-sparkle" 
        style={{ bottom: '30%', right: '25%', animationDelay: '2.1s' }} 
      />
      <DustParticle 
        className="absolute w-2 h-2 animate-sparkle" 
        style={{ top: '75%', left: '20%', animationDelay: '2.8s' }} 
      />

      {/* Mini Totoro (subtle easter egg) */}
      <MiniTotoro 
        className="absolute w-12 h-14 text-muted-foreground/15 animate-float-slow" 
        style={{ bottom: '10%', right: '5%' }} 
      />
    </div>
  );
};

export default FloatingElements;
