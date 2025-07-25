import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Menu, X, TreePine, Users, BarChart3, Mail, Target } from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'Home', icon: TreePine },
  { id: 'about', label: 'Why Save Trees', icon: Leaf },
  { id: 'missions', label: 'Missions', icon: Target },
  { id: 'stats', label: 'Eco Stats', icon: BarChart3 },
  { id: 'community', label: 'EcoWall', icon: Users },
  { id: 'contact', label: 'Join Us', icon: Mail },
];

interface NavigationProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export default function Navigation({ activeSection, onSectionClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-organic ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-lg border-b border-border/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-forest-gradient rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground animate-leaf-sway" />
            </div>
            <span className="text-xl font-display font-bold text-forest-gradient">
              EcoVerse
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "leaf" : "ghost"}
                  onClick={() => onSectionClick(item.id)}
                  className="relative group"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-secondary/20 rounded-lg -z-10"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </Button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-card/95 backdrop-blur-lg border-t border-border/50 overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={activeSection === item.id ? "leaf" : "ghost"}
                      onClick={() => {
                        onSectionClick(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full justify-start"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}