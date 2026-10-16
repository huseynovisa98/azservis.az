import React, { useState } from 'react';
import { Language, ServiceCategory } from '../types';
import { translations } from '../i18n/translations';
import {
  X,
  Phone,
  MessageSquare,
  Wrench,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Clock,
  Send,
} from 'lucide-react';

interface DispatchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  initialCategory?: string;
  initialIssue?: string;
  initialDistrict?: string;
  initialEstimatedAzn?: number;
}

export const DispatchDrawer: React.FC<DispatchDrawerProps> = ({
  isOpen,
  onClose,
  currentLang,
  initialCategory = 'kombi',
  initialIssue = '',
  initialDistrict = 'Yasamal',
  initialEstimatedAzn,
}) => {
  const t = translations[currentLang];
  const d = t.dispatchDrawer;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState(initialDistrict);
  const [deviceType, setDeviceType] = useState(initialCategory);
  const [issueDesc, setIssueDesc] = useState(initialIssue);
  const [preferredTiming, setPreferredTiming] = useState('urgent');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const bakuDistricts = [
    'Yasamal',
    'Nəsimi',
    'Səbail',
    'Nərimanov',
    'Xətai',
    'Binəqədi',
    'Nizami',
    'Sabunçu',
    'Suraxanı',
    'Xəzər',
    'Qaradağ',
    'Abşeron / Xırdalan',
    'Sumqayıt',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg(currentLang === 'az' ? 'Zəhmət olmasa adınızı qeyd edin.' : 'Please enter your name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMsg(currentLang === 'az' ? 'Zəhmət olmasa düzgün əlaqə nömrəsi daxil edin.' : 'Please enter a valid phone number.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate instant dispatch registration
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const getWhatsAppLink = () => {
    const textMsg = encodeURIComponent(
      `Salam, azservis.az portalından texniki usta çağırışı edirəm:\n` +
      `👤 Müştəri: ${name || 'Qeyd olunmayıb'}\n` +
      `📞 Əlaqə: ${phone || 'Qeyd olunmayıb'}\n` +
      `📍 Rayon/Ünvan: ${district}\n` +
      `⚙️ Avadanlıq: ${deviceType}\n` +
      `🛠️ Nasazlıq: ${issueDesc || initialIssue || 'Diaqnostika lazımdır'}\n` +
      `⏱️ Vaxt: ${preferredTiming === 'urgent' ? 'Təcili (30-45 dəq)' : 'Planlı'}\n` +
      (initialEstimatedAzn ? `💰 Təxmini Smeta: ~${initialEstimatedAzn} AZN` : '')
    );
    return `https://wa.me/994503331100?text=${textMsg}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#161C2E] border-l border-cyan-500/30 text-slate-100 shadow-2xl flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-slate-700 bg-[#0B0F19] sticky top-0 z-10 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#00F0FF]/20 border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF]">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-white">{d.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close Drawer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">{d.subtitle}</p>

            {/* Quick 1-Tap Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <a
                href="tel:+994503331100"
                className="flex items-center justify-center gap-2 py-3 px-3.5 rounded-xl bg-[#0B0F19] border-2 border-cyan-500/50 text-[#00F0FF] text-xs sm:text-sm font-bold hover:bg-cyan-950/60 transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 text-[#00F0FF]" />
                <span className="font-mono">+994 50 333 11 00</span>
              </a>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-3.5 rounded-xl bg-[#10B981]/25 border-2 border-[#10B981]/50 text-[#10B981] text-xs sm:text-sm font-bold hover:bg-[#10B981]/40 transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-[#10B981]" />
                <span>{d.whatsappDirect}</span>
              </a>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6 flex-1">
            {isSuccess ? (
              <div className="p-6 sm:p-7 rounded-2xl bg-[#0B0F19] border border-[#10B981]/60 text-center space-y-5 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-[#10B981]/20 border-2 border-[#10B981]/50 flex items-center justify-center mx-auto text-[#10B981]">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="font-editorial text-2xl sm:text-3xl text-white">{d.successTitle}</h4>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {d.successMessage}
                </p>

                <div className="p-4 bg-[#161C2E] rounded-xl border border-slate-700 text-xs sm:text-sm font-mono text-left space-y-2">
                  <div className="text-slate-200">Ünvan: <span className="text-white font-semibold">{district} rayonu</span></div>
                  <div className="text-slate-200">Avadanlıq: <span className="text-white font-semibold">{deviceType}</span></div>
                  <div className="text-[#00F0FF] font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                    Status: Dispetçer təhkimatı gözlənilir
                  </div>
                </div>

                <div className="pt-2 space-y-2.5">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{d.whatsappRedirectBtn}</span>
                  </a>

                  <button
                    onClick={onClose}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 text-slate-200 hover:text-white text-sm font-semibold"
                  >
                    {d.closeBtn}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4.5">
                <div className="text-xs sm:text-sm font-mono text-[#00F0FF] uppercase tracking-wider font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
                  {d.orFillForm}
                </div>

                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/60 text-red-100 text-xs sm:text-sm flex items-center gap-2.5">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-[#F8FAFC] mb-1.5">
                    {d.nameLabel} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={d.namePlaceholder}
                    className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-3 text-base text-[#F8FAFC] placeholder-slate-400 focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#F8FAFC] mb-1.5">
                    {d.phoneLabel} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+994 (50) 000-00-00"
                    className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-3 text-base text-[#F8FAFC] placeholder-slate-400 focus:outline-none focus:border-[#00F0FF] font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-[#F8FAFC] mb-1.5">
                      {d.districtLabel}
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl px-3.5 py-3 text-sm sm:text-base text-[#F8FAFC] focus:outline-none focus:border-[#00F0FF] font-medium"
                    >
                      {bakuDistricts.map((dst) => (
                        <option key={dst} value={dst}>
                          {dst} r-nu
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#F8FAFC] mb-1.5">
                      {d.deviceTypeLabel}
                    </label>
                    <select
                      value={deviceType}
                      onChange={(e) => setDeviceType(e.target.value)}
                      className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl px-3.5 py-3 text-sm sm:text-base text-[#F8FAFC] focus:outline-none focus:border-[#00F0FF] font-medium"
                    >
                      <option value="kombi">Kombi & İstilik</option>
                      <option value="kondisioner">Kondisioner</option>
                      <option value="paltaryuyan">Paltaryuyan</option>
                      <option value="qabyuyan">Qabyuyan</option>
                      <option value="soyuducu">Soyuducu</option>
                      <option value="senaye">Sənaye Avadanlığı</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#F8FAFC] mb-1.5">
                    {d.issueDescLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={issueDesc}
                    onChange={(e) => setIssueDesc(e.target.value)}
                    placeholder={d.issueDescPlaceholder}
                    className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-3 text-sm sm:text-base text-[#F8FAFC] placeholder-slate-400 focus:outline-none focus:border-[#00F0FF] resize-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#F8FAFC] mb-2">
                    {d.preferredTimeLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm">
                    <button
                      type="button"
                      onClick={() => setPreferredTiming('urgent')}
                      className={`p-3 rounded-xl border text-center cursor-pointer font-semibold ${
                        preferredTiming === 'urgent'
                          ? 'bg-[#00F0FF]/25 border-[#00F0FF] text-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                          : 'bg-[#0B0F19] border-slate-700 text-[#F8FAFC] hover:text-white'
                      }`}
                    >
                      {d.timingUrgent}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferredTiming('morning')}
                      className={`p-3 rounded-xl border text-center cursor-pointer font-semibold ${
                        preferredTiming === 'morning'
                          ? 'bg-[#00F0FF]/25 border-[#00F0FF] text-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                          : 'bg-[#0B0F19] border-slate-700 text-[#F8FAFC] hover:text-white'
                      }`}
                    >
                      {d.timingMorning}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferredTiming('flexible')}
                      className={`p-3 rounded-xl border text-center cursor-pointer font-semibold ${
                        preferredTiming === 'flexible'
                          ? 'bg-[#00F0FF]/25 border-[#00F0FF] text-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                          : 'bg-[#0B0F19] border-slate-700 text-[#F8FAFC] hover:text-white'
                      }`}
                    >
                      {d.timingFlexible}
                    </button>
                  </div>
                </div>

                {initialEstimatedAzn && (
                  <div className="p-3.5 bg-[#0B0F19] rounded-xl border border-cyan-500/40 flex items-center justify-between text-xs sm:text-sm font-mono">
                    <span className="text-slate-300">Kalkulyator Smeta:</span>
                    <span className="text-[#00F0FF] font-bold text-base sm:text-lg">~{initialEstimatedAzn} ₼</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-4 rounded-xl bg-[#00F0FF] hover:bg-[#38bdf8] text-slate-950 font-bold uppercase tracking-wider text-[15px] sm:text-base shadow-[0_0_24px_rgba(0,240,255,0.45)] hover:shadow-[0_0_34px_rgba(0,240,255,0.7)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                  <span>{isSubmitting ? d.submitting : d.submitBtn}</span>
                </button>
              </form>
            )}
          </div>

          {/* Footer note */}
          <div className="p-4 border-t border-slate-700/80 bg-[#0B0F19] text-xs text-slate-300 text-center">
            {d.privacyNote}
          </div>
        </div>
      </div>
    </div>
  );
};
