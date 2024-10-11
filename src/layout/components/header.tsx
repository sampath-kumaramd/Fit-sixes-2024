'use client';

import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { Logo } from '@/components';

import { MainHeader } from './main-header';

export default function Header() {

  const router = useRouter();
  const params = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoClick = () => {
    router.push(`/`);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
      <div className="bg-darkBlue">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-4 justify-between w-full">
             <button
              onClick={handleLogoClick}
              className="flex items-center gap-3"
            >
              <Logo logoSize="medium"/>
          
            </button>
            
            <button
              onClick={toggleMenu}
              className="z-50 lg:hidden"
            >
              <motion.div
                initial={false}
                animate={{
                  rotate: isMenuOpen ? 180 : 0,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                {isMenuOpen ? (
                  <X size={24} color="white" />
                ) : (
                  <Menu size={24} color="white" />
                )}
              </motion.div>
            </button>

           
          </div>
          <MainHeader className="hidden flex-row gap-4 lg:flex" />
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className=" absolute z-40 w-full bg-darkBlue lg:hidden text-right"
            initial={{
              opacity: 0,
              y: '-100%',
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: '-100%',
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <div className="p-4 mt-4">
              <MainHeader
                className="flex flex-col items-end space-y-2"
                closeMenu={closeMenu}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}