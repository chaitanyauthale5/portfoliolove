import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import '../styles/hero-enhance.css';
import { Typewriter } from 'react-simple-typewriter';

const roles = ['Frontend Developer', 'UI/UX Designer', 'Creative Coder','Prompt Engineer','ML Engineer'];

import { useEffect, useState } from 'react';

const Hero = () => {
  // Generate twinkle properties only once
  const [twinkles, setTwinkles] = useState<Array<{
    left: string;
    top: string;
    size: string;
    background: string;
    animationDelay: string;
    animationDuration: string;
  }>>([]);

  useEffect(() => {
    const newTwinkles = Array.from({ length: 50 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 6 + 2}px`,
      background: `hsl(${195 + Math.random() * 63}, 100%, 50%)`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
    }));
    setTwinkles(newTwinkles);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements - continuous animation, not cursor dependent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {twinkles.map((twinkle, i) => (
          <div
            key={i}
            className="absolute rounded-full twinkle opacity-70"
            style={{
              left: twinkle.left,
              top: twinkle.top,
              width: twinkle.size,
              height: twinkle.size,
              background: twinkle.background,
              animationDelay: twinkle.animationDelay,
              animationDuration: twinkle.animationDuration,
            }}
          />
        ))}
      </div>
      <div className="text-center z-10 max-w-4xl mx-auto px-4">
        <div className="float-animation">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
  Chaitanya Uthale
</h1>
          <div className="text-2xl md:text-3xl mb-8 h-12 flex items-center justify-center">
            <span className="text-muted-foreground">I'm a </span>
            <span className="ml-2 text-primary font-semibold transition-all duration-500">
              <Typewriter
                words={roles}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={30}
                deleteSpeed={20}
                delaySpeed={900}
              />
            </span>
          </div>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Creating immersive digital experiences through innovative design and cutting-edge technology. 
          Passionate about pushing the boundaries of what's possible on the web.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
        <a
  href="/resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  style={{ textDecoration: 'none' }}
>
  <Button variant="outline" className="glass-card hover:bg-muted/20 px-8 py-3 text-lg">
    Download Resume
  </Button>
</a>
          <a href="#projects" rel="noopener noreferrer">
              <Button className="glow-button bg-gradient-primary hover:scale-105 text-primary-foreground px-8 py-3 text-lg">
                View My Work
              </Button>
          </a>
          {/* <Button variant="outline" className="glass-card hover:bg-muted/20 px-8 py-3 text-lg">
            Download CV
          </Button> */}
        </div>
        <div className="w-full flex justify-center space-x-6 hero-social-row">
  {[
    { icon: Github, href: 'https://github.com/chaitanyauthale5', target: '_blank', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/chaitanya-uthale', target: '_blank', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:chaitanyauthale5@gmail.com?subject=Contact%20from%20Portfolio&body=Hi%20Chaitanya%2C%0A%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20connect...', label: 'Email' },
  ].map(({ icon: Icon, href, label, target }) => (
    <a
      key={label}
      href={href}
      {...(target ? { target } : {})}
      className="hero-social-animated text-muted-foreground/80 hover:text-primary transition-all duration-500 ease-out hover:scale-110 hover:-translate-y-2 p-4 rounded-full backdrop-blur-md bg-background/10 border border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/25 relative"
      aria-label={label}
    >
      <Icon size={30} />
      <span className="hero-tooltip">{label}</span>
    </a>
     ))}
      </div>

      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center animate-bounce z-20">
  <ChevronDown className="text-primary" size={32} />
</div>
    </section>
  );
};

export default Hero;