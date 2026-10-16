import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { ShieldCheck, Phone, MapPin, Mail, Clock, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onOpenDispatch: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onOpenDispatch }) => {
  const t = translations[currentLang];
  const f = t.footer;

  return (
    <footer id="about" className="bg-[#080B12] border-t border-slate-800 text-slate-400 text-xs">
      {/* Top Banner */}
      <div className="border-b border-slate-800/80 py-8 bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xl font-editorial text-white mb-1">
              {currentLang === 'az'
                ? 'Təcili Usta Dəstəyinə Ehtiyacınız Var?'
                : currentLang === 'ru'
                ? 'Нужен срочный выезд мастера?'
                : 'Need Urgent Technical Master Dispatch?'}
            </div>
            <p className="text-slate-400 text-xs">
              {currentLang === 'az'
                ? 'Növbətçi mobil laboratoriyalarımız Bakının istənilən ünvanına 30-45 dəqiqəyə çatır.'
                : currentLang === 'ru'
                ? 'Дежурные экипажи прибывают по любому адресу в Баку за 30-45 минут.'
                : 'Our standby mobile repair vans reach any address across Baku within 30-45 minutes.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+994503331100"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#161C2E] border border-slate-700 text-white hover:text-[#00F0FF] transition-colors font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>+994 50 333 11 00</span>
            </a>

            <button
              onClick={onOpenDispatch}
              className="px-5 py-2.5 rounded-lg bg-[#00F0FF] hover:bg-[#38bdf8] text-black font-bold uppercase tracking-wider text-xs shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer"
            >
              {t.nav.callMaster}
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-2 text-2xl font-editorial text-white">
              <span>azservis</span>
              <span className="text-[#00F0FF] font-mono text-xl">.az</span>
            </a>
            <p className="text-slate-400 leading-relaxed text-xs">
              {f.tagline}
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>{f.certifiedEngineers}</span>
            </div>
          </div>

          {/* Service Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-200">
              Texniki Xidmətlər
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#services" className="hover:text-[#00F0FF] transition-colors">
                  Kombi & İstilik Şəbəkələri
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00F0FF] transition-colors">
                  İnverter Kondisionerlər
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00F0FF] transition-colors">
                  Paltaryuyan & Qabyuyan
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00F0FF] transition-colors">
                  No-Frost Soyuducular
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00F0FF] transition-colors">
                  Restoran & Sənaye Avadanlığı
                </a>
              </li>
            </ul>
          </div>

          {/* Service Districts */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-200">
              Xidmət Əraziləri
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Yasamal, Nəsimi, Səbail, Nərimanov, Xətai, Binəqədi, Nizami, Sabunçu, Suraxanı, Xəzər, Qaradağ, Pirallahı və Sumqayıt şəhəri.
            </p>
            <div className="pt-2 text-xs font-mono text-[#00F0FF] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>24/7 Fövqəladə Növbətçilik</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-200">
              Əlaqə & Ünvan
            </h4>
            <div className="space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                <span>{f.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#10B981] shrink-0" />
                <span className="font-mono">+994 12 409 33 22</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-300 shrink-0" />
                <span className="font-mono">destek@azservis.az</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} azservis.az. {f.rights}
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400">Gizlilik Siyasəti</a>
            <a href="#" className="hover:text-slate-400">Xidmət Şərtləri</a>
            <a href="#" className="hover:text-slate-400">Zəmanət Qaydaları</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
