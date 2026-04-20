import Link from "next/link";
import { createSupabaseServerClient } from "@/src/integrations/supabase/server";

export const metadata = {
  title: "Dashboard — EvalSmart",
  description: "Your interview practice dashboard.",
};

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("user_id", user!.id)
    .maybeSingle();

  const name = profile?.display_name ?? user?.email?.split("@")[0] ?? "there";

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Hi, {name} 👋</h1>
        <p className="mt-1 text-muted-foreground">
          Ready to practice? Pick a role and we&apos;ll set up your mock interview.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/role-selection"
          className="group rounded-xl border border-border bg-card p-6 shadow-card transition hover:shadow-elegant"
        >
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg gradient-primary text-primary-foreground">
            ▶
          </div>
          <h2 className="text-lg font-semibold">Start new interview</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose a role, paste a JD, and begin practicing.
          </p>
        </Link>

        <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6">
          <h2 className="text-lg font-semibold text-muted-foreground">Recent sessions</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your past interviews will appear here once you complete one.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-border bg-accent/40 p-4 text-sm text-accent-foreground">
        <strong>Slice 1 complete.</strong> Auth, branding, and the protected dashboard shell are
        live. Up next: role selection, device check (mic + speaker), and payment.
      </div>
    </main>
  );
}
