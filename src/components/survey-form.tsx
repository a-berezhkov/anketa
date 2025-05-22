'use client';

import type { SubmitHandler } from 'react-hook-form';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { surveyQuestions } from '@/config/survey-questions';
import { surveyFormSchema, type SurveyFormValues } from '@/lib/survey-schema';
import type { SurveyQuestion } from '@/types/survey';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

interface SurveyFormProps {
  onSubmit: SubmitHandler<SurveyFormValues>;
  isSubmitting: boolean;
}

export function SurveyForm({ onSubmit, isSubmitting }: SurveyFormProps) {
  const defaultValues = surveyQuestions.reduce((acc, q) => {
    acc[q.name] = q.defaultValue !== undefined ? q.defaultValue : (q.type === 'text' || q.type === 'textarea' ? '' : (q.type === 'slider' ? q.min : undefined));
    return acc;
  }, {} as Partial<SurveyFormValues>);

  const form = useForm<SurveyFormValues>({
    resolver: zodResolver(surveyFormSchema),
    defaultValues,
  });

  const renderQuestionInput = (question: SurveyQuestion, field: any) => {
    switch (question.type) {
      case 'text':
        return <Input placeholder={question.placeholder} {...field} />;
      case 'number':
        return <Input type="number" placeholder={question.placeholder} {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : +e.target.value)} />;
      case 'textarea':
        return <Textarea placeholder={question.placeholder} {...field} className="min-h-[100px]" />;
      case 'slider':
        return (
          <div className="flex flex-col space-y-2 pt-2">
            <Slider
              min={question.min}
              max={question.max}
              step={question.step}
              value={typeof field.value === 'number' ? [field.value] : [question.defaultValue as number]}
              onValueChange={(value) => field.onChange(value[0])}
              className="my-2"
            />
            <div className="text-center text-sm font-medium text-muted-foreground">
              {typeof field.value === 'number' ? field.value : question.defaultValue}
              {question.sliderLabelSuffix}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-gradient-accent-destructive">Анкета обратной связи</CardTitle>
        <CardDescription className="text-center">
          Пожалуйста, ответьте на следующие вопросы. Ваши ответы помогут нам улучшить качество обучения.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {surveyQuestions.map((question) => (
              <FormField
                key={question.id}
                control={form.control}
                name={question.name}
                render={({ field }) => (
                  <FormItem className="p-4 rounded-lg border border-input/50 shadow-sm bg-background/50">
                    <FormLabel className="text-base font-semibold">{question.label}</FormLabel>
                    <FormControl>{renderQuestionInput(question, field)}</FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" disabled={isSubmitting} className="w-full text-lg py-6 bg-accent hover:bg-accent/90 text-accent-foreground">
              {isSubmitting ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Отправить ответы'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
         <p className="text-xs text-muted-foreground text-center w-full">Спасибо за ваше время и честные ответы!</p>
      </CardFooter>
    </Card>
  );
}
