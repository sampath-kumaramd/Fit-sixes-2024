import * as z from 'zod';

const isBrowser = typeof window !== 'undefined';

const playerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  nic: z.string().min(1, 'NIC is required'),
  contactNumber: z.string().min(1, 'Contact number is required'),
});

const teamSchema = z.object({
  name: z.string().min(1, 'Team name is required'),
  gender: z.enum(['male', 'female']),
  players: z
    .array(playerSchema)
    .length(6, 'Each team must have exactly 6 players'),
});

export const signInSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  maleTeamCount: z.number().min(0, 'Number of male teams cannot be negative'),
  femaleTeamCount: z
    .number()
    .min(0, 'Number of female teams cannot be negative'),
  teams: z.array(teamSchema),
  paymentSlip: z.instanceof(isBrowser ? File : Object, { message: 'Payment slip is required' }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
