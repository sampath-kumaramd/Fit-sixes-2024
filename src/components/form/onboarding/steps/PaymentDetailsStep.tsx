import React from 'react';

import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

import { OnboardingSchema } from '../schema';
import { useOnboardingStore } from '../store';

interface PaymentDetailsStepProps {
  form: UseFormReturn<OnboardingSchema>;
  onPrevStep: () => void;
}

export default function PaymentDetailsStep({
  form,
  onPrevStep,
}: PaymentDetailsStepProps) {
  const { termsModalOpen, setTermsModalOpen } = useOnboardingStore();

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Payment Details</h2>
      {/* ... (Payment details form fields) */}
      <div className="mt-4 flex justify-between">
        <Button type="button" onClick={onPrevStep}>
          Previous
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </div>
  );
}
