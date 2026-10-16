# azservis.az — Hi-Tech Interactive 3D Service & Repair Portal

An editorial, $50,000-grade interactive web experience for Azerbaijan's premier technical repair portal, featuring a procedural 3D scroll-driven exploded machinery engine, real-time diagnostic cost estimator, bento-grid service ecosystem, and instant technician dispatch.

> [!IMPORTANT]
> **User Review & Confirmed Decisions from Phase 1**
> - **3D Hero Asset**: High-precision modular smart appliance & brushless inverter drum engine with procedural Three.js exploded scroll choreography (motor core, shock dampers, high-torque rotor, magnetic stator, diagnostic logic board, and heating element).
> - **"Usta Çağır" CTA Flow**: Instant slide-over technical dispatch drawer with 1-tap direct phone connection (`+994 12 555-SERV`, `+994 50 333-AZSV`) and WhatsApp routing pre-populated with selected equipment diagnostics.
> - **Localization**: Native Azerbaijani (`AZ`) primary interface with instantaneous localized switching for English (`EN`) and Russian (`RU`).

---

### 1. Overview & Core Concept

- **What It Does**: Transmutes traditional appliance and climate repair booking into an immersive, precision-engineered technical portal. Users inspect equipment anatomy via interactive 3D scroll exploded views, diagnose issues through a live cost estimator, explore service tiers, and dispatch certified master technicians.
- **Target Audience / Persona**: Homeowners, commercial facility managers, and residential property administrators in Baku and Absheron requiring trustworthy, warrantied, and certified technical repair services.
- **Key Value**: Eradicates repair ambiguity through transparent diagnostic checkpoints, OEM-certified part guarantees, and dynamic upfront pricing estimates.

---

### 2. User Experience & Visual Design

- **Visual Identity & Theme**:
  - *Color Discipline (60-30-10)*: Deep obsidian technical canvas (`#0B0F19`, 60%), sleek structural slate cards (`#161C2E`, 30%), electric cyan (`#00F0FF`, 5%) for active circuits/diagnostic indicators, and emerald green (`#10B981`, 5%) for technician availability and verified warranty status.
  - *Typography*: High-contrast pairing of Google Fonts `Instrument Serif` (for refined editorial headlines and statement typography) with `Inter` (for technical specifications, tabular pricing data, and interactive forms).
  - *Design Aesthetics*: Hi-tech aerospace blueprinting, glassmorphic HUD overlays (`backdrop-blur-md bg-slate-900/60 border border-cyan-500/20`), hairline technical gridlines, and tactile micro-interactions.

- **Key User Flows**:
  1. **Hero & 3D Interactive Inspection**:
     - User lands on the full-bleed hero with the headline *"Peşəkar Texniki Servisdə Yeni Standart"*.
     - As the user scrolls down, the 3D smart inverter engine expands into an exploded technical diagram: outer chassis separates, inner drum suspends, electromagnetic rotor uncouples, and floating 3D diagnostic hotspots (e.g., *Inverter Sürücü*, *Vibrasiya Amortizatoru*, *Termik Qızdırıcı*) highlight internal wear points.
     - The floating quick-diagnostic glass bar allows instant category filtering (*Kombi, Kondisioner, Məişət Texnikası, Sənaye Avadanlığı*).
  2. **4-Step Service Methodology**:
     - Chronological interactive process ribbon: `01. Rəqəmsal Diaqnostika` $\rightarrow$ `02. Orijinal Ehtiyat Hissəsi` $\rightarrow$ `03. Zəmanətli Təmir` $\rightarrow$ `04. 365 Gün İllik Dəstək`.
  3. **Dynamic Service Fee Estimator**:
     - Live sliders and selectors for appliance category, issue severity (e.g., səs/titrəyiş, elektronika xətası, su sızması), and urgent dispatch options.
     - Instant itemized quote breakdown with transparent labor, diagnostic fee waiver policy, and genuine parts warranty estimate.
  4. **Bento-Grid Service Ecosystem**:
     - Marquee cards with subtle glass hover zoom, live technician availability counters, and diagnostic tags for Kombi, Split AC, Smart Laundry, Industrial Cold Rooms, and Automated Coffee/Kitchen lines.
  5. **Technician Dispatch Drawer ("Usta Çağır")**:
     - Right-side glassmorphic slide-over accessible from anywhere via header or diagnostic CTA.
     - Captures device model, address/district (Baku districts: Yasamal, Nəsimi, Xətai, Nərimanov, etc.), priority timing, and routes seamlessly to live call or WhatsApp dispatch with pre-filled context.

