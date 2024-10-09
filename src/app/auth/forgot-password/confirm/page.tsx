'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
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

const confirmPasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  newPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  confirmPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

type ConfirmPasswordSchema = z.infer<typeof confirmPasswordSchema>;

export default function ConfirmPassword() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ConfirmPasswordSchema>({
    resolver: zodResolver(confirmPasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ConfirmPasswordSchema) => {
    if (data.newPassword !== data.confirmPassword) {
      toast({
        title: 'Password reset requested for:',
        description: 'Please check your inbox for further instructions.',
      });
      return;
    }

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
        Confirm New Password
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-xl mx-auto">
        Enter your new password to confirm.
      </p>
      {!isSubmitted ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-md mx-auto"
          >
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your old password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Confirm New Password
            </Button>
          </form>
        </Form>
      ) : (
        <div className="text-center">
          <p className="text-green-600 font-semibold">
            Password reset successfully!
          </p>
          <p className="mt-2">Please login to continue.</p>
          <Link href="/auth/sign-in">
            <Button>Login</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
