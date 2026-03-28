import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  BarChart3,
  MessageSquare,
  Brain,
  Lightbulb,
  Users,
  Shield,
  Sparkles,
  RotateCcw,
  LayoutDashboard,
  Mail,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface CategoryScore {
  name: string;
  score: number;
  maxScore: number;
  description: string;
  icon: React.ReactNode;
}

const Feedback = () => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("interview_role") || "General";
  const answers = JSON.parse(sessionStorage.getItem("interview_answers") || "[]");
  const [email, setEmail] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const hasAnswers = answers.length > 0;
  const avgLength = hasAnswers
    ? answers.reduce((s: number, a: string) => s + (a?.length || 0), 0) / answers.length
    : 0;

  const categories = useMemo<CategoryScore[]>(() => {
    const base = avgLength > 50 ? 45 : avgLength > 20 ? 30 : 15;
    return [
      {
        name: "Communication Skills",
        score: Math.min(100, base + Math.floor(Math.random() * 20)),
        maxScore: 100,
        icon: <MessageSquare className="h-5 w-5" />,
        description: avgLength > 50
          ? "The candidate demonstrated clear and structured communication. Responses were articulate with good use of examples, though there is room for more concise delivery in some areas."
          : "The candidate's communication needs improvement. Responses lacked structure and detail. There was limited use of specific examples to support their answers.",
      },
      {
        name: "Technical Knowledge",
        score: Math.min(100, base + Math.floor(Math.random() * 25)),
        maxScore: 100,
        icon: <Brain className="h-5 w-5" />,
        description: avgLength > 50
          ? "The candidate showed solid technical understanding relevant to the role. They were able to discuss concepts with reasonable depth and provided relevant examples from their experience."
          : "The candidate demonstrated limited technical knowledge. They failed to elaborate or provide specific examples, indicating a superficial understanding of the domain.",
      },
      {
        name: "Problem Solving",
        score: Math.min(100, base + Math.floor(Math.random() * 15)),
        maxScore: 100,
        icon: <Lightbulb className="h-5 w-5" />,
        description: avgLength > 50
          ? "The candidate showed good analytical thinking and approached problems methodically. They demonstrated the ability to break down complex scenarios into manageable steps."
          : "The candidate showed limited problem-solving ability. They avoided addressing questions directly and did not offer clear solutions or approaches to the problems posed.",
      },
      {
        name: "Cultural Fit",
        score: Math.min(100, base + Math.floor(Math.random() * 20)),
        maxScore: 100,
        icon: <Users className="h-5 w-5" />,
        description: avgLength > 50
          ? "The candidate displayed professional etiquette and engagement throughout the interview. Their demeanor and responses suggest alignment with organizational values."
          : "The candidate's responses suggest areas for improvement in professional interview etiquette. Greater engagement and demonstration of respect for the process would strengthen their candidacy.",
      },
      {
        name: "Confidence and Clarity",
        score: Math.min(100, base + Math.floor(Math.random() * 18)),
        maxScore: 100,
        icon: <Shield className="h-5 w-5" />,
        description: avgLength > 50
          ? "The candidate was confident and clear in their responses. They addressed questions directly and provided substantive answers with good conviction."
          : "The candidate lacked confidence and clarity in their responses. Their answers were often vague and lacked substance, giving the impression of being unprepared.",
      },
    ];
  }, [avgLength]);

  const overallScore = Math.round(
    categories.reduce((s, c) => s + c.score, 0) / categories.length
  );

  const strengths = useMemo(() => {
    const strong = categories.filter((c) => c.score >= 50).sort((a, b) => b.score - a.score);
    const items: string[] = [];
    if (strong.length > 0) items.push(`Strong performance in ${strong[0].name} with a score of ${strong[0].score}/100.`);
    if (avgLength > 50) items.push("Provided detailed and structured responses to most questions.");
    if (strong.length > 1) items.push(`Showed competency in ${strong[1].name}, demonstrating relevant knowledge.`);
    items.push("Completed the full interview session, showing commitment to the process.");
    return items;
  }, [categories, avgLength]);

  const improvements = useMemo(() => {
    const weak = categories.filter((c) => c.score < 60).sort((a, b) => a.score - b.score);
    const items: string[] = [];
    if (weak.length > 0) items.push(`Focus on improving ${weak[0].name} — current score is ${weak[0].score}/100.`);
    if (avgLength <= 50) items.push("Provide more detailed and structured answers with specific examples.");
    if (weak.length > 1) items.push(`Work on strengthening ${weak[1].name} through practice and preparation.`);
    items.push("Consider using the STAR method (Situation, Task, Action, Result) to structure behavioral answers.");
    return items;
  }, [categories, avgLength]);

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-success";
    if (score >= 40) return "text-accent";
    return "text-destructive";
  };

  const getProgressColor = (score: number) => {
    if (score >= 70) return "bg-success";
    if (score >= 40) return "bg-accent";
    return "bg-destructive";
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return "bg-success/10 border-success/20";
    if (score >= 40) return "bg-accent/10 border-accent/20";
    return "bg-destructive/10 border-destructive/20";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Average";
    return "Needs Work";
  };

  const handleSendEmail = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSendingEmail(true);
    // Simulate sending email
    await new Promise((r) => setTimeout(r, 1500));
    toast.success(`Report sent to ${email}!`);
    setSendingEmail(false);
    setEmailSent(true);
  };

  return (
    <div className="flex-1 py-10 px-4 bg-gradient-to-b from-primary/5 via-background to-background min-h-screen">
      <div className="container max-w-4xl space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
            <Sparkles className="h-4 w-4" />
            Interview Complete
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Performance Report
          </h1>
          <p className="text-muted-foreground text-lg">
            Role:{" "}
            <span className="font-semibold text-primary">{role}</span>
          </p>
        </div>

        {/* Overall Score - Hero Card */}
        <Card className="border-2 border-primary/20 overflow-hidden relative">
          <div className="absolute inset-0 gradient-hero opacity-[0.04]" />
          <CardContent className="pt-8 pb-8 relative">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-widest">
                <BarChart3 className="h-4 w-4" />
                Overall Score
              </div>

              {/* Circular score indicator */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60" cy="60" r="52"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60" cy="60" r="52"
                    fill="none"
                    stroke={overallScore >= 70 ? "hsl(var(--success))" : overallScore >= 40 ? "hsl(var(--accent))" : "hsl(var(--destructive))"}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(overallScore / 100) * 327} 327`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="text-center">
                  <span className={`text-4xl font-extrabold ${getScoreColor(overallScore)}`}>
                    {overallScore}
                  </span>
                  <span className="block text-xs text-muted-foreground font-medium">
                    out of 100
                  </span>
                </div>
              </div>

              <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${getScoreBg(overallScore)} ${getScoreColor(overallScore)}`}>
                {getScoreLabel(overallScore)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Breakdown */}
        <div className="space-y-5">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Breakdown of the Interview
          </h2>

          <div className="grid gap-4">
            {categories.map((cat, i) => (
              <Card key={i} className="group hover:shadow-md transition-shadow duration-300 border-border/60">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border ${getScoreBg(cat.score)} ${getScoreColor(cat.score)}`}>
                      {cat.icon}
                    </div>
                    <div className="flex-1 min-w-0 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base font-bold">
                          {i + 1}. {cat.name}
                        </h3>
                        <span className={`text-sm font-bold tabular-nums ${getScoreColor(cat.score)}`}>
                          {cat.score}/{cat.maxScore}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ease-out ${getProgressColor(cat.score)}`}
                          style={{ width: `${cat.score}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Strengths & Improvements Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          <Card className="border-success/20 bg-success/[0.03]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-success/15 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-success" />
                </div>
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <Award className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span className="text-muted-foreground leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/[0.03]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
                  <TrendingDown className="h-4 w-4 text-accent" />
                </div>
                Areas of Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {improvements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <Target className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Send Report to Email */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Send Report to Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            {emailSent ? (
              <div className="flex items-center gap-3 text-success py-2">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Report has been sent to {email}!</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 py-5"
                />
                <Button
                  className="gradient-primary text-primary-foreground px-8 py-5 font-semibold shrink-0"
                  onClick={handleSendEmail}
                  disabled={sendingEmail}
                >
                  {sendingEmail ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                  ) : (
                    <><Mail className="mr-2 h-4 w-4" /> Send Report</>
                  )}
                </Button>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-3">
              We'll send a detailed PDF report of your interview performance to this email address.
            </p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 pb-8">
          <Button
            className="gradient-accent text-accent-foreground px-8 py-5 font-semibold text-base shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => navigate("/role-selection")}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Start New Interview
          </Button>
          <Button
            variant="outline"
            className="px-8 py-5 text-base"
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            View Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
