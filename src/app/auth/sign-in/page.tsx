'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SignInForm from '@/components/form/sign-in';
import EmailVerificationDialog from '@/components/EmailVerificationDialog';
import { useToast } from '@/hooks/use-toast';

export default function SignIn() {
  const [showEmailVerificationDialog, setShowEmailVerificationDialog] =
    useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailVerified = searchParams?.get('email_verified');
    // if (emailVerified === 'false') {
    //   setShowEmailVerificationDialog(true);
    //   setIsEmailVerified(false);
    // }
    if (emailVerified === 'true') {
      toast({
        title: 'Email Verified',
        description: 'Your email address has been verified.',
      });
    }
  }, [searchParams]);

  const handleSignInResult = (result: {
    success: boolean;
    emailVerified: boolean;
  }) => {
    if (result.success) {
      toast({
        title: 'Success',
        description: 'Sign in successful!',
      });
    } else if (!result.emailVerified) {
      setShowEmailVerificationDialog(true);
      setIsEmailVerified(false);
    }
  };

  return (
    <div className="col-span-8 items-center p-8 px-4 sm:px-8">
      <h2 className="mb-2 mt-12 text-center text-3xl font-bold">Sign In</h2>
      <p className="mx-auto mb-6 max-w-xl text-center text-gray-600">
        Sign in to your account to continue.
      </p>
      <SignInForm onSignInResult={handleSignInResult} />
      <EmailVerificationDialog
        isOpen={showEmailVerificationDialog}
        onClose={() => setShowEmailVerificationDialog(false)}
      />
    </div>
  );
}
