'use client';

import React from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';

import Carouselsection from '@/components/Carouselsection';
import PastMatches from '@/components/PastMatches';
import SubTitle from '@/components/sub-title';

const carouselItems = [
  {
    name: 'JORDYN CURTIS',
    image: '/Champions/2014(m).png',
    description:
      'Nulla nibh amet ac augue enim mauris. Nulla massa suspendisse risus nibh hendrerit. A viverra tincidunt sagittis tincidunt. Fermentum massa.',
    logo: '',
  },
  {
    name: 'JORDYN CURTIS',
    image: '/Champions/2014(m).png',
    description:
      'Nulla nibh amet ac augue enim mauris. Nulla massa suspendisse risus nibh hendrerit. A viverra tincidunt sagittis tincidunt. Fermentum massa sagittis tincidunt. Fermentum massa.',
    logo: '',
  },
  {
    name: 'JORDYN CURTIS',
    image: '/Champions/2014(m).png',
    description:
      'Nulla nibh amet ac augue enim mauris. Nulla massa suspendisse risus nibh hendrerit. A viverra tincidunt sagittis tincidunt. Fermentum mass sagittis tincidunt. Fermentum massa.',
    logo: '',
  },
  {
    name: 'JORDYN CURTIS',
    image: '/Champions/2014(m).png',
    description:
      'Nulla nibh amet ac augue enim mauris. Nulla massa suspendisse risus nibh hendrerit. A viverra tincidunt sagittis tincidunt. Fermentum massa.',
    logo: '',
  },
  {
    name: 'JORDYN CURTIS',
    image: '/Champions/2014(m).png',
    description:
      'Nulla nibh amet ac augue enim mauris. Nulla massa suspendisse risus nibh hendrerit. A viverra tincidunt sagittis tincidunt. Fermentum massa.',
    logo: '',
  },
  {
    name: 'JORDYN CURTIS',
    image: '/Champions/2014(m).png',
    description:
      'Nulla nibh amet ac augue enim mauris. Nulla massa suspendisse risus nibh hendrerit. A viverra tincidunt sagittis tincidunt. Fermentum mass sagittis tincidunt. Fermentum massa.',
    logo: '',
  },
  {
    name: 'JORDYN CURTIS',
    image: '/Champions/2014(m).png',
    description:
      'Nulla nibh amet ac augue enim mauris. Nulla massa suspendisse risus nibh hendrerit. A viverra tincidunt sagittis tincidunt. Fermentum massa.',
    logo: '',
  },
  {
    name: 'JORDYN CURTIS',
    image: '/Champions/2014(m).png',
    description:
      'Nulla nibh amet ac augue enim mauris. Nulla massa suspendisse risus nibh hendrerit. A viverra tincidunt sagittis tincidunt. Fermentum massa.',
    logo: '',
  },
];

function page() {
  return (
    <div className="relative">
      {/* hero section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center items-center pb-10 pt-20 bg-[#050a2e]"
      >
        <SubTitle mainText='About' highlightText=' Us'/>
      </motion.div>
      <div className='bg-gradient-to-r from-[#fba818]/10 to-[#fba818]/5'>
        
      {/* about section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        className="container mx-auto md:py-24 py-6 h-auto"
      >
        <div className="md:flex space-y-10 md:space-y-0 w-full justify-center items-center">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            className="md:w-2/5 w-full flex justify-center items-center"
          >
            <Carouselsection items={carouselItems} />
          </motion.div>
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8 md:text-xl text-md font-medium leading-normal md:w-3/5 w-full"
          >
            <TypeAnimation
              sequence={[
                'FIT SIXES is the annual cricket encounter organized by the IT Faculty Students\' Union of the University of Moratuwa.\n\nFIT SIXES aims to foster collaboration with the industry and create a significant day in our university lives. We want to give our undergraduate students a chance to interact with others who share their interests and grow professionally through these connections.\n\nThe goal of this effort is to bring the FIT family\'s hidden sportsmanship to light and help generations after generations tie together friendship and unity.',
              ]}
              wrapper="div"
              speed={99}
              style={{ whiteSpace: 'pre-line' }}
              repeat={0}
              cursor={false}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* t shirt section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto md:py-12 py-6 h-auto"
      >
        <div className="md:flex space-y-10 md:space-y-0 w-full justify-center items-center">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 space-y-8 md:text-xl text-md font-medium leading-normal"
          >
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
          </motion.div>
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <Image
              src="/t-shirt.svg"
              alt="tshirt"
              width={100}
              height={100}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* previous matches */}
      <div className="container mx-auto py-12 h-auto ">
        <h1 className="md:text-4xl text-xl font-bold bg-custom-text-gradient mb-6 text-gradient md:mb-12">
          FIT SIXES So Far ...
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
