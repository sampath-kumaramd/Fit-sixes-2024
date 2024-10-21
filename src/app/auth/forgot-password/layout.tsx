import type { Metadata } from 'next';

import AuthLayout from '@/layout/auth-layout';
import { Inter } from 'next/font/google';


const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400'], // 400 is the weight for Regular
});

export const metadata: Metadata = {
  title: 'Forget Password',
  description: 'Forget Password to Fit Sixes 2K24',
};
export default function ForgetPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className={inter.className}>
      <AuthLayout title="We've got you!" subTitle='We will send you a link to reset your password' isInSignIn={false} currentStep={1}>{children}</AuthLayout>
    </body>
  );
}