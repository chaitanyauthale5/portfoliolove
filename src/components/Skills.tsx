import { useEffect, useRef, useState } from 'react';
import { Progress } from '@/components/ui/progress';

// Define Skill type
interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

// Move skillCategories outside the component to avoid useEffect dependency warning
const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React/Next.js', level: 50, color: '#61dafb' }, // React blue
      { name: 'TypeScript', level: 45, color: '#3178c6' },    // TypeScript blue
      { name: 'JavaScript', level: 75, color: '#f7df1e' },    // JS yellow
      { name: 'HTML/CSS', level: 70, color: '#e44d26' },      // HTML orange
      { name: 'Tailwind CSS', level: 45, color: '#38bdf8' },  // Tailwind blue
    ]
  },
  {
    title: 'Backend Development',
    skills: [
      { name: 'Node.js', level: 70, color: '#68a063' },        // Node green
      { name: 'Express.js', level: 50, color: '#FF0000' },     // Express gray
      { name: 'PostgreSQL', level: 85, color: '#47a248' },        // Mongo green
      { name: 'Python', level: 86, color: '#f97316' },      // Orange
      { name: 'Firebase', level: 82, color: '#ffcb2b' },       // Firebase yellow
    ]
  },
  {
    title: 'Design & Tools',
    skills: [
      { name: 'UI/UX Design', level: 30, color: '#f472b6' },   // Pink
      { name: 'Figma', level: 50, color: '#a259ff' },          // Figma purple
      { name: 'Git/GitHub', level: 83, color: '#fbbf24' },     // Yellow
      { name: 'Prompt Engineering', level: 96, color: '#FF0000' },         // Red
    ]
  }
];

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState<Record<string, number>>({});
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skill bars
          skillCategories.forEach(category => {
            category.skills.forEach(skill => {
              setTimeout(() => {
                setAnimatedSkills(prev => ({
                  ...prev,
                  [skill.name]: skill.level
                }));
              }, Math.random() * 1000);
            });
          });
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [sectionRef]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 px-4 max-w-7xl mx-auto"
    >

      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
          Skills & Expertise
        </h2>
        <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8 rounded-full"></div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive set of skills acquired through hands-on experience 
          and continuous learning in the ever-evolving tech landscape.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {skillCategories.map((category, categoryIndex) => (
    <div
      key={category.title}
      className={`glass-card p-6 rounded-xl transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${categoryIndex * 200}ms` }}
    >
      <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center">
        <span className="w-2 h-2 bg-gradient-primary rounded-full mr-3"></span>
        {category.title}
      </h3>
      <div className="space-y-6">
        {category.skills.map((skill) => (
          <div
            key={skill.name}
            className="group cursor-pointer"
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            {/* Skill header */}
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300`}>
                {skill.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {skill.level}%
              </span>
            </div>
            {/* Progress bar track */}
            <div className="w-full bg-muted/20 rounded-full h-2 relative overflow-hidden">
              {/* Base colored line for each skill */}
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 rounded-full"
                style={{
                  width: `${skill.level}%`,
                  background: skill.color,
                  opacity: 0.7,
                  zIndex: 1,
                }}
              />
              {/* Animated progress bar fill on hover */}
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: hoveredSkill === skill.name ? `${skill.level}%` : '0%',
                  boxShadow: hoveredSkill === skill.name ? `0 0 10px ${skill.color}` : 'none',
                  zIndex: 2,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

      {/* Floating icons */}
      <div className="mt-16 py-8 overflow-hidden">
        <div className="flex justify-center flex-wrap gap-8 max-w-5xl mx-auto px-8">
          {['⚛️', '🔥', '⚡', '🐘', '🟦', '🤖', '🧠 ', '📱'].map((icon, index) => (
            <div
              key={index}
              className={`text-4xl transition-all duration-1000 ease-out hover:scale-110 hover:-translate-y-2 cursor-pointer p-5 rounded-2xl backdrop-blur-md bg-background/5 border border-primary/10 hover:border-primary/30 hover:bg-background/10 ${
                isVisible 
                  ? 'opacity-90 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${index * 200}ms`,
                transform: isVisible ? `translateY(${Math.sin(index * 0.5) * 8}px)` : 'translateY(40px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
              }}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;