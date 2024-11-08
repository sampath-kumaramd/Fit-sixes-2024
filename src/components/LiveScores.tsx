import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import ScoreCard from './ScoreCard';
import { useMatches } from '@/hooks/useMatches';
import { Loader2 } from 'lucide-react';

const LiveScores: React.FC = () => {
  const { matches, loading, error } = useMatches();

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading matches: {error.message}
      </div>
    );
  }

  // Sort matches by match number
  const sortedMatches = [...matches].sort(
    (a, b) => a.matchNumber - b.matchNumber
  );

  const ongoingMatches = sortedMatches.filter(
    (match) => match.status === 'in_progress'
  );
  const upcomingMatches = sortedMatches.filter(
    (match) => match.status === 'pending'
  );
  const completedMatches = sortedMatches.filter(
    (match) => match.status === 'completed'
  );

  // Determine default tab based on available matches
  const defaultTab =
    ongoingMatches.length > 0
      ? 'ongoing'
      : upcomingMatches.length > 0
        ? 'upcoming'
        : 'completed';

  return (
    <div className="flex h-full flex-col">
      <Tabs defaultValue={defaultTab} className="h-full">
        <div className="sticky top-0 z-10 bg-black/20">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="completed" className="order-1">
              Completed
            </TabsTrigger>
            <TabsTrigger value="ongoing" className="order-2">
              Ongoing
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="order-3">
              Upcoming
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="ongoing" className="mt-0 h-full">
            <div className="space-y-4 p-4">
              {ongoingMatches.map((match, index) => (
                <ScoreCard key={index} match={match} />
              ))}
              {ongoingMatches.length === 0 && (
                <div className="py-4 text-center text-gray-400">
                  No ongoing matches
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-0 h-full">
            <div className="space-y-4 p-4">
              {upcomingMatches.map((match, index) => (
                <ScoreCard key={index} match={match} />
              ))}
              {upcomingMatches.length === 0 && (
                <div className="py-4 text-center text-gray-400">
                  No upcoming matches
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-0 h-full">
            <div className="space-y-4 p-4">
              {completedMatches.map((match, index) => (
                <ScoreCard key={index} match={match} />
              ))}
              {completedMatches.length === 0 && (
                <div className="py-4 text-center text-gray-400">
                  No completed matches
                </div>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default LiveScores;
