'use client';

import React, { useState, useEffect } from 'react';

import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

interface CarouselItem {
  name: string;
  image: string;
  description: string;
  logo?: string;
}

interface CustomCarouselProps {
  items: CarouselItem[];
}

const Carouselsection: React.FC<CustomCarouselProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is Tailwind's md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePrev = () =>
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  const handleNext = () =>
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));

  const getTransformValue = (adjustedPosition: number) => {
    const translateY = isMobile ? 30 : 70;
    return `translateY(${adjustedPosition * translateY}%) scale(${1 - Math.abs(adjustedPosition) * 0.15})`;
  };

  return (
    <div
      className={`relative w-full ${isMobile ? 'h-[290px]' : 'h-[450px]'} mx-auto  overflow-hidden`}
    >
      <div
        className="absolute inset-0 bg-white rounded-3xl -z-10"
        style={{ transform: 'skew(0, -5deg)' }}
      ></div>
      <button
        onClick={handleNext}
        className="absolute left-1/2 md:translate-y-8 translate-y-2 flex items-center justify-center text-white z-40"
      >
        <ChevronUp size={28} />
      </button>
      <div className="relative h-full flex flex-col items-center justify-center">
        {items.map((item, index) => {
          const position = (index - activeIndex + items.length) % items.length;
          const adjustedPosition =
            position > items.length / 2 ? position - items.length : position;
          const isActive = adjustedPosition === 0;
          const isVisible = Math.abs(adjustedPosition) <= 1;

          return (
            <div
              key={index}
              className={`absolute w-[30rem] h-[15rem] transition-all duration-500 ${
                isVisible ? '' : 'pointer-events-none'
              }`}
              style={{
                transform: getTransformValue(adjustedPosition),
                zIndex: items.length - Math.abs(adjustedPosition),
              }}
            >
              <div className="relative w-full h-full rounded-md shadow-lg border-4 border-blue-300 overflow-hidden">
                <div className="relative z-10 flex flex-col items-center justify-center bg-blue-900  h-full px-6 pt-12 pb-6 text-center">
                  hello
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-1/2 md:-translate-y-12 -translate-y-8 flex items-center justify-center text-white z-40"
      >
        <ChevronDown size={28} />
      </button>
    </div>
  );
};

export default Carouselsection;
