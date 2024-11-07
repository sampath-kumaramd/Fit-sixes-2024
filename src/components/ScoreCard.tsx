import { MatchData } from '@/types/match.type';

interface ScoreCardProps {
  match: MatchData;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ match }) => {
  const getScore = (
    innings: MatchData['innings']['first'] | MatchData['innings']['second']
  ) => {
    return `${innings.score}/${innings.wickets} (${innings.overs})`;
  };

  return (
    <div className="rounded-lg bg-white/10 p-4">
      <div className="mb-2 text-sm text-gray-300">
        <span>Match {match.matchNumber}</span>
        <span className="mx-2">•</span>
        <span>
          Ground{' '}
          {match.ground === '1'
            ? 'A'
            : match.ground === '2'
              ? 'B'
              : match.ground === '3'
                ? 'C'
                : match.ground === '4'
                  ? 'D'
                  : match.ground === '5'
                    ? 'E'
                    : match.ground}
        </span>
        <span className="mx-2">•</span>
        <span>{match.round[0].toUpperCase() + match.round.slice(1)} Round</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-white">{match.teams.team1.name}</span>
          <span className="font-semibold text-white">
            {match.innings.first.battingTeam === match.teams.team1.id
              ? getScore(match.innings.first)
              : match.innings.second.battingTeam === match.teams.team1.id
                ? getScore(match.innings.second)
                : '-'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white">{match.teams.team2.name}</span>
          <span className="font-semibold text-white">
            {match.innings.first.battingTeam === match.teams.team2.id
              ? getScore(match.innings.first)
              : match.innings.second.battingTeam === match.teams.team2.id
                ? getScore(match.innings.second)
                : '-'}
          </span>
        </div>
      </div>

      {match.status === 'completed' && match.winner && (
        <div className="text-yellow-400 mt-2 text-sm">
          {
            match.teams[
              match.winner.id === match.teams.team1.id ? 'team1' : 'team2'
            ].name
          }{' '}
          {match.winner.winnerText}
        </div>
      )}

      {match.status === 'in_progress' && match.currentInning === 'second' && (
        <div className="text-yellow-400 mt-2 text-sm">
          {
            match.teams[
              match.innings.second.battingTeam === match.teams.team1.id
                ? 'team1'
                : 'team2'
            ].name
          }{' '}
          need{' '}
          {match.innings.first.score + 1 - (match.innings.second.score || 0)}{' '}
          runs to win
        </div>
      )}
    </div>
  );
};

export default ScoreCard;
