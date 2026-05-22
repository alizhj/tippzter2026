import { MatchTipCard } from "@/components/MatchTipCard";
import { upcomingMatches } from "@/lib/mock-data";

export const metadata = {
  title: "Tippa | Tippzter",
  description: "Tippa resultat på VM-matcher",
};

export default function TippaPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Tippa resultat
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Fyll i dina tips innan avspark. Du får poäng för rätt resultat och
          extra poäng för exakt rätt målsiffra.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {upcomingMatches.map((match) => (
          <MatchTipCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
