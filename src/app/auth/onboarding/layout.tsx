import type { Metadata } from 'next';
import { Inter } from 'next/font/google';


export const metadata: Metadata = {
  title: 'Onboarding',
  description: 'Onboarding to Fit Sixes 2K24',
};


const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400'], // 400 is the weight for Regular
});

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  return (
    <body className={inter.className}>
      <div>
        {children}
      </div>
    </body>
  );
}
