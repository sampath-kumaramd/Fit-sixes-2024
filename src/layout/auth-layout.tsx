import Image from 'next/image';

import { Separator } from '@/components';

import BackToHomeButton from './components/back-to-home-button';
import React from 'react';

function AuthLayout({
  children,
  title,
  subTitle,
  isInSignIn,
  currentStep,
}: Readonly<{
  children: React.ReactNode;
  title: string;
  subTitle: string;
  isInSignIn: boolean;
  currentStep: number;
}>) {
  return (
    <section className="relative overflow-y-hidden">
      <div className="absolute -left-[20rem] -top-[20rem] z-20 -m-8 h-[40rem] w-[40rem] rounded-full bg-[#fae4c1] blur-3xl" />
      <div
        className="grid min-h-screen grid-cols-12"
        style={{
          backgroundImage: 'linear-gradient(to right, #fff4e5, white)',
          backgroundSize: '350px',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="z-50 col-span-4 m-8 flex flex-col justify-between overflow-hidden rounded-xl bg-darkBlue p-4 text-white">
          <div className="relative z-10">
            <BackToHomeButton />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <Image
              src="/logo/logo-light.svg"
              alt="Fit Sixes 2k24"
              width={200}
              height={200}
            />
            <h1 className="mt-6 text-4xl font-bold">{title}</h1>
            <p className="mt-2 text-lg font-thin">{subTitle}</p>
            {isInSignIn && (
              <div className="mt-6 flex items-center justify-center">
                {[1, 2, 3, 4].map((step) => (
                  <React.Fragment key={step}>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg text-lg font-bold ${
                        step <= currentStep ? 'bg-yellow' : 'bg-gray-600'
                      }`}
                    >
                      {String(step).padStart(2, '0')}
                    </div>
                    {step < 4 && (
                      <Separator
                        orientation="horizontal"
                        className="w-6 bg-gray-600"
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          <div className="relative z-10"></div>
        </div>

        {children}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-gray-500">
        All right reserved &copy; Fit Sixes 2K24 | ITFSU
      </div>
      <div className="absolute -bottom-[20rem] -left-[20rem] z-20 -m-8 h-[40rem] w-[40rem] rounded-full bg-[#fae4c1] blur-3xl" />
    </section>
  );
}

export default AuthLayout;
