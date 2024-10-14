'use client';
import { useEffect } from 'react';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const teams = [
   {
    id: 1,
    src: '/2014(m).png',
    description:
      'Millennium IT’s men’s team showcased remarkable skill, securing the championship title in 2014.',
  },
  {
    id: 2,
    src: '/2023(m).png',
    description:
      'Team DFN Tapro A (DirectFN) demonstrated exceptional skill and teamwork, securing the men’s championship title in 2023.',
  },
  {
    id: 3,
    src: '/2023(w).png',
    description:
      'Creative Software Pvt Ltd showcased outstanding talent, earning them the 2023 women’s championship title.',
  },
  {
    id: 4,
    src: '/2022(m)1.png',
    description:
      'Creative Software Pvt Ltd displayed remarkable talent and strategy, earning them a joint championship title in the 2022 men’s tournament.',
  },
  {
    id: 5,
    src: '/2022(m)2.png',
    description:
      'In a thrilling finale, Virtusa Pvt Ltd shared the championship title with another top-performing team, showcasing their prowess and sportsmanship in the 2022 tournament.',
  },
  {
    id: 6,
    src: '/2022(w).png',
    description:
      "The women's team from FIT BATCH 18 dominated the 2022 tournament with their exceptional skills and teamwork, securing the championship title for the year.",
  },
  {
    id: 7,
    src: '/2017(m).png',
    description:
      'Virtusa once again claimed the men’s championship title in 2017, showcasing their consistency and expertise. ',
  },
  {
    id: 8,
    src: '/2017(w).png',
    description:
      'The Batch 13 women’s team excelled with exceptional talent, taking the women’s championship in 2017.',
  },
  {
    id: 9,
    src: '/2016(m).png',
    description:
      'Batch 13 secured the men’s championship title, marking their dominance in 2016.  ',
  },
  {
    id: 10,
    src: '/2015(m).png',
    description:
      'Virtusa displayed superior strategy and talent, emerging as the 2015 men’s champions.',
  },
 
];

const HallOfFame = () => {
  useEffect(() => {
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const slide = document.querySelector('.carousel-slide');

    const handleNext = () => {
      const items = document.querySelectorAll('.carousel-item');

      if (items.length > 0 && slide) {
        slide.appendChild(items[0]);
      }
    };

    const handlePrev = () => {
      const items = document.querySelectorAll('.carousel-item');

      if (items.length > 0 && slide) {
        slide.prepend(items[items.length - 1]);
      }
    };

    next?.addEventListener('click', handleNext);
    prev?.addEventListener('click', handlePrev);

    // Cleanup event listeners
    return () => {
      next?.removeEventListener('click', handleNext);
      prev?.removeEventListener('click', handlePrev);
    };
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel-slide">
        {teams.map((item, index) => (
          <div
            key={item.id}
            className="carousel-item"
            style={{ backgroundImage: `url(${item.src})` }}
          >
            <Image
              src={item.src}
              alt={`Team ${item.id}`}
              className="h-full w-full object-cover object-center"
              style={{
                borderRadius: '20px',
              }}
              width={800}
              height={800}
            />

            <div className="carousel-content">
              <div className=" text-2xl font-bold shadow-lg">{item.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="buttons">
        <button className="prev bg-darkBlue">
          <ArrowLeft className="h-8 w-8" />
        </button>
        <button className="next bg-darkBlue">
          <ArrowRight className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};

export default HallOfFame;
