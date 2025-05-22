import type { SurveyQuestion } from '@/types/survey';
import { z } from 'zod';

export const surveyQuestions: SurveyQuestion[] = [
  { id: 'q1', name: 'name', label: '1. Как вас зовут?', type: 'text', placeholder: 'Ваше имя', validation: z.string().min(1, "Имя обязательно для заполнения") },
  { id: 'q2', name: 'group', label: '2. Ваша группа', type: 'text', placeholder: 'Номер группы', validation: z.string().min(1, "Номер группы обязателен для заполнения") },
  { id: 'q3', name: 'improvements', label: '3. Что мы могли бы изменить, чтобы улучшить качество обучения?', type: 'textarea', placeholder: 'Ваши предложения', validation: z.string().optional() },
  { id: 'q4', name: 'complexity', label: '4. Оцените сложность материала за последний месяц (1 - очень легко, 5 - очень сложно).', type: 'slider', min: 1, max: 5, step: 1, defaultValue: 3, validation: z.number().min(1).max(5) },
  { id: 'q5', name: 'difficult_topics', label: '5. Какие темы были самыми сложными за последний месяц?', type: 'textarea', placeholder: 'Перечислите темы', validation: z.string().optional() },
  { id: 'q6', name: 'challenges', label: '6. С какими проблемами или сложными вопросами вы столкнулись за последний месяц?', type: 'textarea', placeholder: 'Опишите проблемы/вопросы', validation: z.string().optional() },
  { id: 'q7', name: 'efficiency_boost', label: '7. Что может улучшить вашу эффективность в обучении?', type: 'textarea', placeholder: 'Ваши идеи', validation: z.string().optional() },
  { id: 'q8', name: 'helpful_people', label: '8. Кто из студентов или преподавателей вам больше всего помог?', type: 'text', placeholder: 'Имена или роли', validation: z.string().optional() },
  { id: 'q9', name: 'progress_percentage', label: '9. Как вы оцениваете свой прогресс обучения?', type: 'slider', min: 0, max: 100, step: 1, defaultValue: 50, sliderLabelSuffix: '%', validation: z.number().min(0).max(100) },
  { id: 'q10', name: 'quality_rating', label: '10. Как вы оцениваете качество обучения (0 - совсем не вероятно, 10 - очень вероятно порекомендуете)?', type: 'slider', min: 0, max: 10, step: 1, defaultValue: 7, validation: z.number().min(0).max(10) },
  { id: 'q11', name: 'material_accessibility', label: '11. Как вы оцениваете доступность материалов курса (лекции, задания, дополнительные ресурсы)? (1 - плохо, 5 - отлично)', type: 'slider', min: 1, max: 5, step: 1, defaultValue: 3, validation: z.number().min(1).max(5) },
  { id: 'q12', name: 'practicum_usefulness', label: '12. Насколько полезными были практические задания и проекты? (1 - бесполезно, 5 - очень полезно)', type: 'slider', min: 1, max: 5, step: 1, defaultValue: 3, validation: z.number().min(1).max(5) },
  { id: 'q13', name: 'teacher_interaction', label: '13. Как вы оцениваете взаимодействие с преподавателями? (1 - плохо, 5 - отлично)', type: 'slider', min: 1, max: 5, step: 1, defaultValue: 3, validation: z.number().min(1).max(5) },
  { id: 'q14', name: 'future_topics', label: '14. Какие дополнительные темы или навыки вы хотели бы изучить в будущем?', type: 'textarea', placeholder: 'Темы/навыки', validation: z.string().optional() },
  { id: 'q15', name: 'peer_support', label: '15. Как вы оцениваете уровень поддержки со стороны однокурсников? (1 - низкий, 5 - высокий)', type: 'slider', min: 1, max: 5, step: 1, defaultValue: 3, validation: z.number().min(1).max(5) },
  { id: 'q16', name: 'format_suggestions', label: '16. Есть ли у вас предложения по улучшению формата занятий (например, больше объяснений, больше кодинга, больше взаимодействия)?', type: 'textarea', placeholder: 'Ваши предложения', validation: z.string().optional() },
  { id: 'q17', name: 'theory_practice_balance', label: '17. Как вы оцениваете баланс между теорией и практикой в курсе? (1 - плохой, 5 - отличный)', type: 'slider', min: 1, max: 5, step: 1, defaultValue: 3, validation: z.number().min(1).max(5) },
  { id: 'q18', name: 'additional_resources_used', label: '18. Какие ресурсы (книги, видео, статьи) вы использовали для дополнительного обучения?', type: 'textarea', placeholder: 'Перечислите ресурсы', validation: z.string().optional() },
  { id: 'q19', name: 'course_organization', label: '19. Как вы оцениваете организацию курса (расписание, структура, доступность информации)? (1 - плохо, 5 - отлично)', type: 'slider', min: 1, max: 5, step: 1, defaultValue: 3, validation: z.number().min(1).max(5) },
  { id: 'q20', name: 'self_study_hours', label: '20. Сколько часов в неделю вы тратите на самообучение и подготовку?', type: 'number', placeholder: 'Количество часов', validation: z.coerce.number().min(0, "Количество часов не может быть отрицательным").optional() },
];
