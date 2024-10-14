'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import axios, { isAxiosError } from 'axios';
import { Eye, EyeOff, Info } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { axiosAuthorized } from '@/hooks/axios-intance';
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

export default function SignUpForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      companyName: '',
      password: '',
      confirmPassword: '',
      isSponsor: IsSponsor.NO,
      sponsorshipLevel: SponsorshipLevel.NONE,
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
    if (data.password !== data.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match.',
        variant: 'destructive',
      });
      return;
    }
    if (data.isSponsor === IsSponsor.YES) {
       if(data.sponsorshipLevel === SponsorshipLevel.NONE) {
        toast({
          title: 'Error',
          description: 'Please select a sponsorship level.',
          variant: 'destructive',
        });
        return;
       }
    }
    setIsSubmitting(true);
    try {
      const response = await axiosAuthorized.post('/api/v1/auth/registration/', {
        email: data.primaryContact.email,
        password1: data.password,
        password2: data.confirmPassword,
        company_name: data.companyName,
        package: data.isSponsor === IsSponsor.YES ? data.sponsorshipLevel : 'none',
        contact_name: data.primaryContact.name,
        phone: data.primaryContact.phone,
        secondary_contact_name: data.secondaryContact.name,
        secondary_email: data.secondaryContact.email,
        secondary_phone: data.secondaryContact.phone,
      });

      if (response.status === 201) {
      toast({
        title: 'Success',
        description: 'Your account has been created successfully.',
      });
      router.push('/auth/verify-email');
      form.reset();
      } else if (response.status === 400) {
        if (typeof response === 'object' && response !== null) {
        const errorMessages = Object.entries(response.data)
          .map(([field, messages]) => {
            if (Array.isArray(messages)) {
              return `${field}: ${messages.join(', ')}`;
            }
            return null;
          })
          .filter(Boolean)
            .join('\n');
          toast({
            title: 'Error',
            description: errorMessages,
            variant: 'destructive',
          });
        }
      }
      else if(response.status === 500) {
        toast({
          title: 'Error',
          description: response.data.message,
          variant: 'destructive',
        });
      }
      else {
        toast({
          title: 'Error',
          description: 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Sign up error:', error);
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          const errorMessages = Object.entries(error.response.data)
            .map(([field, messages]) => {
              if (Array.isArray(messages)) {
                return `${field}: ${messages.join(', ')}`;
              }
              return null;
            })
            .filter(Boolean)
            .join('\n');
          toast({
            title: 'Error',
            description: errorMessages,
            variant: 'destructive',
          });
        }
        else if(error.response.status === 500) {
          toast({
            title: 'Error',
            description: error.response.data.message,
            variant: 'destructive',
          });
        }
        else {
        toast({
          title: 'Error',
          description:
            error.response.data.message || 'An error occurred during sign up.',
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
                  name="primaryContact.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Primary Contact Email
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger> <Info className='h-4 w-4 text-red-500 ms-1' /></TooltipTrigger>
    <TooltipContent>
      <p>This email will be used for login and communication.</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter primary email"
                          {...field}
                        />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password* 
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter confirm password"
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
                    <SelectItem value="bronze">Bronze</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
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
            disabled={isSubmitting }
          >
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
          </Button>
        </div>
        <div className="flex justify-center">
          <p className="text-sm text-gray-900">
            Already have an account? <Link href="/auth/sign-in" className=' font-bold'>Sign In</Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
