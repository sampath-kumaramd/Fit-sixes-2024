import React, { useEffect, useRef } from 'react';

import { motion, useInView } from 'framer-motion';

import ShinyButton from './ui/ShinyButton';

interface StylizedTextProps {
  mainText: string;
  highlightText: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
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

const buttonVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 , transition: { duration: 0.5 , delay: 0.8 }},
};

const StylizedText: React.FC<StylizedTextProps> = ({ mainText, highlightText, onClick, onMouseEnter, onMouseLeave }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="relative"
    >
      <motion.div
        variants={divVariants}
        className="relative font-extrabold font-druktrial"
      >
        <div className="absolute font-bold inset-0 flex justify-center items-center text-white/10 -z-10 text-4xl sm:text-6xl md:text-8xl lg:text-11xl font-exon tracking-tighter">
          {mainText} {highlightText}
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-exon text">
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
      <motion.div
        variants={buttonVariants}
        className='absolute -bottom-8 sm:-bottom-12 left-1/2 -translate-x-1/2 lg:right-48'
      >
        <ShinyButton
          className='text-sm sm:text-xl bg-yellow text-white w-fit px-3 sm:px-4 py-1 sm:py-2'
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        >
          Coming Soon
        </ShinyButton>
      </motion.div>
    </motion.div>
  );
};

export default StylizedText;
