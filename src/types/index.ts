export type Language = 'az' | 'en' | 'ru';

export type ServiceCategory = 'kombi' | 'kondisioner' | 'meiset' | 'senaye';

export interface DiagnosticHotspot {
  id: string;
  titleAz: string;
  titleEn: string;
  titleRu: string;
  descAz: string;
  descEn: string;
  descRu: string;
  position: [number, number, number];
  componentName: string;
  wearProbability: string;
  diagnosticMetric: string;
}

export interface EstimatorConfig {
  category: ServiceCategory;
  appliance: string;
  issue: string;
  urgency: 'standard' | 'express';
  district: string;
}

export interface EstimatorResult {
  baseLabor: number;
  partsEstimate: number;
  diagnosticFee: number;
  totalAzn: number;
  timeEstimateHours: number;
  warrantyMonths: number;
}
