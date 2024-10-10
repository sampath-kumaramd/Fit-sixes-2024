"use client";

import React from 'react'

import Image from 'next/image'
import Link from 'next/link';

import MobileViewFooter from '@/components/mobileViewFooter';


const Footer = () => {
  return (
    <div className='bg-[#03082a] w-full '>
         <footer className='max-w-screen-2xl mx-auto bg-gradient-to-t from-[#03081a] to-[#03082c] border-t border-gray-400 hidden sm:block '>
        <div className=' w-full  text-white h-48 pt-8 '>
            <div className='grid  grid-cols-4 sm:grid-cols-3 sm:mx-6 md:mx-8 lg:mx-16 xl:mx-32 '>
            <div className=''>
                <div className=''>
                    <Image src={"/images/footerLogo.png"} alt='itfsu' width={150} height={150}/>
                </div>
                <div className='pt-[94px] ml-[165px] sm:ml-0 sm:pt-[12px] text-[6px] sm:text-sm whitespace-nowrap '>
                    <p >Follow Us</p>
                </div>
                <div className='flex space-x-1 pt-3  ml-[165px] sm:ml-0 text-[6px] sm:text-sm '>
                    <div>
                        <Link href="https://www.facebook.com" target="_blank">
                        <Image src={"/images/facebookLogo.png"} alt='Facebook' width={30} height={30} />
                        </Link></div>
                    <div>
                    <Link href="https://www.instagram.com" target="_blank">
                    <Image src={"/images/instagramLogo.png"} alt='Instagram' width={20} height={20} />
                    </Link>
                    </div>
                    <div><Link href="https://www.tiktok.com" target="_blank">
                     <Image src={"/images/tiktokLogo.png"} alt='TikTok' width={20} height={20} />
                     </Link></div>
                </div>
            </div>
            <div className='sm:pt-0 pt-6'>
                <ul className='text-[5px] sm:text-[10px] flex flex-col text-center sm:text-left space-y-2'>
                    <li><a href='/home' className=''>HOME</a> </li>
                    <li><a href='/about' className=''>ABOUT</a></li>
                    <li><a href='/about' className=''>WATCH LIVE</a></li>
                    <li><a href='/about' className=''>LIVE SCORE</a></li>
                    <li><a href='/contactUs' className=''>CONTACT US</a></li>

                </ul>
            </div>
            <div className=' col-span-2 sm:col-span-1 flex'>
                <div className=' flex flex-col items-center    text-center sm:text-[10px]'>
                <div>Proudly Presented by</div>
                <div>IT FACULTY STUDENTS&apos; UNION OF UNIVERSITY OF MORATUWA</div>
                <div className='pt-2'><Image src={"/images/itfsuLogo.png"} alt='itfsu' width={100} height={100}/>
                </div>
                </div>
              
            </div>

            </div>
            <div className='text-[5px] sm:text-[8px] text-center pt-5 sm:pt-8'>2024@FIT SIXES - ALL RIGHT RESERVED</div>
            
        </div>

    </footer>
    <MobileViewFooter/>
    </div>
   
  )
}

export default Footer