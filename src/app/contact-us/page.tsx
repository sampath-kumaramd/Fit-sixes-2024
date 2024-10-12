'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

import Contact from '@/components/Contact';

const contacts = [
  {
    name: 'Kelum Srinath',
    position: 'Event coordinator',
    contactNo: '+94 77 103 5828',
    email: 'bandararbks.20@itfac.mrt.ac.lk',
    image: '/coordinator/kalum.jpg',
  },
  {
    name: 'Sampath Kumara',
    position: 'Event coordinator',
    contactNo: '+94 76 093 7443',
    email: 'kumarapmmds.20@itfac.mrt.ac.lk',
    image: '/coordinator/sampath.jpg',
  },
  {
    name: 'Chathura Nimsara',
    position: '  Event coordinator',
    contactNo: '+94 76 562 6145',
    email: 'Nodani',
    image: '/coordinator/chathura.jpg',
  },

  {
    name: 'Menura Wijesekara',
    position: 'Event coordinator',
    contactNo: '+94 71 121 4997',
    email: 'Nodani',
    image: '/coordinator/menura.jpg',
  },
  {
    name: 'Nethmi Kavindya',
    position: 'Event coordinator',
    contactNo: '+94 71 547 6969',
    email: 'kavindyakdn.20@itfac.mrt.ac.lk',
    image: '/coordinator/kavindya.jpg',
  },
];

export default function contactUs() {
  return (
    <motion.div
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-[#050a2e] text-white"
    >
      <div className="absolute inset-0 hidden bg-[url('/images/background.svg')] bg-[length:80%] bg-no-repeat opacity-5 marker:bg-contain sm:block sm:bg-left-top" />

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="pt-3 text-center font-bold sm:pt-1 sm:text-4xl"
      >
        CONTACT US
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="container mx-auto mt-20 flex flex-col items-center justify-between px-20 py-8 sm:flex-row sm:flex-wrap"
      >
        {contacts.map((contact, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: 0.2 * index, duration: 0.3 }}
            className="duration-30 transform transition-transform ease-in-out hover:scale-110"
          >
            <Contact
              name={contact.name}
              position={contact.position}
              contactNo={contact.contactNo}
              email={contact.email}
              image={contact.image}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col items-center pb-4 text-center"
      >
        <div className="py-3">
          <Image src={'/images/email.png'} alt="email" width={40} height={40} />
        </div>
        <div className="font-sans">Email: itfsu.fitsixes@gmail.com</div>
      </motion.div>
    </motion.div>
  );
}
