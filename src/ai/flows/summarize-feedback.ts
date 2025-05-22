// src/ai/flows/summarize-feedback.ts
import OpenAI from 'openai';

export interface SummarizeFeedbackInput {
  feedback: string;
}

const openai = new OpenAI({
  apiKey:  process.env.DEEPSEEK_API_KEY,
  //baseURL: 'https://api.deepseek.com/v1', // <— важно
  baseURL: 'https://openrouter.ai/api/v1', // <— важно
});

export async function summarizeFeedback(input: SummarizeFeedbackInput) {
  console.log("input.feedback", input);
  
  const response = await openai.chat.completions.create({
    model: 'deepseek/deepseek-chat:free',
    messages: [
      {
        role: 'system',
        content: 'Ты профессиональный аналитик обратной связи. Вывод на русском языке. Сделай анализ ответов и дай краткие рекомендации тому, кто заполнил анкету, роль - студент,  какие аспекты ему надо улучшить по обучению и темам не более 5 предложений. И расскажи анекдот по теме образование. Анекдоты 18+ или с матерными словами, ругательствами нельзя.',
      },
      {
        role: 'user',
        content: input.feedback,
      },
    ],
    temperature: 0.7,
  });


    console.log("answer", response.choices[0].message.content?.trim() || '',);
  return {
    summary: response.choices[0].message.content?.trim() || '',
  };
}
