import React from 'react';

// import InvoicePDF from '@/components/Invoice';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { useOnboardingStore } from '../store';

interface InvoicePreviewStepProps {
  onPrevStep: () => void;
  onNextStep: () => void;
}

export default function InvoicePreviewStep({
  onPrevStep,
  onNextStep,
}: InvoicePreviewStepProps) {
  const { teamFields } = useOnboardingStore();

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Invoice and Team Card</h2>
      <Card className="mb-6">
        <CardContent className="p-6">
          <p className="text-lg">
            Thank you for providing your information. We will send the invoice
            and team card to your company via email within the next 24 hours.
          </p>
        </CardContent>
      </Card>
      <div className="mt-4 flex justify-between">
        <Button type="button" onClick={onPrevStep}>
          Previous
        </Button>
        <Button type="button" onClick={onNextStep}>
          Next
        </Button>
      </div>
    </div>
  );
}
