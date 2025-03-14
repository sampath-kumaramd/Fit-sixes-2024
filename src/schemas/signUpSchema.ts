import { z } from 'zod';

export const signUpSchema = z.object({
  companyName: z
    .string()
    .min(2, { message: 'Company name must be at least 2 characters.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
  confirmPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
  isSponsor: z.enum(['yes', 'no']),
  sponsorshipLevel: z.enum(['bronze', 'silver', 'gold', 'none']),
  primaryContact: z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    phone: z.string().regex(/^(?:\+94|0)?[1-9]\d{8}$/, {
      message: 'Please enter a valid Sri Lankan phone number.',
    }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
  }),
  secondaryContact: z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    phone: z.string().regex(/^(?:\+94|0)?[1-9]\d{8}$/, {
      message: 'Please enter a valid Sri Lankan phone number.',
    }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
  }),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
