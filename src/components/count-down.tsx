'use client'
import { useEffect, useState } from 'react';

import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

export default function CountDown({targetDate}:{targetDate: Date}) {

     const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

    
    return (
        <div className='text-center'>
        {isClient ? (
      <FlipClockCountdown
        to={targetDate}
        labels={['Days', 'Hours', 'Minutes', 'Seconds']}
        labelStyle={{ fontSize: 20, fontWeight: 600,}}
        digitBlockStyle={{ width: 70, height: 100, fontSize: 40 , color: '#e3991c', backgroundColor: '#161b42' ,
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
