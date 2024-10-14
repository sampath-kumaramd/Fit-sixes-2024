import OnboardingForm from '@/components/form/onboarding';

export default function Onboarding() {
  return (
    <div className="col-span-8 items-center p-8">
      <h2 className="mb-2 mt-12 text-center text-3xl font-bold">
        Team Details
      </h2>
      <p className="mx-auto mb-6 max-w-xl text-center text-gray-600">
        Let&apos;s fill out your team information. This ensures we have
        everything in place for your team to participate smoothly.
      </p>
      <OnboardingForm />
    </div>
  );
}
