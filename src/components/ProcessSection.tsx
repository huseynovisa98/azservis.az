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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#161C2E] border border-cyan-500/20 text-[11px] font-mono tracking-widest text-[#00F0FF] mb-3">
            {t.process.sectionKicker}
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
            {t.process.title}
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.process.subtitle}
          </p>
        </div>

        {/* 4-Step Interactive Process Navigation Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {steps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.num}
                onClick={() => setActiveStepIndex(idx)}
                className={`relative text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#161C2E] border-[#00F0FF]/50 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                    : 'bg-[#161C2E]/40 border-slate-800 hover:border-slate-700 hover:bg-[#161C2E]/70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      isActive
                        ? 'bg-[#00F0FF]/20 text-[#00F0FF]'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {step.num}
                  </span>
                  <div className="p-1 rounded bg-[#0B0F19]/60">{stepIcons[idx]}</div>
                </div>
                <div
                  className={`text-sm font-semibold truncate ${
                    isActive ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {step.title}
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#00F0FF]" />
                  <span>{step.timeBadge}</span>
                </div>

                {/* Active indicator bar */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00F0FF] rounded-b-xl" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Step Detailed Feature Spotlight */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#161C2E]/70 border border-slate-800 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] mb-2">
                <span>FAZA {steps[activeStepIndex].num} / 04</span>
                <span>·</span>
                <span className="text-slate-400">{steps[activeStepIndex].timeBadge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {steps[activeStepIndex].title}
              </h3>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                {steps[activeStepIndex].description}
              </p>

              {/* Technical protocol checklist */}
              <div className="space-y-3">
                {steps[activeStepIndex].details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="p-5 rounded-xl bg-[#0B0F19]/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-slate-400">PROTOKOL STATUSU</span>
                  <span className="text-xs font-mono text-[#10B981] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                    ISO 9001:2015 STANDART
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Avadanlıq Uyğunluğu:</span>
                    <span className="text-slate-200">100% Zavod Standartı</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Qeydiyyat Bazası:</span>
                    <span className="text-[#00F0FF]">azservis CRM / Cloud</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Müştəri Qəbul Aktı:</span>
                    <span className="text-slate-200">Rəqəmsal & Çap Nüsxə</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-[11px] text-slate-400 italic">
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
