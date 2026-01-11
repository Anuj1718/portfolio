import { Home, Heart, Github, Linkedin, Mail, FileText } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Theme icons matching the header
const MoonIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    <circle cx="17" cy="5" r="1" />
    <circle cx="20" cy="9" r="0.5" />
    <circle cx="15" cy="3" r="0.5" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
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
);

const BottomDock = () => {
  const { theme, toggleTheme } = useTheme();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/click.wav");
    audioRef.current.volume = 0.5;
  }, []);

  const playClickSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const handleThemeToggle = () => {
    playClickSound();
    toggleTheme();
  };

  const navItems = [
    { name: "Home", icon: Home, href: "/", isLink: true },
    { name: "More About Me", icon: Heart, href: "/interests", isLink: true },
    { name: "Resume", icon: FileText, href: "/resume.pdf", external: true },
  ];

  const socialItems = [
    { name: "GitHub", icon: Github, href: "https://github.com/Anuj1718" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/danuj1718/" },
    { name: "X", icon: XIcon, href: "https://x.com/anujbtw" },
    { name: "Email", icon: Mail, href: "mailto:anujdhole17@gmail.com" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-0.5 px-2 py-1.5 bg-card/90 backdrop-blur-md border border-border rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
        {/* Navigation Items */}
        {navItems.map((item) => (
          <div key={item.name} className="relative">
            {hoveredItem === item.name && (
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-card text-foreground border border-border rounded-md whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-200 shadow-md">
                {item.name}
              </span>
            )}
            {item.isLink ? (
              <Link
                to={item.href}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                className="flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all hover:scale-110 hover:animate-[wiggle_0.3s_ease-in-out]"
              >
                <item.icon className="w-5 h-5" />
              </Link>
            ) : (
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                className="flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all hover:scale-110 hover:animate-[wiggle_0.3s_ease-in-out]"
              >
                <item.icon className="w-5 h-5" />
              </a>
            )}
          </div>
        ))}

        {/* Divider */}
        <div className="w-px h-6 bg-border mx-1" />

        {/* Social Items */}
        {socialItems.map((item) => (
          <div key={item.name} className="relative">
            {hoveredItem === item.name && (
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-card text-foreground border border-border rounded-md whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-200 shadow-md">
                {item.name}
              </span>
            )}
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
              className="flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all hover:scale-110 hover:animate-[wiggle_0.3s_ease-in-out]"
            >
              <item.icon className="w-5 h-5" />
            </a>
          </div>
        ))}

        {/* Divider */}
        <div className="w-px h-6 bg-border mx-1" />

        {/* Theme Toggle */}
        <div className="relative">
          {hoveredItem === "Theme" && (
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-card text-foreground border border-border rounded-md whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-200 shadow-md">
              Theme
            </span>
          )}
          <button
            onClick={handleThemeToggle}
            onMouseEnter={() => setHoveredItem("Theme")}
            onMouseLeave={() => setHoveredItem(null)}
            className="flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all hover:scale-110 hover:animate-[wiggle_0.3s_ease-in-out]"
          >
            {theme === "dark" ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomDock;
