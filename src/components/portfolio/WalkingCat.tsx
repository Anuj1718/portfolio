import { useState, useEffect, useRef } from "react";

const WalkingCat = () => {
  const [position, setPosition] = useState({ x: 100, y: 0 });
  const [isWalking, setIsWalking] = useState(true);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [frame, setFrame] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const playMeowSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create a more cat-like "meow" sound
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Meow frequency sweep
    oscillator1.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator1.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.1);
    oscillator1.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.3);
    
    oscillator2.frequency.setValueAtTime(650, audioContext.currentTime);
    oscillator2.frequency.exponentialRampToValueAtTime(950, audioContext.currentTime + 0.1);
    oscillator2.frequency.exponentialRampToValueAtTime(550, audioContext.currentTime + 0.3);
    
    oscillator1.type = 'sine';
    oscillator2.type = 'triangle';
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    
    oscillator1.start(audioContext.currentTime);
    oscillator2.start(audioContext.currentTime);
    oscillator1.stop(audioContext.currentTime + 0.4);
    oscillator2.stop(audioContext.currentTime + 0.4);
  };

  // Walking animation
  useEffect(() => {
    if (!isWalking) return;

    const walkInterval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 4);
      setPosition((prev) => {
        const step = direction === "right" ? 3 : -3;
        const newX = prev.x + step;
        
        // Boundary check
        const maxX = window.innerWidth - 60;
        if (newX >= maxX) {
          setDirection("left");
          return { ...prev, x: maxX };
        } else if (newX <= 20) {
          setDirection("right");
          return { ...prev, x: 20 };
        }
        
        return { ...prev, x: newX };
      });
    }, 150);

    return () => clearInterval(walkInterval);
  }, [isWalking, direction]);

  // Random stops
  useEffect(() => {
    const stopInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsWalking(false);
        setTimeout(() => setIsWalking(true), 1000 + Math.random() * 2000);
      }
    }, 3000);

    return () => clearInterval(stopInterval);
  }, []);

  const handleClick = () => {
    playMeowSound();
    // Little jump animation
    setPosition((prev) => ({ ...prev, y: -10 }));
    setTimeout(() => setPosition((prev) => ({ ...prev, y: 0 })), 150);
  };

  return (
    <div
      ref={containerRef}
      className="fixed top-20 left-0 right-0 h-12 pointer-events-none z-40"
    >
      <div
        onClick={handleClick}
        className="absolute top-0 cursor-pointer pointer-events-auto transition-transform duration-150"
        style={{
          left: position.x,
          transform: `translateY(${position.y}px) scaleX(${direction === "left" ? -1 : 1})`,
        }}
      >
        {/* Pixel Cat SVG */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 16 16"
          className="drop-shadow-lg"
          style={{ imageRendering: "pixelated" }}
        >
          {/* Cat body - pixel art style */}
          <g className="fill-primary">
            {/* Ears */}
            <rect x="2" y="1" width="2" height="2" />
            <rect x="10" y="1" width="2" height="2" />
            
            {/* Head */}
            <rect x="2" y="3" width="10" height="5" />
            
            {/* Eyes */}
            <rect x="4" y="4" width="2" height="2" className="fill-background" />
            <rect x="8" y="4" width="2" height="2" className="fill-background" />
            <rect x="5" y="5" width="1" height="1" className="fill-foreground" />
            <rect x="9" y="5" width="1" height="1" className="fill-foreground" />
            
            {/* Nose */}
            <rect x="6" y="6" width="2" height="1" className="fill-pink-400" />
            
            {/* Body */}
            <rect x="3" y="8" width="8" height="4" />
            
            {/* Tail */}
            <rect x="11" y="7" width="2" height="2" />
            <rect x="13" y="6" width="2" height="2" />
            
            {/* Legs - animated */}
            {isWalking ? (
              frame % 2 === 0 ? (
                <>
                  <rect x="4" y="12" width="2" height="3" />
                  <rect x="8" y="12" width="2" height="2" />
                </>
              ) : (
                <>
                  <rect x="4" y="12" width="2" height="2" />
                  <rect x="8" y="12" width="2" height="3" />
                </>
              )
            ) : (
              <>
                <rect x="4" y="12" width="2" height="2" />
                <rect x="8" y="12" width="2" height="2" />
              </>
            )}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default WalkingCat;
