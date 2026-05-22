import type { Group, GroupStanding } from "@/lib/types";
import { toSwedishTeamName } from "@/lib/team-names-sv";
import { worldCupGroupsFallback } from "@/lib/world-cup-groups.generated";

const FIFA_TEAMS_MODULE_URL =
  "https://cxm-api.fifa.com/fifaplusweb/api/sections/teamsModule/4v5Yng3VdGD9c1cpnOIff1?locale=en&offset=0&limit=48";

const GROUP_ORDER = "ABCDEFGHIJKL".split("");

type FifaTeamResponse = {
  teams?: Array<{
    teamName: string;
    stage: string;
    worldRanking?: number;
  }>;
  teamsTotal?: number;
  tournamentState?: string;
};

function emptyStanding(team: string): GroupStanding {
  return {
    team,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
  };
}

function parseGroupLetter(stage: string): string {
  const match = stage.match(/Group\s+([A-L])/i);
  return match?.[1]?.toUpperCase() ?? "Z";
}

function buildGroupsFromTeams(
  teams: NonNullable<FifaTeamResponse["teams"]>,
): Group[] {
  const byLetter = new Map<string, GroupStanding[]>();

  for (const team of teams) {
    const letter = parseGroupLetter(team.stage);
    const list = byLetter.get(letter) ?? [];
    list.push(emptyStanding(toSwedishTeamName(team.teamName)));
    byLetter.set(letter, list);
  }

  return GROUP_ORDER.filter((letter) => byLetter.has(letter)).map((letter) => {
    const standings = (byLetter.get(letter) ?? []).sort((a, b) =>
      a.team.localeCompare(b.team, "sv"),
    );
    return {
      name: `Grupp ${letter}`,
      letter,
      standings,
    };
  });
}

export async function fetchWorldCupGroups(): Promise<{
  groups: Group[];
  source: "fifa" | "fallback";
  tournamentState?: string;
}> {
  try {
    const res = await fetch(FIFA_TEAMS_MODULE_URL, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      throw new Error(`FIFA API ${res.status}`);
    }

    const data = (await res.json()) as FifaTeamResponse;
    const teams = data.teams ?? [];

    if (teams.length < 48) {
      throw new Error(`Expected 48 teams, got ${teams.length}`);
    }

    return {
      groups: buildGroupsFromTeams(teams),
      source: "fifa",
      tournamentState: data.tournamentState,
    };
  } catch {
    return {
      groups: worldCupGroupsFallback,
      source: "fallback",
    };
  }
}
