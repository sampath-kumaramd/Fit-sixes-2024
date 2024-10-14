"use client";

import React from 'react'

import Image from 'next/image'
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

import MobileViewFooter from '@/components/mobileViewFooter';

const Footer = () => {
  const socialLinks = [
    { href: "https://www.facebook.com/fitsixes", icon: FaFacebook, alt: "Facebook" },
    { href: "https://www.instagram.com/fitsixescricketfiesta/", icon: FaInstagram, alt: "Instagram" },
    { href: "https://www.tiktok.com/@fitsixescricketfiesta", icon: FaTiktok, alt: "TikTok" },
    ];
    
    const links = [
        { href: '/home', label: 'HOME' },
        { href: '/about', label: 'ABOUT' },
        { href: '/contactUs', label: 'CONTACT US' },
    ]

  return (
    <div className='bg-gradient-to-t from-[#03081a] to-[#03082c] '>
         <footer className=' container mx-auto  border-t border-gray-400 hidden sm:block '>
        <div className='text-white  pt-8 '>
            <div className='flex justify-between'>
            <div className=''>
              <Link href="/">
                          <Image src={"/images/footerLogo.png"} alt='itfsu' width={180} height={180} />
                          </Link>
                          <div className=' flex justify-start gap-8 items-center pt-6'>
                    <div className='text-lg '>Follow Us On</div>
                <div className='flex space-x-3 text-[6px] sm:text-sm  '>
                  {socialLinks.map((link, index) => (
                    <div key={index}>
                      <Link href={link.href} target="_blank">
                              <link.icon className='w-6 h-6' />
                      </Link>
                    </div>
                  ))}
                              </div>
                          </div>
            </div>
            {/* <div className='sm:pt-0 pt-6'>
                <ul className='text-sm  flex flex-col text-center sm:text-left space-y-2 '>
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link href={link.href} className=''>{link.label}</Link>
                        </li>
                    ))}

                </ul>
            </div> */}
            <div className=' col-span-2 sm:col-span-1 flex'>
              <div className=' flex flex-col items-center    text-center text-sm'>
               <Link href="https://www.facebook.com/itfsu" target="_blank">
               <Image src={"/images/itfsuLogo.png"} alt='itfsu' width={100} height={100}/>
               </Link>
                <div className='pt-6'>Proudly Presented by</div>
                <div>IT FACULTY STUDENTS&apos; UNION OF UNIVERSITY OF MORATUWA</div>
                </div>
              
            </div>

            </div>
            <div className='text-sm text-center pt-5 sm:pt-8 pb-4 sm:pb-6'>2024@FIT SIXES - ALL RIGHT RESERVED</div>
            
        </div>

    </footer>
    <MobileViewFooter/>
    </div>
   
  )
}

export default Footer