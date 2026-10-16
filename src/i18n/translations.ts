import { Language, ServiceCategory } from '../types';

export interface Translations {
  nav: {
    brand: string;
    diagnostics3d: string;
    services: string;
    calculator: string;
    process: string;
    about: string;
    callMaster: string;
    callShort: string;
  };
  hero: {
    kicker: string;
    headline: string;
    subheadline: string;
    scrollHint: string;
    scrollExplode: string;
    reset3d: string;
    freeRotate: string;
    lockScroll: string;
    diagnosticPoints: string;
    activeMastersOnline: string;
    averageArrivalTime: string;
    warrantyDuration: string;
  };
  categories: Record<ServiceCategory, {
    label: string;
    desc: string;
    popularModels: string;
    activeTechCount: number;
  }>;
  quickBar: {
    selectEquipment: string;
    detectedFault: string;
    callMasterBtn: string;
    estCostFrom: string;
  };
  hotspots: {
    stator: { title: string; desc: string; metric: string };
    rotor: { title: string; desc: string; metric: string };
    damper: { title: string; desc: string; metric: string };
    inverterPcb: { title: string; desc: string; metric: string };
    drum: { title: string; desc: string; metric: string };
    heater: { title: string; desc: string; metric: string };
  };
  process: {
    sectionKicker: string;
    title: string;
    subtitle: string;
    steps: Array<{
      num: string;
      title: string;
      description: string;
      details: string[];
      timeBadge: string;
    }>;
  };
  estimator: {
    sectionKicker: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    urgencyStandard: string;
    urgencyExpress: string;
    urgencyStandardDesc: string;
    urgencyExpressDesc: string;
    summaryTitle: string;
    diagnosticFee: string;
    diagnosticFeeNote: string;
    laborFee: string;
    partsEstimate: string;
    totalEstimate: string;
    timeToArrival: string;
    warrantyCoverage: string;
    dispatchWithQuoteBtn: string;
    transparentGuarantee: string;
  };
  bento: {
    sectionKicker: string;
    title: string;
    subtitle: string;
    kombiCard: {
      title: string;
      desc: string;
      badge: string;
      models: string;
      features: string[];
    };
    climateCard: {
      title: string;
      desc: string;
      badge: string;
      models: string;
      features: string[];
    };
    laundryCard: {
      title: string;
      desc: string;
      badge: string;
      features: string[];
    };
    industrialCard: {
      title: string;
      desc: string;
      badge: string;
      features: string[];
    };
    mobileLabCard: {
      title: string;
      desc: string;
      badge: string;
      features: string[];
    };
  };
  dispatchDrawer: {
    title: string;
    subtitle: string;
    callDirect: string;
    whatsappDirect: string;
    orFillForm: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    districtLabel: string;
    deviceTypeLabel: string;
    issueDescLabel: string;
    issueDescPlaceholder: string;
    preferredTimeLabel: string;
    timingUrgent: string;
    timingMorning: string;
    timingFlexible: string;
    submitBtn: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    whatsappRedirectBtn: string;
    closeBtn: string;
    privacyNote: string;
  };
  footer: {
    tagline: string;
    rights: string;
    address: string;
    emergencyCall: string;
    certifiedEngineers: string;
    districtsCovered: string;
  };
}

