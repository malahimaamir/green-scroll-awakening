import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { TreePine, Droplets, Wind, Sun } from 'lucide-react';

const reasons = [
  {
    icon: TreePine,
    title: "Oxygen Generation",
    description: "A single mature tree produces enough oxygen for two people per day. Our forests are Earth's lungs.",
    stat: "20+ trees = 1 person's yearly oxygen",
    color: "text-secondary"
  },
  {
    icon: Droplets,
    title: "Water Cycle Balance",
    description: "Trees regulate water flow, prevent floods, and maintain groundwater levels through their root systems.",
    stat: "100 trees = 1 million gallons filtered",
    color: "text-blue-400"
  },
  {
    icon: Wind,
    title: "Carbon Absorption",
    description: "Trees are natural carbon sinks, absorbing CO₂ and helping combat climate change globally.",
    stat: "1 tree = 50lbs CO₂ absorbed yearly",
    color: "text-accent"
  },
  {
    icon: Sun,
    title: "Climate Regulation",
    description: "Forest canopies provide shade, reduce urban heat islands, and moderate local temperatures.",
    stat: "Trees reduce temperature by 2-10°F",
    color: "text-orange-400"
  }
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
            Why We <span className="text-forest-gradient">Save Trees</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Every tree is a guardian of life, a silent hero working tirelessly to heal our planet. 
            Discover the magnificent ways forests sustain all life on Earth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="p-6 h-full bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-organic group hover:scale-105">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-organic ${reason.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-foreground">
                        {reason.title}
                      </h3>
                      <p className="text-muted-foreground mb-3 leading-relaxed">
                        {reason.description}
                      </p>
                      <div className={`font-bold text-sm ${reason.color}`}>
                        {reason.stat}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Impactful Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-forest-gradient rounded-3xl p-8 md:p-12 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-8">
            The Urgent Reality
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-primary-foreground">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">15B</div>
              <div className="text-lg opacity-90">Trees cut down yearly</div>
            </div>
            <div className="text-primary-foreground">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">46%</div>
              <div className="text-lg opacity-90">Forest cover lost since humans</div>
            </div>
            <div className="text-primary-foreground">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">3T</div>
              <div className="text-lg opacity-90">Trees exist today (was 6T)</div>
            </div>
          </div>
          <p className="text-lg text-primary-foreground/80 mt-8 max-w-2xl mx-auto">
            But together, we can reverse this trend. Every action in EcoVerse contributes to real-world 
            reforestation projects and environmental awareness.
          </p>
        </motion.div>
      </div>
    </section>
  );
}