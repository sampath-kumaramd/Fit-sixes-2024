import React from 'react';

import InvoicePDF from '@/components/Invoice';
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
      <h2 className="mb-4 text-2xl font-bold">Invoice Preview</h2>
      {/* ... (Invoice preview content) */}
      <Button
        // onClick={() =>
        //   generateAndDownloadPDF(
        //     <InvoicePDF teams={teamFields} />,
        //     'invoice.pdf'
        //   )
        // }
        className="mt-4"
      >
        Download Invoice PDF
      </Button>
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
