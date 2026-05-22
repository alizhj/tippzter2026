export type GroupStanding = {
  team: string;
  flag?: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
};

export type Group = {
  name: string;
  letter: string;
  standings: GroupStanding[];
};

export type Match = {
  id: string;
  home: string;
  away: string;
  homeFlag?: string;
  awayFlag?: string;
  kickoff: string;
  kickoffIso: string;
  group?: string;
  stage?: string;
  stadium?: string;
  matchNumber?: number;
  homeScore?: number;
  awayScore?: number;
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  points: number;
  exactScores: number;
  correctResults: number;
};
