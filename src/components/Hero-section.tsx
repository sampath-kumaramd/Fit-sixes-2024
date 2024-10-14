import React, { useRef, useState, useEffect } from 'react';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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

  const router = useRouter();

  const [model, setModel] = useState<string | null>(null);
  const [models, setModels] = useState<Record<string, string>>({});
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [initialModelLoaded, setInitialModelLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const modelUrls = {
        default: '/animations/prod-1.glb',
        hovered: '/animations/prod-2.glb',
        clicked: '/animations/prod-3.glb',
      };

      console.log('Loading initial model:', modelUrls.default);
      setModels({ default: modelUrls.default });
      
      // Load initial model
      await new Promise(resolve => {
        new GLTFLoader().load(modelUrls.default, resolve);
      });

      console.log('Initial model loaded');
      setInitialModelLoaded(true);
      setModel(modelUrls.default);

      // Load additional models
      setTimeout(async () => {
        console.log('Loading additional models');
        await Promise.all(Object.entries(modelUrls).slice(1).map(([key, url]) => 
          new Promise(resolve => {
            new GLTFLoader().load(url, () => {
              setModels(prev => ({ ...prev, [key]: url }));
              resolve(null);
            });
          })
        ));

        console.log('All models loaded');
        setModelsLoaded(true);
      }, 1000); // Delay loading additional models by 1 second
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (clicked) {
      setModel(models.clicked);
      // Add a delay before navigation
      const timer = setTimeout(() => {
        router.push('/register');
      }, 1200); // 500ms delay, adjust as needed
      
      // Clean up the timer if the component unmounts
      console.log(model);
      return () => clearTimeout(timer);
    } else if (hovered) {
      setModel(models.hovered);
      console.log(model);
    } else {
      setModel(models.default);
      console.log(model);
    }
  }, [clicked, hovered, models, model, router]);

  const handleClick = () => {
    setClicked(true);
  };

  const handleHover = () => {
    setHovered(true);
  };

  const handleLeave = () => {
    setHovered(false);
    setClicked(false); // Reset clicked state when leaving
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
    <section className="w-full h-fit relative bg-darkBlue ">
      <div className="mt-0 text-center text-white opacity-90 relative  ">
       <div className='absolute top-1 left-1/2 -translate-x-1/2  w-full z-10'>
      <StylizedText mainText="FIT SIXES" highlightText="2K24"  />
    </div>
      </div>
      <div className=" -mt-8 z-50  relative ">
        {initialModelLoaded ? (
        <div className=" flex items-center justify-center relative   ">
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
            {initialModelLoaded && model && <Model url={model} play={true} />}
          </Canvas>
          <div className='absolute bottom-[1rem] '>
        <CountDown targetDate={targetDate}/>  
          </div>
          </div>):(
        <div className='w-full h-full flex items-center justify-center'>
          <div className='w-10 h-10 border-t-2 border-b-2 border-white animate-spin'></div>
        </div>
      )}
      </div>
      <div className='absolute bottom-0 left-0 w-full h-full '>
    <Image src="/pattern-transparent.png" alt="hero-section" width={1920} height={1080} className='w-full h-full object-cover opacity-[1%] ' />
      </div>
        <div className=' fixed  bottom-4 right-4 z-[999]   w-40 h-40 rounded-full '>
        <Button
          className='text-sm sm:text-xl bg-yellow text-white w-28 h-28 rounded-full'
          onClick={handleClick}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <div className=''>
            Register
            <div className='text-2xl -mt-1'>Now</div>
          </div>
        </Button>
      </div>

      
    </section>
  );
};

export default dynamic(() => Promise.resolve(HeroSection), { ssr: false });
