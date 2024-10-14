import React, {useState} from 'react';

import {motion, AnimatePresence} from 'framer-motion';
import Image from 'next/image';

import PhotoBouquet from './ui/photo_bouquet';
import RollingBallAbstract from './ui/rolling_ball_abstract';

export default function BallOfFame() {
    const [boquetVisible, setBoquetVisible] = useState(false);
    return (
        <div className="relative m-auto grid bg-gradient-to-br from-amber-300 to-zinc-50">
        <div className="absolute top-0 z-10 h-28 w-full bg-gradient-to-b from-[#060a2c] to-[transparent]" />
        <div className="absolute bottom-0 z-20 h-[80%] w-[50vw]">
          <Image
            src="/wicketsbg.svg"
            layout="fill"
            objectFit="contain"
            alt="Wickets Background"
          />
        </div>
          <h1 className="mt-32 text-center text-2xl font-bold">
           { ' '}
          </h1>
          <RollingBallAbstract />
        <div className="z-30 mt-[-5rem] grid grid-cols-5 gap-5 p-2 lg:mt-[-20rem] lg:p-10 lg:px-20">
          <AnimatePresence>
            <motion.div
              className="col-span-5 p-10 xl:col-span-2"
              variants={{
                hidden: { opacity: 0, y: 200 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: 'spring',
                    duration: 1,
                  },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              layout
            >
              <motion.p className="md:mt-50 mt-20 text-lg text-justify" layout>
                Welcome to the official website of FIT SIXES, the annual six-a-side cricket tournament of the Faculty of Information Technology of University of Moratuwa. FIT SIXES is a friendly rivalry of cricket among the squads of undergraduates of the faculty and the industry giants, underpinning a numerous mini-games, fun activities and an afterparty celebration. Upholding the traditions of the faculty from generation to generation, it is organized to strengthen the alliance between the undergraduates and the invited industry partners.
              </motion.p>
            </motion.div>
          </AnimatePresence>
          <motion.div
            className="col-span-5 content-center xl:col-span-3"
            onViewportEnter={() => setBoquetVisible(true)}
          >
            <PhotoBouquet visible={boquetVisible} />
          </motion.div>
        </div>
      </div>
    );
}
