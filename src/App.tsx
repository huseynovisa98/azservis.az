import React, { useState, useEffect } from 'react';
import { Language, ServiceCategory } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProcessSection } from './components/ProcessSection';
import { EstimatorSection } from './components/EstimatorSection';
import { BentoServicesSection } from './components/BentoServicesSection';
import { DispatchDrawer } from './components/DispatchDrawer';
import { Footer } from './components/Footer';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('az');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('kombi');
  const [isDispatchOpen, setIsDispatchOpen] = useState<boolean>(false);
  const [quotePayload, setQuotePayload] = useState<{
    category: string;
    appliance: string;
    issue: string;
    district: string;
    totalAzn: number;
    urgency: string;
  } | null>(null);

  // Track window scroll progress for 3D explosion choreography
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 1.2;
      // Map scrollY from 0 to heroHeight to 0.0 - 1.0
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1.0);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenDispatch = () => {
    setQuotePayload(null);
    setIsDispatchOpen(true);
  };

  const handleOpenDispatchWithCategory = (cat: ServiceCategory) => {
    setSelectedCategory(cat);
    setQuotePayload(null);
    setIsDispatchOpen(true);
  };

  const handleOpenDispatchWithQuote = (quoteData: {
    category: string;
    appliance: string;
    issue: string;
    district: string;
    totalAzn: number;
    urgency: string;
  }) => {
    setQuotePayload(quoteData);
    setIsDispatchOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-[#00F0FF]/30 selection:text-[#00F0FF]">
      {/* Top Bar adhering to Top Bar Contract */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenDispatch={handleOpenDispatch}
      />

      <main className="flex-1">
        {/* Full-screen Hero Banner with 3D Exploded Engine & Quick Diagnostic Bar */}
        <HeroSection
          currentLang={currentLang}
          scrollProgress={scrollProgress}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenDispatchWithCategory={handleOpenDispatchWithCategory}
        />

        {/* 4-Step Interactive Process Bar */}
        <ProcessSection currentLang={currentLang} />

        {/* Dynamic Service Fee Estimator Widget */}
        <EstimatorSection
          currentLang={currentLang}
          onOpenDispatchWithQuote={handleOpenDispatchWithQuote}
        />

        {/* Bento-Grid Layout for Featured Services */}
        <BentoServicesSection
          currentLang={currentLang}
          onSelectCategoryForDispatch={handleOpenDispatchWithCategory}
        />
      </main>

      {/* High-Tech Editorial Footer */}
      <Footer
        currentLang={currentLang}
        onOpenDispatch={handleOpenDispatch}
      />

      {/* Technician Dispatch Slide-Over Drawer */}
      <DispatchDrawer
        isOpen={isDispatchOpen}
        onClose={() => setIsDispatchOpen(false)}
        currentLang={currentLang}
        initialCategory={quotePayload ? quotePayload.category : selectedCategory}
        initialIssue={quotePayload ? quotePayload.issue : ''}
        initialDistrict={quotePayload ? quotePayload.district : 'Yasamal'}
        initialEstimatedAzn={quotePayload ? quotePayload.totalAzn : undefined}
      />
    </div>
  );
}
