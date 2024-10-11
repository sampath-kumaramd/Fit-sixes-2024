import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';

interface FitSixesItem {
  year: string;
  imageUrl: string;
  url: string;
}

interface FitSixesCardProps {
  item: FitSixesItem;
}

const FitSixesCard = ({ item }: FitSixesCardProps) => {
  return (
    <Link
      href={item.url}
      className="block transition-transform hover:scale-105"
    >
      <Card className="overflow-hidden bg-navy-900 text-white">
        <CardContent className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={item.imageUrl}
              alt={`FIT SIXES ${item.year}`}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-4 text-center bg-[#03082a] text-white">
            <h3 className="text-lg font-bold">FIT SIXES {item.year}</h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

// Example usage
const data: FitSixesItem[] = [
  {
    year: '2K23',
    imageUrl: '/past-matches/2016.jpg',
    url: '/fit-sixes/2k23',
  },
  {
    year: '2K22',
    imageUrl: '/past-matches/2016.jpg',
    url: '/fit-sixes/2k22',
  },
  {
    year: '2K21',
    imageUrl: '/past-matches/2016.jpg',
    url: '/fit-sixes/2k22',
  },
  {
    year: '2K20',
    imageUrl: '/past-matches/2016.jpg',
    url: '/fit-sixes/2k22',
  },
  {
    year: '2K19',
    imageUrl: '/past-matches/2016.jpg',
    url: '/fit-sixes/2k22',
  },
];

const PastMatches = () => {
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {data.map((item) => (
        <FitSixesCard key={item.year} item={item} />
      ))}
    </div>
  );
};

export default PastMatches;
