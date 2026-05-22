import { leaderboard } from "@/lib/mock-data";

export const metadata = {
  title: "Leaderboard | Tippzter",
  description: "Se vem som leder tippligan",
};

export default function LeaderboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Leaderboard
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Alla som är med i tippligan och hur många poäng de har samlat.
        </p>
      </div>
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-400">
              <th className="px-4 py-3 font-medium">Plats</th>
              <th className="px-4 py-3 font-medium">Namn</th>
              <th className="px-4 py-3 text-center font-medium">Poäng</th>
              <th className="hidden px-4 py-3 text-center font-medium sm:table-cell">
                Exakta resultat
              </th>
              <th className="hidden px-4 py-3 text-center font-medium md:table-cell">
                Rätt utfall
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr
                key={entry.name}
                className={`border-b border-zinc-100 last:border-0 dark:border-zinc-800/50 ${
                  entry.rank === 1
                    ? "bg-amber-50/80 dark:bg-amber-950/20"
                    : entry.rank <= 3
                      ? "bg-zinc-50/50 dark:bg-zinc-800/20"
                      : ""
                }`}
              >
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                      entry.rank === 1
                        ? "bg-amber-400 text-amber-950"
                        : entry.rank === 2
                          ? "bg-zinc-300 text-zinc-700 dark:bg-zinc-600 dark:text-zinc-200"
                          : entry.rank === 3
                            ? "bg-amber-700/30 text-amber-800 dark:text-amber-300"
                            : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    {entry.rank}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">
                  {entry.name}
                  {entry.rank === 1 && (
                    <span className="ml-2 text-xs" aria-label="Ledare">
                      👑
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center text-lg font-bold text-emerald-700 dark:text-emerald-400">
                  {entry.points}
                </td>
                <td className="hidden px-4 py-3 text-center text-zinc-600 dark:text-zinc-400 sm:table-cell">
                  {entry.exactScores}
                </td>
                <td className="hidden px-4 py-3 text-center text-zinc-600 dark:text-zinc-400 md:table-cell">
                  {entry.correctResults}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-center text-xs text-zinc-400">
        {leaderboard.length} deltagare i tippligan
      </p>
    </div>
  );
}
