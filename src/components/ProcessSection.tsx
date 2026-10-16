import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { CheckCircle2, Clock, ShieldCheck, Cpu, PackageCheck, Award } from 'lucide-react';

interface ProcessSectionProps {
  currentLang: Language;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ currentLang }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const t = translations[currentLang];
  const steps = t.process.steps;

  const stepIcons = [
    <Cpu className="w-5 h-5 text-[#00F0FF]" key="cpu" />,
    <PackageCheck className="w-5 h-5 text-emerald-400" key="pkg" />,
    <ShieldCheck className="w-5 h-5 text-cyan-300" key="shield" />,
    <Award className="w-5 h-5 text-amber-400" key="award" />,
  ];

  return (
    <section id="process" className="py-20 relative bg-[#0B0F19] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#161C2E] border border-cyan-500/30 text-xs font-mono tracking-widest text-[#00F0FF] font-semibold mb-3">
            {t.process.sectionKicker}
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
            {t.process.title}
          </h2>
          <p className="mt-4 text-slate-200 text-base sm:text-lg leading-relaxed">
            {t.process.subtitle}
          </p>
        </div>

        {/* 4-Step Interactive Process Navigation Bar - Zero Truncation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
          {steps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.num}
                onClick={() => setActiveStepIndex(idx)}
                className={`relative text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer min-h-[110px] flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#161C2E] border-[#00F0FF]/60 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                    : 'bg-[#161C2E]/60 border-slate-700 hover:border-slate-600 hover:bg-[#161C2E]/90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span
                      className={`font-mono text-xs sm:text-sm font-bold px-2.5 py-1 rounded ${
                        isActive
                          ? 'bg-[#00F0FF]/25 text-[#00F0FF] border border-[#00F0FF]/40'
                          : 'bg-slate-800 text-slate-200'
                      }`}
                    >
                      {step.num}
                    </span>
                    <div className="p-1.5 rounded-lg bg-[#0B0F19]/80">{stepIcons[idx]}</div>
                  </div>
                  <div
                    className={`text-base sm:text-lg font-bold leading-snug whitespace-normal ${
                      isActive ? 'text-[#00F0FF]' : 'text-[#F8FAFC]'
                    }`}
                  >
                    {step.title}
                  </div>
                </div>

                <div className="text-xs sm:text-sm font-mono text-slate-200 mt-2.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                  <span>{step.timeBadge}</span>
                </div>

                {/* Active indicator bar */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00F0FF] rounded-b-xl shadow-[0_0_10px_#00F0FF]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Step Detailed Feature Spotlight */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#161C2E]/95 border border-slate-700 backdrop-blur-md shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-[#00F0FF] mb-2.5">
                <span>FAZA {steps[activeStepIndex].num} / 04</span>
                <span>·</span>
                <span className="text-slate-200">{steps[activeStepIndex].timeBadge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                {steps[activeStepIndex].title}
              </h3>
              <p className="text-slate-100 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                {steps[activeStepIndex].description}
              </p>

              {/* Technical protocol checklist */}
              <div className="space-y-3.5">
                {steps[activeStepIndex].details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                    <span className="text-base text-[#F8FAFC] leading-snug">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="p-6 rounded-xl bg-[#0B0F19]/95 border border-slate-700 space-y-4 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                  <span className="text-xs sm:text-sm font-mono font-bold text-slate-200">PROTOKOL STATUSU</span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#10B981] flex items-center gap-1.5 bg-emerald-950/70 px-2.5 py-1 rounded-md border border-emerald-500/40">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    ISO 9001:2015 STANDART
                  </span>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Avadanlıq Uyğunluğu:</span>
                    <span className="text-white font-semibold">100% Zavod Standartı</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Qeydiyyat Bazası:</span>
                    <span className="text-[#00F0FF] font-semibold">azservis CRM / Cloud</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Müştəri Qəbul Aktı:</span>
                    <span className="text-white font-semibold">Rəqəmsal & Çap Nüsxə</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <div className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                    "azservis.az mühəndisləri tərəfindən icra edilən hər bir iş rəqəmsal arxivdə 5 il saxlanılır."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
