import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle2, Clock } from "lucide-react";
import { PRICING_PLANS, PLAN_FEATURES } from "@/data/pricing";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleStart = (planId?: string) => {
    if (planId) {
      sessionStorage.setItem("selected_plan", planId);
    }
    if (!isAuthenticated) {
      sessionStorage.setItem("redirect_after_login", "/role-selection");
      navigate("/login");
    } else {
      navigate("/role-selection");
    }
  };

  return (
    <div className="flex flex-col bg-background">
      {/* Hero — Apple-style large centered text on clean background */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background" />
        <div className="relative z-10 max-w-4xl mx-auto animate-fade-in">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-6">
            AI-Powered Interview Practice
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground leading-[1.05] mb-6">
            Ace Your Next
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Interview.
            </span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Practice with realistic, AI-generated questions tailored to your role.
            Get instant feedback, detailed scoring, and actionable insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 text-base px-10 py-7 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => handleStart()}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-primary hover:text-primary/80 text-base px-8 py-7 rounded-full font-semibold"
              onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Pricing <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats — clean horizontal strip */}
      <section className="border-y border-border/40 py-16">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: "100+", label: "Interview Roles" },
              { value: "5K+", label: "Sessions Completed" },
              { value: "95%", label: "User Satisfaction" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">{stat.value}</p>
                <p className="text-muted-foreground text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — large section titles, Apple editorial feel */}
      <section className="py-24 md:py-32">
        <div className="container max-w-5xl">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase text-center mb-4">
            How It Works
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center text-foreground mb-20">
            Three simple steps.
          </h2>
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {[
              { num: "01", title: "Choose Your Role", desc: "Select from 100+ roles across tech, government, and defense sectors." },
              { num: "02", title: "Pick a Plan", desc: "Choose a 20, 30, or 45-minute interview session that fits your schedule." },
              { num: "03", title: "Get Your Report", desc: "Receive a detailed performance breakdown with actionable insights." },
            ].map((step) => (
              <div key={step.num} className="text-center md:text-left">
                <span className="text-6xl md:text-7xl font-extrabold text-primary/10 block leading-none mb-4">
                  {step.num}
                </span>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features — clean grid, minimal cards */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container max-w-5xl">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase text-center mb-4">
            Features
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center text-foreground mb-6">
            Everything you need.
          </h2>
          <p className="text-muted-foreground text-lg text-center max-w-2xl mx-auto mb-20">
            Comprehensive tools designed to help you land your dream role.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "AI-Powered Questions", desc: "Dynamic questions generated based on your role, domain, and experience level." },
              { title: "Adaptive Difficulty", desc: "Questions adapt in real-time based on your previous answers." },
              { title: "Detailed Scoring", desc: "Get scored on each answer with strengths and improvement areas." },
              { title: "Progress Tracking", desc: "Track your performance trends across multiple sessions." },
              { title: "Personalized Feedback", desc: "Receive AI-generated feedback to sharpen your interview skills." },
              { title: "Instant Results", desc: "Get your detailed report immediately after completing your session." },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-card border border-border/50 p-8 hover:shadow-lg hover:border-border transition-all duration-300"
              >
                <h3 className="font-bold text-lg text-foreground mb-3">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing — clean Apple-style */}
      <section id="pricing" className="py-24 md:py-32">
        <div className="container max-w-6xl">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase text-center mb-4">
            Pricing
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center text-foreground mb-6">
            Choose your plan.
          </h2>
          <p className="text-muted-foreground text-lg text-center max-w-xl mx-auto mb-16">
            Pay per session — no subscriptions required.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? "bg-foreground text-background shadow-2xl scale-[1.03]"
                    : "bg-card border border-border/60 hover:border-border"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold bg-primary text-primary-foreground px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="text-center mb-6">
                  <h3 className={`text-lg font-bold mb-1 ${plan.popular ? "text-background" : "text-foreground"}`}>
                    {plan.name}
                  </h3>
                  <div className={`flex items-center justify-center gap-1.5 text-sm ${plan.popular ? "text-background/60" : "text-muted-foreground"}`}>
                    <Clock className="h-4 w-4" /> {plan.duration} min
                  </div>
                </div>
                <div className="text-center mb-6">
                  <span className={`text-4xl font-extrabold ${plan.popular ? "text-background" : "text-foreground"}`}>
                    ₹{plan.total.toFixed(plan.total % 1 === 0 ? 0 : 2)}
                  </span>
                  <p className={`text-xs mt-1 ${plan.popular ? "text-background/50" : "text-muted-foreground"}`}>
                    incl. 18% GST
                  </p>
                </div>
                <p className={`text-sm font-medium text-center mb-6 ${plan.popular ? "text-background/80" : "text-foreground"}`}>
                  {plan.questionsRange[0]}–{plan.questionsRange[1]} AI-powered questions
                </p>
                <div className={`space-y-2.5 mb-8 pt-6 border-t ${plan.popular ? "border-background/20" : "border-border/60"}`}>
                  {PLAN_FEATURES.slice(0, 5).map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5 text-xs">
                      <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${plan.popular ? "text-background/60" : "text-primary"}`} />
                      <span className={plan.popular ? "text-background/70" : "text-muted-foreground"}>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  className={`w-full py-5 rounded-full font-semibold ${
                    plan.popular
                      ? "bg-background text-foreground hover:bg-background/90"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  }`}
                  onClick={() => handleStart(plan.id)}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>

          {/* Custom plan link */}
          <p className="text-center mt-12 text-muted-foreground">
            Need a custom package?{" "}
            <button
              onClick={() => navigate("/contact")}
              className="text-primary font-semibold hover:underline"
            >
              Contact us →
            </button>
          </p>
        </div>
      </section>

      {/* CTA — minimal, clean */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container text-center max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
            Ready to practice?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Select your target role, customize your experience, and start a realistic AI interview session.
          </p>
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 text-base px-12 py-7 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => handleStart()}
          >
            Get Started <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
