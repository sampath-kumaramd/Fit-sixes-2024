'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import api from '@/utils/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { setCookie } from 'cookies-next';
import axios from 'axios';

import { useToast } from '@/hooks/use-toast';
import { useOnboardingStore } from './onboarding/store';

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

interface SignInFormProps {
  onSignInResult: (result: {
    success: boolean;
    emailVerified: boolean;
  }) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSignInResult }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setTeamFields, setCompanyName, setIncludeHut, setInvoiceStatus } =
    useOnboardingStore();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await api.post('/api/v1/auth/login/', {
        email: form.getValues('email'),
        password: form.getValues('password'),
      });

      if (response.status === 200) {
        const { access, refresh, user } = response.data;

        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);

        // Store tokens in cookies
        setCookie('accessToken', access, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
        });

        localStorage.setItem('accessToken', access);
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

          setCompanyName(companyResponse.data.company_name);
          setIncludeHut(companyResponse.data.include_hut);
          setInvoiceStatus(companyResponse.data.invoice_status);

          const existingTeams = companyResponse.data.teams;
          if (existingTeams && existingTeams.length > 0) {
            const formattedTeams = existingTeams.map((team: any) => ({
              name: team.team_name,
              gender: team.gender,
              players: team.team_members.map((member: any) => ({
                name: member.name,
                nic: member.nic,
                contactNumber: member.phone_number,
              })),
            }));

            // Store teams in the onboarding store
            setTeamFields(formattedTeams);
          }
        } catch (dataError) {
          console.error('Error fetching data:', dataError);
          // You might want to handle this error, e.g., show a warning toast
        }

        onSignInResult({ success: true, emailVerified: true });

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
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          const errorData = error.response.data;
          if (
            errorData.non_field_errors &&
            errorData.non_field_errors.includes('E-mail is not verified.')
          ) {
            // onSignInResult({ success: false, emailVerified: false });
            toast({
              title: 'Email Not Verified',
              description:
                'Please check your email and verify your account to proceed.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Invalid email or password.',
              description:
                errorData.detail ||
                'Please check your email and password and try again.',
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: 'Error',
            description: 'An unexpected error occurred. Please try again.',
            variant: 'destructive',
          });
        }
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
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className="  flex items-center justify-end text-sm underline">
              <Link href="/auth/forgot-password">
                Did you forget your password?
              </Link>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-fit px-10"
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-gray-900">
              <p>Don&apos;t have an account?</p>
              <Link href="/auth/sign-up" className="font-bold">
                Register here
              </Link>
            </div>
            
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
