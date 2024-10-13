import React from 'react'

import Image from 'next/image'
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';



const MobileViewFooter = () => {

   const socialLinks = [
    { href: "https://www.facebook.com/fitsixes", icon: FaFacebook, alt: "Facebook" },
    { href: "https://www.instagram.com/fitsixescricketfiesta/", icon: FaInstagram, alt: "Instagram" },
    { href: "https://www.tiktok.com/@fitsixescricketfiesta", icon: FaTiktok, alt: "TikTok" },
  ];
  
  return (
    <footer className=' mx-auto bg-gradient-to-r from-[#03081a] to-[#03082c] border-t border-gray-400 block sm:hidden '>
        <div className='flex items-center text-center  justify-between space-x-2 mx-8 '>
            <div><Image src={"/images/footerLogo.png"} alt='itfsu' width={130} height={130}/>
            </div>
            <div className='text-white  text-center pt-3 '>
                <div className='flex items-center justify-center'><Image src="/images/itfsuLogo.png" alt='itfsu' width={80} height={80}/></div>
            </div>
        </div>
            
           
      <div className='flex flex-col text-white text-center text-[8px]'> 
        <p>Proudly Presented by</p>
            <p>IT FACULTY STUDENTS&apos; UNION OF UNIVERSITY OF MORATUWA</p>
            <div className='flex items-center justify-center space-x-2 mt-2'>
              {socialLinks.map((link, index) => (
                <Link key={index} href={link.href} target="_blank">
                  <link.icon className='w-6 h-6' />
                </Link>
              ))}
    </div>
            <div className='text-white text-[10px] text-center py-3 '>2024@FIT SIXES - ALL RIGHT RESERVED</div>
       
        </div>

    </footer>
  )
}

export default MobileViewFooter;