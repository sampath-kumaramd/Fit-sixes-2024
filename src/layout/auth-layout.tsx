import Image from 'next/image';

import { Separator } from '@/components';

import BackToHomeButton from './components/back-to-home-button';

 function AuthLayout({
  children,
  title,
  subTitle,
  isInSignIn,
}: Readonly<{
  children: React.ReactNode;
  title: string;
  subTitle: string;
  isInSignIn: boolean;
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
            <BackToHomeButton />
          </div>

          <div className="relative z-10 text-center flex flex-col items-center">
            <Image
              src="/logo/logo-light.svg"
              alt="Fit Sixes 2k24"
              width={200}
              height={200}
            />
            <h1 className="text-4xl font-bold mt-6">{title}</h1>
            <p className="text-lg mt-2 font-thin">
              {subTitle}
            </p>
            {/* {isInSignIn === true && (
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
            )} */}
          </div>

          <div className="relative z-10"></div>
        </div>

        {children}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-gray-500">
        All right reserved &copy; Fit Sixes 2K24 | ITFSU
      </div>
      <div className="absolute -bottom-[20rem] -left-[20rem] w-[40rem] h-[40rem] rounded-full bg-[#fae4c1] blur-3xl -m-8 z-20" />
    </section>
  );
}

export default AuthLayout;
