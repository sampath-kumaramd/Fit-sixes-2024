import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Onboarding',
  description: 'Onboarding to Fit Sixes 2K24',
};

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  return (
  <div>
      {children}
  </div>
  );
}
