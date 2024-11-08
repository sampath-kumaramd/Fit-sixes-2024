import SignUpForm from '@/components/form/sign-up';
import { Card } from '@/components/ui';

export default function SignUp() {
  return (
    <div className="col-span-8 flex h-[30rem] items-center justify-center lg:h-screen">
      <Card className="mx-6 w-full max-w-md sm:mx-0">
        <div className="p-4">
          <p className="text-base font-bold sm:text-lg">
            Sorry, Team Registration is 100% Full!
          </p>
          <br />
          <p className="text-sm sm:text-base">
            All registration spots for FIT Sixes 2K24 have been filled. We are
            currently reviewing the registrations and will assess whether
            additional spots can be made available.
          </p>
          <br />
          <p className="text-sm sm:text-base">Stay tuned for updates!</p>
        </div>
      </Card>
    </div>
  );
}
