import React, { useRef, useState } from 'react';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import CountDown from './count-down';
import StylizedText from './StylizedText';
import { Button } from './ui';
import ShinyButton from './ui/ShinyButton';

const Model = ({ url, play }: { url: string; play: boolean }) => {
  const gltf = useLoader(GLTFLoader, url);
  const modelRef = useRef<THREE.Group>();
  const mixer = useRef<THREE.AnimationMixer>();

  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  React.useEffect(() => {
    if (gltf.animations.length) {
      mixer.current = new THREE.AnimationMixer(gltf.scene);
      const action = mixer.current.clipAction(gltf.animations[0]);
      if (play) {
        action.play();
      }
    }
  }, [gltf, play]);

  return <primitive object={gltf.scene} ref={modelRef} />;
};

const HeroSection: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const [model, setModel] = useState('animations/7.glb');

  const handleClick = () => {
    setClicked(true);
    setModel('animations/animation-3.glb');
  };

  const handleHover = () => {
    setHovered(true);
    setModel('animations/animation-2.glb');
  };

  const handleLeave = () => {
    setHovered(false);
    setModel('animations/7.glb');
  };
    
  const targetDate = new Date('2024-10-14T08:00:00');

  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="container mx-auto h-screen">
      <div className="mt-0 text-center text-white opacity-90 relative">
       <div className='absolute top-0 left-1/2 -translate-x-1/2  w-full'>
      <StylizedText mainText="FIT SIXES" highlightText="2K24" />
    </div>
      </div>
      <div className=" -mt-12 ">
        <div className=" flex items-center justify-center relative">
          <Canvas
            camera={{ position: [0, 1,5.5], fov: 45 }}
            style={{
              display: 'block',
              width: '800px',
              height: '1268px',
            }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[1, 5, 10]} intensity={600} />
            <pointLight position={[-2, 7, -10]} intensity={100} />

            <Model url={model} play={true} />
          </Canvas>
          <div className='absolute bottom-[26.5rem]'>
        <CountDown targetDate={targetDate}/>  
          </div>
        </div>
      </div>
       <div className="absolute bottom-[18.5rem] right-20 w-full z-50">
        <div className='absolute bottom-1/2 -right-10 translate-y-1/2' >
        <Button 
          className={`w-40 px-10 h-40 bg-yellow text-white text-xl group relative mt-20 overflow-hidden rounded-full ${!isHovering ? 'animate-bounce' : ''}`}
          onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={handleClick}
        >
         REGISTER <br/> NOW
          <div className="absolute inset-0 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent group-hover:animate-shimmer"></div>
        </Button>
          {/* <ShinyButton className='text-xl bg-yellow text-white w-40 h-40 rounded-full border-2 border-black '
          >REGISTER NOW</ShinyButton> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
