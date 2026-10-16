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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-5">
          {/* Card 1: Large Marquee Kombi Card (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#161C2E]/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group hover:shadow-[0_10px_35px_rgba(0,240,255,0.1)]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <Flame className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B0F19] border border-orange-500/30 text-[11px] font-mono text-orange-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  {b.kombiCard.badge}
                </div>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                {b.kombiCard.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {b.kombiCard.desc}
              </p>

              {/* Supported brands */}
              <div className="text-xs font-mono text-slate-400 mb-5 pb-4 border-b border-slate-800">
                <span className="text-slate-500">Xidmət olunan markalar: </span>
                <span className="text-slate-200">{b.kombiCard.models}</span>
              </div>

              {/* Features list */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {b.kombiCard.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-lg bg-[#0B0F19]/60 border border-slate-800 text-xs text-slate-300"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-4 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">İlkin baxış: Pulsuz</span>
              <button
                onClick={() => onSelectCategoryForDispatch('kombi')}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#00F0FF] hover:text-white transition-colors cursor-pointer"
              >
                <span>Usta Təyin Et</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Climate & VRF Card (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#161C2E]/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group hover:shadow-[0_10px_35px_rgba(0,240,255,0.1)]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#00F0FF]">
                  <Wind className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B0F19] border border-cyan-500/30 text-[11px] font-mono text-[#00F0FF]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                  {b.climateCard.badge}
                </div>
              </div>

              <h3 className="font-editorial text-2xl font-normal text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                {b.climateCard.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {b.climateCard.desc}
              </p>

              <div className="text-xs font-mono text-slate-400 mb-4 pb-3 border-b border-slate-800">
                <span className="text-slate-500">Brendlər: </span>
                <span className="text-slate-200">{b.climateCard.models}</span>
              </div>

              <div className="space-y-2">
                {b.climateCard.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-slate-300"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-4 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">Freon zəmanəti: 12 Ay</span>
              <button
                onClick={() => onSelectCategoryForDispatch('kondisioner')}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#00F0FF] hover:text-white transition-colors cursor-pointer"
              >
                <span>Usta Təyin Et</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Smart Laundry & Appliances (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#161C2E]/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="px-2 py-0.5 rounded-md bg-[#0B0F19] border border-emerald-500/30 text-[11px] font-mono text-[#10B981]">
                  {b.laundryCard.badge}
                </div>
              </div>

              <h3 className="font-editorial text-2xl font-normal text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                {b.laundryCard.title}
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                {b.laundryCard.desc}
              </p>

              <div className="space-y-2 text-xs text-slate-300">
                {b.laundryCard.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs font-mono text-slate-500">Pres avadanlığı ilə</span>
              <button
                onClick={() => onSelectCategoryForDispatch('meiset')}
                className="text-xs font-semibold text-[#00F0FF] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                Sifariş <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: Commercial & Industrial Systems (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#161C2E]/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#10B981]">
                  <Factory className="w-5 h-5" />
                </div>
                <div className="px-2 py-0.5 rounded-md bg-[#0B0F19] border border-cyan-500/30 text-[11px] font-mono text-[#00F0FF]">
                  {b.industrialCard.badge}
                </div>
              </div>

              <h3 className="font-editorial text-2xl font-normal text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                {b.industrialCard.title}
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                {b.industrialCard.desc}
              </p>

              <div className="space-y-2 text-xs text-slate-300">
                {b.industrialCard.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs font-mono text-slate-500">ƏDV daxil hesab-faktura</span>
              <button
                onClick={() => onSelectCategoryForDispatch('senaye')}
                className="text-xs font-semibold text-[#00F0FF] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                Sifariş <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 5: Mobile Diagnostic Fleet (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-gradient-to-br from-[#161C2E] to-[#121829] border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group shadow-[0_4px_25px_rgba(0,240,255,0.08)]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-[#00F0FF]">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#0B0F19] border border-emerald-500/40 text-[11px] font-mono text-[#10B981]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  {b.mobileLabCard.badge}
                </div>
              </div>

              <h3 className="font-editorial text-2xl font-normal text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                {b.mobileLabCard.title}
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                {b.mobileLabCard.desc}
              </p>

              <div className="space-y-2 text-xs text-slate-300">
                {b.mobileLabCard.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs font-mono text-[#00F0FF]">GPS Təhkimatlı Briqada</span>
              <button
                onClick={() => onSelectCategoryForDispatch('meiset')}
                className="text-xs font-semibold text-[#00F0FF] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                Çağırış <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
