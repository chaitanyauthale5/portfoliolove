import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter, X, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_h7yxoen', // Service ID
        'template_kac78xp', // Template ID
        {
          name: formData.name,
          email: formData.email,
          title: formData.subject, // send as 'title' to match template
          message: formData.message,
        },
        'bBAhqKzSho14wcGUh'
      );
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'chaitanyauthale5@gmail.com',
      href: 'chaitanyauthale5@gmail.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 7558593244',
      href: 'tel:+91 7558593244',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Kolhapur, Maharashtra',
      href: '#',
    },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/chaitanyauthale5', target: 'new', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/chaitanya-uthale', target: '_blank', label: 'LinkedIn' },
    { icon: X, href: 'https://x.com/ChaitanyaUthale', target: '_blank', label: 'X' },
    { icon: Instagram, href: 'https://instagram.com/chaitanyauthale5', target: '_blank', label: 'Instagram' },
    { icon: Mail, href: 'mailto:chaitanyauthale5@gmail.com', target: '_blank', label: 'Email' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 px-4 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
          Get In Touch
        </h2>
        <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8 rounded-full"></div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Ready to start your next project? Let's collaborate and create something amazing together.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className={`space-y-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}>
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Let's start a conversation
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              I'm always interested in new opportunities, whether it's a full-time position, 
              freelance project, or just a chat about technology and innovation. 
              Feel free to reach out!
            </p>
          </div>

          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <Card
                key={item.title}
                className={`glass-card border-glass-border hover:scale-105 transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <a
                    href={item.href}
                    className="flex items-center space-x-4 group"
                  >
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="pt-8">
            <h4 className="font-semibold mb-4 text-foreground">Follow me on social media</h4>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300 pulse-glow"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <Card className={`glass-card border-glass-border transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="glass-card bg-muted/10 border-border focus:border-primary"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="glass-card bg-muted/10 border-border focus:border-primary"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-foreground">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="glass-card bg-muted/10 border-border focus:border-primary"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="glass-card bg-muted/10 border-border focus:border-primary resize-none"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full glow-button bg-gradient-primary hover:scale-105 text-primary-foreground py-3"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;