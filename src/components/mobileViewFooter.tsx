import React from 'react'

import Image from 'next/image'
import Link from 'next/link';



const MobileViewFooter = () => {
  return (
    <footer className=' mx-auto bg-gradient-to-r from-[#03081a] to-[#03082c] border-t border-gray-400 block sm:hidden '>
        <div className='flex items-center text-center  justify-between space-x-2 mx-8 '>
            <div><Image src={"/images/footerLogo.png"} alt='itfsu' width={100} height={100}/>
            </div>
            <div className='text-white  text-center pt-3 '>
                <div className='flex items-center justify-center'><Image src="/images/itfsuLogo.png" alt='itfsu' width={50} height={50}/></div>
                <div className='text-[9px] mt-4'>Proudly Presented by</div>
                <div className='text-[8px]'>IT FACULTY STUDENTS&apos; UNION OF UNIVERSITY OF MORATUWA</div>
            </div>
            

        </div>
            
           
        <div className='flex flex-col text-white text-center text-[8px]'> 
            <div className='flex items-center justify-center space-x-2'>
      <div>
        <Link href="https://www.facebook.com/fitsixes" target="_blank">
          <Image src={"/images/facebookLogo.png"} alt='Facebook' width={40} height={40} />
        </Link>
      </div>
      <div>
        <Link href="https://www.instagram.com/fitsixescricketfiesta/" target="_blank">
          <Image src={"/images/instagramLogo.png"} alt='Instagram' width={25} height={25} />
        </Link>
      </div>
      <div>
        <Link href="https://www.tiktok.com/@fitsixescricketfiesta" target="_blank">
          <Image src={"/images/tiktokLogo.png"} alt='TikTok' width={25} height={25} />
        </Link>
      </div>
    </div>
            <div className='text-white text-[10px] text-center py-3 '>2024@FIT SIXES - ALL RIGHT RESERVED</div>
       
        </div>

    </footer>
  )
}

export default MobileViewFooter;