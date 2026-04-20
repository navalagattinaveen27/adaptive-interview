import { LoginForm } from "../LoginForm";

export const metadata = {
  title: "Log in — EvalSmart",
  description: "Sign in to your EvalSmart account to practice AI-powered mock interviews.",
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-card">
        <LoginForm />
      </div>
    </main>
  );
}
