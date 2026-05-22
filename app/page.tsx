import Link from "next/link";

const cards = [
  {
    href: "/tippa",
    title: "Tippa resultat",
    description: "Gissa målsiffror på kommande matcher innan avspark.",
    icon: "🎯",
  },
  {
    href: "/tabeller",
    title: "Grupptabeller",
    description: "Följ hur grupperna ser ut efter varje omgång.",
    icon: "📊",
  },
  {
    href: "/leaderboard",
    title: "Leaderboard",
    description: "Se vem som leder tippligan just nu.",
    icon: "🏆",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <section className="mb-12 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Välkommen till Tippzter
        </h1>
        <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          Tippa fotbolls-VM 2026 tillsammans med vänner. Spara dina tips, följ
          tabellerna och tävla om förstaplatsen i ligan.
        </p>
      </section>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            <span className="text-3xl" aria-hidden>
              {card.icon}
            </span>
            <h2 className="mt-4 text-lg font-semibold text-zinc-900 group-hover:text-emerald-700 dark:text-zinc-50 dark:group-hover:text-emerald-400">
              {card.title}
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {card.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
