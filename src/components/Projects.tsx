import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
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

  const projects = [
    {
      title: 'AI-Powered Dashboard',
      description: 'A modern analytics dashboard with AI-driven insights, real-time data visualization, and predictive analytics for business intelligence.',
      technologies: ['React', 'TypeScript', 'D3.js', 'Python', 'TensorFlow'],
      gradient: 'from-blue-500 to-purple-600',
      featured: true,
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with advanced features like real-time inventory, payment processing, and personalized recommendations.',
      technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
      gradient: 'from-emerald-500 to-teal-600',
      featured: true,
    },
    {
      title: '3D Portfolio Website',
      description: 'Interactive 3D portfolio showcasing creative coding skills with Three.js, featuring particle systems and immersive user experience.',
      technologies: ['Three.js', 'WebGL', 'React', 'GLSL', 'Blender'],
      gradient: 'from-orange-500 to-red-600',
      featured: false,
    },
    {
      title: 'Social Media App',
      description: 'Real-time social platform with live messaging, content sharing, and advanced user engagement features.',
      technologies: ['React Native', 'Firebase', 'WebRTC', 'Node.js'],
      gradient: 'from-pink-500 to-violet-600',
      featured: false,
    },
    {
      title: 'Blockchain Wallet',
      description: 'Secure cryptocurrency wallet with multi-chain support, DeFi integration, and advanced security features.',
      technologies: ['Web3.js', 'Ethereum', 'Solidity', 'React', 'MetaMask'],
      gradient: 'from-yellow-500 to-orange-600',
      featured: false,
    },
    {
      title: 'IoT Monitoring System',
      description: 'Real-time IoT device monitoring dashboard with data analytics, alerts, and device management capabilities.',
      technologies: ['React', 'Node.js', 'MQTT', 'InfluxDB', 'Grafana'],
      gradient: 'from-cyan-500 to-blue-600',
      featured: false,
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
              <div className="absolute inset-0 opacity-20">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white transition-all duration-1000"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      width: `${Math.random() * 6 + 2}px`,
                      height: `${Math.random() * 6 + 2}px`,
                      transform: hoveredProject === index 
                        ? `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`
                        : 'translate(0, 0)',
                    }}
                  />
                ))}
              </div>
              
              {/* Project actions overlay */}
              <div className={`absolute inset-0 bg-black/50 flex items-center justify-center space-x-4 transition-all duration-300 ${
                hoveredProject === index ? 'opacity-100' : 'opacity-0'
              }`}>
                <Button size="sm" variant="secondary" className="glow-button">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button size="sm" variant="outline" className="glass-card">
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </Button>
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
              
              <div className="flex items-center space-x-4 text-sm">
                <a 
                  href="#" 
                  className="text-primary hover:text-primary/80 transition-colors flex items-center"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Live Demo
                </a>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
                >
                  <Github className="w-4 h-4 mr-1" />
                  Source
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" className="glow-button glass-card px-8 py-3">
          <Github className="w-5 h-5 mr-2" />
          View All Projects on GitHub
        </Button>
      </div>
    </section>
  );
};

export default Projects;