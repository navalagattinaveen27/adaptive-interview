import Link from "next/link";
import { createSupabaseServerClient } from "@/src/integrations/supabase/server";

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="gradient-subtle">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              ES — EvalSmart
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
              Master your next interview with{" "}
              <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] bg-clip-text text-transparent">
                AI-powered practice
              </span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Real voice interviews, instant feedback, and detailed scoring — for any role.
              Practice as much as you want, get hired faster.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={user ? "/dashboard" : "/signup"}
                className="inline-flex h-11 items-center justify-center rounded-md gradient-primary px-6 text-sm font-medium text-primary-foreground shadow-elegant hover:opacity-95"
              >
                {user ? "Go to dashboard" : "Get started — it's free"}
              </Link>
              <Link
                href="#features"
                className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-card px-6 text-sm font-medium text-foreground hover:bg-muted"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Voice-first interviews",
              body: "Speak naturally — our AI asks questions aloud and listens to your answers in real time.",
            },
            {
              title: "Tailored to any role",
              body: "Paste a job description or pick a domain. We craft questions that match the role.",
            },
            {
              title: "Detailed feedback",
              body: "Get scored on clarity, structure, and content with actionable improvements after every session.",
            },
          ].map((f) => (
            <article
              key={f.title}
              className="rounded-xl border border-border bg-card p-6 shadow-card"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground font-semibold">
                ES
              </div>
              <h2 className="text-lg font-semibold">{f.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
