'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import api from '@/utils/api';

export default function RegistrationSuccess() {
  const { toast } = useToast();

  useEffect(() => {
    const fetchCompanyData = async () => {
      // Fetch company data
      try {
        const access = localStorage.getItem('accessToken');
        const companyResponse = await api.get('/api/v1/registration/me/', {
          headers: { Authorization: `Bearer ${access}` },
        });

        if (companyResponse.status === 200) {
          // Store company data in localStorage
          localStorage.setItem(
            'companyData',
            JSON.stringify(companyResponse.data)
          );
        }
      } catch (dataError) {
        console.error('Error fetching data:', dataError);
        // You might want to handle this error, e.g., show a warning toast
      }
    };

    fetchCompanyData();

    toast({
      title: 'Registration Successful',
      description:
        'Thank you for registering. Our team will verify your information and get back to you as soon as possible.',
    });
  }, []);

  return (
    <div className="col-span-8 items-center p-8 px-4 sm:px-8">
      <h2 className="mb-2 mt-12 text-center text-3xl font-bold">
        Registration Successful
      </h2>
      <p className="mx-auto mb-6 max-w-xl text-center text-gray-600">
        Thank you for registering with us. Our team will verify your information
        and get back to you as soon as possible.
      </p>
    </div>
  );
}
