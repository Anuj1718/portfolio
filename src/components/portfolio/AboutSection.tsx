import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section id="about" className="py-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">about</h2>

      <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
        <p>
          i craft <span className="text-primary font-medium">full-stack web apps</span> and want to make a real world impact with my projects. 
        </p>
        <p>
          mostly vibing with <span className="text-foreground font-medium">react</span> and{" "}
          <span className="text-foreground font-medium">node.js</span> these days. 
          i like building things that look good and don't break.
        </p>
        <p>
          always down for <span className="text-foreground font-medium">collabs</span> and{" "}
          <span className="text-foreground font-medium">cool opportunities</span>. 
          hit me up if you wanna build something together.
        </p>
        <p>
          here's more{" "}
          <Link 
            to="/interests" 
            className="text-primary font-medium hover:underline underline-offset-2 transition-colors"
          >
            about me
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
