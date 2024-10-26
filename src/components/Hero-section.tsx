import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import CountDown from './count-down';
import { SplashScreen } from './loading-screen';
import StylizedText from './StylizedText';
import { Button } from './ui';

const Model = React.memo(({ url, play }: { url: string; play: boolean }) => {
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
});

Model.displayName = 'Model';

const HeroSection: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const router = useRouter();

  const [model, setModel] = useState<string | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [initialModelLoaded, setInitialModelLoaded] = useState(false);

  const [y, setY] = useState(1);
  const [velocity, setVelocity] = useState(0);
  const gravity = 0.5;
  const bounce = 0.8;

  // Use useMemo for models object
  const models = useMemo(
    () => ({
      default: '/animations/prod-1.glb',
      hovered: '/animations/prod-2.glb',
      clicked: '/animations/prod-3.glb',
    }),
    []
  );

  // Use useCallback for event handlers
  const handleClick = useCallback(() => {
    setClicked(true);
  }, []);
  const handleHover = useCallback(() => setHovered(true), []);
  const handleLeave = useCallback(() => {
    setHovered(false);
    setClicked(false);
  }, []);

  // Optimize model loading
  useEffect(() => {
    const loadModels = async () => {
      console.log('Loading initial model:', models.default);
      setModel(models.default);

      const loader = new GLTFLoader();
      await new Promise((resolve) => loader.load(models.default, resolve));

      console.log('Initial model loaded');
      setInitialModelLoaded(true);

      // Load additional models
      setTimeout(async () => {
        console.log('Loading additional models');
        await Promise.all(
          Object.values(models)
            .slice(1)
            .map((url) => new Promise((resolve) => loader.load(url, resolve)))
        );

        console.log('All models loaded');
        setModelsLoaded(true);
      }, 1000);
    };

    loadModels();
  }, [models]);

  // Optimize model switching
  useEffect(() => {
    if (!modelsLoaded) return;

    if (clicked) {
      setModel(models.clicked);
      const timer = setTimeout(() => router.push('/auth/sign-up'), 1200);
      return () => clearTimeout(timer);
    } else if (hovered) {
      setModel(models.hovered);
    } else {
      setModel(models.default);
    }
  }, [clicked, hovered, models, modelsLoaded, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setY((prevY) => {
        let newY = prevY + velocity;
        let newVelocity = velocity + gravity;

        if (newY > 150) {
          // Assuming floor is at 450px (500px - 50px ball height - 20px floor height)
          newY = 150;
          newVelocity = -newVelocity * bounce;
        }

        setVelocity(newVelocity);
        return newY;
      });
    }, 16); // ~60 fps

    return () => clearInterval(interval);
  }, [velocity]);

  const targetDate = new Date('2024-11-09T08:00:00');

  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="relative h-fit w-full bg-darkBlue">
      <div className="relative mt-0 text-center text-white opacity-90">
        <div className="absolute left-1/2 top-1 z-10 w-full -translate-x-1/2">
          <StylizedText mainText="FIT SIXES" highlightText="2K24" />
        </div>
      </div>
      <div className="relative z-50 -mt-8">
        {initialModelLoaded ? (
          <div className="relative flex items-center justify-center">
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
              {model && <Model url={model} play={true} />}
            </Canvas>
            <div className="absolute bottom-[1rem]">
              <CountDown targetDate={targetDate} />
            </div>
          </div>
        ) : (
          <SplashScreen />
        )}
      </div>
      <div className="absolute bottom-0 left-0 h-full w-full">
        <Image
          src="/pattern-transparent.png"
          alt="hero-section"
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-[1%]"
        />
      </div>
      {/* <div className="fixed bottom-20 right-4 z-[999] h-40 w-40 rounded-full">
        <div className="absolute" style={{ top: `${y}px` }}>
          <Button
            className="h-28 w-28 rounded-full bg-yellow text-sm text-white hover:bg-[#e2981b] sm:text-xl"
            onClick={handleClick}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            <Image
              src="/ball.png"
              layout="fill"
              objectFit="contain"
              alt="Wickets Background"
            />
          </Button>
        </div>
      </div> */}
    </section>
  );
};

export default dynamic(() => Promise.resolve(HeroSection), { ssr: false });
