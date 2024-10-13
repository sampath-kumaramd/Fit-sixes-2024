'use client';

import React, { useEffect, useRef } from 'react';

import { motion, useInView } from 'framer-motion';

import ShinyButton from './ui/ShinyButton';

interface SubTitleProps {
  mainText: string;
  highlightText: string;
}

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const divVariants = {
  hidden: { opacity: 0, y: 2 },
    visible: { opacity: 1, y: 0 , transition: { duration: 0.5 , delay: 0.2 }},
};
              
const spanVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 , transition: { duration: 0.5 , delay: 0.2 }},
};

const spanHighlightVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 , transition: { duration: 0.5 , delay: 0.4 } },
};


const SubTitle: React.FC<SubTitleProps> = ({ mainText, highlightText }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="relative "
    >
      <motion.div
        variants={divVariants}
        className="relative font-extrabold font-druktrial"
      >
        <div className="absolute font-bold inset-0 flex justify-center items-center text-white/20 -z-10 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-exon tracking-tighter">
          {mainText} {highlightText}
        </div>
        <div className="flex flex-row justify-center items-center font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-exon text">
          <motion.span
            variants={spanVariants}
            className="text-yellow"
          >
            {mainText}
          </motion.span>
          <motion.span
            variants={spanHighlightVariants}
            className="text-white mt-2 sm:mt-0 sm:ml-2"
          >
            {highlightText}
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SubTitle;
