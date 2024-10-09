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
  logo: string;
  type: 'platinum' | 'gold' | 'silver';
  borderColor: string;
  description: React.ReactNode;
}

// Sample sponsor data
const sponsors = [
  {
    id: 1,
    name: 'creative',
    logo: '/company-logo/creative-bgremove.png',
    type: 'platinum',
    borderColor: '#e80a4c',
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
      </div>
    ),
  },
  {
    id: 2,
    name: 'Digital Ocean',
    logo: '/company-logo/gtn.png',
    type: 'gold',
    borderColor: '#40a0b8',
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
      </div>
    ),
  },
  {
    id: 3,
    name: 'United Nations',
    logo: '/company-logo/creative-bgremove.png',
    type: 'silver',
    borderColor: '#e80a4c',
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
      </div>
    ),
  },
  {
    id: 4,
    name: 'HP',
    logo: '/company-logo/creative-bgremove.png',
    type: 'gold',
    borderColor: '#e80a4c',
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
      </div>
    ),
  },
  {
    id: 5,
    name: 'Apple',
    logo: '/company-logo/creative-bgremove.png',
    type: 'platinum',
    borderColor: '#e80a4c',
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
      </div>
    ),
  },
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
      <div className="mx-4 md:mx-8 lg:mx-12 xl:mx-16 grid xl:grid-cols-2 grid-cols-1 gap-8 mb-12 xl:mb-28">
        <div className="relative z-10 row-span-1 h-[300px] md:h-[400px] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(/bg.svg)` }}
          />
          <Image
            src="/Ground.svg"
            alt="ground"
            width={400}
            height={100}
            className="absolute px-3 w-full md:w-3/4 lg:w-2/3 xl:w-2/3 max-w-[600px] bottom-0 left-1/2 top-2/3 transform -translate-x-1/2"
          />
          <div className="absolute bottom-[8%] xl:bottom-[10%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div
              className={`bg-[#242829] border rounded-lg rotate-45 transition-all duration-1000 hover:[transform:rotateY(180deg)_rotate(45deg)] perspective-1000`}
              style={{ borderColor: selectedSponsor.borderColor }}
            >
              <div className="w-32 h-32 lg:w-40 lg:h-40 transition-all duration-1000 -rotate-45">
                <Image
                  src={selectedSponsor.logo}
                  alt={selectedSponsor.name}
                  width={160}
                  height={160}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <Card className="bg-transparent text-white border-none">
          <CardContent className="pt-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {selectedSponsor.type.charAt(0).toUpperCase() +
                selectedSponsor.type.slice(1)}{' '}
              Sponsor
            </h1>
            <div className="text-sm md:text-base text-gray-300">
              {selectedSponsor.description}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ADD CAROUSEL */}
      <div className="w-full md:px-0 px-5">
        <Carousel
          opts={{
            align: 'center',
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
          setApi={setApi}
        >
          <CarouselContent className="-ml-4">
            {sponsors.map((sponsor) => (
              <CarouselItem
                key={sponsor.id}
                className="pl-4 basis-1/3 md:p-6 p-5 md:basis-1/5"
              >
                <button
                  onClick={() => setSelectedSponsor(sponsor)}
                  className={`p-0.5 rounded-lg transition-all duration-300 w-full aspect-square bg-gradient-to-t from-[#fff7ec] via-[#ffdcae] to-[#fcb54c] ${
                    selectedSponsor.id === sponsor.id
                      ? 'shadow-[0_0_30px_rgba(252,200,76,0.5)]'
                      : 'shadow-none hover:shadow-[0_0_16px_rgba(252,181,100,0.5)]'
                  }`}
                >
                  <div className="rounded-md bg-[#242829] h-full w-full">
                    <div className="relative w-full h-full">
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        fill
                        className="object-contain rounded-lg p-4"
                      />
                    </div>
                  </div>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden">
            <CarouselPrevious className="-left-4 bg-[#242829] border-[#242829] hover:bg-[#242829]/80 hover:border-[#242829]/80" />
            <CarouselNext className="-right-4 bg-[#242829] border-[#242829] hover:bg-[#242829]/80 hover:border-[#242829]/80" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Sponsorship;
