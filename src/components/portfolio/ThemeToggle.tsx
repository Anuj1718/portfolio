import { useTheme } from "@/hooks/useTheme";
import { useRef, useEffect } from "react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize click sound
    audioRef.current = new Audio("/click.wav");
    audioRef.current.volume = 0.5;
  }, []);

  const playClickSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const handleClick = () => {
    playClickSound();
    toggleTheme();
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        // Crescent moon icon for dark mode (click to go light)
        <svg
          className="w-5 h-5 text-foreground"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          {/* Stars */}
          <circle cx="17" cy="5" r="1" />
          <circle cx="20" cy="9" r="0.5" />
          <circle cx="15" cy="3" r="0.5" />
        </svg>
      ) : (
        // Sun icon for light mode (click to go dark)
        <svg
          className="w-5 h-5 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5" />
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </g>
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
