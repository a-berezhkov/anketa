import { z } from 'zod';
import { surveyQuestions } from '@/config/survey-questions';
import type { SurveyQuestion } from '@/types/survey';

export function generateSurveySchema() {
  const schemaShape = surveyQuestions.reduce((acc, question: SurveyQuestion) => {
    acc[question.name] = question.validation;
    return acc;
  }, {} as Record<string, z.ZodTypeAny>);
  return z.object(schemaShape);
}

export const surveyFormSchema = generateSurveySchema();
export type SurveyFormValues = z.infer<typeof surveyFormSchema>;
