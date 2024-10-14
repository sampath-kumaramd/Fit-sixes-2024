'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

const signInSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignInSchema = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      companyName: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInSchema) => {
    console.log(data);
    // Here you would typically send the data to your backend for authentication
    toast({
      title: 'Success',
      description: 'Signed in successfully!',
    });
    // Redirect to dashboard or onboarding
    router.push('/auth/onboarding');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="mb-4 text-2xl font-bold">Sign In</h2>
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
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
