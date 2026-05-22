"use client";

import { useState } from "react";
import type { Match } from "@/lib/mock-data";

type Props = {
  match: Match;
};

export function MatchTipCard({ match }: Props) {
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (home === "" || away === "") return;
    setSaved(true);
  }

  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        {match.group && (
          <span className="rounded bg-zinc-100 px-2 py-0.5 font-medium dark:bg-zinc-800">
            Grupp {match.group}
          </span>
        )}
        <time>{match.kickoff}</time>
      </div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="flex-1 text-right font-semibold text-zinc-900 dark:text-zinc-50">
          {match.home}
        </span>
        <span className="text-sm text-zinc-400">vs</span>
        <span className="flex-1 font-semibold text-zinc-900 dark:text-zinc-50">
          {match.away}
        </span>
      </div>
      <div className="flex items-center justify-center gap-3">
        <input
          type="number"
          min={0}
          max={20}
          value={home}
          onChange={(e) => {
            setHome(e.target.value);
            setSaved(false);
          }}
          placeholder="0"
          aria-label={`Mål ${match.home}`}
          className="w-14 rounded-lg border border-zinc-300 bg-zinc-50 px-2 py-2 text-center text-lg font-bold dark:border-zinc-700 dark:bg-zinc-800"
        />
        <span className="text-zinc-400">–</span>
        <input
          type="number"
          min={0}
          max={20}
          value={away}
          onChange={(e) => {
            setAway(e.target.value);
            setSaved(false);
          }}
          placeholder="0"
          aria-label={`Mål ${match.away}`}
          className="w-14 rounded-lg border border-zinc-300 bg-zinc-50 px-2 py-2 text-center text-lg font-bold dark:border-zinc-700 dark:bg-zinc-800"
        />
      </div>
      <button
        type="button"
        onClick={handleSave}
        disabled={home === "" || away === ""}
        className="mt-4 w-full rounded-lg bg-emerald-600 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {saved ? "Tipp sparat ✓" : "Spara tipp"}
      </button>
    </article>
  );
}
