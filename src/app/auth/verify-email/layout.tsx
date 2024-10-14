import type { Metadata } from 'next';

import AuthLayout from '@/layout/auth-layout';
export const metadata: Metadata = {
  title: 'Verify Email',
  description: 'Verify Email to Fit Sixes 2K24',
};
export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthLayout
      title="Verify Email"
      subTitle="Verify your email to continue"
      isInSignIn={false}
      currentStep={1}
    >
      {children}
    </AuthLayout>
  );
}
