import { useState, useEffect, useCallback } from "react";

const WalkingPikachu = () => {
  const [position, setPosition] = useState({ x: 100 });
  const [isWalking, setIsWalking] = useState(true);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [frame, setFrame] = useState(0);
  const [action, setAction] = useState<"idle" | "jump" | "wave" | "shock">("idle");

  const playPikaSound = useCallback(() => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // "Pi" sound
    const osc1 = audioContext.createOscillator();
    const gain1 = audioContext.createGain();
    osc1.connect(gain1);
    gain1.connect(audioContext.destination);
    
    osc1.frequency.setValueAtTime(800, audioContext.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.08);
    osc1.type = 'sine';
    
    gain1.gain.setValueAtTime(0.2, audioContext.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.12);
    
    osc1.start(audioContext.currentTime);
    osc1.stop(audioContext.currentTime + 0.12);

    // "Ka" sound
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.connect(gain2);
    gain2.connect(audioContext.destination);
    
    osc2.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    osc2.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.18);
    osc2.type = 'sine';
    
    gain2.gain.setValueAtTime(0.18, audioContext.currentTime + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
    
    osc2.start(audioContext.currentTime + 0.1);
    osc2.stop(audioContext.currentTime + 0.25);
  }, []);

  // Walking animation
  useEffect(() => {
    if (!isWalking) return;

    const walkInterval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 4);
      setPosition((prev) => {
        const step = direction === "right" ? 2 : -2;
        const newX = prev.x + step;
        
        const maxX = window.innerWidth - 60;
        if (newX >= maxX) {
          setDirection("left");
          return { x: maxX };
        } else if (newX <= 20) {
          setDirection("right");
          return { x: 20 };
        }
        
        return { x: newX };
      });
    }, 100);

    return () => clearInterval(walkInterval);
  }, [isWalking, direction]);

  // Random stops
  useEffect(() => {
    const stopInterval = setInterval(() => {
      if (Math.random() > 0.7 && action === "idle") {
        setIsWalking(false);
        setTimeout(() => setIsWalking(true), 1500 + Math.random() * 2500);
      }
    }, 3000);

    return () => clearInterval(stopInterval);
  }, [action]);

  const handleClick = () => {
    playPikaSound();
    setIsWalking(false);
    
    // Random action
    const actions: ("jump" | "wave" | "shock")[] = ["jump", "wave", "shock"];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    setAction(randomAction);
    
    setTimeout(() => {
      setAction("idle");
      setIsWalking(true);
    }, randomAction === "shock" ? 800 : 500);
  };

  // Calculate animation offsets
  const jumpOffset = action === "jump" ? -15 : 0;
  const waveRotation = action === "wave" ? Math.sin(Date.now() / 100) * 10 : 0;

  return (
    <div className="fixed bottom-20 left-0 right-0 h-16 pointer-events-none z-30">
      {/* Electric sparks when shocking */}
      {action === "shock" && (
        <>
          <div
            className="absolute pointer-events-none animate-pulse"
            style={{ left: position.x - 10, bottom: 30 }}
          >
            <svg width="20" height="24" viewBox="0 0 20 24">
              <path d="M10 0 L14 10 L10 8 L12 24 L6 12 L10 14 Z" className="fill-yellow-300" />
            </svg>
          </div>
          <div
            className="absolute pointer-events-none animate-pulse"
            style={{ left: position.x + 40, bottom: 35 }}
          >
            <svg width="16" height="20" viewBox="0 0 20 24">
              <path d="M10 0 L14 10 L10 8 L12 24 L6 12 L10 14 Z" className="fill-yellow-300" />
            </svg>
          </div>
        </>
      )}
      
      <div
        onClick={handleClick}
        className="absolute bottom-0 cursor-pointer pointer-events-auto transition-transform"
        style={{
          left: position.x,
          transform: `scaleX(${direction === "left" ? -1 : 1}) translateY(${jumpOffset}px) rotate(${waveRotation}deg)`,
        }}
      >
        {/* Cute Pikachu SVG */}
        <svg
          width="44"
          height="48"
          viewBox="0 0 44 48"
          className="drop-shadow-md"
        >
          {/* Left Ear */}
          <path
            d="M 10 18 L 5 2 L 16 14 Z"
            className="fill-yellow-400"
          />
          <path
            d="M 6 4 L 5 2 L 8 7 Z"
            className="fill-foreground"
          />
          
          {/* Right Ear */}
          <path
            d="M 34 18 L 39 2 L 28 14 Z"
            className="fill-yellow-400"
          />
          <path
            d="M 38 4 L 39 2 L 36 7 Z"
            className="fill-foreground"
          />
          
          {/* Head */}
          <ellipse cx="22" cy="22" rx="14" ry="12" className="fill-yellow-400" />
          
          {/* Eyes - blink occasionally */}
          {frame === 3 ? (
            <>
              <path d="M 12 20 L 18 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-foreground" />
              <path d="M 26 20 L 32 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-foreground" />
            </>
          ) : (
            <>
              <ellipse cx="16" cy="20" rx="3" ry="3.5" className="fill-foreground" />
              <ellipse cx="28" cy="20" rx="3" ry="3.5" className="fill-foreground" />
              <circle cx="15" cy="19" r="1.2" className="fill-background" />
              <circle cx="27" cy="19" r="1.2" className="fill-background" />
            </>
          )}
          
          {/* Red cheeks */}
          <ellipse cx="8" cy="24" rx="3.5" ry="2.5" className="fill-red-400" />
          <ellipse cx="36" cy="24" rx="3.5" ry="2.5" className="fill-red-400" />
          
          {/* Nose */}
          <ellipse cx="22" cy="23" rx="1.5" ry="1" className="fill-foreground" />
          
          {/* Mouth - changes with action */}
          {action === "shock" ? (
            <ellipse cx="22" cy="27" rx="3" ry="2" className="fill-foreground" />
          ) : (
            <path
              d="M 19 26 Q 22 29 25 26"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              className="text-foreground"
            />
          )}
          
          {/* Body */}
          <ellipse cx="22" cy="38" rx="11" ry="9" className="fill-yellow-400" />
          
          {/* Belly */}
          <ellipse cx="22" cy="39" rx="7" ry="6" className="fill-yellow-300" />
          
          {/* Left Arm - waves when waving */}
          <ellipse 
            cx="11" 
            cy="36" 
            rx="3" 
            ry="5" 
            className="fill-yellow-400"
            style={{ 
              transform: action === "wave" ? `rotate(${-60 + Math.sin(Date.now() / 80) * 20}deg)` : 'rotate(-20deg)', 
              transformOrigin: '11px 36px' 
            }}
          />
          
          {/* Right Arm */}
          <ellipse 
            cx="33" 
            cy="36" 
            rx="3" 
            ry="5" 
            className="fill-yellow-400"
            style={{ transform: 'rotate(20deg)', transformOrigin: '33px 36px' }}
          />
          
          {/* Legs - animate when walking */}
          <ellipse 
            cx={isWalking ? (frame % 2 === 0 ? 17 : 19) : 18} 
            cy="46" 
            rx="4" 
            ry="3" 
            className="fill-yellow-400"
          />
          <ellipse 
            cx={isWalking ? (frame % 2 === 0 ? 27 : 25) : 26} 
            cy="46" 
            rx="4" 
            ry="3" 
            className="fill-yellow-400"
          />
          
          {/* Tail (lightning bolt shape) */}
          <path
            d="M 34 32 L 42 26 L 39 31 L 44 28 L 36 38 L 39 33 L 34 36 Z"
            className="fill-yellow-500"
          />
          <path
            d="M 36 30 L 40 27"
            fill="none"
            strokeWidth="1"
            className="stroke-yellow-600"
          />
        </svg>
      </div>
    </div>
  );
};

export default WalkingPikachu;
