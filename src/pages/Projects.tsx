import { Github, ArrowLeft, ExternalLink, ChevronUp, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { projects } from "@/lib/projects";
import Oneko from "@/components/portfolio/Oneko";
import BottomDock from "@/components/portfolio/BottomDock";

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const toggleExpand = (title: string) => {
    setExpandedProject(expandedProject === title ? null : title);
  };

  return (
    <div className="min-h-screen bg-background">
      <Oneko />
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            back to home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-3">projects</h1>
          <p className="text-muted-foreground">
            stuff i've built. mostly full-stack web apps.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {projects.map((project) => {
            const isExpanded = expandedProject === project.title;
            
            return (
              <div
                key={project.title}
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-muted-foreground/30 transition-all duration-300"
              >
                <div className="p-5">
                  {/* Title and Description */}
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    {project.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
                      {/* Features */}
                      <div className="space-y-2 mb-4">
                        {project.features.map((feature, index) => (
                          <p key={index} className="text-sm text-muted-foreground pl-4">
                            • {feature}
                          </p>
                        ))}
                      </div>
                      {/* Highlights if available */}
                      {project.highlights && project.highlights.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground mb-2 font-medium">Highlights:</p>
                          <div className="space-y-1.5">
                            {project.highlights.map((highlight, index) => (
                              <p key={index} className="text-sm text-primary/80 pl-4">
                                ✨ {highlight}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* Full Tech Stack */}
                      <div>
                        <p className="text-sm text-muted-foreground mb-2 font-medium">Full Tech Stack:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded border border-border"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Collapsed: Show only first 2 tags */}
                  {!isExpanded && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 2 && (
                        <span className="px-2 py-1 text-xs text-muted-foreground">
                          +{project.tags.length - 2} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Bottom Row: Know More + Links */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    {/* Know More Button */}
                    <button
                      onClick={() => toggleExpand(project.title)}
                      className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Know More
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {/* Links */}
                    <div className="flex items-center gap-3">
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Repo
                      </a>
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        Visit
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <BottomDock />
    </div>
  );
};

export default Projects;
