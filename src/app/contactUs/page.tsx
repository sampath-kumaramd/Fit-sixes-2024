import Image from 'next/image'

import Contact from "@/components/ui/Contact";



export default function contactUs() {
    const contacts  =[
        {
            name:'Dushan Dissanayake',
            position:'  Event coordinator',
            contactNo:'+94 71 864 7945',
            email:'dushan.18@itfac.mrt.ac.lk',
            image:'/images/profile.jpg'
        },
        {
            name:'Dushan Dissanayake',
            position:'Event coordinator',
            contactNo:'+94 71 864 7945',
            email:'dushan.18@itfac.mrt.ac.lk',
            image:'/images/profile.jpg'

        },
        {
            name:'Dushan Dissanayake',
            position:'Event coordinator',
            contactNo:'+94 71 864 7945',
            email:'dushan.18@itfac.mrt.ac.lk',
            image:'/images/profile.jpg'

        },
        {
            name:'Dushan Dissanayake',
            position:'Event coordinator',
            contactNo:'+94 71 864 7945',
            email:'dushan.18@itfac.mrt.ac.lk',
            image:'/images/profile.jpg'

        },
        {
          name:'Dushan Dissanayake',
          position:'Event coordinator',
          contactNo:'+94 71 864 7945',
          email:'dushan.18@itfac.mrt.ac.lk',
          image:'/images/profile.jpg'

      }
    ];

    return (
        <div className="relative bg-[#03081b] text-white">
        <div className="absolute inset-0 bg-[url('/images/background.svg')] bg-[length:80%] marker:bg-contain hidden sm:block sm:bg-left-top bg-no-repeat opacity-5" />
        
        <div className="text-center pt-3 sm:pt-1 sm:text-2xl font-bold">CONTACT US</div>
        <div className="container mx-auto flex flex-col sm:flex-row sm:flex-wrap justify-between items-center py-8 px-20">
          {contacts.map((contact, index) => (
            <Contact 
              key={index}
              name={contact.name}
              position={contact.position}
              contactNo={contact.contactNo}
              email={contact.email}
              image={contact.image} 
            />
          ))}
        </div>
        <div className="flex flex-col items-center text-center pb-4">
          <div className='py-3'>
            <Image src={"/images/email.png"} alt='email' width={40} height={40} />
          </div>
          <div className="font-sans">Email: itfsu.fitsixes@gmail.com</div>
        </div>
      </div>
      
    );
  }