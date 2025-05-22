import type { z } from 'zod';

export interface SurveyQuestion {
  id: string;
  name: string; // for react-hook-form field name
  label: string;
  type: 'text' | 'textarea' | 'slider' | 'number';
  defaultValue?: string | number;
  placeholder?: string;
  validation: z.ZodTypeAny;
  min?: number;
  max?: number;
  step?: number;
  sliderLabelSuffix?: string; // e.g., "%" for percentage slider
}

export type SurveyFormData = Record<string, string | number | undefined>;
