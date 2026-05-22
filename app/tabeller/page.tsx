import { GroupTable } from "@/components/GroupTable";
import { fetchWorldCupGroups } from "@/lib/fifa";

export const metadata = {
  title: "Tabeller | Tippzter",
  description: "Grupptabeller för FIFA World Cup 2026",
};

export default async function TabellerPage() {
  const { groups, source, tournamentState } = await fetchWorldCupGroups();
  const hasPlayedMatches = groups.some((g) =>
    g.standings.some((s) => s.played > 0),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Grupptabeller
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Alla 12 grupper med 48 lag från{" "}
          <a
            href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams"
            className="font-medium text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            FIFA World Cup 2026
          </a>
          . De två bästa lagen i varje grupp går vidare till åttondelsfinal, plus
          de åtta bästa treorna.
        </p>
        {!hasPlayedMatches && (
          <p className="mt-2 text-sm text-amber-700 dark:text-amber-400">
            Turneringen har inte startat än — tabellerna visar gruppindelningen
            {tournamentState === "Upcoming" ? " (kommande)" : ""}. Statistik
            uppdateras när matcher spelas.
          </p>
        )}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => (
          <GroupTable
            key={group.letter}
            group={group}
            highlightQualifiers={hasPlayedMatches}
          />
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-zinc-400">
        S = spelade · V = vunna · O = oavgjorda · F = förlorade · GM/IM =
        gjorda/insläppta mål · MS = målskillnad · P = poäng
        {source === "fifa" && " · Data från FIFA"}
      </p>
    </div>
  );
}
