import type { LeaderboardEntry } from "@/lib/types";

export type { Group, GroupStanding, LeaderboardEntry, Match } from "@/lib/types";

export const leaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Lisa",
    points: 42,
    exactScores: 8,
    correctResults: 14,
  },
  {
    rank: 2,
    name: "Erik",
    points: 38,
    exactScores: 6,
    correctResults: 15,
  },
  {
    rank: 3,
    name: "Anna",
    points: 35,
    exactScores: 5,
    correctResults: 13,
  },
  {
    rank: 4,
    name: "Johan",
    points: 31,
    exactScores: 4,
    correctResults: 12,
  },
  {
    rank: 5,
    name: "Maria",
    points: 28,
    exactScores: 3,
    correctResults: 11,
  },
  {
    rank: 6,
    name: "Oscar",
    points: 24,
    exactScores: 2,
    correctResults: 10,
  },
];
