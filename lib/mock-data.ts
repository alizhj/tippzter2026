import type { Group, LeaderboardEntry, Match } from "@/lib/types";

export type { Group, GroupStanding, LeaderboardEntry, Match } from "@/lib/types";

export const upcomingMatches: Match[] = [
  {
    id: "m1",
    home: "Mexiko",
    away: "Sydafrika",
    kickoff: "11 jun 21:00",
    group: "A",
  },
  {
    id: "m2",
    home: "Sydkorea",
    away: "Tjeckien",
    kickoff: "12 jun 03:00",
    group: "A",
  },
  {
    id: "m3",
    home: "Kanada",
    away: "Qatar",
    kickoff: "12 jun 21:00",
    group: "B",
  },
  {
    id: "m4",
    home: "Brasilien",
    away: "Marocko",
    kickoff: "13 jun 21:00",
    group: "C",
  },
];

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
