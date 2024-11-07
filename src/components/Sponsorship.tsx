'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      <div className=" flex items-center h-full">
        <p className="text-gray-300">
          Introducing our Platinum Partner

Cloud Solutions International

Welcome Aboard!
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
  {
    id: 3,
    name: 'creative',
    logo1: '/company-logo/creative.svg',
    logo2: '/company-logo/creative.PNG',
    type: 'Gold',
    borderColor: '#183b34',
    description: (
      <div className="space-y-4">
        <p className="text-gray-300">
         Introducing our Platinum Partner

Cloud Solutions International

Welcome Aboard!
        </p>
      </div>
    ),
  },
    {
    id: 5,
    name: 'intervest',
    logo1: '/company-logo/intervest.png',
    logo2: '/company-logo/intervest2.jpg',
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

  {
    id: 6,
    name: 'vital-hub',
    logo1: '/company-logo/vital-hub.png',
    logo2: '/company-logo/vitalhub-logo.png',
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
];

// Add these animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
};

// Update the cardVariants
const cardVariants = {
  front: {
    rotateY: 0,
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.645, 0.045, 0.355, 1],
      scale: { duration: 0.2 }
    }
  },
  back: {
    rotateY: 180,
    scale: 1.05,
    transition: { 
      duration: 0.6, 
      ease: [0.645, 0.045, 0.355, 1],
      scale: { duration: 0.2 }
    }
  }
};

// Add text animation variants
const textVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const Sponsorship = () => {
  const [selectedSponsor, setSelectedSponsor] = useState(sponsors[0]);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const [api, setApi] = useState<CarouselApi>();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentSponsorIndex, setCurrentSponsorIndex] = useState(0);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [api]);

  useEffect(() => {
    const cardInterval = setInterval(() => {
      setCurrentSponsorIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % sponsors.length;
        setSelectedSponsor(sponsors[nextIndex]);
        return nextIndex;
      });
    }, 8000); // Change card every 8 seconds

    return () => clearInterval(cardInterval);
  }, []);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
      setCurrentSponsorIndex(sponsors.findIndex(s => s.id === selectedSponsor.id));
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-[#03080c] py-8 md:py-16">
      <div className="mx-4 grid grid-cols-1 gap-0 md:mx-8 md:mb-12 md:gap-8 lg:mx-12 xl:mx-16 xl:grid-cols-2">
        <motion.h1 
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="block text-center text-2xl font-bold text-white md:hidden md:text-4xl"
        >
          {selectedSponsor.type.charAt(0).toUpperCase() +
            selectedSponsor.type.slice(1)}{' '}
          Sponsor
        </motion.h1>

        <div className="relative z-10 row-span-1 flex h-[300px] items-center justify-center md:h-[550px]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(/bg.svg)` }}
          />

          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          >
            <Image
              src="/Ground.svg"
              alt="ground"
              width={400}
              height={100}
              className="absolute bottom-0 left-1/2 top-2/3 w-full max-w-[600px] -translate-x-1/2 transform px-3 md:w-3/4 lg:w-2/3 xl:w-2/3"
            />
          </div>

          <div className="flex items-center justify-center p-4">
            <motion.div
              className="relative h-48 w-48 xl:h-96 xl:w-96 bottom-[8%] xl:bottom-[10%] -translate-y-3 xl:-translate-y-12 cursor-pointer"
              animate={isFlipped ? "back" : "front"}
              variants={cardVariants}
              onHoverStart={handleFlip}
              onHoverEnd={handleFlip}
              style={{ 
                transformStyle: "preserve-3d",
                perspective: 1000
              }}
            >
              {/* Front of card */}
              <motion.div
                className="absolute inset-0 w-full h-full rounded-lg shadow-lg"
                style={{ 
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden"
                }}
              >
                <Image
                  src={selectedSponsor.logo1}
                  alt="Front"
                  fill
                  className="object-cover rounded-lg"
                  style={{ objectFit: 'contain' }}
                />
              </motion.div>

              {/* Back of card */}
              <motion.div
                className="absolute inset-0 w-full h-full rounded-lg shadow-lg"
                style={{ 
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)"
                }}
              >
                <Image
                  src={selectedSponsor.logo1}
                  alt="Back"
                  fill
                  className="object-cover rounded-lg"
                  style={{ objectFit: 'contain' }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
        >
          <Card className="border-none bg-transparent text-white">
            <CardContent className="pt-6 text-center md:text-left">
              {/* <h1 className="mb-4 hidden text-2xl font-bold md:mb-8 md:block md:text-4xl">
                {selectedSponsor.type.charAt(0).toUpperCase() +
                  selectedSponsor.type.slice(1)}{' '}
                Sponsor
              </h1> */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSponsor.id}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={textVariants}
                  transition={{ duration: 0.4 }}
                  className=" text-gray-300 md:text-xl h-80 items-center justify-center"
                >
                  {/* {selectedSponsor.description} */}
                  <div className='text-4xl font-bold'>
                  Introducing our
                  </div>
                  <div className='flex flex-col gap-4 justify-center items-center h-full'>
                 <div className='text-6xl font-bold text-center '>
                  Platinum Partner
                 </div>
                 <div className='text-6xl font-bold text-center '>
                  Cloud Solutions International
                 </div>
                 <div className='text-5xl font-bold text-center '>
                  Welcome Aboard!
                </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full px-5 ms-4 md:ms-0 md:px-0"
      >
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
                className="basis-1/3 p-2 pl-2 sm:basis-1/3 md:basis-1/6 md:p-6"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSponsor(sponsor)}
                  className={`aspect-square w-full rounded-lg bg-gradient-to-t transition-all duration-300 ${
                    selectedSponsor.id === sponsor.id
                      ? 'shadow-[0_0_30px_rgba(252,200,76,0.5)] from-[#fff7ec] via-[#ffaeae] to-[#fc4c4c] p-1'
                      : 'shadow-none hover:shadow-[0_0_16px_rgba(252,181,100,0.5)] from-[#fff7ec] via-[#ffdcae] to-[#fcb54c] p-0.5'
                  }`}
                >
                  <div className="h-full w-full rounded-md bg-white">
                    <div className="relative h-full w-full">
                      <Image
                        src={sponsor.logo2}
                        alt={sponsor.name}
                        fill
                        className="rounded-lg object-contain p-4"
                      />
                    </div>
                  </div>
                </motion.button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="md:hidden">
            <CarouselPrevious className="-left-8 border-[#242829] bg-[#242829] hover:border-[#242829]/80 hover:bg-[#242829]/80" />
            <CarouselNext className="-right-0 border-[#242829] bg-[#242829] hover:border-[#242829]/80 hover:bg-[#242829]/80" />
          </div>
        </Carousel>
      </motion.div>
    </div>
  );
};

export default Sponsorship;
