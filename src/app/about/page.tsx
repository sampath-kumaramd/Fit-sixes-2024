import React from 'react';

import Image from 'next/image';

import Carouselsection from '@/components/Carouselsection';
import PastMatches from '@/components/PastMatches';
import SubTitle from '@/components/sub-title';

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
    <div className="relative">
      {/* hero section */}
      <div className="   flex justify-center items-center pb-10 pt-20 bg-[#050a2e]">
        <SubTitle mainText='About' highlightText=' Us'/>
      </div>
      <div className=' bg-gradient-to-r from-[#fba818]/10 to-[#fba818]/5'>
        
      {/* about section */}
      <div className="container mx-auto md:py-24 py-6 h-auto ">
        <div className="md:flex space-y-10 md:space-y-0 w-full justify-center items-center">
          <div className="md:w-2/5 w-full flex justify-center items-center ">
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
    </div>
  );
}

export default page;
