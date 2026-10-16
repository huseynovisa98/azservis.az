import React, { useState } from 'react';
import { Language, ServiceCategory } from '../types';
import { translations } from '../i18n/translations';
import { ThreeCanvas } from './ThreeCanvas';
import {
  Flame,
  Wind,
  Cpu,
  Factory,
  ChevronDown,
  Wrench,
  Clock,
  ShieldCheck,
  Users,
  Sparkles,
} from 'lucide-react';

interface HeroSectionProps {
  currentLang: Language;
  scrollProgress: number;
  onOpenDispatchWithCategory: (cat: ServiceCategory) => void;
  selectedCategory: ServiceCategory;
  onSelectCategory: (cat: ServiceCategory) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  scrollProgress,
  onOpenDispatchWithCategory,
  selectedCategory,
  onSelectCategory,
}) => {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const t = translations[currentLang];

  const categoryIcons: Record<ServiceCategory, React.ReactNode> = {
    kombi: <Flame className="w-4 h-4 text-orange-400" />,
    kondisioner: <Wind className="w-4 h-4 text-[#00F0FF]" />,
    meiset: <Cpu className="w-4 h-4 text-cyan-300" />,
    senaye: <Factory className="w-4 h-4 text-emerald-400" />,
  };

  const categoryPricingPreview: Record<ServiceCategory, { fromAzn: number; fault: string }> = {
    kombi: {
      fromAzn: 25,
      fault: currentLang === 'az' ? 'E01 Qaz Xətası / Pompa Sıxılması' : currentLang === 'ru' ? 'Ошибка E01 / Насос' : 'E01 Gas Fault / Pump lock',
    },
    kondisioner: {
      fromAzn: 30,
      fault: currentLang === 'az' ? 'Freon Sızması / Kompressor İşığı' : currentLang === 'ru' ? 'Утечка фреона / Компрессор' : 'Refrigerant leak / Inverter trip',
    },
    meiset: {
      fromAzn: 20,
      fault: currentLang === 'az' ? 'Baraban Silkələnməsi / Qızdırmama' : currentLang === 'ru' ? 'Вибрация барабана / ТЭН' : 'Drum vibration / Heating fault',
    },
    senaye: {
      fromAzn: 50,
      fault: currentLang === 'az' ? 'Yüksək Təzyiq / Termostat Qəzası' : currentLang === 'ru' ? 'Высокое давление / Термостат' : 'High pressure / Thermostat trip',
    },
  };

  return (
    <section id="diagnostics" className="relative min-h-screen flex flex-col justify-between pt-6 pb-12 overflow-hidden tech-grid-pattern">
      {/* High-tech radial background spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00F0FF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col items-center">
        {/* Editorial Headline & Value Kicker */}
        <div className="text-center max-w-4xl pt-6 sm:pt-10 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#161C2E] border border-cyan-500/30 text-xs font-mono tracking-widest text-[#00F0FF] font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            {t.hero.kicker}
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#F8FAFC] leading-[1.12] [text-wrap:balance]">
            {t.hero.headline}
          </h1>

          <p className="mt-4 text-base sm:text-lg lg:text-xl text-[#CBD5E1] max-w-3xl mx-auto font-normal leading-relaxed">
            {t.hero.subheadline}
          </p>
        </div>

        {/* 3D Machinery Viewport Area */}
        <div className="w-full relative rounded-2xl border border-slate-700 bg-[#161C2E]/60 backdrop-blur-sm overflow-hidden shadow-2xl my-2">
          {/* Subtle Corner Reticles */}
          <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#00F0FF]/60 pointer-events-none z-10" />
          <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#00F0FF]/60 pointer-events-none z-10" />
          <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#00F0FF]/60 pointer-events-none z-10" />
          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#00F0FF]/60 pointer-events-none z-10" />

          {/* Three.js Canvas */}
          <ThreeCanvas
            scrollProgress={scrollProgress}
            activeHotspotId={activeHotspotId}
            onSelectHotspot={setActiveHotspotId}
            lang={currentLang}
          />
        </div>

        {/* Floating Glassmorphic Quick-Diagnostic Container with Decoupled Sections */}
        <div className="w-full max-w-5xl mt-6 p-4 sm:p-5 bg-[#161C2E]/95 backdrop-blur-xl border border-cyan-500/35 rounded-2xl shadow-[0_12px_45px_rgba(0,0,0,0.6)]">
          {/* Section Header / Kicker */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 px-1">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-[#00F0FF] uppercase tracking-wider font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
              <span>{t.quickBar.selectEquipment || 'Avadanlıq Növünü Seçin'}</span>
            </div>
            <div className="text-xs sm:text-sm font-mono text-[#10B981] font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span>38 Aktiv Usta Bakı Üzrə</span>
            </div>
          </div>

          {/* Area 1: Responsive Category Tabs Grid - full width, adequate width, padding, min-w-0 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
            {(['kombi', 'kondisioner', 'meiset', 'senaye'] as ServiceCategory[]).map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`min-w-0 w-full p-3.5 sm:p-4 rounded-xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2.5 min-h-[68px] sm:min-h-[76px] border ${
                    isSelected
                      ? 'bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.25)] ring-1 ring-[#00F0FF]/50'
                      : 'bg-[#0B0F19]/80 text-[#F8FAFC] hover:text-white hover:bg-slate-800/90 border-slate-700/80 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="p-1.5 rounded-lg bg-[#161C2E] border border-slate-700/80 shrink-0">
                      {categoryIcons[cat]}
                    </span>
                    <span
                      className={`text-[11px] sm:text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-[#00F0FF]/25 text-[#00F0FF]'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {t.categories[cat].activeTechCount} Usta
                    </span>
                  </div>
                  <div className="min-w-0 w-full">
                    <span className="block text-sm sm:text-base font-bold leading-snug break-words">
                      {t.categories[cat].label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Area 2: Dedicated Diagnostic Preview & CTA Action Area (Completely separate, readable, never crowded) */}
          <div className="mt-4 pt-4 border-t border-slate-700/80 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Fault & Price Diagnostics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 flex-1 min-w-0">
              {/* Fault Item */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#0B0F19]/90 border border-slate-700/80 min-w-0">
                <div className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                  <span>{t.quickBar.detectedFault}</span>
                </div>
                <div className="text-sm sm:text-base font-semibold text-[#F8FAFC] leading-snug break-words">
                  {categoryPricingPreview[selectedCategory].fault}
                </div>
              </div>

              {/* Price Item */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#0B0F19]/90 border border-slate-700/80 min-w-0">
                <div className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span>{t.quickBar.estCostFrom}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-base sm:text-lg font-mono font-bold text-[#00F0FF] tabular-nums">
                    {categoryPricingPreview[selectedCategory].fromAzn} ₼-dan
                  </span>
                  <span className="text-xs text-[#CBD5E1]">· Rəsmi zəmanətlə</span>
                </div>
              </div>
            </div>

            {/* CTA Action Button */}
            <button
              onClick={() => onOpenDispatchWithCategory(selectedCategory)}
              className="w-full lg:w-auto px-7 py-4 text-[15px] sm:text-base font-bold uppercase tracking-wider text-slate-950 bg-[#00F0FF] hover:bg-[#38bdf8] rounded-xl transition-all duration-200 shadow-[0_0_24px_rgba(0,240,255,0.45)] hover:shadow-[0_0_34px_rgba(0,240,255,0.7)] flex items-center justify-center gap-2.5 cursor-pointer active:scale-95 shrink-0 whitespace-nowrap"
            >
              <Wrench className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              <span>{t.quickBar.callMasterBtn}</span>
            </button>
          </div>
        </div>

        {/* Real-Time Live Trust Metrics Bar (High Contrast, Readable Text) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-5xl mt-6">
          <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#161C2E]/85 border border-slate-700/80 shadow-md">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[#10B981] shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-[15px] font-semibold text-[#F8FAFC]">
                {t.hero.activeMastersOnline}
              </div>
              <div className="text-xs sm:text-sm text-[#CBD5E1] mt-0.5">
                Yasamal, Nərimanov, Xətai və 9 rayonda
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#161C2E]/85 border border-slate-700/80 shadow-md">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-[#00F0FF] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-[15px] font-semibold text-[#F8FAFC]">
                {t.hero.averageArrivalTime}
              </div>
              <div className="text-xs sm:text-sm text-[#CBD5E1] mt-0.5">
                GPS monitorinqli mobil laboratoriyalar
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#161C2E]/85 border border-slate-700/80 shadow-md">
            <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-[15px] font-semibold text-[#F8FAFC]">
                {t.hero.warrantyDuration}
              </div>
              <div className="text-xs sm:text-sm text-[#CBD5E1] mt-0.5">
                Hər təmirə rəsmi möhürlü akt və talon
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-8 flex flex-col items-center text-slate-300 text-sm font-mono animate-bounce">
          <span>{t.hero.scrollHint}</span>
          <ChevronDown className="w-4 h-4 text-[#00F0FF] mt-1" />
        </div>
      </div>
    </section>
  );
};
