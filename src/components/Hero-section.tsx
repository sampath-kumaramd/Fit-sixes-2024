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
    
  const targetDate = new Date('2024-10-14T08:00:00');

  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="container mx-auto h-screen">
      <div className="mt-0 text-center text-white opacity-90 relative">
       <div className='absolute top-0 left-1/2 -translate-x-1/2  w-full'>
      <StylizedText mainText="FIT SIXES" highlightText="2K24" onClick={handleClick} onMouseEnter={handleHover} onMouseLeave={handleLeave} />
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
          <div className='absolute bottom-[26rem]'>
        <CountDown targetDate={targetDate}/>  
          </div>
        </div>
      </div>
    
    </section>
  );
};

export default HeroSection;
