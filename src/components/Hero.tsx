
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px'
    };
    
    const fadeInElements = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(fadeInElements, observerOptions);
    
    if (headingRef.current) {
      observer.observe(headingRef.current);
    }
    if (subheadingRef.current) {
      observer.observe(subheadingRef.current);
    }
    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const openVideo = () => setShowVideo(true);
  const closeVideo = () => setShowVideo(false);

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-6 min-h-screen flex items-center">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-4 inline-block">
          <span className="inline-block py-2 px-4 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
            Enterprise AI for Data Centers
          </span>
        </div>
        
        <h1 
          ref={headingRef}
          className="mb-6 opacity-0 transform translate-y-8 transition-all duration-700 delay-300 text-balance"
        >
          <span className="block">AI-Powered Intelligence for</span>
          <span className="text-primary">Data Center Operations</span>
        </h1>
        
        <p 
          ref={subheadingRef}
          className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/80 mb-10 opacity-0 transform translate-y-8 transition-all duration-700 delay-500 text-balance"
        >
          Enhance operational efficiency with our cutting-edge AI agent that provides intelligent incident resolution, dynamic knowledge management, and predictive maintenance.
        </p>
        
        <div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 transform translate-y-8 transition-all duration-700 delay-700"
        >
          <Link to="/dashboard">
            <Button size="lg" className="button-animation">
              Explore Dashboard
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
          <Link to="/chat">
            <Button size="lg" variant="outline" className="button-animation">
              Try AI Assistant
            </Button>
          </Link>
        </div>
        
        <div className="mt-20 relative">
          <div className="glass-card p-1 overflow-hidden rounded-2xl">
            <div className="bg-secondary/50 rounded-xl p-4 md:p-6 aspect-video relative">
              {showVideo ? (
                <div className="relative w-full h-full">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background" 
                    onClick={closeVideo}
                  >
                    <X size={16} />
                  </Button>
                  <iframe 
                    className="w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/sAAvabgueOY?autoplay=1"
                    title="AI Ops Demo Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="w-full h-full rounded-lg bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center cursor-pointer" onClick={openVideo}>
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white">▶</span>
                      </div>
                    </div>
                    <p className="text-sm font-medium">Watch Demo</p>
                  </div>
                </div>
              )}
              
              {/* Decorative elements */}
              <div className="absolute top-[20%] left-[15%] w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-[20%] right-[15%] w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
            </div>
          </div>
          
          {/* Floating badge */}
          <div className="absolute -top-6 left-[5%] animate-float">
            <div className="glass-card py-2 px-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-xs font-medium">Incident Resolution</span>
              </div>
            </div>
          </div>
          
          {/* Floating badge */}
          <div className="absolute -bottom-6 right-[10%] animate-float delay-200">
            <div className="glass-card py-2 px-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-xs font-medium">Predictive Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
