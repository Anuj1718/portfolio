import { useState, useEffect, useRef } from "react";

const WalkingMascot = () => {
  const [position, setPosition] = useState({ x: 100, y: 0 });
  const [isWalking, setIsWalking] = useState(true);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [frame, setFrame] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const playSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create a cute "boing" sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Cute bounce sound
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
    oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.2);
    
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  // Walking animation
  useEffect(() => {
    if (!isWalking) return;

    const walkInterval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 4);
      setPosition((prev) => {
        const step = direction === "right" ? 2 : -2;
        const newX = prev.x + step;
        
        const maxX = window.innerWidth - 80;
        if (newX >= maxX) {
          setDirection("left");
          return { ...prev, x: maxX };
        } else if (newX <= 20) {
          setDirection("right");
          return { ...prev, x: 20 };
        }
        
        return { ...prev, x: newX };
      });
    }, 120);

    return () => clearInterval(walkInterval);
  }, [isWalking, direction]);

  // Random stops
  useEffect(() => {
    const stopInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setIsWalking(false);
        setTimeout(() => setIsWalking(true), 1500 + Math.random() * 2000);
      }
    }, 4000);

    return () => clearInterval(stopInterval);
  }, []);

  const handleClick = () => {
    playSound();
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 400);
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-16 left-0 right-0 h-16 pointer-events-none z-30"
    >
      <div
        onClick={handleClick}
        className={`absolute bottom-0 cursor-pointer pointer-events-auto transition-transform ${isJumping ? 'animate-bounce' : ''}`}
        style={{
          left: position.x,
          transform: `scaleX(${direction === "left" ? -1 : 1})`,
        }}
      >
        {/* Cute Slime Mascot */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          className="drop-shadow-lg"
        >
          {/* Body - bouncy blob shape */}
          <ellipse
            cx="24"
            cy="32"
            rx={isWalking ? (frame % 2 === 0 ? 18 : 16) : 17}
            ry={isWalking ? (frame % 2 === 0 ? 14 : 16) : 15}
            className="fill-primary"
          />
          
          {/* Highlight/shine */}
          <ellipse
            cx="18"
            cy="26"
            rx="6"
            ry="4"
            className="fill-primary-foreground/30"
          />
          
          {/* Left eye */}
          <ellipse cx="18" cy="30" rx="4" ry="5" className="fill-background" />
          <ellipse cx="19" cy="31" rx="2" ry="2.5" className="fill-foreground" />
          <circle cx="17" cy="29" r="1" className="fill-background" />
          
          {/* Right eye */}
          <ellipse cx="30" cy="30" rx="4" ry="5" className="fill-background" />
          <ellipse cx="31" cy="31" rx="2" ry="2.5" className="fill-foreground" />
          <circle cx="29" cy="29" r="1" className="fill-background" />
          
          {/* Blush marks */}
          <ellipse cx="12" cy="34" rx="3" ry="2" className="fill-pink-300/50" />
          <ellipse cx="36" cy="34" rx="3" ry="2" className="fill-pink-300/50" />
          
          {/* Smile */}
          <path
            d="M 20 36 Q 24 40 28 36"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-foreground"
          />
          
          {/* Little antenna/sprout */}
          <path
            d="M 24 18 Q 26 12 30 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-green-500"
          />
          <circle cx="30" cy="10" r="3" className="fill-green-500" />
          <circle cx="28" cy="8" r="2" className="fill-green-400" />
        </svg>
      </div>
    </div>
  );
};

export default WalkingMascot;
