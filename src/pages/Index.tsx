import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Brain, BarChart3, MessageSquare, CreditCard, ChevronRight, Sparkles, Target, TrendingUp } from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Questions", desc: "Dynamic questions generated based on your role, domain, and experience level." },
  { icon: Target, title: "Adaptive Difficulty", desc: "Questions adapt in real-time based on your previous answers." },
  { icon: BarChart3, title: "Detailed Scoring", desc: "Get scored on each answer with strengths and improvement areas." },
  { icon: TrendingUp, title: "Progress Tracking", desc: "Track your performance trends across multiple sessions." },
  { icon: MessageSquare, title: "Personalized Feedback", desc: "Receive AI-generated feedback to sharpen your interview skills." },
  { icon: CreditCard, title: "Pay Per Session", desc: "No subscriptions — pay only for the sessions you take." },
];

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleStart = () => {
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
      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container text-center max-w-3xl animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm mb-6">
            <Sparkles className="h-4 w-4" /> AI-Powered Interview Practice
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Ace Your Next Interview with AI
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Practice with realistic, AI-generated questions tailored to your role. Get instant feedback, scoring, and actionable insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-accent text-accent-foreground text-base px-8 py-6 rounded-xl font-semibold shadow-lg hover:opacity-90 transition-opacity" onClick={handleStart}>
              Start Interview <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-muted-foreground text-center mb-14 max-w-xl mx-auto">Everything you need to prepare for your dream role.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="group rounded-xl border border-border bg-card p-6 hover:shadow-lg hover:border-primary/30 transition-all">
                <div className="h-12 w-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <f.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Practice?</h2>
          <p className="text-muted-foreground mb-8">Select your target role, customize your experience, and start a realistic interview session.</p>
          <Button size="lg" className="gradient-primary text-primary-foreground px-8 py-6 rounded-xl text-base font-semibold" onClick={handleStart}>
            Get Started <ChevronRight className="ml-1 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
