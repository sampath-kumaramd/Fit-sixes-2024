"use client";

import BallOfFame from "@/components/BallOfFame";
import HallOfFame from "@/components/HallOfFame";
import HeroSection from "@/components/Hero-section";


export default function Home() {
  return (
    <div className="">
      <div className="  text-white items-center flex flex-col justify-center relative">
        <HeroSection />
      </div>
      <BallOfFame />
      <HallOfFame />
      {/* <Sponsorship /> */}
    </div>
  );
}
