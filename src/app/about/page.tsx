import React from 'react';

import Image from 'next/image';

import Carouselsection from '@/components/Carouselsection';
import PastMatches from '@/components/PastMatches';

const carouselItems = [
  {
    name: 'JORDYN CURTIS',
    image: '/avatars/placeholder.png',
    description:
      'Nulla nibh amet ac augue enim mauris. Nulla massa suspendisse risus nibh hendrerit. A viverra tincidunt sagittis tincidunt. Fermentum massa.',
    logo: '',
  },
  {
    name: 'JORDYN CURTIS',
    image: '/avatars/placeholder.png',
    description:
      'Nulla nibh amet ac augue enim mauris. Nulla massa suspendisse risus nibh hendrerit. A viverra tincidunt sagittis tincidunt. Fermentum massa sagittis tincidunt. Fermentum massa.',
    logo: '',
  },
  {
    name: 'JORDYN CURTIS',
    image: '/avatars/placeholder.png',
    description:
      'Nulla nibh amet ac augue enim mauris. Nulla massa suspendisse risus nibh hendrerit. A viverra tincidunt sagittis tincidunt. Fermentum mass sagittis tincidunt. Fermentum massa.',
    logo: '',
  },
  {
    name: 'JORDYN CURTIS',
    image: '/avatars/placeholder.png',
    description:
      'Nulla nibh amet ac augue enim mauris. Nulla massa suspendisse risus nibh hendrerit. A viverra tincidunt sagittis tincidunt. Fermentum massa.',
    logo: '',
  },
  {
    name: 'JORDYN CURTIS',
    image: '/avatars/placeholder.png',
    description:
      'Nulla nibh amet ac augue enim mauris. Nulla massa suspendisse risus nibh hendrerit. A viverra tincidunt sagittis tincidunt. Fermentum massa.',
    logo: '',
  },
  {
    name: 'JORDYN CURTIS',
    image: '/avatars/placeholder.png',
    description:
      'Nulla nibh amet ac augue enim mauris. Nulla massa suspendisse risus nibh hendrerit. A viverra tincidunt sagittis tincidunt. Fermentum mass sagittis tincidunt. Fermentum massa.',
    logo: '',
  },
  {
    name: 'JORDYN CURTIS',
    image: '/avatars/placeholder.png',
    description:
      'Nulla nibh amet ac augue enim mauris. Nulla massa suspendisse risus nibh hendrerit. A viverra tincidunt sagittis tincidunt. Fermentum massa.',
    logo: '',
  },
  {
    name: 'JORDYN CURTIS',
    image: '/avatars/placeholder.png',
    description:
      'Nulla nibh amet ac augue enim mauris. Nulla massa suspendisse risus nibh hendrerit. A viverra tincidunt sagittis tincidunt. Fermentum massa.',
    logo: '',
  },
];

function page() {
  return (
    <div className="">
      {/* hero section */}
      <div className="bg-gradient-to-r from-[#03082b] to-[#03081a] min-h-screen flex justify-center items-center ">
        <div className="container mx-auto grid md:grid-cols-3 grid-cols-1 text-white py-6 md:gap-10 gap-0 space-y-10">
          <div className="w-full max-h-96 grid col-span-2 space-y-1 md:space-y-10">
            <h1 className="text-[#171c32] md:text-7xl text-2xl font-bold text-right">
              FIT SIXES 2K24
            </h1>
            <h1 className="text-[#fba919] md:text-9xl text-5xl font-bold text-left md:ms-24 ms-10">
              FIT SIXES
            </h1>
            <h1 className="text-white md:text-6xl text-xl font-bold text-right md:me-24 me-10">
              CRICKET FIESTA
            </h1>
            <h1 className="text-[#171c32] md:text-7xl text-2xl font-bold text-left">
              FIT SIXES 2K24
            </h1>
          </div>
          <div className="flex w-full justify-center px-12 md:px-0 items-center">
            <Image
              src="/logo-light.png"
              alt="hero"
              width={400}
              height={400}
              className="w-full h-auto md:p-0"
            />
          </div>
        </div>
      </div>

      {/* about section */}
      <div className="container mx-auto md:py-24 py-6 h-auto ">
        <div className="md:flex space-y-10 md:space-y-0 w-full justify-center items-center">
          <div className="md:w-2/5 w-full flex justify-center items-center">
            <Carouselsection items={carouselItems} />
          </div>
          <div className="space-y-8 md:text-xl text-md font-medium leading-normal md:w-3/5 w-full">
            <p>
              FIT SIXES is the annual cricket encounter organized by the IT
              Faculty Students&apos; Union of the University of Moratuwa.
            </p>
            <p>
              collaboration with the industry and create a significant day in
              our university lives. Along with that, we also want to give our
              undergraduate students a chance to interact with others who share
              their interests and grow professionally through these connections.
            </p>
            <p>
              The goal of this effort is to bring the FIT family&lsquo;s hidden
              sportsmanship to light and help generations after generations tie
              together friendship and unity.
            </p>
            <p>
              The goal of this effort is to bring the FIT family&lsquo;s hidden
              sportsmanship to light and help generations after generations tie
              together friendship and unity.
            </p>
          </div>
        </div>
      </div>

      {/* t shirt section */}
      <div className="container mx-auto md:py-12 py-6 h-auto ">
        <div className="md:flex space-y-10 md:space-y-0 w-full justify-center items-center">
          <div className="w-full md:w-1/2 space-y-8 md:text-xl text-md font-medium leading-normal ">
            <p>
              In the year 2019, the &quot;FIT SIXES Cricket Fiesta&quot; was
              held for the last time. With the support of students from batches
              15, 16, 17, and 18, as well as more than 100 industry visitors, it
              was successfully concluded.
            </p>
            <p>
              When compared to previously held cricket fiestas, this event had a
              unique fan base every year, both in the University of Moratuwa and
              in the businesses associated with the industry. In addition to the
              faculty of IT cricket teams, more than 40 teams from 30 different
              companies took part in the previous match, which benefited the
              relationship between the faculty of IT and its industry partners.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <Image
              src="/t-shirt.svg"
              alt="tshirt"
              width={100}
              height={100}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* previous matches */}
      <div className="container mx-auto py-12 h-auto ">
        <h1 className="md:text-4xl text-xl font-bold bg-custom-text-gradient mb-6 text-gradient md:mb-12">
          Previous FIT Sixes So Far ...
        </h1>
        <div>
          <PastMatches />
        </div>
      </div>
    </div>
  );
}

export default page;
