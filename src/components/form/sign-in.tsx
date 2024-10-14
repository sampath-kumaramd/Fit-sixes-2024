'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import axios from 'axios';

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
        username: data.email,
        password: data.password,
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
    } catch (error) {
      console.error('Sign in error:', error);
      if (axios.isAxiosError(error) && error.response) {
        toast({
          title: 'Error',
          description:
            error.response.data.detail || 'An error occurred during sign in.',
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
        <Button type="submit">Sign In</Button>
        <div className="mt-4 flex items-center justify-start gap-2">
          <p>Don't have an account?</p>
          <Link href="/auth/sign-up">Sign Up</Link>
        </div>
        <div className="mt-4 flex items-center justify-start gap-2">
          <Link href="/auth/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </Form>
  );
}
