import { ChevronDown } from "lucide-react";
import { useState } from "react";

const experiences = [
  {
    title: "Frontend Developer Intern",
    company: "Elite Softwares",
    companyIcon: "💻",
    period: "Dec 2024 - Jan 2025",
    responsibilities: [
      "Developed interactive user interfaces using React with hooks and context API for state management",
      "Built responsive and accessible components using modern CSS frameworks and best practices",
      "Optimized application performance through lazy loading, code splitting, and efficient rendering patterns",
    ],
    technologies: ["React", "JavaScript", "TypeScript", "Tailwind CSS", "HTML/CSS", "Git"],
  },
];

const ExperienceSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="py-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">experience</h2>

      <div className="space-y-3">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-lg">
                  {exp.companyIcon}
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm">{exp.title}</h3>
                  <p className="text-xs text-muted-foreground">{exp.company}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {exp.period}
              </span>
            </div>
            
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="flex items-center gap-1 text-xs text-muted-foreground mt-3 hover:text-foreground transition-colors"
            >
              Know More
              <ChevronDown 
                className={`w-3 h-3 transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {expandedIndex === index && (
              <div className="mt-3 space-y-3 animate-fade-in">
                {exp.responsibilities && (
                  <div>
                    <ul className="space-y-1.5">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground pl-3">
                          • {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {exp.technologies && (
                  <div>
                    <p className="text-xs font-medium text-foreground mb-1.5">Technologies Used:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