export const translations: Record<Language, Translations> = {
  az: {
    nav: {
      brand: 'azservis.az',
      diagnostics3d: '3D Diaqnostika',
      services: 'Xidmətlər',
      calculator: 'Qiymət Kalkulyatoru',
      process: '4 Mərhələli Proses',
      about: 'Haqqımızda',
      callMaster: 'Usta Çağır',
      callShort: 'Çağırış',
    },
    hero: {
      kicker: 'MÜASİR TEXNİKİ MÜHƏNDİSLİK & DİAQNOSTİKA MƏRKƏZİ',
      headline: 'Peşəkar Texniki Servisdə Yeni Standart',
      subheadline: 'Kombi, kondisioner, məişət və sənaye avadanlıqlarının 3D rəqəmsal diaqnostikası, orijinal ehtiyat hissələri və 24 aya qədər rəsmi zəmanətlə operativ təmiri.',
      scrollHint: 'Aşağı diyirləyin — 3D partlayış modelini açın',
      scrollExplode: '3D Partlayış Səviyyəsi',
      reset3d: 'Görünüşü Sıfırla',
      freeRotate: '360° Sərbəst Fırlanma',
      lockScroll: 'Scroll Rejimi',
      diagnosticPoints: 'Diaqnostika Nöqtələri',
      activeMastersOnline: '38 Aktiv Usta Bakı Üzrə',
      averageArrivalTime: '30-45 Dəqiqə Ərzində Çatış',
      warrantyDuration: '24 Ayadək Yazılı Zəmanət',
    },
    categories: {
      kombi: {
        label: 'Kombi & İstilik',
        desc: 'Plata təmiri, qazan yuyulması, dövriyyə nasosu və qaz klapanı diaqnostikası',
        popularModels: 'Bosch, Vaillant, Immergas, Ariston, Baxi',
        activeTechCount: 14,
      },
      kondisioner: {
        label: 'Kondisioner',
        desc: 'Kompressor diaqnostikası, R410A / R32 freon doldurulması, plata proqramlaşdırılması',
        popularModels: 'Mitsubishi, Daikin, Gree, LG, Samsung',
        activeTechCount: 11,
      },
      meiset: {
        label: 'Məişət Texnikası',
        desc: 'Inverter paltaryuyan, qabyuyan, no-frost soyuducu və soba avadanlıqları',
        popularModels: 'Siemens, Bosch, Samsung, LG, Beko',
        activeTechCount: 9,
      },
      senaye: {
        label: 'Sənaye Avadanlığı',
        desc: 'Restoran soyuducu kameraları, mərkəzi qazanxanalar, sənaye qabyuyanları',
        popularModels: 'Zanussi, Fagor, Rational, Unox',
        activeTechCount: 4,
      },
    },
    quickBar: {
      selectEquipment: 'Avadanlıq növü seçin',
      detectedFault: 'Tipik Nasazlıq',
      callMasterBtn: 'Operativ Usta Çağır',
      estCostFrom: 'Qiymət aralığı',
    },
    hotspots: {
      stator: {
        title: 'Elektromaqnit Stator',
        desc: 'Mis sarğıların müqavimət və qısaqapanma testi',
        metric: 'Müqavimət: 14.8 Ω (Normal)',
      },
      rotor: {
        title: 'Neodim İnverter Rotor',
        desc: 'Dinamik balanslaşdırma və daimi maqnit gücü analizi',
        metric: 'RPM Dəqiqliyi: ±0.4%',
      },
      damper: {
        title: 'Hidravlik Amortizatorlar',
        desc: 'Vibrasiya udma qabiliyyəti və porşen təzyiqi',
        metric: 'Amortizasiya: 120N gərginlik',
      },
      inverterPcb: {
        title: 'Ağıllı İnverter İdarəetmə Platası',
        desc: 'Mikroprosessor xəta kodları və güc tranzistorları',
        metric: 'Diaqnostika: Xətasız (Ready)',
      },
      drum: {
        title: 'Lazer Qaynaqlı Paslanmaz Baraban',
        desc: 'Podşipnik və saxsı kipgəcin aşınma dərəcəsi',
        metric: 'Ox Meylliliyi: < 0.05 mm',
      },
      heater: {
        title: 'Keramik Ərpsiz Qızdırıcı Ten',
        desc: 'İzolyasiya müqaviməti və kalsium qatı qalınlığı',
        metric: 'İstilik gücü: 2000W / 220V',
      },
    },
    process: {
      sectionKicker: 'MÜHƏNDİSLİK MƏRHƏLƏLƏRİ',
      title: 'Dəqiq və Şəffaf 4 Addımlı Xidmət Modeli',
      subtitle: 'Təmir prosesinin hər bir fazası rəqəmsal protokolla qeyd olunur və müştəriyə rəsmi aktla təhvil verilir.',
      steps: [
        {
          num: '01',
          title: 'Dəqiq Rəqəmsal Diaqnostika',
          description: 'Mütəxəssisimiz ünvana çataraq rəqəmsal testerlər, termovizor və manometrlə avadanlığın tam elektron-mexaniki analizini aparır.',
          details: ['Termal kamera ilə qızma nöqtələrinin aşkarlanması', 'Plata üzərində siqnal osiloqrafiyası', 'Ödənişsiz diaqnostika (təmir razılığı ilə)'],
          timeBadge: 'İlk 20 dəqiqə',
        },
        {
          num: '02',
          title: 'Orijinal Ehtiyat Hissəsi',
          description: 'Yalnız zavod istehsalçılarının sertifikatlı OEM ehtiyat hissələri istifadə olunur. Heç bir işlənmiş və ya saxta detal quraşdırılmır.',
          details: ['Almaniya və İtaliya idxalı orijinal komponentlər', 'Zavod qablaşdırması və seriya nömrəsi təsdiqi', 'Dərhal anbar təminatı'],
          timeBadge: 'Anbar stokundan',
        },
        {
          num: '03',
          title: 'Zəmanətli Peşəkar Təmir',
          description: 'Sertifikatlı mühəndislər texnoloji tələblərə uyğun təmir icra edir və cihazı xüsusi sınaq rejimində yüklənmə altında yoxlayır.',
          details: ['Statik və dinamik test dövriyyəsi', 'Qoruyucu torpaqlama və sızma testi', 'Müştəri qarşısında funksional təhvil'],
          timeBadge: '30-90 dəqiqə',
        },
        {
          num: '04',
          title: 'Rəsmi Akt & İllik Dəstək',
          description: 'Görülmüş işlərə və dəyişdirilmiş hissələrə möhürlü rəsmi zəmanət talonu təqdim edilir və avadanlıq illik texniki nəzarətə alınır.',
          details: ['6-24 ay yazılı zəmanət vərəqəsi', '24/7 prioritet qaynar xətt dəstəyi', 'Mövsümi profilaktik xatırlatmalar'],
          timeBadge: '365 gün zəmanət',
        },
      ],
    },
    estimator: {
      sectionKicker: 'ŞƏFFAF QİYMƏT SİYASƏTİ',
      title: 'İnteraktiv Xidmət Haqqı Kalkulyatoru',
      subtitle: 'Gizli komissiya yoxdur. Nasazlıq növünü seçin və real vaxt rejimində təxmini təmir büdcəsini hesablayın.',
      step1Title: '1. Texnika və kateqoriyanı seçin',
      step2Title: '2. Nasazlığın xarakterini göstərin',
      step3Title: '3. Xidmət təcililiyi və bölgə',
      urgencyStandard: 'Standart Çatış (Bu gün ərzində)',
      urgencyExpress: 'Təcili Express (30-45 dəqiqəyə)',
      urgencyStandardDesc: 'Planlı usta viziti, pulsuz diaqnostika',
      urgencyExpressDesc: 'Ən yaxın sərbəst mobil briqada yönləndirilir (+15 ₼)',
      summaryTitle: 'Təxmini Təmir Hesabatı',
      diagnosticFee: 'Diaqnostika və vizit',
      diagnosticFeeNote: 'Təmir edildikdə tamamilə PULSUZ (əks halda 15 ₼)',
      laborFee: 'Usta zəhməthaqqı',
      partsEstimate: 'Təxmini orijinal detal',
      totalEstimate: 'Yekun Təxmini Məbləğ',
      timeToArrival: 'Ortalama gəliş müddəti',
      warrantyCoverage: 'Zəmanət müddəti',
      dispatchWithQuoteBtn: 'Bu Hesabla Usta Çağır',
      transparentGuarantee: 'Rəsmi invoys və zəmanət talonu yerində verilir',
    },
    bento: {
      sectionKicker: 'XİDMƏT EKOSİSTEMİ',
      title: 'Hər Növ Texniki Sistemlər Üzrə İxtisaslaşmışıq',
      subtitle: 'Məişət cihazlarından tutmuş mürəkkəb mühəndislik iqlim şəbəkələrinədək Baku və Abşeronda xidmətinizdəyik.',
      kombiCard: {
        title: 'Kombi & İstilik Şəbəkələri',
        desc: 'Bütün növ iki dövriyyəli və yoğuşmalı kombilərin təmiri, ərpdən təmizlənməsi və qaz klapanı kalibrlənməsi.',
        badge: '14 Aktiv Usta',
        models: 'Bosch, Vaillant, Immergas, Baxi, Ariston, Viessmann',
        features: ['Plata mikro-lehimləməsi', 'Qazan kimyəvi yuyulması', 'Dövriyyə nasosu bərpası'],
      },
      climateCard: {
        title: 'Kondisioner & VRF Sistemləri',
        desc: 'İnverter və on/off modellərin montajı, R410A / R32 freon doldurulması və daxili blok antibakterial təmizliyi.',
        badge: 'R410A & R32 Stokda',
        models: 'Mitsubishi Electric, Daikin, Gree, Aux, LG, Samsung',
        features: ['Elektron plata proqramlaşdırılması', 'Kompressor təzyiq testi', 'Drenaj borusu təmizliyi'],
      },
      laundryCard: {
        title: 'Ağıllı Paltaryuyan & Qabyuyan',
        desc: 'Direct Drive inverter mühərriklər, podşipnik və amortizatorların xüsusi pres alətləri ilə zəmanətli dəyişimi.',
        badge: '24 Ay Zəmanət',
        features: ['Səs və silkələnmənin ləğvi', 'Su sızma sensoru təmiri', 'Nasos və qızdırıcı ten dəyişimi'],
      },
      industrialCard: {
        title: 'Sənaye & Restoran Avadanlığı',
        desc: 'Şadlıq sarayları, kafelər və otellər üçün soyuq otaqlar, konveksiya sobaları və sənaye qabyuyanları.',
        badge: 'B2B Müqavilə',
        features: ['Planlı texniki servis', 'Fövqəladə 1 saatlıq reaksiyası', 'ƏDV ilə rəsmi faktura'],
      },
      mobileLabCard: {
        title: 'Mobil Diaqnostika Laboratoriyası',
        desc: 'Baku şəhərinin 12 rayonunda tam təchiz olunmuş 8 mobil xidmət avtomobili hazır növbətçilikdədir.',
        badge: '24/7 Qəza Xidməti',
        features: ['Yerində detallı test stendi', 'Orijinal ehtiyat hissə bazası', 'POS-terminal ilə kartla ödəniş'],
      },
    },
    dispatchDrawer: {
      title: 'Usta Çağırışı & Təcili Xidmət',
      subtitle: 'Birbaşa telefon zəngi, WhatsApp və ya rəqəmsal sifariş forması ilə ən yaxın briqadanı ünvana yönləndirin.',
      callDirect: 'Birbaşa Zəng Et',
      whatsappDirect: 'WhatsApp ilə Yaz',
      orFillForm: 'və ya qısa sifariş formasını doldurun',
      nameLabel: 'Adınız və Soyadınız',
      namePlaceholder: 'Məs: Elvin Məmmədov',
      phoneLabel: 'Əlaqə Nömrəsi',
      districtLabel: 'Bakı / Abşeron Rayonu',
      deviceTypeLabel: 'Texnikanın Növü',
      issueDescLabel: 'Nasazlığın Qısa Təsviri',
      issueDescPlaceholder: 'Məsələn: Kombi E01 xətası verir və ya Paltaryuyan sıxma zamanı güclü səs çıxarır',
      preferredTimeLabel: 'Ustanın Gəliş Vaxtı',
      timingUrgent: 'Təcili (30-45 dəqiqə)',
      timingMorning: 'Sabah Səhər (09:00 - 13:00)',
      timingFlexible: 'Günün ikinci yarısı',
      submitBtn: 'Usta Çağırışını Təsdiqlə',
      submitting: 'Sistem qeydiyyata alır...',
      successTitle: 'Çağırışınız Qəbul Olundu!',
      successMessage: 'Növbətçi dispetçer və ən yaxın texniki usta 5 dəqiqə ərzində sizinlə əlaqə saxlayacaq.',
      whatsappRedirectBtn: 'WhatsApp ilə Təsdiqi Göndər',
      closeBtn: 'Bağla',
      privacyNote: 'Məlumatlarınız gizli saxlanılır və yalnız xidmət təşkili üçün istifadə edilir.',
    },
    footer: {
      tagline: 'Azərbaycanda rəqəmsal standartlı texniki təmir və mühəndislik infrastrukturu.',
      rights: 'Bütün hüquqlar qorunur.',
      address: 'Bakı şəhəri, Nərimanov r-nu, Əhməd Rəcəbli küç. 44B, Texnopark',
      emergencyCall: '24/7 Qaynar Xətt:',
      certifiedEngineers: 'Sertifikatlı Mühəndislər',
      districtsCovered: 'Bakı & Abşeron Üzrə 12 Rayonda Xidmət',
    },
  },
  en: {
    nav: {
      brand: 'azservis.az',
      diagnostics3d: '3D Diagnostics',
      services: 'Services',
      calculator: 'Fee Calculator',
      process: '4-Step Process',
      about: 'About',
      callMaster: 'Call Master',
      callShort: 'Call',
    },
    hero: {
      kicker: 'ADVANCED TECHNICAL REPAIR & DIAGNOSTICS HUB',
      headline: 'The New Benchmark in Technical Appliance Care',
      subheadline: 'Interactive 3D diagnostics, authentic OEM components, and precision maintenance for climate, heating, and domestic machinery with up to 24 months written warranty.',
      scrollHint: 'Scroll down to expand 3D exploded engineering view',
      scrollExplode: 'Exploded View State',
      reset3d: 'Reset View',
      freeRotate: '360° Free Orbit',
      lockScroll: 'Scroll Mode',
      diagnosticPoints: 'Diagnostic Inspection Hotspots',
      activeMastersOnline: '38 Active Field Masters in Baku',
      averageArrivalTime: 'Arrival in 30-45 Minutes',
      warrantyDuration: 'Up to 24 Months Written Warranty',
    },
    categories: {
      kombi: {
        label: 'Boiler & Heating',
        desc: 'Motherboard soldering, chemical descaling, circulation pump & gas valve diagnostics',
        popularModels: 'Bosch, Vaillant, Immergas, Ariston, Baxi',
        activeTechCount: 14,
      },
      kondisioner: {
        label: 'Air Conditioning',
        desc: 'Compressor diagnostics, R410A / R32 refrigerant recharging, electronic logic programming',
        popularModels: 'Mitsubishi, Daikin, Gree, LG, Samsung',
        activeTechCount: 11,
      },
      meiset: {
        label: 'Major Appliances',
        desc: 'Inverter washing machines, dishwashers, no-frost refrigerators, and induction hobs',
        popularModels: 'Siemens, Bosch, Samsung, LG, Beko',
        activeTechCount: 9,
      },
      senaye: {
        label: 'Commercial Systems',
        desc: 'Commercial cold storage, central boiler networks, industrial dishwashing systems',
        popularModels: 'Zanussi, Fagor, Rational, Unox',
        activeTechCount: 4,
      },
    },
    quickBar: {
      selectEquipment: 'Select equipment category',
      detectedFault: 'Typical Issue',
      callMasterBtn: 'Dispatch Certified Master',
      estCostFrom: 'Estimated fee',
    },
    hotspots: {
      stator: {
        title: 'Electromagnetic Stator',
        desc: 'Copper coil insulation and resistance verification',
        metric: 'Resistance: 14.8 Ω (Nominal)',
      },
      rotor: {
        title: 'Neodymium Inverter Rotor',
        desc: 'Dynamic dynamic balancing and magnetic field strength inspection',
        metric: 'RPM Accuracy: ±0.4%',
      },
      damper: {
        title: 'Hydraulic Shock Dampers',
        desc: 'Vibration damping coefficient and piston chamber pressure',
        metric: 'Load capacity: 120N tension',
      },
      inverterPcb: {
        title: 'Smart Inverter Logic Controller',
        desc: 'Microcontroller diagnostic telemetry and power MOSFET channels',
        metric: 'Telemetry: Zero faults (Ready)',
      },
      drum: {
        title: 'Laser-Welded Stainless Drum',
        desc: 'Heavy-duty sealed bearings and ceramic seal ring tolerance',
        metric: 'Axial deviation: < 0.05 mm',
      },
      heater: {
        title: 'Ceramic Cal-Block Heating Coil',
        desc: 'Dielectric insulation resistance and thermal dissipation efficiency',
        metric: 'Heating power: 2000W / 220V',
      },
    },
    process: {
      sectionKicker: 'ENGINEERING WORKFLOW',
      title: 'Transparent 4-Step Technical Methodology',
      subtitle: 'Every phase is documented digitally with standardized diagnostic protocols and official handover documents.',
      steps: [
        {
          num: '01',
          title: 'Digital Precision Diagnostics',
          description: 'Our certified master arrives equipped with digital diagnostic scanners, thermal imagers, and pressure gauges to evaluate electrical and mechanical health.',
          details: ['Thermal camera inspection for hotspots', 'Digital oscilloscope board analysis', 'Free diagnostics with repair approval'],
          timeBadge: 'First 20 mins',
        },
        {
          num: '02',
          title: 'Authentic OEM Parts',
          description: 'We install only genuine manufacturer parts with verifiable factory serial numbers. Zero refurbished or low-grade substitutes.',
          details: ['Imported OEM components from Germany & Italy', 'Sealed factory packaging with barcode verification', 'Immediate warehouse availability'],
          timeBadge: 'In stock',
        },
        {
          num: '03',
          title: 'Warrantied Master Repair',
          description: 'Licensed field technicians execute precision repairs according to manufacturer technical bulletins, followed by high-load operational stress testing.',
          details: ['Dynamic load cycle evaluation', 'Grounding continuity & dielectric leakage check', 'Interactive functional handover'],
          timeBadge: '30-90 mins',
        },
        {
          num: '04',
          title: 'Written Warranty & Support',
          description: 'Receive an official stamped warranty certificate for both labor and installed components, with ongoing 24/7 priority emergency support.',
          details: ['6 to 24 months official warranty certificate', '24/7 priority dispatch hotline', 'Proactive seasonal maintenance reminders'],
          timeBadge: '365 days coverage',
        },
      ],
    },
    estimator: {
      sectionKicker: 'TRANSPARENT PRICING',
      title: 'Interactive Service Fee Estimator',
      subtitle: 'No hidden fees. Select your equipment and malfunction category to preview transparent real-time pricing.',
      step1Title: '1. Select appliance category',
      step2Title: '2. Select malfunction nature',
      step3Title: '3. Urgency & service area',
      urgencyStandard: 'Standard Dispatch (Same day)',
      urgencyExpress: 'Express Emergency (30-45 mins)',
      urgencyStandardDesc: 'Scheduled technician visit, free diagnostics with repair',
      urgencyExpressDesc: 'Closest active mobile team dispatched instantly (+15 ₼)',
      summaryTitle: 'Estimated Cost Breakdown',
      diagnosticFee: 'Diagnostic & home visit',
      diagnosticFeeNote: 'FREE when service is performed (otherwise 15 ₼)',
      laborFee: 'Technician labor fee',
      partsEstimate: 'Estimated OEM part',
      totalEstimate: 'Total Estimated Quote',
      timeToArrival: 'Average arrival time',
      warrantyCoverage: 'Warranty period',
      dispatchWithQuoteBtn: 'Dispatch Master With This Quote',
      transparentGuarantee: 'Official invoice and signed warranty provided on-site',
    },
    bento: {
      sectionKicker: 'SERVICE ECOSYSTEM',
      title: 'Specialized Expertise Across Every Technical System',
      subtitle: 'From delicate inverter micro-circuits to heavy industrial cooling networks in Baku and Absheron.',
      kombiCard: {
        title: 'Boiler & Central Heating Networks',
        desc: 'Comprehensive dual-circuit and condensing boiler repairs, ultrasonic descaling, and high-accuracy gas valve tuning.',
        badge: '14 Active Masters',
        models: 'Bosch, Vaillant, Immergas, Baxi, Ariston, Viessmann',
        features: ['Micro-soldering controller boards', 'Chemical scale removal', 'Circulation pump restoration'],
      },
      climateCard: {
        title: 'Air Conditioning & VRF Networks',
        desc: 'Precision inverter AC maintenance, electronic PCB flash-programming, and genuine R410A / R32 refrigerant refilling.',
        badge: 'R410A & R32 in Stock',
        models: 'Mitsubishi Electric, Daikin, Gree, Aux, LG, Samsung',
        features: ['Logic board re-programming', 'Compressor compression test', 'Deep antibacterial steam cleaning'],
      },
      laundryCard: {
        title: 'Smart Laundry & Dishwashing Systems',
        desc: 'Direct-drive brushless motor rebuilds, sealed bearing press replacements, and electronic drain management.',
        badge: '24 Month Warranty',
        features: ['Vibration & noise elimination', 'Aqua-stop sensor diagnostics', 'High-pressure heating element renewal'],
      },
      industrialCard: {
        title: 'Commercial & Hospitality Equipment',
        desc: 'Cold storage walk-in rooms, commercial ovens, and high-capacity restaurant dishwashers.',
        badge: 'B2B Enterprise',
        features: ['Preventive maintenance SLA', '1-hour emergency response', 'Official tax invoices with VAT'],
      },
      mobileLabCard: {
        title: 'Mobile Diagnostics Laboratory',
        desc: '8 fully-equipped technician vans positioned strategically across 12 Baku municipal districts.',
        badge: '24/7 Mobile Fleet',
        features: ['On-site digital testing stations', 'Mobile OEM parts store', 'Instant contactless card payments'],
      },
    },
    dispatchDrawer: {
      title: 'Dispatch Technician & Emergency Call',
      subtitle: 'Connect via direct phone, WhatsApp, or instant digital reservation form to route the nearest technician.',
      callDirect: 'Call Directly',
      whatsappDirect: 'Chat on WhatsApp',
      orFillForm: 'or submit an instant dispatch request',
      nameLabel: 'Your Full Name',
      namePlaceholder: 'e.g., Tural Aliyev',
      phoneLabel: 'Phone Number',
      districtLabel: 'Baku / Absheron District',
      deviceTypeLabel: 'Equipment Category',
      issueDescLabel: 'Issue Description',
      issueDescPlaceholder: 'e.g., Boiler flashes error code F28 or Washer has heavy drum vibration',
      preferredTimeLabel: 'Preferred Arrival Time',
      timingUrgent: 'Urgent (30-45 minutes)',
      timingMorning: 'Tomorrow Morning (09:00 - 13:00)',
      timingFlexible: 'Afternoon / Flexible',
      submitBtn: 'Confirm Master Dispatch',
      submitting: 'Registering dispatch...',
      successTitle: 'Dispatch Request Confirmed!',
      successMessage: 'Our lead dispatcher and the assigned field engineer will contact you within 5 minutes.',
      whatsappRedirectBtn: 'Send Details via WhatsApp',
      closeBtn: 'Close',
      privacyNote: 'Your information is protected and used strictly for service coordination.',
    },
    footer: {
      tagline: 'Precision engineering and digital service infrastructure in Azerbaijan.',
      rights: 'All rights reserved.',
      address: 'Baku, Narimanov Dist., Ahmad Rajabli 44B, Technopark Campus',
      emergencyCall: '24/7 Hotline:',
      certifiedEngineers: 'Certified Engineers',
      districtsCovered: 'Servicing 12 Districts Across Baku & Absheron',
    },
  },
  ru: {
    nav: {
      brand: 'azservis.az',
      diagnostics3d: '3D Диагностика',
      services: 'Услуги',
      calculator: 'Калькулятор',
      process: '4 Этапа Работы',
      about: 'О компании',
      callMaster: 'Вызвать Мастера',
      callShort: 'Вызов',
    },
    hero: {
      kicker: 'ЦЕНТР ЦИФРОВОЙ ИНЖЕНЕРИИ И ДИАГНОСТИКИ',
      headline: 'Новый Стандарт Технического Сервиса',
      subheadline: '3D цифровая диагностика, оригинальные запчасти и оперативный ремонт комби, кондиционеров и бытовой техники в Баку с официальной гарантией до 24 месяцев.',
      scrollHint: 'Прокрутите вниз — взрыв-схема 3D механизма',
      scrollExplode: 'Степень Взрыв-Схемы',
      reset3d: 'Сброс Ракурса',
      freeRotate: '360° Вращение',
      lockScroll: 'Режим Скролла',
      diagnosticPoints: 'Точки Диагностики',
      activeMastersOnline: '38 Мастеров на Линии в Баку',
      averageArrivalTime: 'Прибытие за 30-45 Минут',
      warrantyDuration: 'Гарантия до 24 Месяцев',
    },
    categories: {
      kombi: {
        label: 'Комби и Отопление',
        desc: 'Ремонт плат управления, промывка теплообменника, насосы и газовые клапаны',
        popularModels: 'Bosch, Vaillant, Immergas, Ariston, Baxi',
        activeTechCount: 14,
      },
      kondisioner: {
        label: 'Кондиционеры',
        desc: 'Диагностика компрессоров, заправка фреоном R410A / R32, прошивка электроники',
        popularModels: 'Mitsubishi, Daikin, Gree, LG, Samsung',
        activeTechCount: 11,
      },
      meiset: {
        label: 'Бытовая Техника',
        desc: 'Инверторные стиральные, посудомоечные машины, холодильники No-Frost',
        popularModels: 'Siemens, Bosch, Samsung, LG, Beko',
        activeTechCount: 9,
      },
      senaye: {
        label: 'Промышленное Оборудование',
        desc: 'Холодильные камеры ресторанов, котельные установки, промышленные машины',
        popularModels: 'Zanussi, Fagor, Rational, Unox',
        activeTechCount: 4,
      },
    },
    quickBar: {
      selectEquipment: 'Выберите тип техники',
      detectedFault: 'Характерная Неисправность',
      callMasterBtn: 'Вызвать Инженера',
      estCostFrom: 'Ориентир цены',
    },
    hotspots: {
      stator: {
        title: 'Электромагнитный Статор',
        desc: 'Тестирование сопротивления медных обмоток на пробой',
        metric: 'Сопротивление: 14.8 Ом (Норма)',
      },
      rotor: {
        title: 'Неодимовый Инверторный Ротор',
        desc: 'Динамическая балансировка и сила постоянных магнитов',
        metric: 'Точность RPM: ±0.4%',
      },
      damper: {
        title: 'Гидравлические Амортизаторы',
        desc: 'Коэффициент демпфирования вибраций и давление в поршнях',
        metric: 'Усилие: 120N натяжение',
      },
      inverterPcb: {
        title: 'Инверторная Плата Управления',
        desc: 'Диагностика микропроцессора и силовых транзисторов',
        metric: 'Статус: Ошибок нет (Ready)',
      },
      drum: {
        title: 'Лазерный Нержавеющий Барабан',
        desc: 'Износ подшипникового узла и керамического сальника',
        metric: 'Биение оси: < 0.05 мм',
      },
      heater: {
        title: 'Керамический ТЭН с Защитой от Накипи',
        desc: 'Сопротивление изоляции и теплоотдача',
        metric: 'Мощность: 2000W / 220V',
      },
    },
    process: {
      sectionKicker: 'ТЕХНОЛОГИЧЕСКИЙ ПРОЦЕСС',
      title: 'Прозрачная 4-Этапная Модель Сервиса',
      subtitle: 'Каждый этап фиксируется в электронном протоколе и сдается клиенту по официальному акту.',
      steps: [
        {
          num: '01',
          title: 'Цифровая Диагностика',
          description: 'Инженер прибывает с цифровыми тестерами, тепловизором и манометром для детального анализа электроники и механики.',
          details: ['Поиск перегрева тепловизором', 'Осциллографический анализ платы', 'Бесплатно при согласии на ремонт'],
          timeBadge: 'Первые 20 мин',
        },
        {
          num: '02',
          title: 'Оригинальные Комплектующие',
          description: 'Устанавливаются исключительно сертифицированные детали с заводской гарантией. Никаких б/у или аналогов сомнительного качества.',
          details: ['Прямой импорт из Германии и Италии', 'Заводская упаковка со штрих-кодом', 'Постоянное наличие на складе'],
          timeBadge: 'Со склада в Баку',
        },
        {
          num: '03',
          title: 'Гарантийный Ремонт',
          description: 'Сертифицированные мастера выполняют ремонт по регламенту заводов и тестируют технику под рабочей нагрузкой.',
          details: ['Стресс-тест в рабочих режимах', 'Проверка заземления и изоляции', 'Демонстрация клиенту'],
          timeBadge: '30-90 мин',
        },
        {
          num: '04',
          title: 'Официальный Акт и Поддержка',
          description: 'Выдается фирменный гарантийный талон с печатью на работу и детали, подключается приоритетная сервисная поддержка.',
          details: ['Гарантийный талон от 6 до 24 мес.', 'Круглосуточная горячая линия', 'Напоминания о ТО'],
          timeBadge: '365 дней защиты',
        },
      ],
    },
    estimator: {
      sectionKicker: 'ПРОЗРАЧНЫЕ ТАРИФЫ',
      title: 'Интерактивный Калькулятор Стоимости',
      subtitle: 'Никаких скрытых платежей. Укажите неисправность и рассчитайте предварительную смету онлайн.',
      step1Title: '1. Выберите категорию техники',
      step2Title: '2. Укажите характер поломки',
      step3Title: '3. Срочность и район',
      urgencyStandard: 'Стандартный выезд (В течение дня)',
      urgencyExpress: 'Срочный выезд (за 30-45 минут)',
      urgencyStandardDesc: 'Плановый визит мастера, бесплатная диагностика',
      urgencyExpressDesc: 'Направление ближайшей мобильной бригады (+15 ₼)',
      summaryTitle: 'Предварительный Расчет',
      diagnosticFee: 'Диагностика и выезд',
      diagnosticFeeNote: 'БЕСПЛАТНО при выполнении ремонта (иначе 15 ₼)',
      laborFee: 'Работа мастера',
      partsEstimate: 'Примерная стоимость детали',
      totalEstimate: 'Итоговая Оценка',
      timeToArrival: 'Среднее время прибытия',
      warrantyCoverage: 'Гарантийный срок',
      dispatchWithQuoteBtn: 'Вызвать Мастера с Этим Расчетом',
      transparentGuarantee: 'Официальная квитанция и гарантия выдаются на месте',
    },
    bento: {
      sectionKicker: 'ЭКОСИСТЕМА УСЛУГ',
      title: 'Профессиональная Экспертиза Любых Систем',
      subtitle: 'От чувствительной электроники бытовой техники до промышленных климатических сетей в Баку и на Абшероне.',
      kombiCard: {
        title: 'Комби и Отопительные Системы',
        desc: 'Ремонт двухконтурных и конденсационных котлов, промывка от накипи, калибровка газовой арматуры.',
        badge: '14 Мастеров в сети',
        models: 'Bosch, Vaillant, Immergas, Baxi, Ariston, Viessmann',
        features: ['Микропайка плат управления', 'Химическая промывка теплообменника', 'Восстановление насосов'],
      },
      climateCard: {
        title: 'Кондиционеры и VRF Системы',
        desc: 'Обслуживание инверторных сплит-систем, заправка оригинальным хладагентом R410A / R32 и глубокая дезинфекция.',
        badge: 'Фреон R410A & R32 на складе',
        models: 'Mitsubishi Electric, Daikin, Gree, Aux, LG, Samsung',
        features: ['Прошивка плат инвертора', 'Тест давления компрессора', 'Антибактериальная обработка'],
      },
      laundryCard: {
        title: 'Инверторные Стиральные Машины',
        desc: 'Двигатели прямого привода Direct Drive, замена подшипников на прессовом стенде, замена амортизаторов.',
        badge: 'Гарантия 24 Месяца',
        features: ['Устранение вибраций и шума', 'Ремонт датчиков протечки', 'Замена ТЭНа и помпы слива'],
      },
      industrialCard: {
        title: 'Промышленное Оборудование',
        desc: 'Холодильные камеры ресторанов, отелей, конвекционные печи и профессиональные посудомоечные машины.',
        badge: 'B2B Контракт',
        features: ['Плановый регламент ТО', 'Экстренный выезд за 1 час', 'Официальные счета с НДС'],
      },
      mobileLabCard: {
        title: 'Мобильная Диагностическая Лаборатория',
        desc: '8 укомплектованных сервисных автомобилей дежурят по 12 районам Баку для оперативного выезда.',
        badge: 'Круглосуточно 24/7',
        features: ['Электронный стенд на месте', 'Склад оригинальных деталей в авто', 'Оплата картой через POS-терминал'],
      },
    },
    dispatchDrawer: {
      title: 'Вызов Мастера и Срочный Сервис',
      subtitle: 'Свяжитесь по прямому телефону, WhatsApp или через форму, чтобы направить ближайшего инженера.',
      callDirect: 'Прямой Звонок',
      whatsappDirect: 'Написать в WhatsApp',
      orFillForm: 'или заполните экспресс-заявку',
      nameLabel: 'Ваше Имя и Фамилия',
      namePlaceholder: 'Например: Рустам Алиев',
      phoneLabel: 'Номер Телефона',
      districtLabel: 'Район Баку / Абшерона',
      deviceTypeLabel: 'Вид Техники',
      issueDescLabel: 'Краткое Описание Поломки',
      issueDescPlaceholder: 'Например: Комби выдает ошибку F28 или стиральная машина сильно вибрирует',
      preferredTimeLabel: 'Желаемое Время Прибытия',
      timingUrgent: 'Срочно (30-45 минут)',
      timingMorning: 'Завтра Утром (09:00 - 13:00)',
      timingFlexible: 'Во второй половине дня',
      submitBtn: 'Подтвердить Вызов Инженера',
      submitting: 'Регистрация вызова...',
      successTitle: 'Заявка Успешно Принята!',
      successMessage: 'Дежурный диспетчер и назначенный мастер свяжутся с вами в течение 5 минут.',
      whatsappRedirectBtn: 'Отправить Данные в WhatsApp',
      closeBtn: 'Закрыть',
      privacyNote: 'Ваши данные строго конфиденциальны и используются только для организации сервиса.',
    },
    footer: {
      tagline: 'Цифровая сервисная инфраструктура и инженерный ремонт в Азербайджане.',
      rights: 'Все права защищены.',
      address: 'г. Баку, Наримановский р-н, ул. Ахмеда Раджабли 44B, Технопарк',
      emergencyCall: 'Горячая Линия 24/7:',
      certifiedEngineers: 'Сертифицированные Инженеры',
      districtsCovered: 'Обслуживание 12 Районов Баку и Абшерона',
    },
  },
};
