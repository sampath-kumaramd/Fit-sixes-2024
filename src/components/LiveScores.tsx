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

  const ongoingMatches = matches.filter(
    (match) => match.status === 'in_progress'
  );
  const upcomingMatches = matches.filter((match) => match.status === 'pending');
  const completedMatches = matches.filter(
    (match) => match.status === 'completed'
  );

  return (
    <Tabs defaultValue="ongoing" className="flex h-full flex-col">
      <TabsList className="flex-none">
        <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>

      <div className="flex-1 overflow-y-auto">
        <TabsContent value="ongoing" className="mt-0 h-full">
          <div className="space-y-4">
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
          <div className="space-y-4">
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
          <div className="space-y-4">
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
  );
};

export default LiveScores;
