'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { setCookie } from 'cookies-next';

import { useToast } from '@/hooks/use-toast';

import {
  Button,
  Card,
  CardContent,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '../ui';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignInSchema = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  const onSubmit = async (data: SignInSchema) => {
    setIsSubmitting(true);
    try {
      const response = await api.post('/api/v1/auth/login/', {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        const { access, refresh, user } = response.data;

        // Store tokens in cookies
        setCookie('accessToken', access, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
        });
        setCookie('refreshToken', refresh, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/',
        });

        // Store user data in localStorage
        localStorage.setItem('userData', JSON.stringify(user));

        // Fetch company data
        try {
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
        } catch (companyError) {
          console.error('Error fetching company data:', companyError);
          // You might want to handle this error, e.g., show a warning toast
        }

        toast({
          title: 'Success',
          description: 'Signed in successfully!',
        });

        // Redirect to onboarding page
        router.push('/auth/onboarding');
      } else if (response.status === 400) {
        toast({
          title: 'Error',
          description: 'Invalid email or password.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      if (axios.isAxiosError(error) && error.code === 'ERR_BAD_REQUEST') {
        toast({
          title: 'Invalid email or password.',
          description:
            error.response?.data.detail ||
            'Please check your email and password and try again.',
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
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-fit px-10"
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-start gap-2 text-gray-900">
              <p>Don&apos;t have an account?</p>
              <Link href="/auth/sign-up" className="font-bold">
                Register here
              </Link>
            </div>
            <div className="mt-4 flex items-center justify-start gap-2">
              <Link href="/auth/forgot-password">
                Did you forget your password?
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
