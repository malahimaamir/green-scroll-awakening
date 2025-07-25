import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Leaf, TreePine } from 'lucide-react';
import Forest3D from '../Forest3D';
import heroForest from '@/assets/hero-forest.jpg';

interface HeroSectionProps {
  onScrollToNext: () => void;
}

export default function HeroSection({ onScrollToNext }: HeroSectionProps) {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroForest})` }}
      />
      
      {/* 3D Forest Overlay */}
      <div className="absolute inset-0 z-10 opacity-60">
        <Forest3D />
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-background/40 z-20" />
      
      {/* Falling Leaves Animation */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute leaf-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            <Leaf className="w-6 h-6 text-accent/60 animate-leaf-sway" />
          </div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="relative z-30 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-forest-gradient rounded-full flex items-center justify-center shadow-glow animate-pulse-glow">
                <TreePine className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold mb-4">
              <span className="text-forest-gradient">EcoVerse</span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-light text-accent mb-2">
              The Green Awakening
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Journey through an immersive digital forest where every scroll plants hope, 
            every mission saves trees, and every action awakens the green guardian within you.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button variant="eco" size="lg" className="text-lg px-8 py-6">
              <TreePine className="w-5 h-5 mr-2" />
              Begin Your Eco Journey
            </Button>
            
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Leaf className="w-5 h-5 mr-2" />
              Plant Your First Tree
            </Button>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={onScrollToNext}
          >
            <div className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-accent transition-organic">
              <span className="text-sm font-medium">Explore the Forest</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowDown className="w-6 h-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}