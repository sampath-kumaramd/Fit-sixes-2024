import SignInForm from '@/components/form/sign-in';
export default function SignIn() {
  return (
    <div className="col-span-8 p-8 px-4 sm:px-8 items-center">
      <h2 className="text-3xl font-bold mb-2 text-center mt-12">
        Sign In
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-xl mx-auto">
        Sign in to your account to continue.
      </p>
      <SignInForm />
    </div>
  );
}