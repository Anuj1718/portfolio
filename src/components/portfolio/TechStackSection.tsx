import { useState, useEffect, useMemo } from "react";

const skills = [
  { name: "HTML5", icon: "🌐" },
  { name: "CSS", icon: "🎨" },
  { name: "JavaScript", icon: "📜" },
  { name: "TypeScript", icon: "💙" },
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🟢" },
  { name: "Next.js", icon: "▲" },
  { name: "Tailwind", icon: "🌊" },
  { name: "MongoDB", icon: "🍃" },
  { name: "MySQL", icon: "🐬" },
  { name: "Firebase", icon: "🔥" },
  { name: "Git", icon: "📦" },
  { name: "GitHub", icon: "🐙" },
  { name: "VS Code", icon: "💻" },
  { name: "C++", icon: "⚡" },
  { name: "Python", icon: "🐍" },
  { name: "FastAPI", icon: "🚀" },
];

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionData {
  total: number;
  contributions: ContributionDay[];
}

const TechStackSection = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [contributionData, setContributionData] = useState<ContributionData | null>(null);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const years = [currentYear, currentYear - 1];

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        // Fetch from GitHub contribution API proxy
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/Anuj1718?y=${selectedYear}`
        );
        const data = await response.json();
        
        const contributions: ContributionDay[] = data.contributions.map(
          (day: { date: string; count: number; level: number }) => ({
            date: day.date,
            count: day.count,
            level: day.level,
          })
        );
        
        setContributionData({
          total: data.total[selectedYear] || 0,
          contributions,
        });
      } catch (error) {
        console.error('Failed to fetch contributions:', error);
        setContributionData(null);
      }
    };

    fetchContributions();
  }, [selectedYear]);

  // Group contributions by week
  const weeks = useMemo(() => {
    if (!contributionData) return [];
    
    const weeksArray: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];
    
    contributionData.contributions.forEach((day, index) => {
      const dayOfWeek = new Date(day.date).getDay();
      
      if (index === 0) {
        // Pad the first week with empty days
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push({ date: '', count: -1, level: -1 });
        }
      }
      
      currentWeek.push(day);
      
      if (dayOfWeek === 6) {
        weeksArray.push(currentWeek);
        currentWeek = [];
      }
    });
    
    if (currentWeek.length > 0) {
      weeksArray.push(currentWeek);
    }
    
    return weeksArray;
  }, [contributionData]);

  const getContributionColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-secondary';
      case 1: return 'bg-primary/30';
      case 2: return 'bg-primary/50';
      case 3: return 'bg-primary/70';
      case 4: return 'bg-primary';
      default: return 'bg-transparent';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleMouseEnter = (day: ContributionDay, e: React.MouseEvent) => {
    if (day.count >= 0) {
      setHoveredDay(day);
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
    }
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <section id="tech" className="py-6">
      {/* Tech Stack */}
      <div className="bg-card border border-border rounded-lg p-5 mb-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">tech stack</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.name}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-background border border-border rounded-full text-foreground hover:border-primary/50 transition-colors"
            >
              <span>{skill.icon}</span>
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      {/* GitHub Contribution Graph */}
      <div className="bg-card border border-border rounded-lg p-5">
        {/* Year Selector */}
        <div className="flex items-center gap-2 mb-4">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                selectedYear === year
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Contribution Graph */}
        <div className="overflow-x-auto pb-2 relative">
          {/* Month Labels */}
          <div className="flex text-xs text-muted-foreground mb-1 ml-6">
            {months.map((month) => (
              <span key={month} className="flex-1 min-w-[40px]">
                {month}
              </span>
            ))}
          </div>
          
          {/* Grid */}
          <div className="flex gap-[3px]">
            {/* Day Labels */}
            <div className="flex flex-col gap-[3px] text-xs text-muted-foreground pr-1">
              <span className="h-[10px]"></span>
              <span className="h-[10px] text-[10px] leading-[10px]">Mon</span>
              <span className="h-[10px]"></span>
              <span className="h-[10px] text-[10px] leading-[10px]">Wed</span>
              <span className="h-[10px]"></span>
              <span className="h-[10px] text-[10px] leading-[10px]">Fri</span>
              <span className="h-[10px]"></span>
            </div>
            
            {/* Contribution Cells */}
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-[10px] h-[10px] rounded-sm ${getContributionColor(day.level)} ${day.count >= 0 ? 'cursor-pointer hover:ring-1 hover:ring-foreground/50' : ''}`}
                    onMouseEnter={(e) => handleMouseEnter(day, e)}
                    onMouseLeave={() => setHoveredDay(null)}
                  />
                ))}
              </div>
            ))}
          </div>
          
          {/* Tooltip */}
          {hoveredDay && (
            <div
              className="fixed z-50 px-2 py-1 text-xs bg-popover text-popover-foreground border border-border rounded-md shadow-md whitespace-nowrap pointer-events-none"
              style={{
                left: tooltipPos.x,
                top: tooltipPos.y - 35,
                transform: 'translateX(-50%)',
              }}
            >
              <strong>{hoveredDay.count} contribution{hoveredDay.count !== 1 ? 's' : ''}</strong> on {formatDate(hoveredDay.date)}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-3">
          {contributionData && <span>{contributionData.total} contributions in {selectedYear}</span>}
          <div className="flex items-center gap-2">
            <span>Less</span>
            <div className="flex gap-0.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-secondary" />
              <div className="w-2.5 h-2.5 rounded-sm bg-primary/30" />
              <div className="w-2.5 h-2.5 rounded-sm bg-primary/50" />
              <div className="w-2.5 h-2.5 rounded-sm bg-primary/70" />
              <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
