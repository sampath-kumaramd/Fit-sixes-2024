'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useToast } from '@/hooks/use-toast';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '../ui';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

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

  const onSubmit = async (data: SignInSchema) => {
    setIsSubmitting(true);
    try {
      const response = await api.post('/api/v1/auth/login/', {
        email: data.email,
        password: data.password,
      });

      console.log(response);

      if (response.status === 200) {
        toast({
          title: 'Success',
          description: 'Signed in successfully!',
        });

      // Handle successful login
      const { access, refresh, user } = response.data;

      // Store tokens in localStorage or a more secure storage method
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      // You might want to store user info in a global state management solution like Redux or React Context
      console.log('User info:', user);

      toast({
        title: 'Success',
        description: 'Signed in successfully!',
      });

      // Redirect to dashboard or desired page
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
            error.response?.data.detail || 'Please check your email and password and try again.',
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="mb-4 text-2xl font-bold">Sign In</h2>
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
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
        <div className="mt-4 flex items-center justify-start gap-2">
          <p>Don&apos;t have an account?</p>
          <Link href="/auth/sign-up">Sign Up</Link>
        </div>
        <div className="mt-4 flex items-center justify-start gap-2">
          <Link href="/auth/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </Form>
  );
}
