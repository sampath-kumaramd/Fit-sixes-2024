import React, { useRef, useState, useEffect } from 'react';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import Image from 'next/image';
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
    
    // Center the model
    if (gltf.scene) {
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());
      gltf.scene.position.sub(center);
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

  const targetDate = new Date('2024-11-09T08:00:00');

  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="w-full h-fit relative bg-darkBlue">
      <div className="mt-0 text-center text-white opacity-90 relative  ">
       <div className='absolute top-1 left-1/2 -translate-x-1/2  w-full z-10'>
      <StylizedText mainText="FIT SIXES" highlightText="2K24" onClick={handleClick} onMouseEnter={handleHover} onMouseLeave={handleLeave} />
    </div>
      </div>
      <div className=" -mt-8 z-50  relative ">
        <div className=" flex items-center justify-center relative  ">
          <Canvas
            camera={{ position: [0, 0, 5.5], fov: 30 }}
            style={{
              display: 'block',
              width: '800px',
              height: '868px',
            }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[1, 5, 10]} intensity={600} />
            <pointLight position={[-2, 7, -10]} intensity={100} />
            <Model url={model} play={true} />
          </Canvas>
          <div className='absolute bottom-[1rem] '>
        <CountDown targetDate={targetDate}/>  
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 left-0 w-full h-full '>
    <Image src="/pattern-transparent.png" alt="hero-section" width={1920} height={1080} className='w-full h-full object-cover opacity-[1%] ' />
      </div>
    </section>
  );
};

export default HeroSection;
