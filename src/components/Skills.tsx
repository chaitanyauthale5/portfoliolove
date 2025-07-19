import { useEffect, useRef, useState } from 'react';
import { Progress } from '@/components/ui/progress';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState<Record<string, number>>({});
  const sectionRef = useRef<HTMLElement>(null);

  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React/Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Three.js/WebGL', level: 85 },
      ]
    },
    {
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Python', level: 82 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'GraphQL', level: 75 },
      ]
    },
    {
      title: 'Design & Tools',
      skills: [
        { name: 'UI/UX Design', level: 90 },
        { name: 'Figma', level: 85 },
        { name: 'Git/GitHub', level: 93 },
        { name: 'Docker', level: 78 },
      ]
    }
  ];

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

    return () => observer.disconnect();
  }, []);

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
          A comprehensive set of skills acquired through years of hands-on experience 
          and continuous learning in the ever-evolving tech landscape.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <div
            key={category.title}
            className={`glass-card p-6 rounded-xl transition-all duration-1000 ${
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
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skill.name}
                  className={`transition-all duration-500 ${
                    isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${(categoryIndex * 200) + (skillIndex * 100)}ms` }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">
                      {skill.name}
                    </span>
                    <span className="text-sm text-primary font-mono">
                      {animatedSkills[skill.name] || 0}%
                    </span>
                  </div>
                  <div className="relative">
                    <Progress
                      value={animatedSkills[skill.name] || 0}
                      className="h-2 bg-muted"
                    />
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-primary rounded-full transition-all duration-2000 ease-out"
                      style={{
                        width: `${animatedSkills[skill.name] || 0}%`,
                        boxShadow: `0 0 10px hsl(195 100% 50% / 0.5)`
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
      <div className="mt-16 flex justify-center space-x-8 overflow-hidden">
        {['⚛️', '🔥', '⚡', '🎨', '🚀', '💡', '🔧', '📱'].map((icon, index) => (
          <div
            key={index}
            className={`text-3xl transition-all duration-1000 hover:scale-125 cursor-pointer ${
              isVisible 
                ? 'opacity-70 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
            style={{ 
              transitionDelay: `${index * 100}ms`,
              animation: isVisible ? `float 3s ease-in-out infinite ${index * 0.5}s` : 'none'
            }}
          >
            {icon}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;