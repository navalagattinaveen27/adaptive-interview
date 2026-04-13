import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle2, Clock, Cpu, SlidersHorizontal, ChartColumnBig, TrendingUp, MessageCircleHeart, Zap } from "lucide-react";
import { PRICING_PLANS, PLAN_FEATURES } from "@/data/pricing";
import ScrollReveal from "@/components/landing/ScrollReveal";
import stepChooseRole from "@/assets/step-choose-role.jpg";
import stepPickPlan from "@/assets/step-pick-plan.jpg";
import stepGetReport from "@/assets/step-get-report.jpg";

const FEATURE_ICONS = [Cpu, SlidersHorizontal, ChartColumnBig, TrendingUp, MessageCircleHeart, Zap];

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
    <div className="flex flex-col bg-gradient-to-b from-primary/5 via-background to-background overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] animate-float" />

        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background/50 to-background" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            AI-Powered Interview Practice
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Ace Your Next
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
              Interview.
            </span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Practice with realistic, AI-generated questions tailored to your role.
            Get instant feedback, detailed scoring, and actionable insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <Button
              size="lg"
              className="gradient-primary text-primary-foreground text-base px-10 py-7 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              onClick={() => handleStart()}
            >
              Get Started
              <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-primary hover:text-primary/80 text-base px-8 py-7 rounded-full font-semibold hover:bg-primary/5 transition-all duration-300"
              onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Pricing <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <div className="w-1 h-2.5 rounded-full bg-muted-foreground/50 animate-fade-up" style={{ animationIterationCount: "infinite", animationDuration: "1.5s" }} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/40 py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-accent/3" />
        <div className="container max-w-4xl relative">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: "100+", label: "Interview Roles" },
              { value: "5K+", label: "Sessions Completed" },
              { value: "95%", label: "User Satisfaction" },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 150}>
                <p className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">{stat.value}</p>
                <p className="text-muted-foreground text-sm mt-2">{stat.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="container max-w-5xl relative">
          <ScrollReveal>
            <p className="text-primary font-semibold text-sm tracking-widest uppercase text-center mb-4">
              How It Works
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center text-foreground mb-20">
              Three simple steps.
            </h2>
          </ScrollReveal>
          <div className="flex flex-col gap-20 md:gap-28">
            {[
              { num: "01", title: "Choose Your Role", desc: "Select from 100+ roles across tech, government, and defense sectors.", img: stepChooseRole },
              { num: "02", title: "Pick a Plan", desc: "Choose a 20, 30, or 45-minute interview session that fits your schedule.", img: stepPickPlan },
              { num: "03", title: "Get Your Report", desc: "Receive a detailed performance breakdown with actionable insights.", img: stepGetReport },
            ].map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 200}>
                <div className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-16`}>
                  <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src={step.img}
                      alt={step.title}
                      loading="lazy"
                      width={800}
                      height={512}
                      className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <span className="text-7xl md:text-8xl font-extrabold text-primary/10 block leading-none mb-4">
                      {step.num}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{step.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 md:py-32 bg-muted/30 relative">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="container max-w-5xl relative">
          <ScrollReveal>
            <p className="text-primary font-semibold text-sm tracking-widest uppercase text-center mb-4">
              Features
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center text-foreground mb-6">
              Everything you need.
            </h2>
            <p className="text-muted-foreground text-lg text-center max-w-2xl mx-auto mb-20">
              Comprehensive tools designed to help you land your dream role.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "AI-Powered Questions", desc: "Dynamic questions generated based on your role, domain, and experience level." },
              { title: "Adaptive Difficulty", desc: "Questions adapt in real-time based on your previous answers." },
              { title: "Detailed Scoring", desc: "Get scored on each answer with strengths and improvement areas." },
              { title: "Progress Tracking", desc: "Track your performance trends across multiple sessions." },
              { title: "Personalized Feedback", desc: "Receive AI-generated feedback to sharpen your interview skills." },
              { title: "Instant Results", desc: "Get your detailed report immediately after completing your session." },
            ].map((f, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <ScrollReveal key={f.title} delay={i * 100}>
                  <div className="rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 p-8 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-500 group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-3">{f.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 md:py-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="container max-w-6xl relative">
          <ScrollReveal>
            <p className="text-primary font-semibold text-sm tracking-widest uppercase text-center mb-4">
              Pricing
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center text-foreground mb-6">
              Choose your plan.
            </h2>
            <p className="text-muted-foreground text-lg text-center max-w-xl mx-auto mb-16">
              Pay per session — no subscriptions required.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {PRICING_PLANS.map((plan, i) => (
              <ScrollReveal key={plan.id} delay={i * 150}>
                <div
                  className={`relative rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl group ${
                    plan.popular
                      ? "bg-foreground text-background shadow-2xl scale-[1.03] hover:scale-[1.05]"
                      : "bg-card/80 backdrop-blur-sm border border-border/60 hover:border-primary/30 hover:-translate-y-1"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold bg-primary text-primary-foreground px-4 py-1 rounded-full shadow-lg shadow-primary/25">
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
                    className={`w-full py-5 rounded-full font-semibold hover:scale-[1.02] transition-all duration-300 ${
                      plan.popular
                        ? "bg-background text-foreground hover:bg-background/90 shadow-lg"
                        : "gradient-primary text-primary-foreground"
                    }`}
                    onClick={() => handleStart(plan.id)}
                  >
                    Get Started
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <p className="text-center mt-12 text-muted-foreground">
              Need a custom package?{" "}
              <button
                onClick={() => navigate("/contact")}
                className="text-primary font-semibold hover:underline underline-offset-4 transition-all"
              >
                Contact us →
              </button>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/8 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <ScrollReveal>
          <div className="container text-center max-w-3xl relative">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
              Ready to practice?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Select your target role, customize your experience, and start a realistic AI interview session.
            </p>
            <Button
              size="lg"
              className="gradient-primary text-primary-foreground text-base px-12 py-7 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              onClick={() => handleStart()}
            >
              Get Started <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Index;
