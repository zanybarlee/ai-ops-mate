
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Activity, Database, LineChart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import ChatInterface from '@/components/ChatInterface';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        {/* Features Section */}
        <section className="py-20 px-6 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block py-2 px-4 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Key Features
              </span>
              <h2 className="text-4xl font-medium mb-4">Intelligent Solutions for<br />Data Center Excellence</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
                Our AI-powered platform provides a comprehensive suite of tools to optimize data center operations, automate incident resolution, and enable predictive maintenance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard 
                title="AI-Driven Incident Diagnosis"
                description="Automated analysis of error logs and alerts to quickly identify root causes and suggest resolutions."
                icon={<Activity size={20} />}
                delay={100}
              />
              <FeatureCard 
                title="Interactive Support Chatbot"
                description="Natural language processing for technical support queries and incident reporting."
                icon={<Bot size={20} />}
                delay={200}
              />
              <FeatureCard 
                title="Dynamic Knowledge Base"
                description="Self-updating repository of troubleshooting guides and historical incident resolutions."
                icon={<Database size={20} />}
                delay={300}
              />
              <FeatureCard 
                title="Predictive Maintenance"
                description="Analytics-driven predictions to identify potential failures before they occur."
                icon={<LineChart size={20} />}
                delay={400}
              />
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="button-animation">
                  Explore All Features
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* AI Assistant Demo Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block py-2 px-4 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  AI Assistant
                </span>
                <h2 className="text-4xl font-medium mb-6">Experience Intelligent<br />Technical Support</h2>
                <p className="text-muted-foreground mb-8 text-balance">
                  Our AI Operations Assistant utilizes advanced natural language processing to understand complex technical queries and provide accurate, contextual support for data center issues.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {[
                    'Natural language incident reporting and resolution',
                    'Contextual recommendations from historical data',
                    'Automatic documentation and knowledge base updates',
                    'Seamless escalation to human support when needed'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 mt-1 text-primary">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/chat">
                  <Button size="lg" className="button-animation">
                    Try AI Assistant
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl transform rotate-3 scale-[0.97] blur-lg opacity-70"></div>
                <ChatInterface />
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 bg-primary/[0.03]">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-medium mb-6">Ready to Transform Your<br />Data Center Operations?</h2>
            <p className="text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
              Join forward-thinking organizations that use our AI-powered platform to reduce incident resolution times by 30% and improve operational efficiency.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="button-animation">
                Get Started
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="button-animation">
                Request Demo
              </Button>
            </div>
            
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { stat: '30%', label: 'Reduction in Incident Resolution Time' },
                { stat: '25%', label: 'Decrease in Unplanned Downtime' },
                { stat: '40%', label: 'Faster Root Cause Analysis' },
                { stat: '15%', label: 'Reduction in Operational Costs' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{item.stat}</div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
