import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, AlertTriangle, Star, ChevronRight, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface QuestionFeedback {
  question: string;
  answer: string;
  score: number;
  strength: string;
  improvement: string;
}

const Feedback = () => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("interview_role") || "General";
  const [userFeedback, setUserFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const feedbackData = useMemo<QuestionFeedback[]>(() => {
    const questions = JSON.parse(sessionStorage.getItem("interview_questions") || "[]");
    const answers = JSON.parse(sessionStorage.getItem("interview_answers") || "[]");
    return questions.map((q: string, i: number) => ({
      question: q,
      answer: answers[i] || "(No answer provided)",
      score: answers[i]?.length > 20 ? Math.floor(Math.random() * 3) + 7 : Math.floor(Math.random() * 4) + 4,
      strength: answers[i]?.length > 20 ? "Good detail and structure in your response." : "Attempted the question.",
      improvement: answers[i]?.length > 50 ? "Consider adding more specific examples." : "Provide more detailed and structured answers.",
    }));
  }, []);

  const overallScore = feedbackData.length
    ? Math.round(feedbackData.reduce((s, f) => s + f.score, 0) / feedbackData.length * 10)
    : 0;

  const strongAnswers = feedbackData.filter((f) => f.score >= 7).length;
  const weakAnswers = feedbackData.filter((f) => f.score < 5).length;

  const handleStartNew = () => {
    navigate("/role-selection");
  };

  const handleSubmitFeedback = () => {
    toast.success("Thank you for your feedback!");
    setUserFeedback("");
    setRating(0);
  };

  return (
    <div className="flex-1 py-8 px-4">
      <div className="container max-w-4xl space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Interview Feedback</h1>
          <p className="text-muted-foreground">Your performance summary for <span className="font-medium text-foreground">{role}</span></p>
        </div>

        {/* Score Overview */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-4xl font-extrabold text-primary mb-1">{overallScore}%</div>
              <p className="text-sm text-muted-foreground">Overall Score</p>
              <Progress value={overallScore} className="mt-3 h-2" />
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 text-success mb-1">
                <CheckCircle2 className="h-6 w-6" />
                <span className="text-4xl font-extrabold">{strongAnswers}</span>
              </div>
              <p className="text-sm text-muted-foreground">Strong Answers</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 text-accent mb-1">
                <AlertTriangle className="h-6 w-6" />
                <span className="text-4xl font-extrabold">{weakAnswers}</span>
              </div>
              <p className="text-sm text-muted-foreground">Needs Improvement</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Feedback */}
        <Tabs defaultValue="questions">
          <TabsList>
            <TabsTrigger value="questions">Question Breakdown</TabsTrigger>
            <TabsTrigger value="rate">Rate Experience</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-4 mt-4">
            {feedbackData.map((f, i) => (
              <Card key={i}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-base font-medium leading-relaxed">Q{i + 1}: {f.question}</CardTitle>
                    <span className={`shrink-0 rounded-full px-3 py-1 text-sm font-bold ${f.score >= 7 ? "bg-success/10 text-success" : f.score >= 5 ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"}`}>
                      {f.score}/10
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-muted-foreground text-xs mb-1">Your Answer:</p>
                    <p className="line-clamp-3">{f.answer}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      <div><p className="font-medium text-success text-xs">Strength</p><p className="text-muted-foreground">{f.strength}</p></div>
                    </div>
                    <div className="flex gap-2">
                      <AlertTriangle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <div><p className="font-medium text-accent text-xs">Improvement</p><p className="text-muted-foreground">{f.improvement}</p></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="rate" className="mt-4">
            <Card>
              <CardHeader><CardTitle className="text-lg">Rate Your Experience</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} onClick={() => setRating(s)} className="p-1">
                      <Star className={`h-8 w-8 transition-colors ${s <= rating ? "fill-accent text-accent" : "text-border"}`} />
                    </button>
                  ))}
                </div>
                <Textarea
                  placeholder="Share your feedback about the interview experience..."
                  value={userFeedback}
                  onChange={(e) => setUserFeedback(e.target.value)}
                  rows={4}
                />
                <Button onClick={handleSubmitFeedback} disabled={!rating}>
                  <MessageSquare className="mr-1.5 h-4 w-4" /> Submit Feedback
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button className="gradient-accent text-accent-foreground px-6 py-5 font-semibold" onClick={handleStartNew}>
            Start New Interview <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
          <Button variant="outline" className="px-6 py-5" onClick={() => navigate("/dashboard")}>
            View Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
