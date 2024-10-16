'use client';

import React, { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

import { onboardingSchema, OnboardingSchema } from './schema';
import InvoicePreviewStep from './steps/InvoicePreviewStep';
import PaymentDetailsStep from './steps/PaymentDetailsStep';
import TeamCardsPreviewStep from './steps/TeamCardsPreviewStep';
import TeamDetailsStep from './steps/TeamDetailsStep';
import { useOnboardingStore } from './store';
import axios from 'axios';
import { CompanyViewStatus } from '@/types/enums/company-view-status';

interface OnboardingFormProps {
  currentStep: number;
}

export default function OnboardingForm({ currentStep }: OnboardingFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const {
    step,
    setStep,
    isLoading,
    setIsLoading,
    teamFields,
    setTeamFields,
    includeHut,
    setCompanyName,
    setIncludeHut,
    setInvoiceStatus,
  } = useOnboardingStore();

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
  const form = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      teams: [
        {
          name: '',
          gender: 'male',
          players: Array(6).fill({ name: '', nic: '', contactNumber: '' }),
        },
      ],
      includeHut: false,
      acceptTerms: false,
    },
  });

  useEffect(() => {
    const companyData = localStorage.getItem('companyData');
    if (companyData) {
      const company = JSON.parse(companyData);

      const existingTeams = company.teams;
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
        setTeamFields(formattedTeams);
      }

      setCompanyName(company.company_name);
      setIncludeHut(company.is_hut);
      setInvoiceStatus(company.invoice_status);
    }
  }, []);

  useEffect(() => {
    setStep(Number(currentStep));

    if (teamFields.length > 0) {
      form.reset({ teams: teamFields });
    }
  }, [currentStep, setStep, teamFields, form]);

  const validateTeams = async () => {
    const result = await form.trigger('teams');
    if (!result) {
      const errors = form.formState.errors;
      if (errors.teams) {
        toast({
          title: 'Validation Error',
          description: 'Please check all team details and try again.',
          variant: 'destructive',
        });
      }
    }
    return result;
  };

  const handleNextStep = async () => {
    if (step === 1) {
      // const isValid = true;
      const isValid = await validateTeams();
      if (isValid) {
        const teamData = form.getValues('teams');
        console.log('Data sent from step 1 to step 2:', teamData);

        setIsLoading(true);
        setTeamFields([...teamData]);

        const success = await submitTeamData(teamData);
        if (success) {
          form.setValue('teams', [...teamData]);

          setStep(2);
        }
        setIsLoading(false);
      } else {
        toast({
          title: 'Validation Error',
          description: 'Please check the form for errors.',
          variant: 'destructive',
        });
      }
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const submitTeamData = async (teams: OnboardingSchema['teams']) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const companyData = localStorage.getItem('companyData');
      if (!accessToken || !companyData) {
        throw new Error('Access token or company data not found');
      }

      const { id: companyId } = JSON.parse(companyData);

      const formattedTeams = teams.map((team) => ({
        team_name: team.name,
        gender: team.gender,
        team_members: team.players.map((player, index) => ({
          name: player.name,
          nic: player.nic,
          phone_number: player.contactNumber,
          sort_order: index + 1,
        })),
      }));

      // Submit team data
      const teamResponse = await api.post(
        '/api/v1/registration/team/',
        formattedTeams,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Team API Response:', teamResponse.data);

      // Update company data
      const formData = new FormData();
      formData.append('is_hut', includeHut.toString());

      const companyResponse = await api.patch(
        `/api/v1/registration/company/${companyId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Company API Response:', companyResponse.data);

      toast({
        title: 'Success',
        description:
          'Teams registered and company details updated successfully!',
      });

      return true;
    } catch (error) {
      console.error('Error submitting data:', error);
      if (axios.isAxiosError(error) && error.response) {
        toast({
          title: 'Error',
          description:
            error.response.data.detail ||
            'Failed to register teams or update company details. Please try again.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });
      }
      return false;
    }
  };

  const onSubmit = async (data: OnboardingSchema) => {
    setIsLoading(true);
    try {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', data);

      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: 'Success',
        description: 'Your registration has been submitted successfully!',
      });

      // Redirect to a success page or dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: 'Error',
        description:
          'There was an error submitting your registration. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {step === 1 && (
          <TeamDetailsStep form={form} onNextStep={handleNextStep} />
        )}
        {step === 2 && (
          <TeamCardsPreviewStep
            onPrevStep={() => setStep(1)}
            onNextStep={handleNextStep}
          />
        )}
        {step === 3 && (
          <InvoicePreviewStep
            onPrevStep={() => setStep(2)}
            onNextStep={handleNextStep}
          />
        )}
        {step === 4 && (
          <PaymentDetailsStep form={form} onPrevStep={() => setStep(3)} />
        )}
      </form>
    </Form>
  );
}
