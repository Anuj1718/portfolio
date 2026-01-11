import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const HeaderBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    });
  };

  return (
    <header className="relative py-4">
      <div className="max-w-3xl mx-auto px-6 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{formatDate(currentTime)}</span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground font-mono">
            {formatTime(currentTime)} GMT+5:30
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
