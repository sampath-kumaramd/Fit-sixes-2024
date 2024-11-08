import Image from 'next/image';
import LiveScores from './LiveScores';
import { ScrollArea } from './ui';
import StylizedText from './StylizedText';

const HeroSection: React.FC = () => {
  // Get video ID from environment variable
  const videoId = process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID;

  return (
    <section className="relative min-h-screen w-full bg-darkBlue">
      {/* Main content container */}
      <div className="container relative z-10 mx-auto min-h-screen py-8">
        {/* Title */}
        <div className="mb-12 text-center">
          <StylizedText
            mainText="FIT SIXES"
            highlightText="2K24"
            // className="text-5xl md:text-7xl font-bold"
          />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-8 px-4 lg:grid-cols-5">
          {/* YouTube stream - spans 3 columns on large screens */}
          <div className="rounded-xl bg-black/20 p-4 lg:col-span-3">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full rounded-lg"
                src={`${videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Live scores - spans 2 columns on large screens */}
          <div className="lg:col-span-2">
            <ScrollArea className="h-[600px] w-full rounded-xl bg-black/20 p-6">
              <LiveScores />
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/pattern-transparent.png"
          alt="background pattern"
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-[0.02]"
        />
      </div>
    </section>
  );
};

export default HeroSection;
