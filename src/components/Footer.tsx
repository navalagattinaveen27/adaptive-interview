import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <Logo size="sm" />
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} EvalSmart. AI-powered mock interviews.
        </p>
      </div>
    </footer>
  );
}
