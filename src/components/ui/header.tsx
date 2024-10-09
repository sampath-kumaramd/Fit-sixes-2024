"use client";

import React, { useState } from 'react'

import { AlignJustify, X } from 'lucide-react';
import Image from 'next/image'

import Navbar from './Navbar';



const Header = () => {
  const [isClick, setClick] = useState(false);
  const toggleNavbar = () => {
    setClick(!isClick);
  }

  return (
    <div>
      <div className='bg-[#03081b] w-full py-6'>
        <div className='max-w-screen-2xl mx-auto flex justify-between items-center'>
          <div className='mx-6 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-32 text-white'>
            <Image src="/images/logo.png" alt="logo" width={45} height={45} />
          </div>
          <div className=' mx-6 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-32 hidden sm:block'>
            <Navbar  />
          </div>
          <div className='sm:hidden flex items-center'>
            <button className='text-white inline-flex items-center justify-center p-2 hover:text-white focus:outline-none' onClick={toggleNavbar}>
              {isClick ? (<X />) : (<AlignJustify />)}
            </button>
          </div>
        </div>
      </div>

      {isClick && (
        <div className='sm:hidden block'>
          <div className='px-3 py-3 space-y-3 bg-[#03082a] text-white flex flex-col'>
            <a href='/about' className=''>About</a>
            <a href='/liveScore' className=''>Live Score</a>
            <a href='/contactUs' className=''>Contact Us</a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header;
