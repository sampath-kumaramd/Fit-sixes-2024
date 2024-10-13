'use client'
import { useEffect, useState } from 'react';

import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import { useMediaQuery } from 'react-responsive';

export default function CountDown({targetDate}:{targetDate: Date}) {

     const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
   const isMobile = useMediaQuery({ maxWidth: 639 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

 const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [fontSize, setFontSize] = useState(0)
  const [labelFontSize, setLabelFontSize] = useState(0)

  useEffect(() => {
    if(isMobile) {
      setWidth(30)
      setHeight(70)
      setFontSize(20)
      setLabelFontSize(10)
    }
    else if(isTablet){
      setWidth(50)
      setHeight(80)
      setFontSize(30)
      setLabelFontSize(15)
    }
    else{
      setWidth(70)
      setHeight(100)
      setFontSize(40)
      setLabelFontSize(20)
    }
  }, [isMobile, isTablet, isDesktop]);

    
    return (
        <div className='text-center'>
        {isClient ? (
      <FlipClockCountdown
        to={targetDate}
        labels={['Days', 'Hours', 'Minutes', 'Seconds']}
        labelStyle={{ fontSize: labelFontSize, fontWeight: 600,}}
        digitBlockStyle={{ width: width, height: height, fontSize: fontSize , color: '#e3991c', backgroundColor: '#161b42' ,
        borderRadius: 10}}
        dividerStyle={{ height: 1 }}
        duration={0.8}          
      >
        Finished
                </FlipClockCountdown>
            ) : (
                <div>Loading...</div>
            )}
        </div>
  );
}
