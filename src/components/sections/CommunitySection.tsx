import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share2, Leaf, Camera, Award } from 'lucide-react';

const communityPosts = [
  {
    id: 1,
    user: {
      name: "Maya Rodriguez",
      avatar: "/api/placeholder/40/40",
      level: "Green Guardian",
      trees: 247
    },
    content: "Just completed my 30-day water conservation challenge! Reduced my household water usage by 40% through simple changes. Every drop counts! 💧",
    image: "/api/placeholder/400/300",
    likes: 156,
    comments: 23,
    shares: 12,
    timestamp: "2 hours ago",
    tags: ["WaterConservation", "30DayChallenge", "EcoWarrior"]
  },
  {
    id: 2,
    user: {
      name: "Alex Chen",
      avatar: "/api/placeholder/40/40",
      level: "Forest Protector",
      trees: 89
    },
    content: "My community garden is thriving! Started from seed donations from EcoVerse members. Growing food locally = less transportation emissions. Who wants to start a garden in their area? 🌱",
    image: "/api/placeholder/400/300",
    likes: 234,
    comments: 45,
    shares: 67,
    timestamp: "4 hours ago",
    tags: ["CommunityGarden", "LocalFood", "Sustainability"]
  },
  {
    id: 3,
    user: {
      name: "Jordan Taylor",
      avatar: "/api/placeholder/40/40",
      level: "Eco Innovator",
      trees: 432
    },
    content: "Built a solar phone charger from recycled materials! Tutorial coming soon. Love how EcoVerse missions inspire real-world innovation. ☀️",
    image: "/api/placeholder/400/300",
    likes: 189,
    comments: 34,
    shares: 28,
    timestamp: "6 hours ago",
    tags: ["SolarPower", "DIY", "Innovation", "RecycledMaterials"]
  },
  {
    id: 4,
    user: {
      name: "Sam Williams",
      avatar: "/api/placeholder/40/40",
      level: "Tree Whisperer",
      trees: 156
    },
    content: "Organized a beach cleanup with my EcoVerse friends! Collected 127 pounds of plastic waste. The ocean is cleaner because we acted together! 🌊",
    image: "/api/placeholder/400/300",
    likes: 298,
    comments: 52,
    shares: 84,
    timestamp: "8 hours ago",
    tags: ["BeachCleanup", "PlasticFree", "CommunityAction"]
  }
];

export default function CommunitySection() {
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
            The <span className="text-forest-gradient">EcoWall</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Share your green journey, inspire others, and connect with like-minded eco-warriors from around the world. 
            Every story shared plants seeds of change in someone else's heart.
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <Card className="p-4 text-center bg-card/80 backdrop-blur-sm border-primary/20">
            <div className="text-2xl font-bold text-secondary mb-1">47.2k</div>
            <div className="text-xs text-muted-foreground">Active Members</div>
          </Card>
          <Card className="p-4 text-center bg-card/80 backdrop-blur-sm border-primary/20">
            <div className="text-2xl font-bold text-accent mb-1">1.2M</div>
            <div className="text-xs text-muted-foreground">Posts Shared</div>
          </Card>
          <Card className="p-4 text-center bg-card/80 backdrop-blur-sm border-primary/20">
            <div className="text-2xl font-bold text-green-400 mb-1">892</div>
            <div className="text-xs text-muted-foreground">Projects Started</div>
          </Card>
          <Card className="p-4 text-center bg-card/80 backdrop-blur-sm border-primary/20">
            <div className="text-2xl font-bold text-orange-400 mb-1">156</div>
            <div className="text-xs text-muted-foreground">Countries</div>
          </Card>
        </motion.div>

        {/* Create Post Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar>
                <AvatarImage src="/api/placeholder/40/40" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="w-full p-3 bg-muted/50 rounded-lg text-muted-foreground cursor-pointer hover:bg-muted/70 transition-organic">
                  Share your green journey with the community...
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Photo
                </Button>
                <Button variant="ghost" size="sm">
                  <Leaf className="w-4 h-4 mr-2" />
                  Mission
                </Button>
                <Button variant="ghost" size="sm">
                  <Award className="w-4 h-4 mr-2" />
                  Achievement
                </Button>
              </div>
              <Button variant="eco" size="sm">
                Share Green Story
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Community Posts */}
        <div className="space-y-6">
          {communityPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
            >
              <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-organic">
                {/* Post Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src={post.user.avatar} />
                    <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-foreground">{post.user.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {post.user.level}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{post.timestamp}</span>
                      <span className="flex items-center">
                        <Leaf className="w-3 h-3 mr-1 text-secondary" />
                        {post.user.trees} trees
                      </span>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-foreground leading-relaxed mb-3">{post.content}</p>
                  {post.image && (
                    <div className="rounded-lg overflow-hidden bg-muted/20 h-64 flex items-center justify-center">
                      <span className="text-muted-foreground">📷 Eco Image</span>
                    </div>
                  )}
                </div>

                {/* Post Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-muted-foreground hover:text-red-400 transition-organic">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-muted-foreground hover:text-blue-400 transition-organic">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-muted-foreground hover:text-green-400 transition-organic">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">{post.shares}</span>
                    </button>
                  </div>
                  <Button variant="ghost" size="sm">
                    Follow
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="px-12">
            Load More Green Stories
          </Button>
        </motion.div>
      </div>
    </section>
  );
}