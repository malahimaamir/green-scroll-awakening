import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, TreePine, Users, MapPin, Globe } from 'lucide-react';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    interest: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactOptions = [
    {
      icon: TreePine,
      title: "Start Your Green Journey",
      description: "Ready to make a difference? Join our community of eco-warriors and plant your first digital tree.",
      action: "Join EcoVerse",
      color: "text-secondary"
    },
    {
      icon: Users,
      title: "Partner With Us",
      description: "Organizations, schools, and companies can partner with EcoVerse for large-scale environmental impact.",
      action: "Become a Partner",
      color: "text-accent"
    },
    {
      icon: MessageSquare,
      title: "Share Your Story",
      description: "Have an amazing environmental story? We'd love to feature it on our platform and inspire others.",
      action: "Share Story",
      color: "text-green-400"
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Connect with environmental projects worldwide and see how your digital actions create real change.",
      action: "Explore Impact",
      color: "text-blue-400"
    }
  ];

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 2}s`
            }}
          >
            <TreePine className="w-8 h-8 text-secondary" />
          </div>
        ))}
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Join the <span className="text-forest-gradient">Green Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to transform the world, one green action at a time? Connect with us and become part of 
            the largest digital environmental movement on the planet.
          </p>
        </motion.div>

        {/* Contact Options Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="p-6 h-full bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-organic group hover:scale-105 cursor-pointer">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-organic ${option.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-foreground">
                        {option.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {option.description}
                      </p>
                      <Button variant="ghost" className="p-0 h-auto font-semibold text-secondary hover:text-secondary/80">
                        {option.action} →
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/20">
            <div className="text-center mb-8">
              <Mail className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Get in Touch</h3>
              <p className="text-muted-foreground">
                Have questions, ideas, or want to collaborate? We'd love to hear from you!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  What interests you most?
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full p-3 bg-background/50 border border-input rounded-lg text-foreground"
                >
                  <option value="">Select an option</option>
                  <option value="joining">Joining the community</option>
                  <option value="partnership">Partnership opportunities</option>
                  <option value="education">Educational programs</option>
                  <option value="corporate">Corporate sustainability</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Message
                </label>
                <Textarea
                  placeholder="Tell us about your green vision, questions, or how you'd like to get involved..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background/50"
                />
              </div>

              <Button type="submit" variant="eco" size="lg" className="w-full">
                <TreePine className="w-5 h-5 mr-2" />
                Plant the Seed of Change
              </Button>
            </form>
          </Card>
        </motion.div>

        {/* Global Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <Card className="p-8 bg-forest-gradient">
            <h3 className="text-3xl font-display font-bold text-primary-foreground mb-6">
              🌍 Join Our Global Movement
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-primary-foreground">
                <div className="text-2xl font-bold text-accent mb-1">195</div>
                <div className="text-sm opacity-90">Countries</div>
              </div>
              <div className="text-primary-foreground">
                <div className="text-2xl font-bold text-accent mb-1">2.8M</div>
                <div className="text-sm opacity-90">Green Warriors</div>
              </div>
              <div className="text-primary-foreground">
                <div className="text-2xl font-bold text-accent mb-1">15.7M</div>
                <div className="text-sm opacity-90">Trees Planted</div>
              </div>
              <div className="text-primary-foreground">
                <div className="text-2xl font-bold text-accent mb-1">24/7</div>
                <div className="text-sm opacity-90">Impact Happening</div>
              </div>
            </div>
            
            <p className="text-primary-foreground/90 max-w-2xl mx-auto">
              Every second, someone in our community is making a green choice. 
              Every minute, new trees are being planted. Every hour, environmental awareness spreads. 
              <strong className="text-accent"> Your journey starts now.</strong>
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}