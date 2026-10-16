import React from 'react';
import { Language, ServiceCategory } from '../types';
import { translations } from '../i18n/translations';
import {
  Flame,
  Wind,
  Cpu,
  Factory,
  Truck,
  CheckCircle,
  Wrench,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

interface BentoServicesSectionProps {
  currentLang: Language;
  onSelectCategoryForDispatch: (cat: ServiceCategory) => void;
}

export const BentoServicesSection: React.FC<BentoServicesSectionProps> = ({
  currentLang,
  onSelectCategoryForDispatch,
}) => {
  const t = translations[currentLang];
  const b = t.bento;

  return (
    <section id="services" className="py-20 relative bg-[#0B0F19] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#161C2E] border border-cyan-500/20 text-[11px] font-mono tracking-widest text-[#00F0FF] mb-3">
            {b.sectionKicker}
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
            {b.title}
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            {b.subtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Card 1: Large Marquee Kombi Card (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#161C2E]/90 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group hover:shadow-[0_10px_35px_rgba(0,240,255,0.15)] shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <Flame className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#0B0F19] border border-orange-500/40 text-xs sm:text-sm font-mono text-orange-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                  {b.kombiCard.badge}
                </div>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-normal text-[#F8FAFC] mb-3 group-hover:text-[#00F0FF] transition-colors">
                {b.kombiCard.title}
              </h3>
              <p className="text-slate-100 text-base leading-relaxed mb-5 font-normal">
                {b.kombiCard.desc}
              </p>

              {/* Supported brands */}
              <div className="text-sm font-mono text-slate-200 mb-6 pb-4 border-b border-slate-700">
                <span className="text-slate-300 font-semibold">Xidmət olunan markalar: </span>
                <span className="text-white font-medium">{b.kombiCard.models}</span>
              </div>

              {/* Features list - Zero Truncation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {b.kombiCard.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0B0F19]/90 border border-slate-700 text-sm text-[#F8FAFC] font-medium leading-snug"
                  >
                    <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-5 border-t border-slate-800 flex items-center justify-between">
              <span className="text-sm font-mono text-slate-200 font-medium">İlkin baxış: Pulsuz</span>
              <button
                onClick={() => onSelectCategoryForDispatch('kombi')}
                className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#00F0FF] hover:text-white transition-colors cursor-pointer"
              >
                <span>Usta Təyin Et</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Climate & VRF Card (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#161C2E]/90 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group hover:shadow-[0_10px_35px_rgba(0,240,255,0.15)] shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-[#00F0FF]">
                  <Wind className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#0B0F19] border border-cyan-500/40 text-xs sm:text-sm font-mono text-[#00F0FF] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
                  {b.climateCard.badge}
                </div>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#F8FAFC] mb-3 group-hover:text-[#00F0FF] transition-colors">
                {b.climateCard.title}
              </h3>
              <p className="text-slate-100 text-base leading-relaxed mb-5 font-normal">
                {b.climateCard.desc}
              </p>

              <div className="text-sm font-mono text-slate-200 mb-5 pb-4 border-b border-slate-700">
                <span className="text-slate-300 font-semibold">Brendlər: </span>
                <span className="text-white font-medium">{b.climateCard.models}</span>
              </div>

              <div className="space-y-2.5">
                {b.climateCard.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-sm text-[#F8FAFC] font-medium"
                  >
                    <CheckCircle className="w-4 h-4 text-[#00F0FF] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-5 border-t border-slate-800 flex items-center justify-between">
              <span className="text-sm font-mono text-slate-200 font-medium">Freon zəmanəti: 12 Ay</span>
              <button
                onClick={() => onSelectCategoryForDispatch('kondisioner')}
                className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#00F0FF] hover:text-white transition-colors cursor-pointer"
              >
                <span>Usta Təyin Et</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Smart Laundry & Appliances (4 cols) */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-[#161C2E]/90 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Cpu className="w-6 h-6" />
                </div>
                <div className="px-3 py-1 rounded-md bg-[#0B0F19] border border-emerald-500/40 text-xs sm:text-sm font-mono text-[#10B981] font-bold">
                  {b.laundryCard.badge}
                </div>
              </div>

              <h3 className="font-editorial text-2xl font-normal text-[#F8FAFC] mb-2.5 group-hover:text-[#00F0FF] transition-colors">
                {b.laundryCard.title}
              </h3>
              <p className="text-slate-100 text-sm sm:text-base leading-relaxed mb-4 font-normal">
                {b.laundryCard.desc}
              </p>

              <div className="space-y-2.5 text-sm text-[#F8FAFC] font-medium">
                {b.laundryCard.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-700/80 flex justify-between items-center">
              <span className="text-sm font-mono text-slate-200">Pres avadanlığı ilə</span>
              <button
                onClick={() => onSelectCategoryForDispatch('meiset')}
                className="text-sm sm:text-base font-bold text-[#00F0FF] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                Sifariş <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 4: Commercial & Industrial Systems (4 cols) */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-[#161C2E]/90 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[#10B981]">
                  <Factory className="w-6 h-6" />
                </div>
                <div className="px-3 py-1 rounded-md bg-[#0B0F19] border border-cyan-500/40 text-xs sm:text-sm font-mono text-[#00F0FF] font-bold">
                  {b.industrialCard.badge}
                </div>
              </div>

              <h3 className="font-editorial text-2xl font-normal text-[#F8FAFC] mb-2.5 group-hover:text-[#00F0FF] transition-colors">
                {b.industrialCard.title}
              </h3>
              <p className="text-slate-100 text-sm sm:text-base leading-relaxed mb-4 font-normal">
                {b.industrialCard.desc}
              </p>

              <div className="space-y-2.5 text-sm text-[#F8FAFC] font-medium">
                {b.industrialCard.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-700/80 flex justify-between items-center">
              <span className="text-sm font-mono text-slate-200">ƏDV daxil hesab-faktura</span>
              <button
                onClick={() => onSelectCategoryForDispatch('senaye')}
                className="text-sm sm:text-base font-bold text-[#00F0FF] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                Sifariş <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 5: Mobile Diagnostic Fleet (4 cols) */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#161C2E] to-[#121829] border-2 border-cyan-500/40 hover:border-cyan-500/70 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group shadow-[0_4px_25px_rgba(0,240,255,0.12)]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/25 border border-cyan-500/40 flex items-center justify-center text-[#00F0FF]">
                  <Truck className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#0B0F19] border border-emerald-500/50 text-xs sm:text-sm font-mono text-[#10B981] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  {b.mobileLabCard.badge}
                </div>
              </div>

              <h3 className="font-editorial text-2xl font-normal text-[#F8FAFC] mb-2.5 group-hover:text-[#00F0FF] transition-colors">
                {b.mobileLabCard.title}
              </h3>
              <p className="text-slate-100 text-sm sm:text-base leading-relaxed mb-4 font-normal">
                {b.mobileLabCard.desc}
              </p>

              <div className="space-y-2.5 text-sm text-[#F8FAFC] font-medium">
                {b.mobileLabCard.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#00F0FF] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-700/80 flex justify-between items-center">
              <span className="text-sm font-mono font-bold text-[#00F0FF]">GPS Təhkimatlı Briqada</span>
              <button
                onClick={() => onSelectCategoryForDispatch('meiset')}
                className="text-sm sm:text-base font-bold text-[#00F0FF] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                Çağırış <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
