import { ExternalLink, Github, ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/lib/projects";

const ProjectsSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">projects i've built</h2>

      <div className="space-y-3">
        {projects.slice(0, 2).map((project, index) => (
          <div
            key={project.title}
            className="bg-card border border-border rounded-lg p-4 hover:border-muted-foreground/30 transition-colors"
          >
            <h3 className="font-medium text-foreground text-sm mb-2">{project.title}</h3>
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              {project.description}
            </p>

            {/* Expanded Content: Features + All Tags */}
            {expandedIndex === index && (
              <div className="mb-3 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Features */}
                <div className="space-y-1.5 mb-3">
                  {project.features.map((feature, idx) => (
                    <p key={idx} className="text-xs text-muted-foreground pl-3">
                      • {feature}
                    </p>
                  ))}
                </div>
                {/* Full Tech Stack */}
                <div className="mb-2">
                  <p className="text-xs text-muted-foreground mb-1.5 font-medium">Tech Stack:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Collapsed: Show only first 2 tags */}
            {expandedIndex !== index && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded border border-border"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 2 && (
                  <span className="px-2 py-0.5 text-xs text-muted-foreground">
                    +{project.tags.length - 2} more
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
              >
                Know More
                <ChevronDown 
                  className={`w-3 h-3 transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>

              <div className="flex items-center gap-3">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  Repo
                </a>
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  Visit
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <Link
          to="/projects"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View All Projects
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default ProjectsSection;
