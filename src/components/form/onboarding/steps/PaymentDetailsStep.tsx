import React from 'react';

import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

import { OnboardingSchema } from '../schema';
import { useOnboardingStore } from '../store';
import { toast } from '@/hooks/use-toast';
import router from 'next/router';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import api from '@/utils/api';

interface PaymentDetailsStepProps {
  form: UseFormReturn<OnboardingSchema>;
  onPrevStep: () => void;
}

const rulesAndRegulations = `
RULES & REGULATIONS

GENERAL
• A team must comprise six members plus two reserve players. A fee will be charged for each team.
• All team members must be employed by organizations within the information technology (IT) sector or companies specializing in software engineering and development (hereafter referred to as 'organization').
• An organization may register only one team, which must be either a men's team or a women's team; mixed-gender teams are not permitted.
• If an organization wishes to register an additional team, they must purchase a banner package or become a sponsor.
• The maximum number of teams that can be registered through the aforementioned method is four, consisting of up to two men's teams and two women's teams.
• Teams from sponsoring companies, as specified in the sponsorship scheme, will be exempt from the registration fee, and the registration limit will be extended exclusively for these teams. (The exact number of additional teams allowed is detailed within the sponsorship scheme)
• The tournament committee reserves the right to make decisions on any matters requiring arbitration, with their decision being final and binding.
• The organizing committee reserves the right to modify or suspend the rules as deemed necessary to ensure the smooth conduct of the tournament.

TOURNAMENT RULES
• All matches will be played on a knockout basis.
• Each team must consist of six members, with one member designated as the captain by the team. The captain will be responsible for registration, the coin toss, and other team-related matters.
• Every team member, excluding the wicketkeeper, is required to bowl one over. The wicketkeeper is not permitted to bowl.
• Each innings consists of five (5) overs, with four (4) balls per over. This structure may be modified by the organizing committee in the event of time constraints.
• A full toss delivery above waist height will be called No ball.
• Any delivery that passes over head height will be called a wide.
• The Mankad dismissal mode will not be permitted.
• If it is determined by the umpires that the ball has been thrown by the bowler, it will be called a No ball, to ensure fair delivery. If it is determined that the ball has been thrown more than once, the bowler's over will be banned, and the batting team will have the opportunity to select a bowler if no additional bowlers remain in the team.
• Short-pitched balls that rise above head height will be called wide balls.
• If short-pitched balls are bowled more than once in an over above shoulder height, they will also be called wide balls, and a warning will be given for the first infraction.
• For a wide or No ball, 4 runs will be awarded, and the delivery will be counted as a legitimate ball. If a wide or no-ball is delivered as the last ball of the final over in an innings, 1 run will be awarded, and that ball must be re-bowled.
• Runners for injured batsmen are not permitted.
• The match referees will have the final authority on any decisions regarding situations that arise during the game.

WINNERS
• The team that has scored the greatest number of runs will be declared the winner.
• If the scores are tied within the allocated overs, then the team which has lost the lesser number of wickets will be declared the winner.
• If both teams are still tied, then the spin of a coin will decide the winner.
• If the match is abandoned for any fair reason (like bad weather, etc.) or the team batting second has no chance to bat for at least two overs, then the winner will be decided by a spin of a coin.
• In case of a tie in the final match and if time and weather conditions permit, it is recommended to conduct a super over with the consent of both teams, foregoing the need for coin toss or wicket count.
`;

export default function PaymentDetailsStep({
  form,
  onPrevStep,
  // onNextStep,
}: PaymentDetailsStepProps) {
  const { termsModalOpen, isLoading, setTermsModalOpen, setIsLoading } =
    useOnboardingStore();

  const handleSubmit = () => {
    console.log('submit');
    form.handleSubmit(onSubmit);
  };

  const onSubmit = async (data: OnboardingSchema) => {
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem('accessToken');
      const companyData = localStorage.getItem('companyData');
      if (!accessToken || !companyData) {
        throw new Error('Access token or company data not found');
      }

      const { id: companyId } = JSON.parse(companyData);

      const formData = new FormData();
      console.log(data);
      if (data.paymentSlip) {
        formData.append('payment_slip', data.paymentSlip);
      }
      if (data.certifiedTeamCard) {
        formData.append('signed_team_card', data.certifiedTeamCard);
      }


      const response = await api.patch(
        `/api/v1/registration/company/${companyId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('API Response:', response.data);

      toast({
        title: 'Success',
        description: 'Your registration has been submitted successfully!',
      });

      // Redirect to a success page or dashboard
      // router.push('/dashboard');
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
    <div>
      <h2 className="mb-4 text-2xl font-bold">Payment Details</h2>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="paymentSlip"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Upload Payment Slip</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => onChange(e.target.files?.[0])}
                  {...rest}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="certifiedTeamCard"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Upload Certified Team Card</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => onChange(e.target.files?.[0])}
                  {...rest}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I accept the{' '}
                  <Dialog
                    open={termsModalOpen}
                    onOpenChange={setTermsModalOpen}
                  >
                    <DialogTrigger asChild>
                      <span className="cursor-pointer text-blue-600 underline">
                        rules and regulations
                      </span>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Rules and Regulations</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="max-h-[60vh]">
                        <div className="whitespace-pre-wrap p-4">
                          {rulesAndRegulations}
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className="mt-4 flex justify-between">
        <Button type="button" onClick={onPrevStep}>
          Previous
        </Button>
        <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Registration'
          )}
        </Button>
      </div>
    </div>
  );
}
