import type { Metadata } from 'next';

import AuthLayout from '@/layout/auth-layout';
import { Inter } from 'next/font/google';
export const metadata: Metadata = {
  title: 'Verify Email',
  description: 'Verify Email to Fit Sixes 2K24',
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['400'], // 400 is the weight for Regular
});

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
      <AuthLayout
        title="Verify Email"
        subTitle="Verify your email to continue"
        isInSignIn={false}
        currentStep={1}
      >
        {children}
      </AuthLayout>
    </div>
  );
}
