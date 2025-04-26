import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import DailyVerse from '@/components/DailyVerse';
import FeaturedCollections from '@/components/FeaturedCollections';
import MasnaviSection from '@/components/MasnaviSection';
import DivanSection from '@/components/DivanSection';
import AboutRumi from '@/components/AboutRumi';
import useScrollAnimation from '@/hooks/use-scroll-animation';
import ThemeProvider from '@/hooks/use-theme';

const Home = () => {
  const { observerRef } = useScrollAnimation();
  
  // Update page title
  useEffect(() => {
    document.title = 'Балхӣ - Осори Мавлоно Ҷалолуддини Балхӣ';
  }, []);
  
  return (
    <ThemeProvider>
      <div className="container mx-auto px-4 py-8">
        <HeroSection />
        <DailyVerse />
        <FeaturedCollections />
        <MasnaviSection />
        <DivanSection />
        <AboutRumi />
      </div>
    </ThemeProvider>
  );
};

export default Home;
