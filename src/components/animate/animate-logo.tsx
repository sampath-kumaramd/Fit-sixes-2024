import React from 'react';

import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

import { Logo } from '../logo';


export interface AnimateLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: React.ReactNode;
}

export function AnimateLogo1({ logo, className, ...props }: AnimateLogoProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center w-32 h-32",
        className
      )}
      {...props}
    >
      <motion.div
        animate={{ scale: [1, 0.9, 0.9, 1, 1], opacity: [1, 0.48, 0.48, 1, 1] }}
        transition={{
          duration: 2,
          repeatDelay: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="inline-flex"
      >
        {logo ?? <Logo disableLink className="w-16 h-16 flex items-center justify-center" />}
      </motion.div>

      <motion.div
        animate={{
          scale: [1.4, 1, 1, 1.4, 1.4],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
        }}
        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
        className="absolute w-[calc(100%-5px)] h-[calc(100%-5px)] border-3 border-[#f5d399]"
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1.1, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
        }}
        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
        className="absolute w-full h-full border-8 border-[#f5d399]"
      />
    </div>
  );
}

// ----------------------------------------------------------------------

export function AnimateLogo2({ logo, className, ...props }: AnimateLogoProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center w-24 h-24",
        className
      )}
      {...props}
    >
      {logo ?? <Logo className="z-10" />}

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
        className="absolute w-full h-full opacity-16 rounded-full bg-gradient-to-tr from-primary/0 to-primary"
      />
    </div>
  );
}