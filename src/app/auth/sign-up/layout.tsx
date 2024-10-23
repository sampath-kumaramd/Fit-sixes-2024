import type { Metadata } from 'next';

import AuthLayout from '@/layout/auth-layout';
import { Inter } from 'next/font/google';
export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Sign Up to Fit Sixes 2K24',
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['400'], // 400 is the weight for Regular
});

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
      <AuthLayout
        title="Welcome!"
        subTitle="Welcome to Fit Sixes 2K24"
        isInSignIn={false}
        currentStep={1}
      >
        {children}
      </AuthLayout>
    </div>
  );
}
