'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default function UserVerification() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const verifyUser = async () => {
      const token = Array.isArray(params?.token)
        ? params.token[0]
        : params?.token;
      if (!token) {
        router.push('/404'); // Redirect to 404 page
        return;
      }

      try {
        // Decode the token before sending it to the API
        const decodedToken = decodeURIComponent(token);
        const response = await api.post('/account-confirm-email/', {
          key: decodedToken,
        });

        if (response.status === 200) {
          setIsVerified(true);
          toast({
            title: 'Success',
            description: 'User verified successfully!',
          });
        }
      } catch (error) {
        console.error('Verification failed:', error);
        if (axios.isAxiosError(error) && error.response) {
          toast({
            title: 'Error',
            description: error.response.data.detail || 'Verification failed.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Error',
            description: 'An unexpected error occurred. Please try again.',
            variant: 'destructive',
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, [params, router, toast]);

  return (
    <div className="col-span-8 items-center p-8">
      <h2 className="mb-2 mt-12 text-center text-3xl font-bold">
        User Verification
      </h2>
      {isLoading ? (
        <p className="text-center">Verifying user...</p>
      ) : (
        <p className="text-center">
          {isVerified
            ? 'User verified successfully!'
            : 'User verification failed. Please try again or contact support.'}
        </p>
      )}
    </div>
  );
}
