import React, { useState, useEffect } from 'react';

import { ArrowLeft, ArrowRight } from 'lucide-react';


const HallOfFame: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Switzerland', image: 'https://i.ibb.co/qCkd9jS/img1.jpg', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!' },
    { id: 2, name: 'Finland', image: 'https://i.ibb.co/jrRb11q/img2.jpg', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!' },
    { id: 3, name: 'Iceland', image: 'https://i.ibb.co/NSwVv8D/img3.jpg', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!' },
    { id: 4, name: 'Australia', image: 'https://i.ibb.co/Bq4Q0M8/img4.jpg', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!' },
    { id: 5, name: 'Netherland', image: 'https://i.ibb.co/jTQfmTq/img5.jpg', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!' },
    { id: 6, name: 'Ireland', image: 'https://i.ibb.co/RNkk6L0/img6.jpg', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!' },
  ]);

  const nextSlide = () => {
    setItems(prevItems => [...prevItems.slice(1), prevItems[0]]);
  };

  const prevSlide = () => {
    setItems(prevItems => [prevItems[prevItems.length - 1], ...prevItems.slice(0, -1)]);
  };

  return (
    <div className="relative w-[1000px] h-[600px] bg-[#f5f5f5] shadow-[0_30px_50px_#dbdbdb] mx-auto my-8">
      <div className="slide relative w-full h-full overflow-hidden">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`item absolute transform ${
              index === 0
                ? 'w-full h-full top-0 left-0 z-10'
                : index === 1
                ? 'w-full h-full top-0 left-0 z-20'
                : index === 2
                ? 'left-1/2'
                : index === 3
                ? 'left-[calc(50%+220px)]'
                : index === 4
                ? 'left-[calc(50%+440px)]'
                : 'left-[calc(50%+660px)] opacity-0'
            } ${
              index !== 0 && index !== 1
                ? 'w-[200px] h-[300px] -translate-y-1/2'
                : ''
            } rounded-[20px] shadow-[0_30px_50px_#505050] bg-cover bg-center transition-all duration-500 ease-in-out`}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className={`content absolute top-1/2 left-1/2 w-[300px] text-left text-[#eee] transform -translate-x-1/2 -translate-y-1/2 font-sans ${index === 1 ? 'block' : 'hidden'}`}>
              <div className="name text-4xl uppercase font-bold opacity-0 animate-fadeIn">
                {item.name}
              </div>
              <div className="des mt-2.5 mb-5 opacity-0 animate-fadeIn animation-delay-300">
                {item.description}
              </div>
              <button className="px-5 py-2.5 border-none cursor-pointer opacity-0 animate-fadeIn animation-delay-600 bg-white text-black hover:bg-gray-200 transition-colors duration-300">
                See More
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="button absolute bottom-5 w-full text-center">
        <button
          onClick={prevSlide}
          className="w-10 h-[35px] rounded-lg border border-black cursor-pointer mx-1.5 transition-colors duration-300 hover:bg-[#ababab] hover:text-white"
        >
          <ArrowLeft className="w-8 h-8" />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-[35px] rounded-lg border border-black cursor-pointer mx-1.5 transition-colors duration-300 hover:bg-[#ababab] hover:text-white"
        >
          <ArrowRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default HallOfFame;
