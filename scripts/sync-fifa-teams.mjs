import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const FIFA_TEAMS_URL =
  "https://cxm-api.fifa.com/fifaplusweb/api/sections/teamsModule/4v5Yng3VdGD9c1cpnOIff1?locale=en&offset=0&limit=48";

const FIFA_MATCHES_URL =
  "https://api.fifa.com/api/v3/calendar/matches?IdCompetition=17&IdSeason=285023&count=500";

const TEAM_NAMES_SV = {
  Algeria: "Algeriet",
  Argentina: "Argentina",
  Australia: "Australien",
  Austria: "Österrike",
  Belgium: "Belgien",
  "Bosnia and Herzegovina": "Bosnien och Hercegovina",
  Brazil: "Brasilien",
  "Cabo Verde": "Kap Verde",
  Canada: "Kanada",
  Colombia: "Colombia",
  "Congo DR": "DR Kongo",
  Croatia: "Kroatien",
  "Côte d'Ivoire": "Elfenbenskusten",
  Curaçao: "Curaçao",
  Czechia: "Tjeckien",
  Ecuador: "Ecuador",
  Egypt: "Egypten",
  England: "England",
  France: "Frankrike",
  Germany: "Tyskland",
  Ghana: "Ghana",
  Haiti: "Haiti",
  "IR Iran": "Iran",
  Iraq: "Irak",
  Japan: "Japan",
  Jordan: "Jordanien",
  "Korea Republic": "Sydkorea",
  Mexico: "Mexiko",
  Morocco: "Marocko",
  Netherlands: "Nederländerna",
  "New Zealand": "Nya Zeeland",
  Norway: "Norge",
  Panama: "Panama",
  Paraguay: "Paraguay",
  Portugal: "Portugal",
  Qatar: "Qatar",
  "Saudi Arabia": "Saudiarabien",
  Scotland: "Skottland",
  Senegal: "Senegal",
  "South Africa": "Sydafrika",
  Spain: "Spanien",
  Sweden: "Sverige",
  Switzerland: "Schweiz",
  Tunisia: "Tunisien",
  Türkiye: "Turkiet",
  USA: "USA",
  Uruguay: "Uruguay",
  Uzbekistan: "Uzbekistan",
};

const GROUP_ORDER = "ABCDEFGHIJKL".split("");

function toSv(name) {
  return TEAM_NAMES_SV[name] ?? name;
}

function emptyStanding(team, flag) {
  return {
    team,
    ...(flag ? { flag } : {}),
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
  };
}

function resolveFlagUrl(template) {
  if (!template) return undefined;
  return template.replace("{format}-{size}", "sq-4");
}

function formatKickoff(localDate, utcDate) {
  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Stockholm",
  }).format(new Date(localDate ?? utcDate));
}

const teamsRes = await fetch(FIFA_TEAMS_URL);
if (!teamsRes.ok) throw new Error(`FIFA teams API ${teamsRes.status}`);
const teamsData = await teamsRes.json();

writeFileSync(
  join(root, "data/fifa-teams.json"),
  JSON.stringify(teamsData, null, 2),
);

const byLetter = {};
for (const team of teamsData.teams ?? []) {
  const match = team.stage.match(/Group\s+([A-L])/i);
  const letter = match[1].toUpperCase();
  const name = toSv(team.teamName);
  if (!byLetter[letter]) byLetter[letter] = [];
  byLetter[letter].push(emptyStanding(name, resolveFlagUrl(team.teamFlag)));
}

const groups = GROUP_ORDER.filter((l) => byLetter[l]).map((letter) => ({
  name: `Grupp ${letter}`,
  letter,
  standings: byLetter[letter].sort((a, b) =>
    a.team.localeCompare(b.team, "sv"),
  ),
}));

writeFileSync(
  join(root, "lib/world-cup-groups.generated.ts"),
  `// Auto-generated from FIFA — run: npm run sync:fifa
import type { Group } from "@/lib/types";

export const worldCupGroupsFallback: Group[] = ${JSON.stringify(groups, null, 2)};
`,
);

const matchesRes = await fetch(FIFA_MATCHES_URL);
if (!matchesRes.ok) throw new Error(`FIFA matches API ${matchesRes.status}`);
const matchesData = await matchesRes.json();

writeFileSync(
  join(root, "data/fifa-matches.json"),
  JSON.stringify(matchesData, null, 2),
);

const matches = (matchesData.Results ?? [])
  .filter((r) => r.GroupName?.length && r.Home?.TeamName && r.Away?.TeamName)
  .map((r) => ({
    id: r.IdMatch,
    home: toSv(r.Home.TeamName[0].Description),
    away: toSv(r.Away.TeamName[0].Description),
    homeFlag: resolveFlagUrl(r.Home.PictureUrl),
    awayFlag: resolveFlagUrl(r.Away.PictureUrl),
    kickoff: formatKickoff(r.LocalDate, r.Date),
    kickoffIso: r.LocalDate ?? r.Date,
    group: r.GroupName[0].Description.match(/Group ([A-L])/i)[1],
    stage: r.StageName?.[0]?.Description,
    stadium: r.Stadium?.Name?.[0]?.Description,
    matchNumber: r.MatchNumber,
  }))
  .sort(
    (a, b) =>
      a.kickoffIso.localeCompare(b.kickoffIso) ||
      (a.matchNumber ?? 0) - (b.matchNumber ?? 0),
  );

writeFileSync(
  join(root, "lib/world-cup-matches.generated.ts"),
  `// Auto-generated from FIFA — run: npm run sync:fifa
import type { Match } from "@/lib/types";

export const worldCupMatchesFallback: Match[] = ${JSON.stringify(matches, null, 2)};
`,
);

console.log(
  `Synced ${teamsData.teams?.length ?? 0} teams, ${matches.length} group matches`,
);
