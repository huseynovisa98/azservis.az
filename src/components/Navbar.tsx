import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Wrench, Globe, PhoneCall, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenDispatch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenDispatch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="flex items-center gap-2 text-2xl font-editorial tracking-tight text-white whitespace-nowrap shrink-0 hover:text-[#00F0FF] transition-colors"
          >
            <span className="font-semibold text-white">azservis</span>
            <span className="text-[#00F0FF] font-mono text-xl">.az</span>
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[15px] xl:text-base font-medium text-[#F8FAFC]">
            <a
              href="#diagnostics"
              className="hover:text-[#00F0FF] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.diagnostics3d}
            </a>
            <a
              href="#services"
              className="hover:text-[#00F0FF] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.services}
            </a>
            <a
              href="#calculator"
              className="hover:text-[#00F0FF] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.calculator}
            </a>
            <a
              href="#process"
              className="hover:text-[#00F0FF] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.process}
            </a>
            <a
              href="#about"
              className="hover:text-[#00F0FF] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.about}
            </a>
          </nav>

          {/* Zone 3: 1 primary action + Language Switcher */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* Trilingual Switcher */}
            <div className="flex items-center bg-[#161C2E] p-1 rounded-xl border border-slate-700 text-xs sm:text-[13px] font-mono">
              <button
                onClick={() => onLanguageChange('az')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  currentLang === 'az'
                    ? 'bg-[#00F0FF]/25 text-[#00F0FF] font-bold border border-[#00F0FF]/70'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                AZ
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  currentLang === 'en'
                    ? 'bg-[#00F0FF]/25 text-[#00F0FF] font-bold border border-[#00F0FF]/70'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('ru')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  currentLang === 'ru'
                    ? 'bg-[#00F0FF]/25 text-[#00F0FF] font-bold border border-[#00F0FF]/70'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                RU
              </button>
            </div>

            {/* Glowing CTA Button with high-contrast bold USTA ÇAĞIR text */}
            <button
              onClick={onOpenDispatch}
              className="relative group overflow-hidden px-4.5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-[#00F0FF] hover:bg-[#38bdf8] rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Wrench className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              <span>{t.nav.callMaster}</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-100 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 space-y-2 bg-[#0B0F19]">
            <a
              href="#diagnostics"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-md text-base font-semibold text-slate-100 hover:bg-[#161C2E] hover:text-[#00F0FF]"
            >
              {t.nav.diagnostics3d}
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-md text-base font-semibold text-slate-100 hover:bg-[#161C2E] hover:text-[#00F0FF]"
            >
              {t.nav.services}
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-md text-base font-semibold text-slate-100 hover:bg-[#161C2E] hover:text-[#00F0FF]"
            >
              {t.nav.calculator}
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-md text-base font-semibold text-slate-100 hover:bg-[#161C2E] hover:text-[#00F0FF]"
            >
              {t.nav.process}
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-md text-base font-semibold text-slate-100 hover:bg-[#161C2E] hover:text-[#00F0FF]"
            >
              {t.nav.about}
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
