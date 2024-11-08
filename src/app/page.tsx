"use client";

import BallOfFame from "@/components/BallOfFame";
import HallOfFame from "@/components/HallOfFame";
import HeroSection from "@/components/Hero-section";
import Sponsorship from "@/components/Sponsorship";


export default function Home() {
  return (
    <div className="">
      <div className="  text-white items-center flex flex-col justify-center relative ">
        <HeroSection />
      </div>
      <BallOfFame />
      <HallOfFame />
      <Sponsorship />
    </div>
  );
}
