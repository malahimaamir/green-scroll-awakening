import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TreePine, Recycle, Droplets, Sun, Award, Clock } from 'lucide-react';

const missions = [
  {
    id: 1,
    title: "Plant a Digital Tree",
    description: "Complete your profile and plant your first virtual tree in our growing digital forest.",
    icon: TreePine,
    difficulty: "Easy",
    points: 50,
    timeEstimate: "5 min",
    status: "available",
    category: "Getting Started"
  },
  {
    id: 2,
    title: "Recycle Challenge",
    description: "Upload a photo of your recycling efforts and inspire others to reduce waste.",
    icon: Recycle,
    difficulty: "Medium",
    points: 100,
    timeEstimate: "15 min",
    status: "available",
    category: "Action"
  },
  {
    id: 3,
    title: "Water Conservation Hero",
    description: "Track your water-saving activities for a week and share your conservation tips.",
    icon: Droplets,
    difficulty: "Hard",
    points: 200,
    timeEstimate: "7 days",
    status: "locked",
    category: "Weekly Challenge"
  },
  {
    id: 4,
    title: "Solar Energy Advocate",
    description: "Learn about renewable energy and share a fact about solar power with the community.",
    icon: Sun,
    difficulty: "Easy",
    points: 75,
    timeEstimate: "10 min",
    status: "available",
    category: "Education"
  },
  {
    id: 5,
    title: "Eco Warrior Badge",
    description: "Complete 5 missions this month to earn your special Eco Warrior recognition.",
    icon: Award,
    difficulty: "Epic",
    points: 500,
    timeEstimate: "1 month",
    status: "locked",
    category: "Achievement"
  },
  {
    id: 6,
    title: "Daily Green Habit",
    description: "Commit to one sustainable practice and track it for 30 days straight.",
    icon: Clock,
    difficulty: "Medium",
    points: 300,
    timeEstimate: "30 days",
    status: "available",
    category: "Habit Building"
  }
];

const difficultyColors = {
  Easy: "bg-green-500/20 text-green-400 border-green-500/30",
  Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Hard: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Epic: "bg-purple-500/20 text-purple-400 border-purple-500/30"
};

export default function MissionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
            <span className="text-forest-gradient">Daily Green</span> Missions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your daily routine into meaningful environmental action. Complete missions, 
            earn points, and watch your digital forest grow with every green choice you make.
          </p>
        </motion.div>

        {/* Mission Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-primary/20">
            <div className="text-3xl font-bold text-accent mb-2">247</div>
            <div className="text-sm text-muted-foreground">Trees Planted</div>
          </Card>
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-primary/20">
            <div className="text-3xl font-bold text-secondary mb-2">1,850</div>
            <div className="text-sm text-muted-foreground">Eco Points Earned</div>
          </Card>
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-primary/20">
            <div className="text-3xl font-bold text-forest-gradient mb-2">12</div>
            <div className="text-sm text-muted-foreground">Missions Completed</div>
          </Card>
        </motion.div>

        {/* Missions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission, index) => {
            const Icon = mission.icon;
            const isLocked = mission.status === 'locked';
            
            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className={`p-6 h-full transition-organic group hover:scale-105 ${
                  isLocked 
                    ? 'bg-muted/50 border-muted opacity-60' 
                    : 'bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 cursor-pointer'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isLocked ? 'bg-muted' : 'bg-secondary/20'
                    }`}>
                      <Icon className={`w-6 h-6 ${isLocked ? 'text-muted-foreground' : 'text-secondary'}`} />
                    </div>
                    <Badge 
                      variant="outline" 
                      className={difficultyColors[mission.difficulty as keyof typeof difficultyColors]}
                    >
                      {mission.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="mb-4">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {mission.category}
                    </Badge>
                    <h3 className={`text-lg font-semibold mb-2 ${isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {mission.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${isLocked ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                      {mission.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {mission.timeEstimate}
                    </span>
                    <span className={`font-bold ${isLocked ? 'text-muted-foreground' : 'text-accent'}`}>
                      +{mission.points} pts
                    </span>
                  </div>
                  
                  <Button 
                    variant={isLocked ? "ghost" : "forest"} 
                    className="w-full"
                    disabled={isLocked}
                  >
                    {isLocked ? '🔒 Locked' : 'Start Mission'}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Card className="p-8 bg-sunrise-gradient">
            <h3 className="text-2xl font-bold text-accent-foreground mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-accent-foreground/80 mb-6 max-w-2xl mx-auto">
              Join thousands of eco-warriors who are turning small daily actions into massive environmental impact. 
              Your journey to a greener planet starts with a single mission.
            </p>
            <Button variant="forest" size="lg" className="bg-background/90 text-foreground hover:bg-background">
              <TreePine className="w-5 h-5 mr-2" />
              Join the Green Revolution
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}