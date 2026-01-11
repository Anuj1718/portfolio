import { useState, useEffect } from "react";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  return (
    <footer className="py-8 px-6 border-t border-border mt-8 group">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-foreground font-medium">11,653 visitors</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">47 today</span>
          </div>
          <span className="text-muted-foreground">Asia/Calcutta</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
