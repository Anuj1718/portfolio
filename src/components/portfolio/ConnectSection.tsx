import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/danuj1718/", bgColor: "bg-[#0077B5]", iconColor: "text-white" },
  { name: "GitHub", icon: Github, href: "https://github.com/Anuj1718", bgColor: "bg-white", iconColor: "text-black" },
  { name: "Twitter", icon: Twitter, href: "https://x.com/anujbtw", bgColor: "bg-[#1DA1F2]", iconColor: "text-white" },
  { name: "Email", icon: Mail, href: "mailto:anujdhole17@gmail.com", bgColor: "bg-[#EA4335]", iconColor: "text-white" },
];

const ConnectSection = () => {
  return (
    <section id="connect" className="py-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">connect with me</h2>

      <div className="flex flex-wrap gap-3">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-md text-sm text-muted-foreground transition-all hover:border-primary/30 hover:scale-105"
          >
            <span className={`p-1 rounded ${link.bgColor}`}>
              <link.icon className={`w-3 h-3 ${link.iconColor}`} />
            </span>
            {link.name}
          </a>
        ))}
      </div>
    </section>
  );
};

export default ConnectSection;
