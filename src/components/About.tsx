import { useEffect, useRef, useState } from 'react';
import { Code2, Palette, Rocket, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Code2,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code that stands the test of time.',
    },
    {
      icon: Palette,
      title: 'Creative Design',
      description: 'Crafting beautiful and intuitive user interfaces that delight and engage users.',
    },
    {
      icon: Rocket,
      title: 'Performance',
      description: 'Optimizing applications for speed, accessibility, and seamless user experience.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Staying ahead of the curve with the latest technologies and best practices.',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-4 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
          About Me
        </h2>
        <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8 rounded-full"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className={`space-y-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}>
          <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
            Passionate about creating digital experiences
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            With over 5 years of experience in web development, I specialize in creating 
            modern, responsive, and user-friendly applications. My journey started with a 
            fascination for how technology can solve real-world problems and enhance human experiences.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I believe in the power of clean code, thoughtful design, and continuous learning. 
            When I'm not coding, you can find me exploring new technologies, contributing to 
            open-source projects, or experimenting with creative coding projects.
          </p>
          
          <div className="flex flex-wrap gap-3 pt-4">
            {['React', 'TypeScript', 'Node.js', 'Python', 'UI/UX Design', 'WebGL'].map((skill, index) => (
              <span
                key={skill}
                className={`px-4 py-2 glass-card rounded-full text-sm font-medium transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}>
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className={`glass-card border-glass-border hover:scale-105 transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6 text-center">
                <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2 text-foreground">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;