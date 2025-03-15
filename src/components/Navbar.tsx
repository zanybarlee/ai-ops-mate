
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'AI Assistant', path: '/chat' },
    { name: 'Knowledge Base', path: '/knowledge' }
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300",
        isScrolled ? "py-3 glass shadow-glass" : "py-5 bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold">A</span>
          </span>
          <span className="text-xl font-semibold">AIOps</span>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={cn(
                  "text-sm font-medium hover:text-primary transition-colors duration-300",
                  location.pathname === link.path ? "text-primary" : "text-foreground/80"
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button className="button-animation">Get Started</Button>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="block md:hidden" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass shadow-glass px-6 py-4 animate-slide-down">
          <ul className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={cn(
                    "text-sm font-medium block py-2 hover:text-primary transition-colors duration-300",
                    location.pathname === link.path ? "text-primary" : "text-foreground/80"
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button className="w-full button-animation">Get Started</Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
