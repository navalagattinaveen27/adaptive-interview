import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { box: "h-8 w-8 text-sm", text: "text-base" },
  md: { box: "h-10 w-10 text-base", text: "text-lg" },
  lg: { box: "h-14 w-14 text-xl", text: "text-2xl" },
};

export function Logo({ className = "", size = "md" }: LogoProps) {
  const s = sizes[size];
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`}>
      <span
        className={`${s.box} grid place-items-center rounded-xl gradient-primary text-primary-foreground font-bold tracking-tight shadow-elegant`}
        aria-hidden="true"
      >
        ES
      </span>
      <span className={`${s.text} font-semibold tracking-tight text-foreground`}>
        EvalSmart
      </span>
    </Link>
  );
}
