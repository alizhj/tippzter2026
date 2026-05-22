import { TeamFlag } from "@/components/TeamFlag";
import type { Group } from "@/lib/types";

type Props = {
  group: Group;
  highlightQualifiers?: boolean;
};

export function GroupTable({ group, highlightQualifiers = true }: Props) {
  return (
    <section className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-900 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-50">
        {group.name}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-zinc-100 text-left text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              <th className="px-4 py-2 font-medium">#</th>
              <th className="px-4 py-2 font-medium">Lag</th>
              <th className="px-2 py-2 text-center font-medium">S</th>
              <th className="px-2 py-2 text-center font-medium">V</th>
              <th className="px-2 py-2 text-center font-medium">O</th>
              <th className="px-2 py-2 text-center font-medium">F</th>
              <th className="px-2 py-2 text-center font-medium">GM</th>
              <th className="px-2 py-2 text-center font-medium">IM</th>
              <th className="px-2 py-2 text-center font-medium">MS</th>
              <th className="px-4 py-2 text-center font-medium">P</th>
            </tr>
          </thead>
          <tbody>
            {group.standings.map((row, i) => {
              const goalDiff = row.goalsFor - row.goalsAgainst;
              const qualifies = highlightQualifiers && i < 2;
              return (
                <tr
                  key={row.team}
                  className={`border-b border-zinc-50 last:border-0 dark:border-zinc-800/50 ${
                    qualifies
                      ? "bg-emerald-50/60 dark:bg-emerald-950/20"
                      : ""
                  }`}
                >
                  <td className="px-4 py-2.5 text-zinc-500">{i + 1}</td>
                  <td className="px-4 py-2.5 font-medium text-zinc-900 dark:text-zinc-50">
                    <span className="flex items-center gap-2">
                      {row.flag && (
                        <TeamFlag
                          src={row.flag}
                          alt={`${row.team} flagga`}
                          size="sm"
                        />
                      )}
                      <span>
                        {row.team}
                        {qualifies && (
                          <span className="ml-2 text-xs text-emerald-600 dark:text-emerald-400">
                            →
                          </span>
                        )}
                      </span>
                    </span>
                  </td>
                  <td className="px-2 py-2.5 text-center">{row.played}</td>
                  <td className="px-2 py-2.5 text-center">{row.won}</td>
                  <td className="px-2 py-2.5 text-center">{row.drawn}</td>
                  <td className="px-2 py-2.5 text-center">{row.lost}</td>
                  <td className="px-2 py-2.5 text-center">{row.goalsFor}</td>
                  <td className="px-2 py-2.5 text-center">
                    {row.goalsAgainst}
                  </td>
                  <td className="px-2 py-2.5 text-center">
                    {goalDiff > 0 ? `+${goalDiff}` : goalDiff}
                  </td>
                  <td className="px-4 py-2.5 text-center font-bold text-emerald-700 dark:text-emerald-400">
                    {row.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
