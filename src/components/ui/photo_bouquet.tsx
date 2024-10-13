import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const initial = {
  x: 50,
  y: 500,
  opacity: 0,
  rotate: 180,
};

const img1Variants = {
  initial: initial,
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: -18,
    transition: {
      duration: 2,
      delay: 1,
      type: 'spring',
    },
  },
};

const img2Variants = {
  initial: {
    ...initial,
    rotate: -180,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: 12,
    transition: {
      duration: 2,
      delay: 1,
      type: 'spring',
    },
  },
};

const img3Variants = {
  initial: initial,
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: -8,
    transition: {
      duration: 2,
      delay: 1,
      type: 'spring',
    },
  },
};

const generalVariants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 3,
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

export default function PhotoBouquet({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="relative h-[40vh] w-full sd:h-[50vh] sm:h-[75vh]"
          whileInView="visible"
        >
          <Path
            className="absolute right-[7rem] top-[12rem] hidden h-20 w-32 rotate-[-40deg] sm:block xl:right-[27rem] xl:top-[0rem] xl:rotate-0"
            reverse
          />
          <motion.div
            className="absolute right-[3rem] top-[0.5rem] hidden w-28 text-center font-bold sm:flex xl:right-[3rem] xl:top-[38rem] bg-gray-200  outline-dashed outline-offset-4 outline-2 outline-yellow-600  h-28 rounded-full items-center justify-center text-black"
            variants={generalVariants}
            initial="initial"
            animate="visible"
          >
            30+ companies
          </motion.div>
          <motion.div
            className="absolute left-[1rem] top-[2rem] h-24 w-40 shadow-xl sd:left-[3rem] sd:h-32 sd:w-56 sm:left-[2rem] sm:top-[5rem] sm:h-64 sm:w-[26rem] md:left-[5rem] xl:left-20 xl:top-[4rem]"
            variants={img1Variants}
            initial="initial"
            animate="animate"
          >
            <Image
              src="/img1.jpg"
              alt="flower"
              layout="fill"
              objectFit="cover"
              className="rounded-sm"
            />
          </motion.div>
          <Path
            className="absolute right-[3rem] top-[22rem] hidden h-20 w-32 rotate-90 sm:left-[28rem] sm:right-auto sm:top-[24rem] sm:block sm:rotate-45 md:left-[10rem] md:right-auto md:top-[25rem] md:rotate-180 xl:left-auto xl:right-[5rem] xl:top-[30rem] xl:rotate-90"
            reverse
          />
          <motion.div
            className="absolute hidden w-28 text-center font-bold sm:left-[34rem] sm:top-[28rem] sm:flex md:left-[4rem] md:right-auto md:top-[27rem] xl:left-auto xl:right-[19rem] xl:top-[0rem] bg-gray-200  outline-dashed outline-offset-4 outline-2 outline-yellow-600  h-28 rounded-full items-center justify-center text-black"
            variants={generalVariants}
            initial="initial"
            animate="visible"
          >
            50+ Matches
          </motion.div>
          <motion.div
            className="absolute right-[2rem] top-[4rem] h-24 w-40 shadow-xl sd:right-[4rem] sd:h-32 sd:w-56 sm:right-[2rem] sm:top-[8rem] sm:h-64 sm:w-[26rem] md:right-[6rem] xl:right-[5rem] xl:top-[12rem]"
            variants={img2Variants}
            initial="initial"
            animate="animate"
          >
            <Image
              src="/img2.jpg"
              alt="flower"
              layout="fill"
              objectFit="cover"
              className="rounded-sm"
            />
          </motion.div>
          <Path className="absolute left-[2rem] top-[5rem] -z-10 hidden h-20 w-32 rotate-[90deg] sm:block xl:left-[5rem] xl:top-[25rem] xl:rotate-0" />
          <motion.div
            className="absolute hidden w-28 text-center font-bold sm:flex xl:left-[-1rem] xl:top-[29rem] bg-gray-200  outline-dashed outline-offset-4 outline-2 outline-yellow-600  h-28 rounded-full items-center justify-center text-black"
            variants={generalVariants}
            initial="initial"
            animate="visible"
          >
            1000+ Undergraduates
          </motion.div>
          <motion.div
            className="absolute left-[5rem] top-[10rem] h-24 w-40 shadow-xl sd:left-[10rem] sd:top-[12rem] sd:h-32 sd:w-56 sm:left-[8rem] sm:top-[20rem] sm:h-64 sm:w-[26rem] md:left-[15rem] xl:left-[12rem] xl:top-[20rem]"
            variants={img3Variants}
            initial="initial"
            animate="animate"
          >
            <Image
              src="/img3.jpg"
              alt="flower"
              layout="fill"
              objectFit="cover"
              className="rounded-sm"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Path({
  className,
  reverse,
}: {
  className: string;
  reverse?: boolean;
}) {
  return (
    <motion.svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52.39 26.16"
      className={className}
      variants={generalVariants}
      initial="initial"
      animate="visible"
    >
      <g id="Layer_2-2" data-name="Layer 2">
        <g>
          <path
            className="dot-path-cls-1"
            style={{
              animation: `draw 4s infinite linear ${reverse ? 'reverse' : ''}`,
            }}
            d="m51.89,5.23c-3.03,1.08-8.89,1.48-19.48-2.91C14.4-5.15,9.12,12.79,9.12,12.79c0,0-1.86,9.99-8.62,12.87"
          />
        </g>
      </g>
    </motion.svg>
  );
}
