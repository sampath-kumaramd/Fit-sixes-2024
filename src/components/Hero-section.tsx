import React, { useRef, useState } from 'react';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { Button } from './ui';

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
    setModel('animations/animation-1.glb');
  };
    
  const targetDate = new Date('2024-10-14T08:00:00');

  return (
    <section className="container mx-auto h-screen">
      <div className="mt-8 text-center text-8xl text-white opacity-90">
        FIT SIXES <span className="text-yellow">2024</span>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-7 flex flex-col">
          <p className="mt-20 text-2xl text-center">
            Welcome to the 2024 Fit Sixes, where we&apos;re all about fitness,
            fun, and community. Fit Sixes is a fitness competition that combines
            the best of both worlds: fitness and fun. We&apos;re all about
            fitness, fun, and community. Fit Sixes is a fitness competition that
            combines the best of both worlds: fitness and fun.
                  </p>
                  <div className=' mt-10'>
                    </div>
                  
          <div className="flex justify-start">
            <Button
              className="group relative mt-20 w-fit overflow-hidden rounded-full bg-yellow px-10 py-6 text-xl text-white"
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
              onClick={handleClick}
            >
              <span className="relative z-10">REGISTER NOW</span>
              <div className="absolute inset-0 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent group-hover:animate-shimmer"></div>
            </Button>
          </div>
        
        </div>
        <div className="col-span-5 flex items-center justify-center">
          <Canvas
            camera={{ position: [2, 1, 5], fov: 50 }}
            style={{
              display: 'block',
              width: '600px',
              height: '968px',
            }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[1, 5, 10]} intensity={550} />
            <pointLight position={[-2, 7, -10]} intensity={70} />

            <Model url={model} play={true} />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
