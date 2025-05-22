'use client';

import { useState, useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { SurveyForm } from '@/components/survey-form';
import type { SurveyFormValues } from '@/lib/survey-schema';
import { getFeedbackSummaryAction } from '@/app/actions';
import { Logo } from '@/components/icons/logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, AlertTriangle, RefreshCw, Loader2 } from 'lucide-react'; // Added Loader2
import { Progress } from "@/components/ui/progress";

export default function HomePage() {
  const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackSummary, setFeedbackSummary] = useState<string | null>(null);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [progressValue, setProgressValue] = useState(0); // Renamed from progress to avoid conflict
  const [currentYear, setCurrentYear] = useState<number | null>(null);


  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const { toast } = useToast();

  const handleFormSubmit: SubmitHandler<SurveyFormValues> = async (data) => {
    setIsSubmitting(true);
    setSummaryError(null);
    setFeedbackSummary(null);
    setProgressValue(30); // Initial progress

    try {
      // Simulate some processing time before AI call
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgressValue(60);

      const result = await getFeedbackSummaryAction(data);
      
      setProgressValue(100);
      await new Promise(resolve => setTimeout(resolve, 300)); // let progress bar show 100%

      if (result.summary) {
        setFeedbackSummary(result.summary);
        toast({
          title: "Успех!",
          description: "Ваши ответы успешно отправлены и обработаны.",
          variant: "default",
          className: "bg-green-500 text-white",
        });
      } else if (result.error) {
        setSummaryError(result.error);
        toast({
          title: "Ошибка обработки",
          description: result.error,
          variant: "destructive",
        });
      }
      setFormSubmittedSuccessfully(true);
    } catch (error) {
      setProgressValue(0);
      const errorMessage = error instanceof Error ? error.message : "Произошла непредвиденная ошибка.";
      setSummaryError(errorMessage);
      toast({
        title: "Ошибка отправки",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormSubmittedSuccessfully(false);
    setFeedbackSummary(null);
    setSummaryError(null);
    setIsSubmitting(false);
    setProgressValue(0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 selection:bg-primary/20">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <Logo className="h-12 w-12 text-primary" />
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient-accent-destructive">StudentPulse</h1>
        </div>
        <p className="text-lg text-muted-foreground">Ваш голос имеет значение!</p>
      </header>

      <main className="w-full">
        {isSubmitting && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
            <p className="text-xl font-semibold text-foreground mb-2">Обрабатываем ваши ответы...</p>
            <Progress value={progressValue} className="w-1/2 max-w-md" />
          </div>
        )}

        {!formSubmittedSuccessfully ? (
          <SurveyForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        ) : (
          <Card className="w-full max-w-2xl mx-auto shadow-xl animate-in fade-in-50 duration-500">
            <CardHeader className="text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <CardTitle className="text-3xl font-bold text-gradient-accent-destructive">Спасибо за ваш отзыв!</CardTitle>
              <CardDescription>Ваши ответы помогут нам стать лучше.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {feedbackSummary && (
                <div className="p-6 border rounded-lg bg-secondary/50">
                  <h3 className="text-xl font-semibold mb-2 text-secondary-foreground text-gradient-accent-destructive">Краткая сводка по вашим ответам от AI:</h3>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed text-foreground/90">{feedbackSummary}</p>
                </div>
              )}
              {summaryError && (
                <div className="p-4 border border-destructive/50 rounded-lg bg-destructive/10 text-destructive">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <h3 className="text-lg font-semibold text-gradient-accent-destructive">Не удалось создать сводку</h3>
                  </div>
                  <p className="text-sm mt-1">{summaryError}</p>
                </div>
              )}
              <Button onClick={resetForm} variant="outline" className="w-full text-primary border-primary hover:bg-primary/10">
                <RefreshCw className="mr-2 h-4 w-4" />
                Заполнить еще одну анкету
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        {currentYear !== null ? <p>&copy; {currentYear} StudentPulse. Все права защищены.</p> : <p>Загрузка года...</p>}
      </footer>
    </div>
  );
}
