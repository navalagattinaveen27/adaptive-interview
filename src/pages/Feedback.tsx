import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, TrendingUp, TrendingDown, Award, Target } from "lucide-react";

interface CategoryScore {
  name: string;
  score: number;
  maxScore: number;
  description: string;
}

const Feedback = () => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("interview_role") || "General";
  const answers = JSON.parse(sessionStorage.getItem("interview_answers") || "[]");

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
        description: avgLength > 50
          ? "The candidate demonstrated clear and structured communication. Responses were articulate with good use of examples, though there is room for more concise delivery in some areas."
          : "The candidate's communication needs improvement. Responses lacked structure and detail. There was limited use of specific examples to support their answers.",
      },
      {
        name: "Technical Knowledge",
        score: Math.min(100, base + Math.floor(Math.random() * 25)),
        maxScore: 100,
        description: avgLength > 50
          ? "The candidate showed solid technical understanding relevant to the role. They were able to discuss concepts with reasonable depth and provided relevant examples from their experience."
          : "The candidate demonstrated limited technical knowledge. They failed to elaborate or provide specific examples, indicating a superficial understanding of the domain.",
      },
      {
        name: "Problem Solving",
        score: Math.min(100, base + Math.floor(Math.random() * 15)),
        maxScore: 100,
        description: avgLength > 50
          ? "The candidate showed good analytical thinking and approached problems methodically. They demonstrated the ability to break down complex scenarios into manageable steps."
          : "The candidate showed limited problem-solving ability. They avoided addressing questions directly and did not offer clear solutions or approaches to the problems posed.",
      },
      {
        name: "Cultural Fit",
        score: Math.min(100, base + Math.floor(Math.random() * 20)),
        maxScore: 100,
        description: avgLength > 50
          ? "The candidate displayed professional etiquette and engagement throughout the interview. Their demeanor and responses suggest alignment with organizational values."
          : "The candidate's responses suggest areas for improvement in professional interview etiquette. Greater engagement and demonstration of respect for the process would strengthen their candidacy.",
      },
      {
        name: "Confidence and Clarity",
        score: Math.min(100, base + Math.floor(Math.random() * 18)),
        maxScore: 100,
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

  return (
    <div className="flex-1 py-8 px-4">
      <div className="container max-w-4xl space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Interview Feedback</h1>
          <p className="text-muted-foreground">
            Performance report for{" "}
            <span className="font-medium text-foreground">{role}</span>
          </p>
        </div>

        {/* Overall Score */}
        <Card className="border-2 border-primary/20">
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Overall Score
              </p>
              <div className={`text-6xl font-extrabold ${getScoreColor(overallScore)}`}>
                {overallScore}
                <span className="text-2xl text-muted-foreground font-normal">/100</span>
              </div>
              <div className="w-full max-w-md">
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${getProgressColor(overallScore)}`}
                    style={{ width: `${overallScore}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Breakdown of the Interview */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Breakdown of the Interview:</h2>
          {categories.map((cat, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-baseline gap-2">
                <h3 className="text-base font-bold">
                  {i + 1}. {cat.name}{" "}
                  <span className={`${getScoreColor(cat.score)}`}>
                    ({cat.score}/{cat.maxScore})
                  </span>
                </h3>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getProgressColor(cat.score)}`}
                  style={{ width: `${cat.score}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {cat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Strengths */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Award className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Areas of Improvement */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-accent" />
              Areas of Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {improvements.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Target className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button
            className="gradient-accent text-accent-foreground px-6 py-5 font-semibold"
            onClick={() => navigate("/role-selection")}
          >
            Start New Interview <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="px-6 py-5"
            onClick={() => navigate("/dashboard")}
          >
            View Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
