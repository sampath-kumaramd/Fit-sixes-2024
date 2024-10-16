import * as z from 'zod';

const playerSchema = z.object({
  name: z.string().min(4, 'Name must be at least 4 characters'),
  nic: z.string().min(1, 'NIC is required'),
  contactNumber: z.string().regex(/^(?:\+94|0)?[1-9]\d{8}$/, {
    message: 'Please enter a valid Sri Lankan phone number.',
  }),
});

const teamSchema = z.object({
  name: z.string().min(1, 'Team name is required'),
  gender: z.enum(['male', 'female']),
  players: z
    .array(playerSchema)
    .min(6, 'Each team must have at least 6 players')
    .max(8, 'Each team can have a maximum of 8 players')
    .refine(
      (players) => {
        const requiredPlayers = players.slice(0, 6);
        const optionalPlayers = players.slice(6);
        return (
          requiredPlayers.every(
            (player) => player.name && player.nic && player.contactNumber
          ) &&
          optionalPlayers.every(
            (player) =>
              !player.name ||
              (player.name && player.nic && player.contactNumber)
          )
        );
      },
      {
        message:
          'The first 6 players must have all fields filled, and optional players must have all fields filled if present',
        path: ['players'],
      }
    ),
});

export const onboardingSchema = z.object({
  teams: z
    .array(teamSchema)
    .min(1, 'At least one team is required')
    .max(4, 'Maximum of 4 teams allowed'),
  includeHut: z.boolean().default(false),
  paymentSlip: z.any(),
  certifiedTeamCard: z.any(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
