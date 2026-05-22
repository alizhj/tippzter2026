import { MatchList } from "@/components/MatchList";
import { fetchWorldCupMatches } from "@/lib/fifa-matches";

export const metadata = {
  title: "Tippa | Tippzter",
  description: "Tippa resultat på VM-matcher",
};

export default async function TippaPage() {
  const { matches, source } = await fetchWorldCupMatches();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Tippa resultat
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Alla {matches.length} gruppspelsmatcher från{" "}
          <a
            href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/fixtures"
            className="font-medium text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            FIFA World Cup 2026
          </a>
          . Fyll i dina tips innan avspark — poäng för rätt resultat och extra
          för exakt målsiffra.
        </p>
        {source === "fifa" && (
          <p className="mt-1 text-xs text-zinc-400">Data från FIFA</p>
        )}
      </div>
      <MatchList matches={matches} />
    </div>
  );
}
