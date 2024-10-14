'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const forgetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});
type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;

export default function ForgetPassword() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const form = useForm<ForgetPasswordSchema>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  const onSubmit = async (data: ForgetPasswordSchema) => {
    setIsSubmitted(true);
    try {
      const response = await api.post('/api/v1/auth/password/reset/', {
        email: data.email,
      });
      if (response.status === 200) {
        setSuccess(true);
        toast({
          title: 'Success',
          description: 'Password reset email sent successfully!',
        });
        form.reset();
      }
    } catch (error) {
      console.error('Error sending reset email:', error);
      // Add error toast
      toast({
        title: 'Error',
        description: 'Failed to send reset email. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitted(false);
      setSuccess(false);
      form.reset();
    }
  };

  return (
    <div className="col-span-8 p-8 items-center">
      <h2 className="text-3xl font-bold mb-2 text-center mt-12">
        Forget Password
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-xl mx-auto">
        Enter your email address to reset your password.
      </p>
      
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </form>
        </Form>
        {success && (
        <div className="text-center">
          <p className="text-green-600 font-semibold">
            Password reset email sent successfully!
          </p>
          <p className="mt-2">
            Please check your inbox for further instructions.
          </p>
          </div>
        )
      }
    </div>
  );
}
