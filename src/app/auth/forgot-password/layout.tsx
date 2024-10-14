import type { Metadata } from 'next';

import AuthLayout from '@/layout/auth-layout';
export const metadata: Metadata = {
  title: 'Forget Password',
  description: 'Forget Password to Fit Sixes 2K24',
};
export default function ForgetPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayout title="We've got you!" subTitle='We will send you a link to reset your password' isInSignIn={false}>{children}</AuthLayout>;
}