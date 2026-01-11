const EducationSection = () => {
  return (
    <section id="education" className="py-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">education</h2>

      <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
              <span className="text-lg">🎓</span>
            </div>
            <div>
              <h3 className="font-medium text-foreground text-sm">Savitribai Phule Pune University</h3>
              <p className="text-xs text-muted-foreground">B.E in Computer Engineering</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            2022 - 2026
          </span>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
