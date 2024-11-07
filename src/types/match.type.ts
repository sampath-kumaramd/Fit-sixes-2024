export interface Team {
  id: string;
  name: string;
}

export interface Innings {
  score: number;
  overs: string;
  wickets: number;
  battingTeam: string;
  battingTeamName: string;
}

export interface Winner extends Team {
  winnerText: string;
}

export interface MatchData {
  gender: 'male' | 'female';
  round: 'preliminary' | 'super16' | 'quarter' | 'semi' | 'final';
  matchNumber: number;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: any; // Firebase Timestamp
  ground: string;
  teams: {
    team1: Team;
    team2: Team;
  };
  winner?: Winner;
  innings: {
    first: Innings;
    second: Innings;
  };
  currentInning: 'first' | 'second';
  battingTeam?: string; // ID of the team currently batting
}

export interface LiveScoresProps {
  matches: MatchData[];
}

export const MATCH_CONFIG = {
  MAX_WICKETS: 6,
  BALLS_PER_OVER: 4,
  MAX_OVERS: 4,
} as const;
