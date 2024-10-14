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
      <Card className="bg-navy-900 overflow-hidden text-white">
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
          <div className="bg-[#03082a] p-4 text-center text-white">
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
    imageUrl: '/past-matches/2023.jpg',
    url: 'https://www.facebook.com/media/set/?set=a.816354847167060&type=3',
  },
  {
    year: '2K22',
    imageUrl: '/past-matches/2022.jpeg',
    url: 'https://www.facebook.com/media/set/?set=a.531992388936642&type=3',
  },
  {
    year: '2K19',
    imageUrl: '/past-matches/2019.png',
    url: 'https://www.facebook.com/media/set/?set=a.812927909140724&type=3',
  },
  {
    year: '2K18',
    imageUrl: '/past-matches/2018.png',
    url: 'https://www.facebook.com/media/set/?set=a.514149139018604&type=3',
  },
  {
    year: '2K17',
    imageUrl: '/past-matches/2017.jpg',
    url: 'https://www.facebook.com/media/set/?set=a.373342933099226&type=3',
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
