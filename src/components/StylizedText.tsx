import React, { useEffect } from 'react';

import { motion } from 'framer-motion';

import ShinyButton from './ui/ShinyButton';

interface StylizedTextProps {
  mainText: string;
  highlightText: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}


const StylizedText: React.FC<StylizedTextProps> = ({ mainText, highlightText, onClick, onMouseEnter, onMouseLeave }) => {
    
    useEffect(() => {
        
    }, []);

    return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative font-extrabold font-druktrial"
      >
        <div className="absolute font-bold inset-0 flex justify-center items-center text-white/20 -z-10 text-4xl sm:text-6xl md:text-8xl lg:text-10xl font-exon tracking-tighter">
          {mainText} {highlightText}
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-exon text">
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
                      viewport={{ once: true }}
                      
            className="text-yellow"
          >
            {mainText}
          </motion.span>
          <motion.span
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-white mt-2 sm:mt-0 sm:ml-2"
          >
            {highlightText}
          </motion.span>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        viewport={{ once: true }}
        className='absolute -bottom-8 right-4 sm:right-12 md:right-24 lg:right-48'
      >
        <ShinyButton
          className='text-lg sm:text-xl bg-yellow text-white w-fit px-3 sm:px-4 py-1 sm:py-2'
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        >
          Coming Soon
        </ShinyButton>
      </motion.div>
    </div>
  );
};

export default StylizedText;