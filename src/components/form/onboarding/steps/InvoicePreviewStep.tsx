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
      <Card className="mx-auto mb-6 max-w-2xl">
        <CardContent className="p-6">
          <p className="text-lg">
            You're All Set! <br />
            <br />
            Thank you for registering! Once we verify your submission, we'll
            send your invoice and team card within 24 hours to the primary email
            you have provided. <br />
            <br />
            The team card will include your team details, and you will need to
            have your HR executive certify that all members are employees of
            your company. After obtaining the certification and making the
            payment, please upload it back here or email both documents back to
            us at itfsu.fitsixes@gmail.com.
            <br />
            <br />
            Thank you and we're excited to have you with us!
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
