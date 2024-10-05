import HallOfFame from '@/components/HallOfFame';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Button>Click me</Button>
      <HallOfFame />
    </div>
  );
}
