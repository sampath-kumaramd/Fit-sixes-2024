import * as z from 'zod';

const playerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  nic: z.string().min(1, 'NIC is required'),
  contactNumber: z.string().min(1, 'Contact number is required'),
});

const teamSchema = z.object({
  name: z.string().min(1, 'Team name is required'),
  gender: z.enum(['male', 'female']),
  players: z.array(playerSchema).length(6, 'Exactly 6 players are required'),
});

export const onboardingSchema = z.object({
  teams: z.array(teamSchema).min(1, 'At least one team is required'),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  paymentMethod: z.enum(['credit_card', 'bank_transfer']),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCVC: z.string().optional(),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  accountHolderName: z.string().optional(),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
