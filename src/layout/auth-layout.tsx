import Image from 'next/image';

import { Button, Separator } from '@/components';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="relative overflow-y-hidden">
      <div className="absolute -top-[20rem] -left-[20rem] w-[40rem] h-[40rem] rounded-full bg-[#fae4c1] blur-3xl -m-8 z-20" />
      <div
        className="grid grid-cols-12 min-h-screen"
        style={{
          backgroundImage: 'linear-gradient(to right, #fff4e5, white)',
          backgroundSize: '350px',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="col-span-4  bg-darkBlue text-white m-8 p-4 rounded-xl flex flex-col justify-between overflow-hidden z-50">
          <div className="relative z-10">
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-darkBlue bg-darkBlue"
            >
              Back
            </Button>
          </div>

          <div className="relative z-10 text-center flex flex-col items-center">
            <Image
              src="/logo/logo-light.svg"
              alt="Fit Sixes 2k24"
              width={200}
              height={200}
            />
            <h1 className="text-4xl font-bold mt-6">Welcome!</h1>
            <p className="text-lg mt-2 font-thin">
              Welcome to the Fit Sixes 2K24
            </p>
            <div className="flex justify-center mt-6 items-center">
              <div className="w-12 h-12 rounded-lg bg-yellow flex items-center justify-center text-lg font-bold">
                01
              </div>
              <Separator orientation="horizontal" className="w-6 bg-gray-600" />
              <div className="w-12 h-12 rounded-lg bg-gray-600 flex items-center justify-center text-lg font-bold">
                02
              </div>
              <Separator orientation="horizontal" className="w-6 bg-gray-600" />
              <div className="w-12 h-12 rounded-lg bg-gray-600 flex items-center justify-center text-lg font-bold">
                03
              </div>
            </div>
          </div>

          <div className="relative z-10"></div>
        </div>

        {children}
      </div>
      <div className="absolute -bottom-[20rem] -left-[20rem] w-[40rem] h-[40rem] rounded-full bg-[#fae4c1] blur-3xl -m-8 z-20" />
    </section>
  );
}
