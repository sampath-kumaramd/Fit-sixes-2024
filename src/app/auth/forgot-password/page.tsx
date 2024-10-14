'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
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
  const form = useForm<ForgetPasswordSchema>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  const onSubmit = async (data: ForgetPasswordSchema) => {
    // Here you would typically send a request to your backend
    // to initiate the password reset process
    console.log('Password reset requested for:', data.email);
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: 'Reset Email Sent',
      description: 'Please check your inbox for further instructions.',
    });
    setIsSubmitted(true);
  };
  return (
    <div className="col-span-8 p-8 items-center">
      <h2 className="text-3xl font-bold mb-2 text-center mt-12">
        Forget Password
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-xl mx-auto">
        Enter your email address to reset your password.
      </p>
      {!isSubmitted ? (
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
      ) : (
        <div className="text-center">
          <p className="text-green-600 font-semibold">
            Password reset email sent successfully!
          </p>
          <p className="mt-2">
            Please check your inbox for further instructions.
          </p>
        </div>
      )}
    </div>
  );
}