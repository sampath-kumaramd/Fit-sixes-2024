import SignUpForm from '@/components/form/sign-up';
export default function SignUp() {
  return (
    <div className="col-span-8 p-8 px-4 sm:px-8 items-center">
      <h2 className="text-3xl font-bold mb-2 text-center mt-12">
        Sign Up
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">
        Sign up to create an account. We will send you an email to confirm your account.
      </p>
      <SignUpForm />
    </div>
  );
}