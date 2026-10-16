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
          <div className="p-6 border-b border-slate-800 bg-[#0B0F19]/90 sticky top-0 z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/15 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]">
                  <Wrench className="w-4 h-4" />
                </div>
                <h3 className="font-editorial text-2xl text-white">{d.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{d.subtitle}</p>

            {/* Quick 1-Tap Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <a
                href="tel:+994503331100"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#0B0F19] border border-cyan-500/40 text-[#00F0FF] text-xs font-semibold hover:bg-cyan-950/40 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+994 50 333 11 00</span>
              </a>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-xs font-semibold hover:bg-[#10B981]/30 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{d.whatsappDirect}</span>
              </a>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6 flex-1">
            {isSuccess ? (
              <div className="p-6 rounded-2xl bg-[#0B0F19] border border-[#10B981]/40 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center mx-auto text-[#10B981]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-editorial text-2xl text-white">{d.successTitle}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {d.successMessage}
                </p>

                <div className="p-3 bg-[#161C2E] rounded-lg border border-slate-800 text-xs font-mono text-left space-y-1">
                  <div className="text-slate-400">Ünvan: {district} rayonu</div>
                  <div className="text-slate-400">Avadanlıq: {deviceType}</div>
                  <div className="text-[#00F0FF]">Status: Dispetçer təhkimatı gözlənilir</div>
                </div>

                <div className="pt-2 space-y-2">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{d.whatsappRedirectBtn}</span>
                  </a>

                  <button
                    onClick={onClose}
                    className="w-full py-2 px-4 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-medium"
                  >
                    {d.closeBtn}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                  {d.orFillForm}
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {d.nameLabel} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={d.namePlaceholder}
                    className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {d.phoneLabel} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+994 (50) 000-00-00"
                    className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {d.districtLabel}
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#00F0FF]"
                    >
                      {bakuDistricts.map((dst) => (
                        <option key={dst} value={dst}>
                          {dst} r-nu
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {d.deviceTypeLabel}
                    </label>
                    <select
                      value={deviceType}
                      onChange={(e) => setDeviceType(e.target.value)}
                      className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#00F0FF]"
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
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {d.issueDescLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={issueDesc}
                    onChange={(e) => setIssueDesc(e.target.value)}
                    placeholder={d.issueDescPlaceholder}
                    className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {d.preferredTimeLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setPreferredTiming('urgent')}
                      className={`p-2 rounded-lg border text-center cursor-pointer ${
                        preferredTiming === 'urgent'
                          ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF] font-semibold'
                          : 'bg-[#0B0F19] border-slate-800 text-slate-400'
                      }`}
                    >
                      {d.timingUrgent}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferredTiming('morning')}
                      className={`p-2 rounded-lg border text-center cursor-pointer ${
                        preferredTiming === 'morning'
                          ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF] font-semibold'
                          : 'bg-[#0B0F19] border-slate-800 text-slate-400'
                      }`}
                    >
                      {d.timingMorning}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferredTiming('flexible')}
                      className={`p-2 rounded-lg border text-center cursor-pointer ${
                        preferredTiming === 'flexible'
                          ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF] font-semibold'
                          : 'bg-[#0B0F19] border-slate-800 text-slate-400'
                      }`}
                    >
                      {d.timingFlexible}
                    </button>
                  </div>
                </div>

                {initialEstimatedAzn && (
                  <div className="p-3 bg-[#0B0F19] rounded-lg border border-cyan-500/30 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Kalkulyator Smeta:</span>
                    <span className="text-[#00F0FF] font-bold text-sm">~{initialEstimatedAzn} ₼</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-[#00F0FF] hover:bg-[#38bdf8] text-black font-bold uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? d.submitting : d.submitBtn}</span>
                </button>
              </form>
            )}
          </div>

          {/* Footer note */}
          <div className="p-4 border-t border-slate-800 bg-[#0B0F19] text-[10px] text-slate-500 text-center">
            {d.privacyNote}
          </div>
        </div>
      </div>
    </div>
  );
};
