import React, { useEffect } from 'react';

// import InvoicePDF from '@/components/Invoice';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { useOnboardingStore } from '../store';
import axios from 'axios';
import api from '@/utils/api';

interface InvoicePreviewStepProps {
  onPrevStep: () => void;
  onNextStep: () => void;
}

export default function InvoicePreviewStep({
  onPrevStep,
  onNextStep,
}: InvoicePreviewStepProps) {
  const { invoiceStatus, setInvoiceStatus } = useOnboardingStore();


  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const access = localStorage.getItem('accessToken'); // Assuming you store the token in localStorage
        const companyResponse = await api.get('/api/v1/registration/me/', {
          headers: { Authorization: `Bearer ${access}` },
        });

        const companyData = companyResponse.data;
        if (companyData.invoice_status !== invoiceStatus) {
          setInvoiceStatus(companyData.invoice_status);

          // Update local storage
          const storedCompanyData = JSON.parse(
            localStorage.getItem('companyData') || '{}'
          );
          localStorage.setItem(
            'companyData',
            JSON.stringify({
              ...storedCompanyData,
              invoice_status: companyData.invoice_status,
            })
          );
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

    fetchCompanyData();
  }, [invoiceStatus, setInvoiceStatus]);

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
        {invoiceStatus !== 'pending' && (
          <Button type="button" onClick={onNextStep}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
