import React, { useEffect, useRef } from 'react';

import { motion, useInView } from 'framer-motion';

import ShinyButton from './ui/ShinyButton';

interface StylizedTextProps {
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
};

const spanVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
};

const spanHighlightVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.4 } },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.8 } },
};

const StylizedText: React.FC<StylizedTextProps> = ({
  mainText,
  highlightText,
}) => {
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
        className="relative font-druktrial font-extrabold"
      >
        <div>
          <div className="absolute inset-0 -z-10 flex items-center justify-center text-5xl font-bold text-white/10 sm:text-7xl md:text-8xl lg:text-10xl">
            {mainText} {highlightText}
          </div>
        </div>
        <div className="relative mx-auto flex w-fit flex-row items-center justify-center text-6xl font-semibold lg:text-8xl">
          <motion.span variants={spanVariants} className="text-yellow">
            {mainText}
          </motion.span>
          <span className="whitespace-nowrap"> &nbsp;</span>
          <motion.span
            variants={spanHighlightVariants}
            className="text-white sm:ml-2"
          >
            {highlightText}
          </motion.span>
          <motion.div
            variants={buttonVariants}
            className="absolute -bottom-10 right-0 z-50 sm:-bottom-10"
          >
            <div className="w-fit px-3 py-1 text-sm font-thin text-white sm:px-4 sm:py-2 sm:text-xl">
              Powered by ITFSU
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StylizedText;
