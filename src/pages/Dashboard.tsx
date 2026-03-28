import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { ChevronRight, TrendingUp, Target, Clock, Award } from "lucide-react";

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

  return (
    <div className="flex-1 py-8 px-4">
      <div className="container max-w-5xl space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>
            <p className="text-muted-foreground">Track your interview performance and progress.</p>
          </div>
          <Button className="gradient-accent text-accent-foreground font-semibold" onClick={() => navigate("/role-selection")}>
            New Interview <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Target, label: "Sessions", value: "5", color: "text-primary" },
            { icon: TrendingUp, label: "Avg Score", value: "77%", color: "text-success" },
            { icon: Award, label: "Best Score", value: "85%", color: "text-accent" },
            { icon: Clock, label: "Total Time", value: "2.5h", color: "text-primary" },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="pt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Score Trend</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="hsl(215, 80%, 28%)" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Scores by Session</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="score" fill="hsl(32, 95%, 52%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* History */}
        <Card>
          <CardHeader><CardTitle className="text-base">Recent Sessions</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockSessions.slice().reverse().map((s, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-sm">{s.role}</p>
                    <p className="text-xs text-muted-foreground">{s.date}, 2026</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-bold text-sm ${s.score >= 80 ? "text-success" : s.score >= 60 ? "text-accent" : "text-destructive"}`}>
                      {s.score}%
                    </span>
                    <Button variant="ghost" size="sm" className="text-xs text-primary" onClick={() => navigate("/feedback")}>
                      View Feedback <ChevronRight className="ml-0.5 h-3 w-3" />
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
