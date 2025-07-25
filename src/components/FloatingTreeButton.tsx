import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TreePine, Plus, Check } from 'lucide-react';

export default function FloatingTreeButton() {
  const [isPlanted, setIsPlanted] = useState(false);
  const [treeCount, setTreeCount] = useState(247);

  const handlePlantTree = () => {
    setIsPlanted(true);
    setTreeCount(prev => prev + 1);
    
    // Reset after animation
    setTimeout(() => {
      setIsPlanted(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <div className="flex flex-col items-center space-y-2">
        {/* Tree counter */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="bg-card/90 backdrop-blur-sm border border-primary/20 rounded-full px-3 py-1 text-sm font-medium text-foreground"
        >
          🌳 {treeCount.toLocaleString()} trees
        </motion.div>
        
        {/* Main button */}
        <Button
          onClick={handlePlantTree}
          disabled={isPlanted}
          className={`w-16 h-16 rounded-full shadow-glow transition-all duration-300 ${
            isPlanted 
              ? 'bg-green-500 hover:bg-green-500' 
              : 'bg-forest-gradient hover:scale-110'
          }`}
        >
          <AnimatePresence mode="wait">
            {isPlanted ? (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Check className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="tree"
                initial={{ scale: 1 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <TreePine className="w-6 h-6 text-primary-foreground" />
                <Plus className="w-3 h-3 text-primary-foreground absolute -top-1 -right-1" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>

        {/* Success message */}
        <AnimatePresence>
          {isPlanted && (
            <motion.div
              initial={{ scale: 0, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-green-500/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap"
            >
              🌱 Tree planted!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ripple effect when planted */}
      <AnimatePresence>
        {isPlanted && (
          <motion.div
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 bg-green-400/30 rounded-full -z-10"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}