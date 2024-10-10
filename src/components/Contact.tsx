import React from 'react'

import Image from 'next/image'


type contactProfile = {
    name: string;
    position: string;
    contactNo: string;
    email: string;
    image:string;
  }

const Contact = ({name , position,contactNo,email,image}:contactProfile) => {
  return (
    <div className='flex flex-col  items-center'>
        <div className='w-24 h-24 sm:w-44 sm:h-44 rounded-full bg-white shadow-md border-2 
         border-yellow-600   outline-dashed outline-offset-4 outline-2 outline-yellow-600 '>
          <Image 
              src={image} 
              alt={name} 
              width={96} 
              height={96} 
              className='w-24 h-24 sm:w-44 sm:h-44 rounded-full' 
  />
         </div>
        <div className='py-6 text-center'>
        <div className='pt-2 font-bold'>{name}</div>
        <div className='text-[12px]'>{position}</div>
        </div>
        <hr className='border-t  w-1/2 border-yellow-600'/>
        <div className='py-6 sm:py-4 text-center font-bold'>
          <div>{contactNo}</div>
          <div>{email}</div>
        </div>
    </div>
  )
}

export default Contact