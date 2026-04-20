import { SignupForm } from "../SignupForm";

export const metadata = {
  title: "Sign up — EvalSmart",
  description: "Create your EvalSmart account and start practicing AI mock interviews today.",
};

export default function SignupPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-card">
        <SignupForm />
      </div>
    </main>
  );
}
