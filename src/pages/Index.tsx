import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BarChart3, MessageSquare, ChevronRight, Sparkles, Target, TrendingUp, ArrowRight, Zap, Clock, CheckCircle2, Crown, Phone } from "lucide-react";
import { PRICING_PLANS, PLAN_FEATURES } from "@/data/pricing";

const features = [
  { icon: Brain, title: "AI-Powered Questions", desc: "Dynamic questions generated based on your role, domain, and experience level." },
  { icon: Target, title: "Adaptive Difficulty", desc: "Questions adapt in real-time based on your previous answers." },
  { icon: BarChart3, title: "Detailed Scoring", desc: "Get scored on each answer with strengths and improvement areas." },
  { icon: TrendingUp, title: "Progress Tracking", desc: "Track your performance trends across multiple sessions." },
  { icon: MessageSquare, title: "Personalized Feedback", desc: "Receive AI-generated feedback to sharpen your interview skills." },
];

const steps = [
  { num: "01", title: "Choose Your Role", desc: "Select from 100+ roles across tech, government, and defense sectors." },
  { num: "02", title: "Pick a Plan", desc: "Choose a 20, 30, or 45-minute interview session that fits your needs." },
  { num: "03", title: "Get Your Report", desc: "Receive a detailed performance breakdown with actionable insights." },
];

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
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative gradient-hero text-primary-foreground py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full" />
        </div>

        <div className="container text-center max-w-3xl relative animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm mb-8 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" /> AI-Powered Interview Practice
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Ace Your Next
            <span className="block bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Interview with AI
            </span>
          </h1>
          <p className="text-lg md:text-xl opacity-85 mb-10 max-w-2xl mx-auto leading-relaxed">
            Practice with realistic, AI-generated questions tailored to your role. Get instant feedback, scoring, and actionable insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="gradient-accent text-accent-foreground text-base px-10 py-7 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              onClick={() => handleStart()}
            >
              Get Started <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-base px-8 py-7 rounded-xl font-semibold backdrop-blur-sm"
              onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Pricing <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </div>

          {/* Stats bar */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 text-sm">
            {[
              { value: "100+", label: "Interview Roles" },
              { value: "5K+", label: "Sessions Completed" },
              { value: "95%", label: "User Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-extrabold">{stat.value}</p>
                <p className="text-primary-foreground/70 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-3">
              <Zap className="h-4 w-4" /> SIMPLE PROCESS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative group">
                <div className="rounded-2xl bg-card border border-border p-6 h-full hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                  <span className="text-5xl font-extrabold text-primary/10 group-hover:text-primary/20 transition-colors">
                    {step.num}
                  </span>
                  <h3 className="font-bold text-lg mt-2 mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 z-10">
                    <ChevronRight className="h-6 w-6 text-muted-foreground/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="container max-w-6xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-3">
              <Crown className="h-4 w-4" /> PRICING
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Interview Plan</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Pay per session — no subscriptions required. All plans include the same powerful features.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {PRICING_PLANS.map((plan) => (
              <Card
                key={plan.id}
                className={`relative overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                  plan.popular
                    ? "border-2 border-primary shadow-lg scale-[1.02]"
                    : "border-border/60"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1 gradient-primary" />
                )}
                {plan.popular && (
                  <div className="absolute -top-0 right-4">
                    <span className="inline-block gradient-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-b-lg">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-2 pt-8">
                  <CardTitle className="text-lg font-bold">{plan.name}</CardTitle>
                  <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-sm mt-1">
                    <Clock className="h-4 w-4" /> {plan.duration} minutes
                  </div>
                </CardHeader>
                <CardContent className="text-center space-y-5 pb-8">
                  <div>
                    <div className="text-4xl font-extrabold text-foreground">
                      ₹{plan.total.toFixed(plan.total % 1 === 0 ? 0 : 2)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      ₹{plan.price} + ₹{plan.gst % 1 === 0 ? plan.gst : plan.gst.toFixed(1)} GST (18%)
                    </p>
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {plan.questionsRange[0]}–{plan.questionsRange[1]} AI-powered questions
                  </div>
                  <div className="text-left space-y-2 pt-2 border-t border-border/60">
                    {PLAN_FEATURES.map((feature) => (
                      <div key={feature} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className={`w-full py-5 font-bold rounded-xl ${
                      plan.popular
                        ? "gradient-primary text-primary-foreground shadow-lg hover:shadow-xl"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleStart(plan.id)}
                  >
                    Get Started <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}

            {/* Custom / Enterprise Card */}
            <Card className="relative overflow-hidden border-border/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-muted/30">
              <CardHeader className="text-center pb-2 pt-8">
                <CardTitle className="text-lg font-bold">Custom Package</CardTitle>
                <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-sm mt-1">
                  <Phone className="h-4 w-4" /> Tailored for you
                </div>
              </CardHeader>
              <CardContent className="text-center space-y-5 pb-8">
                <div>
                  <div className="text-3xl font-extrabold text-foreground">
                    Let's Talk
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Custom pricing for your needs
                  </p>
                </div>
                <div className="text-sm font-medium text-foreground">
                  Custom duration & questions
                </div>
                <div className="text-left space-y-2 pt-2 border-t border-border/60">
                  {[
                    ...PLAN_FEATURES,
                    "Dedicated support & onboarding",
                    "Custom question banks",
                    "Team & bulk pricing",
                  ].map((feature) => (
                    <div key={feature} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full py-5 font-bold rounded-xl"
                  variant="outline"
                  onClick={() => navigate("/contact")}
                >
                  Contact Us <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28 bg-muted/50">
        <div className="container">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-3">
              <Sparkles className="h-4 w-4" /> FEATURES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Prepare</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Comprehensive tools designed to help you land your dream role.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-border bg-card p-6 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <f.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-[0.06]" />
        <div className="container text-center max-w-2xl relative">
          <div className="rounded-3xl bg-card border border-border p-10 md:p-14 shadow-xl">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Practice?</h2>
            <p className="text-muted-foreground mb-8 text-lg">Select your target role, customize your experience, and start a realistic interview session.</p>
            <Button
              size="lg"
              className="gradient-primary text-primary-foreground px-10 py-7 rounded-xl text-base font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              onClick={() => handleStart()}
            >
              Get Started <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
