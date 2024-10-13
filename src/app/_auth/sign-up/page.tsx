import SignUpForm from '@/components/form/sign-up';

export default function SignUp() {
  return (
    <div className="col-span-8 p-8 items-center">
      <h2 className="text-3xl font-bold mb-2 text-center mt-12">
        Company Details
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-xl mx-auto">
        Let&apos;s begin with your company information. This ensures we have
        everything in place for your team to participate smoothly.
      </p>
      <SignUpForm />
    </div>
  );
}
