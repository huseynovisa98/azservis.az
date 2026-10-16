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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#161C2E]/90 border border-cyan-500/20 text-[11px] font-mono tracking-widest text-[#00F0FF] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
            {t.hero.kicker}
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.08] [text-wrap:balance]">
            {t.hero.headline}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            {t.hero.subheadline}
          </p>
        </div>

        {/* 3D Machinery Viewport Area */}
        <div className="w-full relative rounded-2xl border border-slate-800 bg-[#161C2E]/40 backdrop-blur-sm overflow-hidden shadow-2xl my-2">
          {/* Subtle Corner Reticles */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00F0FF]/40 pointer-events-none z-10" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00F0FF]/40 pointer-events-none z-10" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00F0FF]/40 pointer-events-none z-10" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00F0FF]/40 pointer-events-none z-10" />

          {/* Three.js Canvas */}
          <ThreeCanvas
            scrollProgress={scrollProgress}
            activeHotspotId={activeHotspotId}
            onSelectHotspot={setActiveHotspotId}
            lang={currentLang}
          />
        </div>

        {/* Floating Glassmorphic Quick-Diagnostic Bar */}
        <div className="w-full max-w-4xl mt-6 p-2.5 sm:p-3 bg-[#161C2E]/90 backdrop-blur-xl border border-cyan-500/25 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 flex-1">
              {(['kombi', 'kondisioner', 'meiset', 'senaye'] as ServiceCategory[]).map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => onSelectCategory(cat)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                    }`}
                  >
                    {categoryIcons[cat]}
                    <span className="truncate">{t.categories[cat].label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Diagnostic Detail & CTA Button */}
            <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800 shrink-0">
              <div className="text-left hidden sm:block">
                <div className="text-[10px] uppercase font-mono text-slate-400">
                  {t.quickBar.detectedFault}
                </div>
                <div className="text-xs font-medium text-slate-200 truncate max-w-[200px]">
                  {categoryPricingPreview[selectedCategory].fault}
                </div>
              </div>

              <div className="text-left hidden lg:block border-l border-slate-800 pl-3">
                <div className="text-[10px] uppercase font-mono text-slate-400">
                  {t.quickBar.estCostFrom}
                </div>
                <div className="text-xs font-mono font-bold text-[#00F0FF] tabular-nums">
                  {categoryPricingPreview[selectedCategory].fromAzn} ₼-dan
                </div>
              </div>

              <button
                onClick={() => onOpenDispatchWithCategory(selectedCategory)}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#00F0FF] hover:bg-[#38bdf8] rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_28px_rgba(0,240,255,0.7)] flex items-center justify-center gap-2 cursor-pointer active:scale-95 whitespace-nowrap"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>{t.quickBar.callMasterBtn}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Real-Time Live Trust Metrics Bar (Adjacent Proof) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl mt-6">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[#161C2E]/50 border border-slate-800/80">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#10B981] shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">
                {t.hero.activeMastersOnline}
              </div>
              <div className="text-[11px] text-slate-400">
                Yasamal, Nərimanov, Xətai və 9 rayonda
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-[#161C2E]/50 border border-slate-800/80">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#00F0FF] shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">
                {t.hero.averageArrivalTime}
              </div>
              <div className="text-[11px] text-slate-400">
                GPS monitorinqli mobil laboratoriyalar
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-[#161C2E]/50 border border-slate-800/80">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">
                {t.hero.warrantyDuration}
              </div>
              <div className="text-[11px] text-slate-400">
                Hər təmirə rəsmi möhürlü akt və talon
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-8 flex flex-col items-center text-slate-500 text-xs font-mono animate-bounce">
          <span>{t.hero.scrollHint}</span>
          <ChevronDown className="w-4 h-4 text-[#00F0FF] mt-1" />
        </div>
      </div>
    </section>
  );
};
