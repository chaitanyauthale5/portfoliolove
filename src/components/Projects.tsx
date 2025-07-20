import { useState, useEffect, useRef, memo } from 'react';

// Helper to generate a seeded random number for deterministic bubbles per card
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Bubble type
interface Bubble {
  left: number;
  top: number;
  size: number;
  speed: number;
  angle: number;
  phase: number;
}

// AnimatedBubbles component
const AnimatedBubbles = memo(({ bubbleCount, hovered, cardIndex }: { bubbleCount: number; hovered: boolean; cardIndex: number }) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverAnim = useRef(1); // 1 = not hovered, 2 = hovered
  const animating = useRef(true);
  const positions = useRef<{ x: number; y: number; }[]>([]);
  const prevTimeRef = useRef<number>();

  // Generate bubbles with fixed random properties on mount
  useEffect(() => {
    const newBubbles: Bubble[] = [];
    for (let i = 0; i < bubbleCount; i++) {
      const seed = cardIndex * 1000 + i * 17;
      const left = seededRandom(seed + 1) * 90 + 5;
      const top = seededRandom(seed + 2) * 80 + 10;
      const size = seededRandom(seed + 3) * 6 + 2;
      const speed = seededRandom(seed + 4) * 0.04 + 0.02;
      const angle = seededRandom(seed + 5) * 2 * Math.PI;
      const phase = seededRandom(seed + 6) * 2 * Math.PI;
      newBubbles.push({ left, top, size, speed, angle, phase });
    }
    setBubbles(newBubbles);
    positions.current = newBubbles.map(b => ({ x: b.left, y: b.top }));
  }, [bubbleCount, cardIndex]);

  // Animate bubbles using refs for smoothness
  useEffect(() => {
    animating.current = true;
    function animate(time: number) {
      if (!prevTimeRef.current) prevTimeRef.current = time;
      const dt = time - prevTimeRef.current;
      prevTimeRef.current = time;
      // Smoothly interpolate hoverAnim toward target
      const target = hovered ? 2 : 1;
      hoverAnim.current += (target - hoverAnim.current) * 0.08;
      // Animate positions and DOM
      positions.current = positions.current.map((pos, i) => {
        const b = bubbles[i];
        if (!b) return pos;
        const angle = b.angle + Math.sin(time * 0.0002 + b.phase) * 0.5;
        let x = pos.x + Math.cos(angle) * b.speed * dt * hoverAnim.current;
        let y = pos.y + Math.sin(angle) * b.speed * dt * hoverAnim.current;
        if (x > 100) x = 0;
        if (x < 0) x = 100;
        if (y > 100) y = 0;
        if (y < 0) y = 100;
        // Update DOM directly
        const ref = bubbleRefs.current[i];
        if (ref) {
          const scale = 1 + 0.1 * (hoverAnim.current - 1);
          const blur = 1 + 1 * (hoverAnim.current - 1);
          const brightness = 1 + 0.2 * (hoverAnim.current - 1);
          ref.style.left = `${x}%`;
          ref.style.top = `${y}%`;
          ref.style.width = `${b.size}px`;
          ref.style.height = `${b.size}px`;
          ref.style.opacity = '0.8';
          ref.style.transform = `scale(${scale})`;
          ref.style.filter = `blur(${blur}px) brightness(${brightness})`;
          ref.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1), filter 0.7s cubic-bezier(0.4,0,0.2,1)';
        }
        return { x, y };
      });
      if (animating.current) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    return () => { animating.current = false; prevTimeRef.current = undefined; };
  }, [bubbles, hovered]);

  return (
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      {bubbles.map((b, i) => (
        <div
          key={i}
          ref={el => bubbleRefs.current[i] = el}
          className={"absolute rounded-full bg-white"}
        />
      ))}
    </div>
  );
});
import { ExternalLink, Github, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  function GitHub()  {
    window.open('https://github.com/chaitanyauthale5', '_blank');
  }

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

  const projects = [
    {
      title: 'Hostel Managment System',
      description: 'Real-time software solution designed to automate and streamline the daily operations of hostels, student accommodations.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Vite'],
      gradient: 'from-pink-500 to-violet-600',
      featured: false,
      repo: 'https://github.com/chaitanyauthale5/hostel',
    },
    {
      title: 'Ecocart',
      description: 'A modern solution for sustainable e-commerce with personalized recommendations with integrated AI, ML model, OCR, LSTM and much more.',
      technologies: ['React', 'TypeScript', 'Firebase', 'Python', 'Node.js'],
      gradient: 'from-blue-500 to-purple-600',
      featured: true,
      repo: 'https://github.com/chaitanyauthale5/EcoCart',
    },
    {
      
      title: 'KIT CDC',
      description: 'A career development and placement streamlining platform for students which makes easy task for Co-ordinator.',
      technologies: ['Next.js', 'Node.js', 'Firebase'],
      gradient: 'from-yellow-500 to-orange-600',
      featured: false,
      repo: 'https://github.com/chaitanyauthale5/kit-cdc',
    },
    {
      title: 'Portfolio Website',
      description: 'Interactive Portfolio showcasing creative coding skills with React, featuring particle systems and immersive user experience.',
      technologies: ['React.js', 'GitHub', 'CSS', 'TypeScript', 'Vite'],
      gradient: 'from-orange-500 to-red-600',
      featured: false,
      repo: 'https://github.com/chaitanyauthale5/portfolio',
    },
    {
      title: 'Task Manager',
      description: 'Personalised Task Manager for anybody to use it according to your user needs.',
      technologies: ['Next.js', 'Node.js', 'Firebase', 'TypeScript', 'Vite'],
      gradient: 'from-emerald-500 to-teal-600',
      featured: true,
      repo: 'https://github.com/chaitanyauthale5/task-manager',
    },
    {
      title: 'Leukaemia classification using ML',
      description: 'Machine Learning model to check the cancer stage.',
      technologies: ['Python', 'Node.js', 'React', 'CNN', 'Sklearn'],
      gradient: 'from-cyan-500 to-blue-600',
      featured: false,
      repo: 'https://github.com/chaitanyauthale5/Leukemia-Detection-model',
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 px-4 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
          Featured Projects
        </h2>
        <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8 rounded-full"></div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A showcase of my recent work, demonstrating expertise across different 
          technologies and industries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <Card
            key={project.title}
            className={`group glass-card border-glass-border overflow-hidden transition-all duration-500 hover:scale-105 cursor-pointer ${
              project.featured ? 'md:col-span-2 lg:col-span-1' : ''
            } ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
            onMouseEnter={() => setHoveredProject(index)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
              {/* Animated background pattern */}
              <AnimatedBubbles bubbleCount={20} hovered={hoveredProject === index} cardIndex={index} />
              
              {/* Project actions overlay */}
              <div className={`absolute inset-0 bg-black/50 flex items-center justify-center space-x-4 transition-all duration-300 ${
                hoveredProject === index ? 'opacity-100' : 'opacity-0'
              }`}>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="sm" variant="outline" className="glass-card">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </a>
              </div>
            </div>
            
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-muted/30 text-xs rounded-full text-muted-foreground border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" className="glow-button glass-card px-8 py-3" onClick={GitHub}>
          <Github className="w-5 h-5 mr-2" />
          View All Projects on GitHub
        </Button>
      </div>
    </section>
  );
};

export default Projects;