---

### 3. Key Product Decisions & Trade-Offs

- **Procedural Three.js 3D Machinery vs. Heavy External GLTF Assets**:
  - *Chosen Approach*: Construct the modular appliance inverter assembly procedurally using Three.js composite geometry groups (`THREE.CylinderGeometry`, `THREE.TorusGeometry`, `THREE.ExtrudeGeometry`, and dynamic physical PBR materials with studio reflection).
  - *Why*: Eliminates 404 network risks, prevents multi-megabyte model downloads, and provides 60fps scroll-linked explosion interpolation on both desktop and mobile devices without asset pop-in.
- **Scroll Interpolation Architecture**:
  - *Chosen Approach*: Synchronize 3D explosion displacement and camera pitch to scroll progress using smoothed lerp calculations inside a requestAnimationFrame loop.
  - *Why*: Delivers buttery-smooth response even on high refresh rate displays (120Hz/144Hz) without blocking the DOM scroll thread.
- **Direct Dispatch Architecture**:
  - *Chosen Approach*: In-app slide-over drawer featuring instant direct phone dialers, validated express booking form with localized Baku address picker, and auto-generated WhatsApp diagnostic dispatch strings.
  - *Why*: In the Azerbaijan technical service market, phone call and WhatsApp are the highest-converting customer channels.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        App Root (App.tsx)                              │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │ Top Bar (Clean 3-Zone: Wordmark ── Nav Links ── Usta Çağır)   │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                │                                       │
│   ┌────────────────────────────┴───────────────────────────────────┐   │
│   │ Hero Viewport Container                                        │   │
│   │  ├── Three.js WebGL Canvas (Procedural 3D Exploded Engine)     │   │
│   │  ├── Glassmorphic Floating Quick-Diagnostic Bar                │   │
│   │  └── Editorial Headline & Key Metrics                          │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                │                                       │
│   ┌────────────────────────────┴───────────────────────────────────┐   │
│   │ 4-Step Interactive Process Architecture                        │   │
│   │ (01. Diaqnostika ── 02. Ehtiyat Hissəsi ── 03. Təmir ── 04. Dəstək)│
│   └────────────────────────────────────────────────────────────────┘   │
│                                │                                       │
│   ┌────────────────────────────┴───────────────────────────────────┐   │
│   │ Dynamic Service Fee Estimator & Interactive Pricing Engine     │   │
│   │ (Category Selector, Malfunction Scope, Live AZN Quote)        │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                │                                       │
│   ┌────────────────────────────┴───────────────────────────────────┐   │
│   │ Bento-Grid Service Ecosystem & Real-Time Technician Hub        │   │
│   │ (Kombi Systems, Climate Multi-Split, Major Domestic, Industrial)│  │
│   └────────────────────────────────────────────────────────────────┘   │
│                                │                                       │
│   ┌────────────────────────────┴───────────────────────────────────┐   │
│   │ Slide-Over Usta Çağır Dispatch Drawer (Phone + WhatsApp API)   │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

- **Interactive State & Data Mapping**:
  - `language`: `'az' | 'en' | 'ru'` — Controls dictionary translation across all strings, units, and localized service descriptors.
  - `scrollProgress`: Normalized `0.0 -> 1.0` value driving Three.js component separation vectors ($x, y, z$ offsets of motor housing, stator coils, drum rotor, front seal, and heating coil).
  - `activeServiceCategory`: Selected quick-diagnostic category filtering both the 3D inspection focus and the cost estimator defaults.
  - `estimatorState`: `{ applianceType, issueType, urgency, homeVisitFee, estimatedParts, totalAzn }` updating in real time.
  - `dispatchDrawerOpen`: Boolean governing the glassmorphic express technician dispatch drawer.
