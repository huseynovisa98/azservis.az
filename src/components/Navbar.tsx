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
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
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
          <div className="flex items-center gap-3 shrink-0">
            {/* Trilingual Switcher */}
            <div className="flex items-center bg-[#161C2E] p-1 rounded-lg border border-slate-700/60 text-xs font-mono">
              <button
                onClick={() => onLanguageChange('az')}
                className={`px-2 py-1 rounded transition-colors ${
                  currentLang === 'az'
                    ? 'bg-[#00F0FF]/20 text-[#00F0FF] font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                AZ
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 rounded transition-colors ${
                  currentLang === 'en'
                    ? 'bg-[#00F0FF]/20 text-[#00F0FF] font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('ru')}
                className={`px-2 py-1 rounded transition-colors ${
                  currentLang === 'ru'
                    ? 'bg-[#00F0FF]/20 text-[#00F0FF] font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                RU
              </button>
            </div>

            {/* Glowing CTA Button */}
            <button
              onClick={onOpenDispatch}
              className="relative group overflow-hidden px-4.5 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-[#00F0FF] hover:bg-[#38bdf8] rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_28px_rgba(0,240,255,0.6)] whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>{t.nav.callMaster}</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 space-y-3 bg-[#0B0F19]">
            <a
              href="#diagnostics"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-[#161C2E] hover:text-[#00F0FF]"
            >
              {t.nav.diagnostics3d}
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-[#161C2E] hover:text-[#00F0FF]"
            >
              {t.nav.services}
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-[#161C2E] hover:text-[#00F0FF]"
            >
              {t.nav.calculator}
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-[#161C2E] hover:text-[#00F0FF]"
            >
              {t.nav.process}
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-[#161C2E] hover:text-[#00F0FF]"
            >
              {t.nav.about}
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
