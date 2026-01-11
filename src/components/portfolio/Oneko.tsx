import { useEffect, useRef, useCallback, useState } from "react";

// Oneko - Cat that follows mouse cursor
// Based on https://github.com/adryd325/oneko.js
// Modified for React with kuroneko support

const Oneko = () => {
  const nekoRef = useRef<HTMLDivElement>(null);
  const meowAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isKuroneko, setIsKuroneko] = useState(() => {
    try {
      const saved = localStorage.getItem("oneko:kuroneko");
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  // Initialize meow sound
  useEffect(() => {
    meowAudioRef.current = new Audio("/meow.wav");
    meowAudioRef.current.volume = 0.3;
  }, []);

  const playMeow = useCallback(() => {
    if (meowAudioRef.current) {
      meowAudioRef.current.currentTime = 0;
      meowAudioRef.current.play().catch(() => {});
    }
  }, []);

  // Handle kuroneko toggle
  const toggleKuroneko = useCallback(() => {
    setIsKuroneko((prev: boolean) => {
      const newValue = !prev;
      localStorage.setItem("oneko:kuroneko", JSON.stringify(newValue));
      return newValue;
    });
    playMeow();
  }, [playMeow]);

  useEffect(() => {
    const nekoEl = nekoRef.current;
    if (!nekoEl) return;

    let nekoPosX = 32;
    let nekoPosY = 32;
    let mousePosX = 0;
    let mousePosY = 0;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: string | null = null;
    let idleAnimationFrame = 0;
    let grabbing = false;
    let grabStop = true;
    let nudge = false;

    const nekoSpeed = 10;

    const spriteSets: { [key: string]: number[][] } = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [
        [-5, 0],
        [-6, 0],
        [-7, 0],
      ],
      scratchWallN: [
        [0, 0],
        [0, -1],
      ],
      scratchWallS: [
        [-7, -1],
        [-6, -2],
      ],
      scratchWallE: [
        [-2, -2],
        [-2, -3],
      ],
      scratchWallW: [
        [-4, 0],
        [-4, -1],
      ],
      tired: [[-3, -2]],
      sleeping: [
        [-2, 0],
        [-2, -1],
      ],
      N: [
        [-1, -2],
        [-1, -3],
      ],
      NE: [
        [0, -2],
        [0, -3],
      ],
      E: [
        [-3, 0],
        [-3, -1],
      ],
      SE: [
        [-5, -1],
        [-5, -2],
      ],
      S: [
        [-6, -3],
        [-7, -2],
      ],
      SW: [
        [-5, -3],
        [-6, -1],
      ],
      W: [
        [-4, -2],
        [-4, -3],
      ],
      NW: [
        [-1, 0],
        [-1, -1],
      ],
    };

    function getSprite(name: string, frame: number) {
      return spriteSets[name][frame % spriteSets[name].length];
    }

    function setSprite(name: string, frame: number) {
      const sprite = getSprite(name, frame);
      nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }

    function resetIdleAnimation() {
      idleAnimation = null;
      idleAnimationFrame = 0;
    }

    function idle() {
      idleTime += 1;

      // Every ~20 seconds
      if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation === null) {
        const availableIdleAnimations: string[] = ["sleeping", "scratchSelf"];
        if (nekoPosX < 32) {
          availableIdleAnimations.push("scratchWallW");
        }
        if (nekoPosY < 32) {
          availableIdleAnimations.push("scratchWallN");
        }
        if (nekoPosX > window.innerWidth - 32) {
          availableIdleAnimations.push("scratchWallE");
        }
        if (nekoPosY > window.innerHeight - 32) {
          availableIdleAnimations.push("scratchWallS");
        }
        idleAnimation = availableIdleAnimations[Math.floor(Math.random() * availableIdleAnimations.length)];
      }

      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) {
            resetIdleAnimation();
          }
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) {
            resetIdleAnimation();
          }
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    }

    function frame() {
      frameCount += 1;

      if (grabbing) {
        if (grabStop) setSprite("alert", 0);
        return;
      }

      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < nekoSpeed || distance < 48) {
        idle();
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
      }

      let direction = diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      
      if (direction) {
        setSprite(direction, frameCount);
      }

      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;

      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePosX = e.clientX;
      mousePosY = e.clientY;
    };

    // Click handler for meow sound
    const handleClick = () => {
      playMeow();
    };

    // Mouse down handler for dragging
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      grabbing = true;
      playMeow();
      
      let startX = e.clientX;
      let startY = e.clientY;
      let startNekoX = nekoPosX;
      let startNekoY = nekoPosY;
      let grabInterval: ReturnType<typeof setTimeout>;

      const mousemove = (e: MouseEvent) => {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        if (absDeltaX > absDeltaY && absDeltaX > 10) {
          setSprite(deltaX > 0 ? "scratchWallW" : "scratchWallE", frameCount);
        } else if (absDeltaY > absDeltaX && absDeltaY > 10) {
          setSprite(deltaY > 0 ? "scratchWallN" : "scratchWallS", frameCount);
        }

        if (grabStop || absDeltaX > 10 || absDeltaY > 10 || Math.sqrt(deltaX ** 2 + deltaY ** 2) > 10) {
          grabStop = false;
          clearTimeout(grabInterval);
          grabInterval = setTimeout(() => {
            grabStop = true;
            nudge = false;
            startX = e.clientX;
            startY = e.clientY;
            startNekoX = nekoPosX;
            startNekoY = nekoPosY;
          }, 150);
        }

        nekoPosX = startNekoX + e.clientX - startX;
        nekoPosY = startNekoY + e.clientY - startY;
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
      };

      const mouseup = () => {
        grabbing = false;
        nudge = true;
        resetIdleAnimation();
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      };

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);
    };

    // Right-click handler for kuroneko toggle
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toggleKuroneko();
    };

    // Set initial position and styles
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    nekoEl.addEventListener("click", handleClick);
    nekoEl.addEventListener("mousedown", handleMouseDown);
    nekoEl.addEventListener("contextmenu", handleContextMenu);

    // Start animation loop
    const intervalId = setInterval(frame, 100);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      nekoEl.removeEventListener("click", handleClick);
      nekoEl.removeEventListener("mousedown", handleMouseDown);
      nekoEl.removeEventListener("contextmenu", handleContextMenu);
      clearInterval(intervalId);
    };
  }, [playMeow, toggleKuroneko]);

  return (
    <div
      ref={nekoRef}
      style={{
        width: "32px",
        height: "32px",
        position: "fixed",
        backgroundImage: "url('https://raw.githubusercontent.com/kyrie25/spicetify-oneko/main/assets/oneko/oneko-maia.gif')",
        imageRendering: "pixelated",
        zIndex: 9999,
        cursor: "grab",
        pointerEvents: "auto",
        filter: isKuroneko ? "invert(100%)" : "none",
      }}
    />
  );
};

export default Oneko;
