import type { Metadata } from 'next';

import AuthLayout from '@/layout/auth-layout';
export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Sign Up to Fit Sixes 2K24',
};
export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthLayout
      title="Welcome!"
      subTitle="Welcome to Fit Sixes 2K24"
      isInSignIn={false}
      currentStep={1}
    >
      {children}
    </AuthLayout>
  );
}
