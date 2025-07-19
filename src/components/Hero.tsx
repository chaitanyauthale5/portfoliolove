import { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const roles = ['Frontend Developer', 'UI/UX Designer', 'Creative Coder'];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              background: `hsl(${195 + Math.random() * 63}, 100%, 50%)`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Mouse follower effect */}
      <div
        className="absolute pointer-events-none rounded-full opacity-30 mix-blend-screen"
        style={{
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, hsl(195 100% 50% / 0.3) 0%, transparent 70%)',
          transition: 'all 0.1s ease-out',
        }}
      />

      <div className="text-center z-10 max-w-4xl mx-auto px-4">
        <div className="float-animation">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text">
            Alex Chen
          </h1>
          <div className="text-2xl md:text-3xl mb-8 h-12 flex items-center justify-center">
            <span className="text-muted-foreground">I'm a </span>
            <span className="ml-2 text-primary font-semibold transition-all duration-500">
              {roles[currentRole]}
            </span>
          </div>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Creating immersive digital experiences through innovative design and cutting-edge technology. 
          Passionate about pushing the boundaries of what's possible on the web.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button className="glow-button bg-gradient-primary hover:scale-105 text-primary-foreground px-8 py-3 text-lg">
            Download Resume
          </Button>
          <Button className="glow-button bg-gradient-primary hover:scale-105 text-primary-foreground px-8 py-3 text-lg">
            View My Work
          </Button>
          <Button variant="outline" className="glass-card hover:bg-muted/20 px-8 py-3 text-lg">
            Download CV
          </Button>
        </div>

        <div className="flex justify-center space-x-6">
          {[
            { icon: Github, href: '#', label: 'GitHub' },
            { icon: Linkedin, href: '#', label: 'LinkedIn' },
            { icon: Instagram, href: '#', label: 'Instagram' },
            { icon: Facebook, href: '#', label: 'Facebook' },
            { icon: Mail, href: '#contact', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-2 pulse-glow p-3 rounded-full glass-card"
              aria-label={label}
            >
              <Icon size={24} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-primary" size={32} />
      </div>
    </section>
  );
};

export default Hero;