import Link from "next/link";
import { createSupabaseServerClient } from "@/src/integrations/supabase/server";
import { Logo } from "./Logo";
import { signOutAction } from "@/app/(auth)/actions";

export async function Navbar() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo size="md" />
        <nav className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="inline-flex h-9 items-center rounded-md border border-border bg-card px-4 text-sm font-medium text-foreground hover:bg-muted"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex h-9 items-center rounded-md px-4 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-9 items-center rounded-md gradient-primary px-4 text-sm font-medium text-primary-foreground shadow-elegant hover:opacity-95"
              >
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
