import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import MissionsSection from '@/components/sections/MissionsSection';
import StatsSection from '@/components/sections/StatsSection';
import CommunitySection from '@/components/sections/CommunitySection';
import ContactSection from '@/components/sections/ContactSection';
import FloatingTreeButton from '@/components/FloatingTreeButton';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');

  // Function to scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Function to scroll to next section
  const scrollToNext = () => {
    const sections = ['hero', 'about', 'missions', 'stats', 'community', 'contact'];
    const currentIndex = sections.indexOf(activeSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    scrollToSection(sections[nextIndex]);
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'missions', 'stats', 'community', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onSectionClick={scrollToSection} />
      
      <div id="hero">
        <HeroSection onScrollToNext={scrollToNext} />
      </div>
      
      <div id="about">
        <AboutSection />
      </div>
      
      <div id="missions">
        <MissionsSection />
      </div>
      
      <div id="stats">
        <StatsSection />
      </div>
      
      <div id="community">
        <CommunitySection />
      </div>
      
      <div id="contact">
        <ContactSection />
      </div>

      <FloatingTreeButton />
    </div>
  );
};

export default Index;
