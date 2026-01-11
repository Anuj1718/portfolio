import { useState, useEffect } from "react";

const HeroSection = () => {
  const [yearsOnEarth, setYearsOnEarth] = useState("");

  useEffect(() => {
    const birthDate = new Date(2003, 11, 6, 21, 21, 0); // December 6, 2003, 9:21 PM
    
    const updateAge = () => {
      const now = new Date();
      const diffMs = now.getTime() - birthDate.getTime();
      const years = diffMs / (1000 * 60 * 60 * 24 * 365.25);
      setYearsOnEarth(years.toFixed(8));
    };

    updateAge();
    const interval = setInterval(updateAge, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-8 pb-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          hey, anuj here
        </h1>
        <p className="text-muted-foreground text-sm">
          been in prod since <span className="text-primary font-mono font-medium">{yearsOnEarth}</span> years
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
