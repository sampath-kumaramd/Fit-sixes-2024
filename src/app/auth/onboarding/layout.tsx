import type { Metadata } from 'next';

import AuthLayout from '@/layout/auth-layout';
export const metadata: Metadata = {
  title: 'Onboarding',
  description: 'Onboarding to Fit Sixes 2K24',
};
export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthLayout
      title="Welcome Back!"
      subTitle="Welcome back to Fit Sixes 2K24"
      isInSignIn={true}
    >
      {children}
    </AuthLayout>
  );
}
