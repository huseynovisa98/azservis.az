import React, { useState } from 'react';
import { Language, ServiceCategory } from '../types';
import { translations } from '../i18n/translations';
import {
  Calculator,
  Flame,
  Wind,
  Layers,
  Sparkles,
  ShieldCheck,
  Check,
  Clock,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface EstimatorSectionProps {
  currentLang: Language;
  onOpenDispatchWithQuote: (quoteData: {
    category: string;
    appliance: string;
    issue: string;
    district: string;
    totalAzn: number;
    urgency: string;
  }) => void;
}

export const EstimatorSection: React.FC<EstimatorSectionProps> = ({
  currentLang,
  onOpenDispatchWithQuote,
}) => {
  const t = translations[currentLang];

  // Selection states
  const [selectedCategory, setSelectedCategory] = useState<string>('kombi');
  const [selectedIssueId, setSelectedIssueId] = useState<string>('plata');
  const [isExpress, setIsExpress] = useState<boolean>(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Yasamal');

  // Appliances categories & issues data
  const applianceCategories = [
    { id: 'kombi', label: currentLang === 'az' ? 'Kombi & Qazan' : currentLang === 'ru' ? 'Комби и Котлы' : 'Boiler & Heating' },
    { id: 'kondisioner', label: currentLang === 'az' ? 'Kondisioner' : currentLang === 'ru' ? 'Кондиционер' : 'Air Conditioner' },
    { id: 'paltaryuyan', label: currentLang === 'az' ? 'Paltaryuyan' : currentLang === 'ru' ? 'Стиральная машина' : 'Washing Machine' },
    { id: 'qabyuyan', label: currentLang === 'az' ? 'Qabyuyan' : currentLang === 'ru' ? 'Посудомойка' : 'Dishwasher' },
    { id: 'soyuducu', label: currentLang === 'az' ? 'Soyuducu' : currentLang === 'ru' ? 'Холодильник' : 'Refrigerator' },
    { id: 'senaye', label: currentLang === 'az' ? 'Sənaye Avadanlığı' : currentLang === 'ru' ? 'Пром. Оборудование' : 'Commercial System' },
  ];

  const issueOptions: Record<
    string,
    Array<{ id: string; name: string; labor: number; partsEst: number; warrantyMonths: number }>
  > = {
    kombi: [
      { id: 'plata', name: currentLang === 'az' ? 'Elektron İdarəetmə Platası Təmiri' : currentLang === 'ru' ? 'Ремонт электронной платы' : 'PCB Controller Repair', labor: 35, partsEst: 45, warrantyMonths: 18 },
      { id: 'qazan_erpi', name: currentLang === 'az' ? 'Ərpdən Təmizləmə & Kimyəvi Yuma' : currentLang === 'ru' ? 'Химическая промывка от накипи' : 'Heat Exchanger Descaling', labor: 40, partsEst: 20, warrantyMonths: 12 },
      { id: 'nasos', name: currentLang === 'az' ? 'Sirkulyasiya Nasosu Təmiri / Dəyişimi' : currentLang === 'ru' ? 'Циркуляционный насос' : 'Circulation Pump Replacement', labor: 30, partsEst: 75, warrantyMonths: 24 },
      { id: 'klapan', name: currentLang === 'az' ? 'Üçtərəfli Klapan & Qaz Armaturu' : currentLang === 'ru' ? 'Трехходовой / газовый клапан' : '3-Way Diverter Valve', labor: 30, partsEst: 50, warrantyMonths: 12 },
    ],
    kondisioner: [
      { id: 'freon', name: currentLang === 'az' ? 'R410A / R32 Freon Doldurulması' : currentLang === 'ru' ? 'Заправка фреоном R410A / R32' : 'Refrigerant R410A/R32 Recharge', labor: 25, partsEst: 40, warrantyMonths: 12 },
      { id: 'kond_plata', name: currentLang === 'az' ? 'İnverter Blok Platası Təmiri' : currentLang === 'ru' ? 'Ремонт инверторной платы' : 'Inverter Board Repair', labor: 45, partsEst: 55, warrantyMonths: 18 },
      { id: 'kompressor', name: currentLang === 'az' ? 'Kompressor İşəsalma Kondensatoru' : currentLang === 'ru' ? 'Пусковой конденсатор' : 'Start Capacitor / Relay', labor: 30, partsEst: 35, warrantyMonths: 12 },
      { id: 'yuma', name: currentLang === 'az' ? 'Antibakterial Dərin Kimyəvi Təmizlik' : currentLang === 'ru' ? 'Антибактериальная глубокая чистка' : 'Deep Antibacterial Steam Clean', labor: 35, partsEst: 15, warrantyMonths: 6 },
    ],
    paltaryuyan: [
      { id: 'podsipnik', name: currentLang === 'az' ? 'Podşipnik & Saxsı Kipgəc Dəyişimi' : currentLang === 'ru' ? 'Замена подшипников и сальника' : 'Sealed Drum Bearing Set', labor: 50, partsEst: 45, warrantyMonths: 24 },
      { id: 'amortizator', name: currentLang === 'az' ? 'Hidravlik Amortizator Dəsti' : currentLang === 'ru' ? 'Замена амортизаторов' : 'Hydraulic Shock Absorbers', labor: 25, partsEst: 35, warrantyMonths: 18 },
      { id: 'ten', name: currentLang === 'az' ? 'Qızdırıcı Ten Dəyişimi' : currentLang === 'ru' ? 'Замена ТЭНа' : 'Heating Element Replacement', labor: 25, partsEst: 30, warrantyMonths: 12 },
      { id: 'nasos_su', name: currentLang === 'az' ? 'Drenaj Su Boşaltma Nasosu' : currentLang === 'ru' ? 'Сливная помпа' : 'Drain Pump Replacement', labor: 25, partsEst: 30, warrantyMonths: 12 },
    ],
    qabyuyan: [
      { id: 'qab_nasos', name: currentLang === 'az' ? 'İnverter Dövriyyə / Qızdırıcı Pompa' : currentLang === 'ru' ? 'Циркуляционный ТЭН-насос' : 'Inverter Circulation Pump', labor: 40, partsEst: 65, warrantyMonths: 18 },
      { id: 'klapan_su', name: currentLang === 'az' ? 'Aqua-Stop Klapanı & Su Sızma Sensoru' : currentLang === 'ru' ? 'Клапан Aqua-Stop' : 'Aqua-Stop Inlet Valve', labor: 30, partsEst: 35, warrantyMonths: 12 },
      { id: 'qab_plata', name: currentLang === 'az' ? 'Proqramator & Güc Platası' : currentLang === 'ru' ? 'Электронный модуль' : 'Main Power Logic Board', labor: 45, partsEst: 50, warrantyMonths: 18 },
    ],
    soyuducu: [
      { id: 'freon_soy', name: currentLang === 'az' ? 'No-Frost Freon Doldurulması & Sızma Təmiri' : currentLang === 'ru' ? 'Заправка фреона и пайка утечки' : 'No-Frost Refrigerant & Leak Seal', labor: 40, partsEst: 50, warrantyMonths: 18 },
      { id: 'inverter_komp', name: currentLang === 'az' ? 'İnverter Kompressor Quraşdırılması' : currentLang === 'ru' ? 'Замена инверторного компрессора' : 'Inverter Compressor Swap', labor: 60, partsEst: 140, warrantyMonths: 24 },
      { id: 'sensor_taymer', name: currentLang === 'az' ? 'Defrost Qızdırıcı & Sensor Dəsti' : currentLang === 'ru' ? 'Датчики оттайки / ТЭН каплепадения' : 'Defrost Sensor & Timer Element', labor: 30, partsEst: 35, warrantyMonths: 12 },
    ],
    senaye: [
      { id: 'senaye_soyuq', name: currentLang === 'az' ? 'Sənaye Soyutma Aqreqatı & Klapanlar' : currentLang === 'ru' ? 'Чиллер / промышленный агрегат' : 'Commercial Chiller & Monoblock', labor: 80, partsEst: 160, warrantyMonths: 12 },
      { id: 'senaye_qazan', name: currentLang === 'az' ? 'Mərkəzi Qazanxana & Hidravlik Şəbəkə' : currentLang === 'ru' ? 'Котельная станция и балансировка' : 'Central Boiler Manifold Station', labor: 90, partsEst: 180, warrantyMonths: 12 },
      { id: 'restoran_kofe', name: currentLang === 'az' ? 'Peşəkar Qəhvə & Çörəkxana Avadanlığı' : currentLang === 'ru' ? 'Кофемашины и пароконвектоматы' : 'Commercial Espresso & Combi-Oven', labor: 60, partsEst: 95, warrantyMonths: 12 },
    ],
  };

  const districtsList = [
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

  // Current selected issue
  const activeIssues = issueOptions[selectedCategory] || issueOptions.kombi;
  const currentIssue =
    activeIssues.find((i) => i.id === selectedIssueId) || activeIssues[0];

  const expressFee = isExpress ? 15 : 0;
  const labor = currentIssue.labor;
  const parts = currentIssue.partsEst;
  const total = labor + parts + expressFee;

  const handleCategorySwitch = (catId: string) => {
    setSelectedCategory(catId);
    const newIssues = issueOptions[catId] || issueOptions.kombi;
    setSelectedIssueId(newIssues[0].id);
  };

  const handleDispatch = () => {
    const selectedCatObj = applianceCategories.find((c) => c.id === selectedCategory);
    onOpenDispatchWithQuote({
      category: selectedCatObj ? selectedCatObj.label : selectedCategory,
      appliance: selectedCatObj ? selectedCatObj.label : selectedCategory,
      issue: currentIssue.name,
      district: selectedDistrict,
      totalAzn: total,
      urgency: isExpress ? 'Təcili Express (30-45 dəq)' : 'Standart (Bu gün)',
    });
  };

  return (
    <section id="calculator" className="py-20 relative bg-[#0B0F19] tech-grid-pattern border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#161C2E] border border-cyan-500/20 text-[11px] font-mono tracking-widest text-[#00F0FF] mb-3">
            {t.estimator.sectionKicker}
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
            {t.estimator.title}
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.estimator.subtitle}
          </p>
        </div>

        {/* 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Equipment Selection - Zero Truncation */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#161C2E]/90 border border-slate-700 backdrop-blur-md shadow-lg">
              <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#00F0FF] font-semibold mb-3.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
                {t.estimator.step1Title}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {applianceCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySwitch(cat.id)}
                      className={`px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-left transition-all cursor-pointer min-h-[46px] flex items-center leading-snug whitespace-normal ${
                        isSelected
                          ? 'bg-[#00F0FF]/25 text-[#00F0FF] border border-[#00F0FF]/60 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                          : 'bg-[#0B0F19]/80 text-slate-100 hover:text-white hover:bg-slate-800 border border-slate-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Malfunction Selection */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#161C2E]/90 border border-slate-700 backdrop-blur-md shadow-lg">
              <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#00F0FF] font-semibold mb-3.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
                {t.estimator.step2Title}
              </div>

              <div className="space-y-2.5">
                {activeIssues.map((issue) => {
                  const isSelected = selectedIssueId === issue.id;
                  return (
                    <button
                      key={issue.id}
                      onClick={() => setSelectedIssueId(issue.id)}
                      className={`w-full p-4 rounded-xl text-left border flex items-center justify-between gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#161C2E] border-[#00F0FF]/70 shadow-[0_0_18px_rgba(0,240,255,0.2)]'
                          : 'bg-[#0B0F19]/80 border-slate-700 hover:border-slate-600 hover:bg-[#0B0F19]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-[#00F0FF] bg-[#00F0FF]'
                              : 'border-slate-500'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-black stroke-[3]" />}
                        </div>
                        <div>
                          <div
                            className={`text-sm sm:text-base font-semibold leading-snug ${
                              isSelected ? 'text-white' : 'text-slate-100'
                            }`}
                          >
                            {issue.name}
                          </div>
                          <div className="text-xs sm:text-sm font-mono text-slate-300 mt-1">
                            Zəmanət: {issue.warrantyMonths} ay · Orijinal OEM detal
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0 font-mono text-sm sm:text-base text-[#00F0FF] font-bold tabular-nums">
                        ~{issue.labor + issue.partsEst} ₼
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Urgency and District */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#161C2E]/90 border border-slate-700 backdrop-blur-md shadow-lg">
              <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#00F0FF] font-semibold mb-3.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
                {t.estimator.step3Title}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5">
                <button
                  onClick={() => setIsExpress(false)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    !isExpress
                      ? 'bg-[#00F0FF]/20 border-[#00F0FF]/60 text-white'
                      : 'bg-[#0B0F19]/80 border-slate-700 text-slate-200 hover:text-white'
                  }`}
                >
                  <div className="text-sm sm:text-base font-bold text-white">{t.estimator.urgencyStandard}</div>
                  <div className="text-xs sm:text-sm text-slate-300 mt-1 leading-snug">
                    {t.estimator.urgencyStandardDesc}
                  </div>
                </button>

                <button
                  onClick={() => setIsExpress(true)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isExpress
                      ? 'bg-[#00F0FF]/20 border-[#00F0FF]/60 text-white'
                      : 'bg-[#0B0F19]/80 border-slate-700 text-slate-200 hover:text-white'
                  }`}
                >
                  <div className="text-sm sm:text-base font-bold text-white flex items-center justify-between">
                    <span>{t.estimator.urgencyExpress}</span>
                    <span className="text-xs font-mono font-bold text-[#00F0FF] bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                      +15 ₼
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 mt-1 leading-snug">
                    {t.estimator.urgencyExpressDesc}
                  </div>
                </button>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-mono font-semibold text-slate-200 mb-2">
                  Xidmət Ünvanı / Rayon:
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-3 text-sm sm:text-base text-slate-100 focus:outline-none focus:border-[#00F0FF] font-medium"
                >
                  {districtsList.map((d) => (
                    <option key={d} value={d}>
                      {d} rayonu / ərazisi
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Instant Quote Summary Column (5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#161C2E] border-2 border-cyan-500/40 shadow-[0_15px_50px_rgba(0,0,0,0.7)] tech-cyan-glow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#00F0FF]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-700">
                <h3 className="font-editorial text-2xl sm:text-3xl text-white">
                  {t.estimator.summaryTitle}
                </h3>
                <span className="font-mono text-xs sm:text-sm font-bold text-[#10B981] flex items-center gap-1.5 bg-emerald-950/70 px-2.5 py-1 rounded-md border border-emerald-500/40">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  ONLINE HESAB
                </span>
              </div>

              {/* Itemized lines */}
              <div className="space-y-3.5 font-mono text-xs sm:text-sm text-slate-200 mb-6">
                <div className="flex justify-between items-start">
                  <span className="text-slate-300 font-medium">{t.estimator.diagnosticFee}:</span>
                  <div className="text-right">
                    <span className="text-[#10B981] font-bold text-sm sm:text-base">0 ₼ (PULSUZ)</span>
                    <div className="text-xs text-slate-300 mt-0.5">{t.estimator.diagnosticFeeNote}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium">{t.estimator.laborFee}:</span>
                  <span className="text-white font-bold tabular-nums text-sm sm:text-base">{labor} ₼</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium">{t.estimator.partsEstimate}:</span>
                  <span className="text-white font-bold tabular-nums text-sm sm:text-base">~{parts} ₼</span>
                </div>

                {isExpress && (
                  <div className="flex justify-between items-center text-[#00F0FF] font-semibold">
                    <span>Təcili Express Çatış (30-45 dəq):</span>
                    <span className="font-bold tabular-nums text-sm sm:text-base">+15 ₼</span>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-700 flex justify-between items-baseline">
                  <div>
                    <span className="text-base font-sans font-bold text-white block">
                      {t.estimator.totalEstimate}:
                    </span>
                    <span className="text-xs text-slate-300">
                      Rəsmi zəmanət talonu daxil
                    </span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-[#00F0FF] tabular-nums">
                    ~{total} ₼
                  </div>
                </div>
              </div>

              {/* Additional specs */}
              <div className="p-4 rounded-xl bg-[#0B0F19]/90 border border-slate-700 text-xs sm:text-sm font-mono text-slate-200 space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.estimator.timeToArrival}:</span>
                  <span className="text-white font-semibold">
                    {isExpress ? '30 - 45 dəqiqə' : '2 - 4 saat ərzində'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.estimator.warrantyCoverage}:</span>
                  <span className="text-[#10B981] font-bold">{currentIssue.warrantyMonths} Ay</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Təhkim olunan Rayon:</span>
                  <span className="text-white font-semibold">{selectedDistrict}</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleDispatch}
                className="w-full py-4 px-5 rounded-xl bg-[#00F0FF] hover:bg-[#38bdf8] text-slate-950 font-bold uppercase tracking-wider text-sm shadow-[0_0_22px_rgba(0,240,255,0.45)] hover:shadow-[0_0_32px_rgba(0,240,255,0.7)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>{t.estimator.dispatchWithQuoteBtn}</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <div className="text-center mt-3.5 text-xs sm:text-sm text-slate-200">
                {t.estimator.transparentGuarantee}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
