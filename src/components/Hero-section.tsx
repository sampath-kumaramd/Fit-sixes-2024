import React, { useRef, useState, useEffect } from 'react';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
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
  const [canvasHeight, setCanvasHeight] = useState('1268px');

  const [model, setModel] = useState('animations/model-1.glb');

  const handleClick = () => {
    setClicked(true);
    console.log('clicked');
    setModel('animations/model-3.glb');
  };

  const handleHover = () => {
    console.log('hovered');
    setHovered(true);
    setModel('animations/model-2.glb');
  };

  const handleLeave = () => {
    console.log('left');
    setHovered(false);
    setModel('animations/model-1.glb');
  };
  const isSmallMobile = useMediaQuery({ maxWidth: 425 });
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const [fov, setFov] = useState(45);

  useEffect(() => {
    if (isMobile) {
      setFov(70);
      setCanvasHeight('1580px');
    } else if (isTablet) {
      setFov(50);
      setCanvasHeight('1268px');
    } else if(isDesktop){
      setFov(45);
    } else if(isSmallMobile){
      setFov(60);
      setCanvasHeight('1268px');
    } else{
      setFov(45);
      setCanvasHeight('1268px');
    }
  }, [isMobile, isTablet, isDesktop, isSmallMobile]);

  const targetDate = new Date('2024-10-14T08:00:00');

  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="w-full h-screen">
      <div className="mt-0 text-center text-white opacity-90 relative">
       <div className='absolute top-0 left-1/2 -translate-x-1/2  w-full'>
      <StylizedText mainText="FIT SIXES" highlightText="2K24" onClick={handleClick} onMouseEnter={handleHover} onMouseLeave={handleLeave} />
    </div>
      </div>
      <div className=" -mt-12 ">
        <div className=" flex items-center justify-center relative ">
          <Canvas
            camera={{ position: [0, 1, 5.5], fov: fov }}
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
          <div className='absolute lg:bottom-[25rem] md:bottom-[27.5rem] sm:bottom-[27rem] sd:bottom-[27rem] bottom-[29rem] '>
        <CountDown targetDate={targetDate}/>  
          </div>
        </div>
      </div>
    
    </section>
  );
};

export default HeroSection;
