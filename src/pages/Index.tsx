import FloatingElements from "@/components/portfolio/FloatingElements";
import HeaderBar from "@/components/portfolio/HeaderBar";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import EducationSection from "@/components/portfolio/EducationSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import TechStackSection from "@/components/portfolio/TechStackSection";
import Oneko from "@/components/portfolio/Oneko";

import BottomDock from "@/components/portfolio/BottomDock";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      {/* Background effects - commented out for cleaner look */}
      {/* <FloatingElements /> */}
      <Oneko />
      <HeaderBar />
      
      <main className="relative z-10 flex-1 w-full max-w-3xl mx-auto px-6 pb-24">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <TechStackSection />
      </main>
      
      <BottomDock />
    </div>
  );
};

export default Index;
