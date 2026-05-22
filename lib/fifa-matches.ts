import type { Match } from "@/lib/types";
import { resolveFlagUrl } from "@/lib/flag-url";
import { toSwedishTeamName } from "@/lib/team-names-sv";
import { worldCupMatchesFallback } from "@/lib/world-cup-matches.generated";

const FIFA_CALENDAR_URL =
  "https://api.fifa.com/api/v3/calendar/matches?IdCompetition=17&IdSeason=285023&count=500";

const GROUP_ORDER = "ABCDEFGHIJKL".split("");

type FifaLocalized = { Locale?: string; Description?: string };

type FifaCalendarTeam = {
  TeamName?: FifaLocalized[];
  PictureUrl?: string;
};

type FifaCalendarMatch = {
  IdMatch: string;
  Date: string;
  LocalDate?: string;
  GroupName?: FifaLocalized[];
  StageName?: FifaLocalized[];
  Home?: FifaCalendarTeam | null;
  Away?: FifaCalendarTeam | null;
  HomeTeamScore?: number | null;
  AwayTeamScore?: number | null;
  Stadium?: { Name?: FifaLocalized[] };
  MatchNumber?: number;
  MatchStatus?: number;
};

type FifaCalendarResponse = {
  Results?: FifaCalendarMatch[];
};

function teamName(team: FifaCalendarTeam | null | undefined): string {
  return team?.TeamName?.[0]?.Description ?? "";
}

function formatKickoff(localDate: string | undefined, utcDate: string): string {
  const date = new Date(localDate ?? utcDate);
  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Stockholm",
  }).format(date);
}

function parseGroupLetter(groupName: FifaLocalized[] | undefined): string | undefined {
  const desc = groupName?.[0]?.Description ?? "";
  const match = desc.match(/Group\s+([A-L])/i);
  return match?.[1]?.toUpperCase();
}

export function parseFifaCalendarMatch(raw: FifaCalendarMatch): Match | null {
  const homeEn = teamName(raw.Home);
  const awayEn = teamName(raw.Away);
  if (!homeEn || !awayEn) return null;

  const kickoffIso = raw.LocalDate ?? raw.Date;

  return {
    id: raw.IdMatch,
    home: toSwedishTeamName(homeEn),
    away: toSwedishTeamName(awayEn),
    homeFlag: resolveFlagUrl(raw.Home?.PictureUrl),
    awayFlag: resolveFlagUrl(raw.Away?.PictureUrl),
    kickoff: formatKickoff(raw.LocalDate, raw.Date),
    kickoffIso,
    group: parseGroupLetter(raw.GroupName),
    stage: raw.StageName?.[0]?.Description,
    stadium: raw.Stadium?.Name?.[0]?.Description,
    matchNumber: raw.MatchNumber,
    homeScore: raw.HomeTeamScore ?? undefined,
    awayScore: raw.AwayTeamScore ?? undefined,
  };
}

export function sortMatches(matches: Match[]): Match[] {
  return [...matches].sort(
    (a, b) =>
      a.kickoffIso.localeCompare(b.kickoffIso) ||
      (a.matchNumber ?? 0) - (b.matchNumber ?? 0),
  );
}

export function groupMatchesByLetter(
  matches: Match[],
): Record<string, Match[]> {
  const grouped: Record<string, Match[]> = {};
  for (const match of matches) {
    if (!match.group) continue;
    grouped[match.group] ??= [];
    grouped[match.group].push(match);
  }
  for (const letter of Object.keys(grouped)) {
    grouped[letter] = sortMatches(grouped[letter]);
  }
  return grouped;
}

export async function fetchWorldCupMatches(): Promise<{
  matches: Match[];
  source: "fifa" | "fallback";
}> {
  try {
    const res = await fetch(FIFA_CALENDAR_URL, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      throw new Error(`FIFA calendar API ${res.status}`);
    }

    const data = (await res.json()) as FifaCalendarResponse;
    const matches = sortMatches(
      (data.Results ?? [])
        .map(parseFifaCalendarMatch)
        .filter((m): m is Match => m !== null && !!m.group),
    );

    if (matches.length === 0) {
      throw new Error("No group stage matches returned");
    }

    return { matches, source: "fifa" };
  } catch {
    return { matches: worldCupMatchesFallback, source: "fallback" };
  }
}

export { GROUP_ORDER };
