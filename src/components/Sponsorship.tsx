'use client';
import React, { useState, useEffect } from 'react';

import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

import 'swiper/css';
import 'swiper/css/pagination';

// Define sponsor types
interface Sponsor {
  id: number;
  name: string;
  logo1: string;
  logo2: string;
  type: 'platinum' | 'gold' | 'silver';
  borderColor: string;
  description: React.ReactNode;
}

// Sample sponsor data
const sponsors = [
  {
    id: 1,
    name: 'cloud-solution',
    logo1: '/company-logo/cloud-solution-2.svg',
    logo2: '/company-logo/cloud-solution.png',
    type: 'Platinum',
    borderColor: '#C4C4C4',
    description: (
      <div className="space-y-4">
        <p className="text-gray-300">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book.
        </p>
        <p className="text-gray-300">
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </p>
        <p className="text-gray-300">
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    name: 'advania',
    logo1: '/company-logo/advania2.svg',
    logo2: '/company-logo/advania.png',
    type: 'Gold',
    borderColor: '#C4C4C4',
    description: (
      <div className="space-y-4">
        <p className="text-gray-300">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book.
        </p>
        <p className="text-gray-300">
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </p>
        <p className="text-gray-300">
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </p>
      </div>
    ),
  },
  // {
  //   id: 3,
  //   name: 'pagero',
  //   logo1: '/company-logo/pagero2.svg',
  //   logo2: '/company-logo/pagero.png',
  //   type: 'Gold',
  //   borderColor: '#183b34',
  //   description: (
  //     <div className="space-y-4">
  //       <p className="text-gray-300">
  //         Lorem Ipsum is simply dummy text of the printing and typesetting
  //         industry. Lorem Ipsum has been the industry&apos;s standard dummy text
  //         ever since the 1500s, when an unknown printer took a galley of type
  //         and scrambled it to make a type specimen book.
  //       </p>
  //       <p className="text-gray-300">
  //         It has survived not only five centuries, but also the leap into
  //         electronic typesetting, remaining essentially unchanged. It was
  //         popularised in the 1960s with the release of Letraset sheets
  //         containing Lorem Ipsum passages, and more recently with desktop
  //         publishing software like Aldus PageMaker including versions of Lorem
  //         Ipsum.
  //       </p>
  //       <p className="text-gray-300">
  //         It has survived not only five centuries, but also the leap into
  //         electronic typesetting, remaining essentially unchanged. It was
  //         popularised in the 1960s with the release of Letraset sheets
  //         containing Lorem Ipsum passages, and more recently with desktop
  //         publishing software like Aldus PageMaker including versions of Lorem
  //         Ipsum.
  //       </p>
  //     </div>
  //   ),
  // },
  {
    id: 4,
    name: 'pagero',
    logo1: '/company-logo/pagero2.svg',
    logo2: '/company-logo/pagero.png',
    type: 'Silver',
    borderColor: '#183b34',
    description: (
      <div className="space-y-4">
        <p className="text-gray-300">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book.
        </p>
        <p className="text-gray-300">
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </p>
        <p className="text-gray-300">
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </p>
      </div>
    ),
  },
  // {
  //   id: 5,
  //   name: 'creative',
  //   logo1: '/company-logo/88.svg',
  //   logo2: '/company-logo/pagero.png',
  //   type: 'Silver',
  //   borderColor: '#183b34',
  //   description: (
  //     <div className="space-y-4">
  //       <p className="text-gray-300">
  //         Lorem Ipsum is simply dummy text of the printing and typesetting
  //         industry. Lorem Ipsum has been the industry&apos;s standard dummy text
  //         ever since the 1500s, when an unknown printer took a galley of type
  //         and scrambled it to make a type specimen book.
  //       </p>
  //       <p className="text-gray-300">
  //         It has survived not only five centuries, but also the leap into
  //         electronic typesetting, remaining essentially unchanged. It was
  //         popularised in the 1960s with the release of Letraset sheets
  //         containing Lorem Ipsum passages, and more recently with desktop
  //         publishing software like Aldus PageMaker including versions of Lorem
  //         Ipsum.
  //       </p>
  //       <p className="text-gray-300">
  //         It has survived not only five centuries, but also the leap into
  //         electronic typesetting, remaining essentially unchanged. It was
  //         popularised in the 1960s with the release of Letraset sheets
  //         containing Lorem Ipsum passages, and more recently with desktop
  //         publishing software like Aldus PageMaker including versions of Lorem
  //         Ipsum.
  //       </p>
  //     </div>
  //   ),
  // },
  // {
  //   id: 6,
  //   name: 'creative',
  //   logo1: '/company-logo/88.svg',
  //   logo2: '/company-logo/pagero.png',
  //   type: 'Silver',
  //   borderColor: '#183b34',
  //   description: (
  //     <div className="space-y-4">
  //       <p className="text-gray-300">
  //         Lorem Ipsum is simply dummy text of the printing and typesetting
  //         industry. Lorem Ipsum has been the industry&apos;s standard dummy text
  //         ever since the 1500s, when an unknown printer took a galley of type
  //         and scrambled it to make a type specimen book.
  //       </p>
  //       <p className="text-gray-300">
  //         It has survived not only five centuries, but also the leap into
  //         electronic typesetting, remaining essentially unchanged. It was
  //         popularised in the 1960s with the release of Letraset sheets
  //         containing Lorem Ipsum passages, and more recently with desktop
  //         publishing software like Aldus PageMaker including versions of Lorem
  //         Ipsum.
  //       </p>
  //       <p className="text-gray-300">
  //         It has survived not only five centuries, but also the leap into
  //         electronic typesetting, remaining essentially unchanged. It was
  //         popularised in the 1960s with the release of Letraset sheets
  //         containing Lorem Ipsum passages, and more recently with desktop
  //         publishing software like Aldus PageMaker including versions of Lorem
  //         Ipsum.
  //       </p>
  //     </div>
  //   ),
  // },
];

const Sponsorship = () => {
  const [selectedSponsor, setSelectedSponsor] = useState(sponsors[0]);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="min-h-screen bg-[#03080c] py-8 md:py-16">
      <div className="mx-4 grid grid-cols-1 gap-0 md:mx-8 md:mb-12 md:gap-8 lg:mx-12 xl:mx-16    xl:grid-cols-2">
        <h1 className="block text-center text-2xl font-bold text-white md:hidden md:text-4xl">
          {selectedSponsor.type.charAt(0).toUpperCase() +
            selectedSponsor.type.slice(1)}{' '}
          Sponsor
        </h1>
        <div className="relative z-10 row-span-1 flex h-[300px] items-center justify-center md:h-[550px]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(/bg.svg)` }}
          />

          <Image
            src="/Ground.svg"
            alt="ground"
            width={400}
            height={100}
            className="absolute bottom-0 left-1/2 top-2/3 w-full max-w-[600px] -translate-x-1/2 transform px-3 md:w-3/4 lg:w-2/3 xl:w-2/3"
          />
          <div className="flex items-center justify-center p-4">
            <div className="relative h-48 w-48 xl:h-96 xl:w-96 perspective-1000 bottom-[8%] xl:bottom-[10%] -translate-y-3 xl:-translate-y-12">
              <div className="absolute h-full w-full cursor-pointer transition-transform duration-800 transform-style-3d hover:rotate-y-180">
                {/* Front */}
                <div className="absolute h-full w-full overflow-hidden rounded-lg shadow-lg backface-hidden">
                  <Image
                    src={selectedSponsor.logo1}
                    alt="Flowers"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Back */}
                <div className="absolute h-full w-full rotate-y-180 overflow-hidden rounded-lg shadow-lg backface-hidden">
                  <Image
                    src={selectedSponsor.logo1}
                    alt="Deer"
                    width={300}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="border-none bg-transparent text-white">
          <CardContent className="pt-6 text-center md:text-left">
            <h1 className="mb-4 hidden text-2xl font-bold md:mb-8 md:block md:text-4xl">
              {selectedSponsor.type.charAt(0).toUpperCase() +
                selectedSponsor.type.slice(1)}{' '}
              Sponsor
            </h1>
            <div className="text-sm text-gray-300 md:text-base">
              {selectedSponsor.description}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ADD CAROUSEL */}
      <div className="w-full px-5 ms-4 md:ms-0 md:px-0">
        <Carousel
          opts={{
            align: 'center',
            loop: true,
          }}
          className="mx-auto w-full max-w-7xl"
          setApi={setApi}
        >
          <CarouselContent className="flex w-full items-center justify-center">
            {sponsors.map((sponsor) => (
              <CarouselItem
                key={sponsor.id}
                className="basis-1/3 p-5 pl-4 md:basis-1/6 md:p-6"
              >
                <button
                  onClick={() => setSelectedSponsor(sponsor)}
                  className={`aspect-square w-full rounded-lg bg-gradient-to-t from-[#fff7ec] via-[#ffdcae] to-[#fcb54c] p-0.5 transition-all duration-300 ${
                    selectedSponsor.id === sponsor.id
                      ? 'shadow-[0_0_30px_rgba(252,200,76,0.5)]'
                      : 'shadow-none hover:shadow-[0_0_16px_rgba(252,181,100,0.5)]'
                  }`}
                >
                  <div className="h-full w-full rounded-md bg-[#aaaaaa]">
                    <div className="relative h-full w-full">
                      <Image
                        src={sponsor.logo2}
                        alt={sponsor.name}
                        fill
                        className="rounded-lg object-contain p-4"
                      />
                    </div>
                  </div>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden">
            <CarouselPrevious className="-left-4 border-[#242829] bg-[#242829] hover:border-[#242829]/80 hover:bg-[#242829]/80" />
            <CarouselNext className="-right-4 border-[#242829] bg-[#242829] hover:border-[#242829]/80 hover:bg-[#242829]/80" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Sponsorship;
