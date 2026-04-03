import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { ChevronRight, TrendingUp, Target, Clock, Award, Sparkles, CalendarDays } from "lucide-react";
import TermsConsentDialog from "@/components/TermsConsentDialog";

const mockSessions = [
  { date: "Mar 20", role: "Software Engineer", score: 72 },
  { date: "Mar 22", role: "Frontend Developer", score: 78 },
  { date: "Mar 24", role: "Full Stack Developer", score: 68 },
  { date: "Mar 26", role: "Backend Developer", score: 82 },
  { date: "Mar 28", role: "Software Engineer", score: 85 },
];

const chartData = mockSessions.map((s) => ({ name: s.date, score: s.score }));

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    const accepted = sessionStorage.getItem("terms_accepted");
    if (!accepted) {
      const timer = setTimeout(() => setShowTerms(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const stats = [
    { icon: Target, label: "Sessions", value: "5", color: "text-primary", bg: "bg-primary/10" },
    { icon: TrendingUp, label: "Avg Score", value: "77%", color: "text-success", bg: "bg-success/10" },
    { icon: Award, label: "Best Score", value: "85%", color: "text-accent", bg: "bg-accent/10" },
    { icon: Clock, label: "Total Time", value: "2.5h", color: "text-primary", bg: "bg-primary/10" },
  ];

  return (
    <div className="flex-1 py-8 px-4 bg-gradient-to-b from-primary/5 via-background to-background min-h-screen">
      <div className="container max-w-5xl space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-1">
              <Sparkles className="h-4 w-4" /> Dashboard
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {user?.name}</h1>
            <p className="text-muted-foreground mt-1">Track your interview performance and progress.</p>
          </div>
          <Button
            className="gradient-accent text-accent-foreground font-semibold px-6 py-5 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            onClick={() => navigate("/role-selection")}
          >
            New Interview <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Card key={s.label} className="hover:shadow-md transition-shadow duration-300 border-border/60">
              <CardContent className="pt-6 flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <s.icon className={`h-6 w-6 ${s.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-extrabold">{s.value}</p>
                  <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Score Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                      fontSize: "0.875rem",
                    }}
                  />
                  <Line type="monotone" dataKey="score" stroke="hsl(215, 80%, 28%)" strokeWidth={3} dot={{ r: 5, fill: "hsl(215, 80%, 28%)" }} activeDot={{ r: 7 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="h-4 w-4 text-accent" />
                Scores by Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                      fontSize: "0.875rem",
                    }}
                  />
                  <Bar dataKey="score" fill="hsl(32, 95%, 52%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* History */}
        <Card className="hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              Recent Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {mockSessions.slice().reverse().map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{s.role}</p>
                      <p className="text-xs text-muted-foreground">{s.date}, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-bold text-sm tabular-nums ${s.score >= 80 ? "text-success" : s.score >= 60 ? "text-accent" : "text-destructive"}`}>
                      {s.score}%
                    </span>
                    <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary" onClick={() => navigate("/feedback")}>
                      View <ChevronRight className="ml-0.5 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
