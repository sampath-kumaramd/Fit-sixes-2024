'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import OnboardingForm from '@/components/form/onboarding/OnboardingForm';

import { CompanyViewStatus } from '@/types/enums/company-view-status';
import { Separator } from '@/components';
import BackToHomeButton from '@/layout/components/back-to-home-button';
import Image from 'next/image';
import LogOutButton from '@/layout/components/log-out-button';
import { useOnboardingStore } from '@/components/form/onboarding/store';
import Link from 'next/link';
import api from '@/utils/api';

export default function Onboarding() {
  const router = useRouter();
  const [companyStatus, setCompanyStatus] = useState<CompanyViewStatus | null>(
    null
  );
  const { step: currentStep } = useOnboardingStore();

  useEffect(() => {
    const companyData = localStorage.getItem('companyData');
    if (companyData) {
      const { view_status, invoice_status, payment_slip } =
        JSON.parse(companyData);
      if (invoice_status === 'sent' && payment_slip === null) {
        setCompanyStatus(CompanyViewStatus.VERIFICATION);
      } else if (payment_slip !== null) {
        router.push('/auth/success');
      } else {
        setCompanyStatus(view_status as CompanyViewStatus);
      }
    }
  }, []);

  useEffect(() => {
    if (companyStatus === CompanyViewStatus.SUCCESS) {
      router.push('/auth/dashboard');
    }
  }, [companyStatus, router]);

  const getTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Team Registration';
      case 2:
        return 'Team Verification';
      case 3:
        return 'Team Verification';
      case 4:
        return 'Payment Verification';
      default:
        return 'Welcome Back!';
    }
  };

  const getSubTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Register Your Squad, Chase the Glory!';
      case 2:
        return 'Verify Your Team, Secure Your Spot!';
      case 3:
        return "Hang Tight! We're Reviewing Your Team Details";
      case 4:
        return 'Final Touches, Your Team is Almost Ready!';
      default:
        return 'Almost There: Just Verifying Your Payment!';
    }
  };

  const getStep = () => {
    switch (companyStatus) {
      case CompanyViewStatus.TEAM_REGISTRATION:
        return 1;
      case CompanyViewStatus.PAYMENT:
        return 3;
      case CompanyViewStatus.VERIFICATION:
        return 4;
      default:
        return 0;
    }
  };

  return (
    <section className="relative overflow-y-hidden">
      <div className="absolute -left-[20rem] -top-[20rem] z-20 -m-8 rounded-full bg-[#fae4c1] blur-3xl lg:h-[40rem] lg:w-[40rem]" />
      <div
        className="min-h-screen lg:grid lg:grid-cols-12"
        style={{
          backgroundImage: 'linear-gradient(to right, #fff4e5, white)',
          backgroundSize: '350px',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="z-50 m-8 hidden flex-col justify-between overflow-hidden rounded-xl bg-darkBlue p-4 text-white lg:col-span-4 lg:flex">
          <div className="relative z-10 flex justify-between">
            <BackToHomeButton />
            <LogOutButton />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <Image
              src="/logo/logo-light.svg"
              alt="Fit Sixes 2K24"
              width={200}
              height={200}
            />
            <h1 className="mt-6 text-4xl font-bold">{getTitle()}</h1>
            <p className="mt-2 text-lg font-thin">{getSubTitle()}</p>
            {companyStatus && (
              <>
                <div className="mt-6 flex items-center justify-center">
                  {[1, 2, 3, 4].map((step) => (
                    <React.Fragment key={step}>
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-lg text-lg font-bold ${
                          // Number(step) <= getStep() ? 'bg-yellow' : 'bg-gray-600 '
                          Number(step) === currentStep
                            ? 'border-2 border-orange-700 bg-yellow'
                            : Number(step) < currentStep
                              ? 'bg-orange-300'
                              : 'bg-gray-600'
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
                <div className="mt-6 pb-4 text-center">
                  Click here for Registration Packages & Guidelines
                  <Link
                    href="/assets/docs/FIT_SIXES_2K24_Registration_Details.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block rounded-md bg-yellow px-4 py-2 text-white transition-colors duration-300 hover:bg-orange-600"
                  >
                    Registration Packages & Guidelines
                  </Link>
                </div>
              </>
            )}
          </div>

          <div className="relative z-10"></div>
        </div>
        <div className="w-full bg-darkBlue lg:hidden">
          <div className="flex items-center justify-between px-4 pt-4">
            <BackToHomeButton />
            <LogOutButton />
          </div>
          <div className="flex w-full items-center justify-center py-6">
            <Image
              src="/logo/logo-light.svg"
              alt="Fit Sixes 2K24"
              width={100}
              height={100}
            />
          </div>
          <h1 className="text-center text-2xl font-bold text-white">
            {getTitle()}
          </h1>
          <p className="pb-6 text-center text-sm font-thin text-white">
            {getSubTitle()}
          </p>
        </div>
        <div className="col-span-8 items-center p-8">
          <h2 className="mb-2 mt-12 text-center text-3xl font-bold">
            Secure Your Team's Entry
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-center text-gray-600">
            Step Through the Process for a Winning Experience and Make Your Mark
            in the Tournament!
          </p>
          <OnboardingForm
            currentStep={
              currentStep !== 0 && getStep() > currentStep
                ? currentStep
                : getStep()
            }
          />
        </div>
      </div>
      {/* <div className="absolute bottom-1 left-1/2 -translate-x-1/2  text-gray-500 text-xs sm:text-sm ">
        All right reserved &copy;  FIT SIXES 2K24 | ITFSU
      </div> */}
      <div className="absolute -bottom-[20rem] -left-[20rem] z-20 -m-8 rounded-full bg-[#fae4c1] blur-3xl lg:h-[40rem] lg:w-[40rem]" />
    </section>
  );
}
