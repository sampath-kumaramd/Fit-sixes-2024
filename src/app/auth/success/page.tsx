'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function RegistrationSuccess() {
  const { toast } = useToast();

  useEffect(() => {
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
