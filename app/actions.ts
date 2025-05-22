'use server';

import { summarizeFeedback, type SummarizeFeedbackInput } from '@/ai/flows/summarize-feedback';
import type { SurveyFormValues } from '@/lib/survey-schema';
import { surveyQuestions } from '@/config/survey-questions'; // Import to access question labels
import { db } from '@/lib/firebase'; // Импорт экземпляра Firestore
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Импорт функций Firestore

interface FeedbackSummaryResult {
  summary?: string;
  error?: string;
  responseId?: string; // Опционально: ID сохраненного документа
}

export async function getFeedbackSummaryAction(formData: SurveyFormValues): Promise<FeedbackSummaryResult> {
  try {
    let responseId: string | undefined;
    // 1. Сохранение ответа в Firestore
    try {
      const docRef = await addDoc(collection(db, "surveyResponses"), {
        ...formData, // Сохраняем все данные формы
        submittedAt: serverTimestamp() // Добавляем временную метку сервера
      });
      responseId = docRef.id;
      console.log("Ответ на опрос сохранен с ID: ", responseId);
    } catch (dbError) {
      console.error('Ошибка при сохранении ответа в Firestore:', dbError);
      // В зависимости от требований, можно вернуть ошибку здесь, если сохранение в БД критично
      // return { error: `Не удалось сохранить ответ: ${dbError instanceof Error ? dbError.message : 'Неизвестная ошибка базы данных'}` };
      // Пока что просто логируем ошибку и продолжаем с созданием сводки
    }

    // 2. Создание сводки с помощью AI (как и раньше)
    const textualFeedbackParts: string[] = [];

    const feedbackKeys: Array<keyof SurveyFormValues> = [
      'improvements',
      'difficult_topics',
      'challenges',
      'efficiency_boost',
      'future_topics',
      'format_suggestions',
      'additional_resources_used',
    ];

    feedbackKeys.forEach(key => {
      const value = formData[key];
      if (typeof value === 'string' && value.trim() !== '') {
        const question = surveyQuestions.find(q => q.name === key);
        const questionLabel = question ? question.label : key.toString();
        textualFeedbackParts.push(`Ответ на вопрос "${questionLabel}":\n${value}`);
      }
    });
    
    const npsScore = formData.quality_rating;
    if (npsScore !== undefined) {
        const npsQuestion = surveyQuestions.find(q => q.name === 'quality_rating');
        textualFeedbackParts.push(`Ответ на вопрос "${npsQuestion?.label || 'Оценка качества обучения'}": ${npsScore}/10`);
    }

    // Если нет текстовых данных для анализа, но ответ сохранен
    if (textualFeedbackParts.length === 0 && responseId) {
      return { summary: "Ваш ответ успешно сохранен. Текстовых отзывов для анализа не предоставлено.", responseId };
    }
    // Если нет текстовых данных и ответ не сохранен (или сохранение не удалось и не было критичным)
    if (textualFeedbackParts.length === 0 && !responseId) {
        return { summary: "Не предоставлено текстовых отзывов для анализа. Ответ не был сохранен.", responseId };
    }


    const combinedFeedback = textualFeedbackParts.join('\n\n---\n\n');

    const input: SummarizeFeedbackInput = {
      feedback: combinedFeedback,
    };

    const result = await summarizeFeedback(input);
    return { summary: result.summary, responseId };

  } catch (error) {
    console.error('Ошибка при обработке ответа на опрос:', error);
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return { error: `Не удалось обработать ваш запрос: ${errorMessage}` };
  }
}
