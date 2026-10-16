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
            {/* Step 1: Equipment Selection */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#161C2E]/80 border border-slate-800 backdrop-blur-md">
              <div className="text-xs font-mono uppercase tracking-wider text-[#00F0FF] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                {t.estimator.step1Title}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {applianceCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySwitch(cat.id)}
                      className={`px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-all cursor-pointer truncate ${
                        isSelected
                          ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 shadow-[0_0_12px_rgba(0,240,255,0.15)] font-semibold'
                          : 'bg-[#0B0F19]/60 text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Malfunction Selection */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#161C2E]/80 border border-slate-800 backdrop-blur-md">
              <div className="text-xs font-mono uppercase tracking-wider text-[#00F0FF] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                {t.estimator.step2Title}
              </div>

              <div className="space-y-2">
                {activeIssues.map((issue) => {
                  const isSelected = selectedIssueId === issue.id;
                  return (
                    <button
                      key={issue.id}
                      onClick={() => setSelectedIssueId(issue.id)}
                      className={`w-full p-3.5 rounded-xl text-left border flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#161C2E] border-[#00F0FF]/60 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                          : 'bg-[#0B0F19]/50 border-slate-800 hover:border-slate-700 hover:bg-[#0B0F19]/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-[#00F0FF] bg-[#00F0FF]'
                              : 'border-slate-600'
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 text-black" />}
                        </div>
                        <div>
                          <div
                            className={`text-sm font-medium ${
                              isSelected ? 'text-white font-semibold' : 'text-slate-300'
                            }`}
                          >
                            {issue.name}
                          </div>
                          <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                            Zəmanət: {issue.warrantyMonths} ay · Orijinal OEM hissə
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0 font-mono text-xs text-slate-400">
                        <span className="text-white font-bold tabular-nums">
                          ~{issue.labor + issue.partsEst} ₼
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Urgency and District */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#161C2E]/80 border border-slate-800 backdrop-blur-md">
              <div className="text-xs font-mono uppercase tracking-wider text-[#00F0FF] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                {t.estimator.step3Title}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => setIsExpress(false)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    !isExpress
                      ? 'bg-[#00F0FF]/15 border-[#00F0FF]/50 text-white'
                      : 'bg-[#0B0F19]/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-semibold">{t.estimator.urgencyStandard}</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {t.estimator.urgencyStandardDesc}
                  </div>
                </button>

                <button
                  onClick={() => setIsExpress(true)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    isExpress
                      ? 'bg-[#00F0FF]/15 border-[#00F0FF]/50 text-white'
                      : 'bg-[#0B0F19]/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-semibold flex items-center justify-between">
                    <span>{t.estimator.urgencyExpress}</span>
                    <span className="text-[10px] font-mono text-[#00F0FF] bg-cyan-950 px-1.5 py-0.5 rounded">
                      +15 ₼
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {t.estimator.urgencyExpressDesc}
                  </div>
                </button>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Xidmət Ünvanı / Rayon:
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#00F0FF]"
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
            <div className="p-6 sm:p-7 rounded-2xl bg-[#161C2E] border border-cyan-500/30 shadow-[0_15px_50px_rgba(0,0,0,0.6)] tech-cyan-glow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F0FF]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <h3 className="font-editorial text-2xl text-white">
                  {t.estimator.summaryTitle}
                </h3>
                <span className="font-mono text-xs text-[#10B981] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  ONLINE HESAB
                </span>
              </div>

              {/* Itemized lines */}
              <div className="space-y-3 font-mono text-xs text-slate-300 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{t.estimator.diagnosticFee}:</span>
                  <div className="text-right">
                    <span className="text-[#10B981] font-bold">0 ₼ (PULSUZ)</span>
                    <div className="text-[10px] text-slate-500">{t.estimator.diagnosticFeeNote}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{t.estimator.laborFee}:</span>
                  <span className="text-white font-bold tabular-nums">{labor} ₼</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{t.estimator.partsEstimate}:</span>
                  <span className="text-white font-bold tabular-nums">~{parts} ₼</span>
                </div>

                {isExpress && (
                  <div className="flex justify-between items-center text-[#00F0FF]">
                    <span>Təcili Express Çatış (30-45 dəq):</span>
                    <span className="font-bold tabular-nums">+15 ₼</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-sans font-bold text-white block">
                      {t.estimator.totalEstimate}:
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Rəsmi zəmanət talonu daxil
                    </span>
                  </div>
                  <div className="text-3xl font-mono font-bold text-[#00F0FF] tabular-nums">
                    ~{total} ₼
                  </div>
                </div>
              </div>

              {/* Additional specs */}
              <div className="p-3 rounded-lg bg-[#0B0F19]/70 border border-slate-800/80 text-xs font-mono text-slate-300 space-y-1.5 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-500">{t.estimator.timeToArrival}:</span>
                  <span className="text-slate-200">
                    {isExpress ? '30 - 45 dəqiqə' : '2 - 4 saat ərzində'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t.estimator.warrantyCoverage}:</span>
                  <span className="text-[#10B981] font-bold">{currentIssue.warrantyMonths} Ay</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Təhkim olunan Rayon:</span>
                  <span className="text-slate-200">{selectedDistrict}</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleDispatch}
                className="w-full py-3.5 px-4 rounded-xl bg-[#00F0FF] hover:bg-[#38bdf8] text-black font-bold uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>{t.estimator.dispatchWithQuoteBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center mt-3 text-[11px] text-slate-400">
                {t.estimator.transparentGuarantee}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
