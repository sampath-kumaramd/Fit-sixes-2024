'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

import { useToast } from '@/hooks/use-toast';
import { SignUpSchema, signUpSchema } from '@/schemas';
import { IsSponsor, SponsorshipLevel } from '@/types/enums/sign-up';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  RadioGroup,
  RadioGroupItem,
  Label,
  Card,
  CardContent,
  Button,
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from '../ui';

// Create a base URL for axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default function SignUpForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      companyName: '',
      password: '',
      isSponsor: IsSponsor.NO,
      sponsorshipLevel: SponsorshipLevel.BRONZE,
      primaryContact: {
        name: '',
        phone: '',
        email: '',
      },
      secondaryContact: {
        name: '',
        phone: '',
        email: '',
      },
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: SignUpSchema) => {
    setIsSubmitting(true);
    try {
      const response = await api.post('/api/v1/registration/company/', {
        company_name: data.companyName,
        password: data.password,
        view_status: 'team-registration',
        package:
          data.isSponsor === IsSponsor.YES ? data.sponsorshipLevel : 'none',
        primary_contact_name: data.primaryContact.name,
        primary_contact_email: data.primaryContact.email,
        primary_contact_phone: data.primaryContact.phone,
        secondary_contact_name: data.secondaryContact.name,
        secondary_contact_email: data.secondaryContact.email,
        secondary_contact_phone: data.secondaryContact.phone,
      });

      toast({
        title: 'Success',
        description: 'Your account has been created successfully.',
      });
      form.reset();
      router.push('/auth/sign-in');
    } catch (error) {
      console.error('Sign up error:', error);
      if (axios.isAxiosError(error) && error.response) {
        toast({
          title: 'Error',
          description:
            error.response.data.message || 'An error occurred during sign up.',
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
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
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
                <FormLabel>Password*</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isSponsor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Have You Registered as a Sponsor?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">No</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch('isSponsor') === 'yes' && (
          <FormField
            control={form.control}
            name="sponsorshipLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Sponsorship Level*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select package" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="platinum">Platinum</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-4 font-semibold">
                Primary Contact Person Details*
              </h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="primaryContact.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="primaryContact.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="primaryContact.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-4 font-semibold">
                Secondary Contact Person Details*
              </h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="secondaryContact.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="secondaryContact.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="secondaryContact.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-fit"
            disabled={isSubmitting || !form.formState.isValid}
          >
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
          </Button>
        </div>
        <div className="flex justify-center">
          <p className="text-sm text-gray-500">
            Already have an account? <Link href="/auth/sign-in">Sign In</Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
