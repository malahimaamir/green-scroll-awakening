import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingDown, TrendingUp, Globe, Zap } from 'lucide-react';

const globalStats = [
  {
    icon: Globe,
    title: "Global CO₂ Levels",
    current: "415 ppm",
    target: "350 ppm",
    progress: 78,
    trend: "down",
    description: "Working toward pre-industrial levels"
  },
  {
    icon: TrendingUp,
    title: "Reforestation Progress",
    current: "2.3M",
    target: "10M",
    progress: 23,
    trend: "up",
    description: "Trees planted this year globally"
  },
  {
    icon: Zap,
    title: "Renewable Energy",
    current: "28%",
    target: "100%",
    progress: 28,
    trend: "up",
    description: "Of global energy production"
  },
  {
    icon: TrendingDown,
    title: "Deforestation Rate",
    current: "-47%",
    target: "-90%",
    progress: 52,
    trend: "down",
    description: "Reduction from peak levels"
  }
];

const communityStats = [
  { label: "EcoVerse Members", value: "127,431", change: "+12.3%" },
  { label: "Virtual Trees Planted", value: "2,847,592", change: "+28.7%" },
  { label: "Missions Completed", value: "89,234", change: "+45.2%" },
  { label: "Real Trees Funded", value: "15,847", change: "+156.3%" },
  { label: "CO₂ Offset (tons)", value: "47,291", change: "+67.8%" },
  { label: "Active Green Warriors", value: "34,782", change: "+23.1%" }
];

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Global <span className="text-forest-gradient">Eco Stats</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Track real-time environmental data and see how our collective actions are creating 
            measurable change across the planet. Every mission completed moves these numbers.
          </p>
        </motion.div>

        {/* Global Environmental Stats */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {globalStats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
            const trendColor = stat.trend === 'up' ? 'text-green-400' : 'text-orange-400';
            
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-organic group hover:scale-105">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{stat.title}</h3>
                        <p className="text-sm text-muted-foreground">{stat.description}</p>
                      </div>
                    </div>
                    <TrendIcon className={`w-5 h-5 ${trendColor}`} />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-2xl font-bold text-foreground">{stat.current}</div>
                        <div className="text-sm text-muted-foreground">Current</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-accent">{stat.target}</div>
                        <div className="text-sm text-muted-foreground">Target</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">{stat.progress}%</span>
                      </div>
                      <Progress 
                        value={stat.progress} 
                        className="h-2"
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Community Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="p-8 bg-forest-gradient">
            <h3 className="text-3xl font-display font-bold text-primary-foreground text-center mb-8">
              EcoVerse Community Impact
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {communityStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary-foreground/80 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-accent font-semibold">
                    {stat.change} this month
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-8 p-6 bg-primary-foreground/10 rounded-xl">
              <p className="text-primary-foreground/90 text-lg">
                <span className="font-bold text-accent">🌍 Together, we've offset the carbon footprint of 23,645 cars for a full year!</span>
              </p>
              <p className="text-primary-foreground/70 text-sm mt-2">
                That's equivalent to removing every car from a small city. Keep up the amazing work!
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Real-time ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 p-4 bg-muted/30 rounded-xl"
        >
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground overflow-hidden">
            <div className="flex items-center space-x-2 animate-pulse">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>🌱 Tree planted 3 seconds ago</span>
            </div>
            <div className="flex items-center space-x-2 animate-pulse">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>💧 Water mission completed</span>
            </div>
            <div className="flex items-center space-x-2 animate-pulse">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>♻️ Recycling challenge shared</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}