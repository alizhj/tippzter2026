import { auth } from "@/auth";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Logga in | Tippzter",
  description: "Logga in med Google för att tippa VM 2026",
};

type Props = {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
};

export default async function LoggaInPage({ searchParams }: Props) {
  const session = await auth();
  const { callbackUrl = "/", error } = await searchParams;

  if (session?.user) {
    redirect(callbackUrl);
  }

  const errorMessage =
    error === "OAuthSignin"
      ? "Inloggningen misslyckades. Försök igen."
      : error
        ? "Ett fel uppstod vid inloggning."
        : null;

  const authConfigured =
    !!process.env.AUTH_GOOGLE_ID && !!process.env.AUTH_GOOGLE_SECRET;

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-8 text-center">
          <span className="text-4xl" aria-hidden>
            ⚽
          </span>
          <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Logga in
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Använd ditt Google-konto för att vara med i tippligan.
          </p>
        </div>

        {errorMessage && (
          <p
            role="alert"
            className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300"
          >
            {errorMessage}
          </p>
        )}

        {authConfigured ? (
          <GoogleSignInButton callbackUrl={callbackUrl} />
        ) : (
          <div className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
            <p className="font-medium">Google-inloggning är inte konfigurerad</p>
            <p className="mt-2 text-xs leading-relaxed opacity-90">
              Skapa en fil <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">.env.local</code> med{" "}
              <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">AUTH_SECRET</code>,{" "}
              <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">AUTH_GOOGLE_ID</code> och{" "}
              <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">AUTH_GOOGLE_SECRET</code>.
              Se <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">example.env</code> i projektet.
            </p>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-zinc-400">
          Genom att logga in godkänner du att vi sparar ditt namn och e-post
          för tippligan.
        </p>
      </div>
    </div>
  );
}
