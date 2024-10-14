'use client';

import React from 'react';


import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';


import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

import { onboardingSchema, OnboardingSchema } from './schema';
import InvoicePreviewStep from './steps/InvoicePreviewStep';
import PaymentDetailsStep from './steps/PaymentDetailsStep';
import TeamCardsPreviewStep from './steps/TeamCardsPreviewStep';
import TeamDetailsStep from './steps/TeamDetailsStep';
import { useOnboardingStore } from './store';

export default function OnboardingForm() {
  const { toast } = useToast();
  const router = useRouter();
  const { step, setStep, isLoading, setIsLoading } = useOnboardingStore();

  const form = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      teams: [
        {
          name: '',
          gender: 'male',
          players: Array(6).fill({ name: '', nic: '', contactNumber: '' }),
        },
      ],
      acceptTerms: false,
      paymentMethod: 'credit_card',
    },
  });

  const handleNextStep = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      setStep(step + 1);
    } else {
      toast({
        title: 'Validation Error',
        description: 'Please check the form for errors.',
        variant: 'destructive',
      });
    }
  };

  const onSubmit = async (data: OnboardingSchema) => {
    setIsLoading(true);
    try {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', data);

      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: 'Success',
        description: 'Your registration has been submitted successfully!',
      });

      // Redirect to a success page or dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: 'Error',
        description:
          'There was an error submitting your registration. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {step === 1 && (
          <TeamDetailsStep form={form} onNextStep={handleNextStep} />
        )}
        {step === 2 && (
          <TeamCardsPreviewStep
            onPrevStep={() => setStep(1)}
            onNextStep={handleNextStep}
          />
        )}
        {step === 3 && (
          <InvoicePreviewStep
            onPrevStep={() => setStep(2)}
            onNextStep={handleNextStep}
          />
        )}
        {step === 4 && (
          <PaymentDetailsStep form={form} onPrevStep={() => setStep(3)} />
        )}

        {step === 4 && (
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Registration'
              )}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
