import { MatchTipCard } from "@/components/MatchTipCard";
import { GROUP_ORDER, groupMatchesByLetter } from "@/lib/fifa-matches";
import type { Match } from "@/lib/types";

type Props = {
  matches: Match[];
};

export function MatchList({ matches }: Props) {
  const byGroup = groupMatchesByLetter(matches);
  const letters = GROUP_ORDER.filter((l) => byGroup[l]?.length);

  return (
    <div className="space-y-10">
      {letters.map((letter) => (
        <section key={letter}>
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Grupp {letter}
            <span className="ml-2 text-sm font-normal text-zinc-500">
              {byGroup[letter].length} matcher
            </span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {byGroup[letter].map((match) => (
              <MatchTipCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
