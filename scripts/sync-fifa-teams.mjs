import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const FIFA_URL =
  "https://cxm-api.fifa.com/fifaplusweb/api/sections/teamsModule/4v5Yng3VdGD9c1cpnOIff1?locale=en&offset=0&limit=48";

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

function emptyStanding(team) {
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

const res = await fetch(FIFA_URL);
if (!res.ok) throw new Error(`FIFA API ${res.status}`);
const data = await res.json();

writeFileSync(
  join(root, "data/fifa-teams.json"),
  JSON.stringify(data, null, 2),
);

const byLetter = {};
for (const team of data.teams ?? []) {
  const match = team.stage.match(/Group\s+([A-L])/i);
  const letter = match[1].toUpperCase();
  const name = TEAM_NAMES_SV[team.teamName] ?? team.teamName;
  if (!byLetter[letter]) byLetter[letter] = [];
  byLetter[letter].push(emptyStanding(name));
}

const groups = GROUP_ORDER.filter((l) => byLetter[l]).map((letter) => ({
  name: `Grupp ${letter}`,
  letter,
  standings: byLetter[letter].sort((a, b) =>
    a.team.localeCompare(b.team, "sv"),
  ),
}));

const generated = `// Auto-generated from FIFA teams API — run: npm run sync:teams
import type { Group } from "@/lib/types";

export const worldCupGroupsFallback: Group[] = ${JSON.stringify(groups, null, 2)};
`;

writeFileSync(join(root, "lib/world-cup-groups.generated.ts"), generated);
console.log(`Synced ${data.teams?.length ?? 0} teams into ${groups.length} groups`);
