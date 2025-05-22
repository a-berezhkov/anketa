import { z } from "zod";

export type SurveyQuestionType =
  | "number"
  | "text"
  | "textarea"
  | "slider"
 ;

export type SurveyQuestion = {
  id: string;
  name: string;
  label: string;
  type: SurveyQuestionType;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  sliderLabelSuffix?: string;
  options?: { value: string; label: string }[];
  validation: any;
};

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: "q1",
    name: "name",
    label: "1. Как вас зовут?",
    type: "text",
    placeholder: "Ваше имя",
    validation: z.string(),
  },
  {
    id: "q2",
    name: "group",
    label: "2. Ваша группа",
    type: "text",
    placeholder: "Номер группы",
    validation: z.string().min(1, "Номер группы обязателен для заполнения"),
  },
  {
    id: "q3",
    name: "improvements",
    label: "3. Что мы могли бы изменить, чтобы улучшить качество обучения?",
    type: "textarea",
    placeholder: "Ваши предложения",
    validation: z.string().min(5, "Минимальная длина 5 символов").optional(),
  },
  {
    id: "q4",
    name: "complexity",
    label:
      "4. Оцените сложность материала за последний месяц (1 - очень легко, 10 - очень сложно).",
    type: "slider",
    min: 1,
    max: 10,
    step: 1,
    defaultValue: 6,
    validation: z.number().min(1, "Минимальное значение 1").max(10),
  },
  {
    id: "q5",
    name: "difficult_topics",
    label: "5. Какие темы были самыми сложными за последний месяц?",
    type: "textarea",
    placeholder: "Перечислите темы",
    validation: z.string().min(5, "Минимальная длина 5 символов"),
  },
  {
    id: "q6",
    name: "challenges",
    label:
      "6. С какими проблемами или сложными вопросами вы столкнулись за последний месяц?",
    type: "textarea",
    placeholder: "Опишите проблемы/вопросы",
    validation: z.string().min(5, "Минимальная длина 5 символов"),
  },
  {
    id: "q7",
    name: "efficiency_boost",
    label: "7. Что может улучшить вашу эффективность в обучении?",
    type: "textarea",
    placeholder: "Ваши идеи",
    validation: z.string().min(5, "Минимальная длина 5 символов"),
  },
  {
    id: "q8",
    name: "helpful_people",
    label: "8. Кто из студентов или преподавателей вам больше всего помог?",
    type: "text",
    placeholder: "Имена или роли",
    validation: z.string().optional(),
  },
  {
    id: "q9",
    name: "progress_percentage",
    label: "9. Как вы оцениваете свой прогресс обучения? (0 — полное отсутствие прогресса, а 100 — достижение всех целей)",
    type: "slider",
    min: 0,
    max: 100,
    step: 5,
    defaultValue: 50,
    sliderLabelSuffix: "%",
    validation: z.number().min(0).max(100),
  },
  {
    id: "q10",
    name: "quality_rating",
    label:
      "10. Как вы оцениваете качество обучения (0 - совсем не вероятно, 100 - очень вероятно порекомендуете)?",
    type: "slider",
    min: 0,
    max: 10,
    step: 1,
    defaultValue: 7,
    validation: z.number().min(1).max(100),
  },
  {
    id: "q11",
    name: "material_accessibility",
    label:
      "11. Как вы оцениваете доступность материалов курса (лекции, задания, дополнительные ресурсы). 0 — \"не могу открыть/найти\", 100 — \"всё доступно, удобно и работает без проблем\"?",
    type: "slider",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    validation: z.number().min(0).max(100),
  },
 {
    id: "q12",
    name: "material_accessibility_issues",
    label:
      "12. Какие сложности вы испытываете при доступе к материалам курса? (например, проблемы с интернетом, недостаток времени, сложность в понимании материала)",
    type: "textarea",
    placeholder: "Опишите сложности",
    validation: z.string().optional(),
  },
  {
    id: "q13",
    name: "teacher_interaction",
    label:
      "13. Как вы оцениваете взаимодействие с преподавателями? (где 0 — \"полное отсутствие контакта/поддержки\", а 100 — \"идеальная коммуникация: быстрое, четкое и полезное взаимодействие\")",
    type: "slider",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    validation: z.number().min(0).max(100),
  },
  {
    id: "q14",
    name: "future_topics",
    label:
      "14. Какие дополнительные темы или навыки вы хотели бы изучить в будущем?",
    type: "textarea",
    placeholder: "Темы/навыки",
    validation: z.string().optional(),
  },
  {
    id: "q15",
    name: "peer_support",
    label:
      "15. Как вы оцениваете уровень поддержки со стороны однокурсников? (1 - больше теории, 100 - высокий)",
    type: "slider",
    min: 1,
    max: 100,
    step: 1,
    defaultValue: 50,
    validation: z.number().min(1).max(100),
  },
  {
    id: "q16",
    name: "format_suggestions",
    label:
      "16. Есть ли у вас предложения по улучшению формата занятий (например, больше объяснений, больше кодинга, больше взаимодействия)?",
    type: "textarea",
    placeholder: "Ваши предложения",
    validation: z.string().optional(),
  },
  {
    id: "q17",
    name: "theory_practice_balance",
    label:
      "17. Как вы оцениваете баланс между теорией и практикой в курсе? (1 - дается много теории, 10 - дается много практики)",
    type: "slider",
    min: 1,
    max: 10,
    step: 1,
    defaultValue: 6,
    validation: z.number().min(1).max(10),
  },
  {
    id: "q18",
    name: "additional_resources_used",
    label:
      "18. Какие ресурсы (книги, видео, статьи) вы использовали для дополнительного обучения?",
    type: "textarea",
    placeholder: "Перечислите ресурсы",
    validation: z.string().optional(),
  },
  {
    id: "q19",
    name: "course_organization",
    label:
      "19. Как вы оцениваете организацию курса (расписание, структура, доступность информации)? (1 - плохо, 10 - отлично)",
    type: "slider",
    min: 1,
    max: 10,
    step: 1,
    defaultValue: 6,
    validation: z.number().min(1).max(10),
  },
  {
    id: "q20",
    name: "self_study_hours",
    label:
      "20. Сколько часов в неделю вы тратите на самообучение и подготовку?",
    type: "number",
    placeholder: "Количество часов",
    validation: z.coerce
      .number()
      .min(0, "Количество часов не может быть отрицательным")
      .max(168, "Количество часов не может превышать 168 в неделю")
      .optional(),
  },
  {
    id: "q21",
    name: "additional_comments",
    label:
      "21. Насколько полезными были практические задания и проекты? (1 - не полезные, 10 - очень полезные)",
    type: "slider",
    min: 1,
    max: 10,
    step: 1,
    defaultValue: 6,
    validation: z.number().min(1).max(10),
  },
];
