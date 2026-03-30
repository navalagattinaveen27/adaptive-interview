import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Send, PenLine } from "lucide-react";
import type { WrittenQuestionConfig } from "@/data/pricing";

const WRITTEN_QUESTIONS_POOL = [
  "Explain the architecture of a system you've designed or worked on. Include diagrams if helpful.",
  "Write a detailed analysis of a technical problem you solved, including your approach and trade-offs considered.",
  "Describe a process improvement you implemented. What was the before/after and measurable impact?",
  "Draft a proposal for how you would solve a common problem in your domain. Include timeline and resource estimates.",
  "Write about a time you had to make a difficult technical decision. What factors did you consider?",
  "Explain a complex concept from your field as if you were teaching it to a junior colleague.",
  "Describe your approach to testing and quality assurance. How do you ensure reliability?",
  "Write about how you would onboard a new team member into your current/previous project.",
];

interface WrittenQuestionsPhaseProps {
  config: WrittenQuestionConfig;
  role: string;
  onComplete: (answers: { question: string; answer: string }[]) => void;
}

const WrittenQuestionsPhase = ({ config, role, onComplete }: WrittenQuestionsPhaseProps) => {
  const [questions] = useState(() =>
    WRITTEN_QUESTIONS_POOL.slice(0, config.initialCount + 1) // +1 for potential bonus
  );
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(config.maxTimeMinutes * 60);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [maxQuestions, setMaxQuestions] = useState(config.initialCount);

  useEffect(() => {
    const timer = setInterval(() => {
      setTotalSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Time's up — submit whatever we have
          const finalAnswers = [...answers];
          if (answer.trim()) finalAnswers[currentQ] = answer;
          const result = questions.slice(0, finalAnswers.length).map((q, i) => ({
            question: q,
            answer: finalAnswers[i] || "",
          }));
          onComplete(result);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [answers, answer, currentQ, questions, onComplete]);

  const handleSubmitAnswer = useCallback(() => {
    const elapsed = (Date.now() - questionStartTime) / 1000 / 60; // minutes
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    // Check if bonus question earned (completed before threshold)
    if (elapsed < config.bonusThresholdMinutes && maxQuestions < questions.length) {
      setMaxQuestions((prev) => prev + 1);
    }

    if (currentQ + 1 < maxQuestions) {
      setCurrentQ(currentQ + 1);
      setAnswer("");
      setQuestionStartTime(Date.now());
    } else {
      const result = questions.slice(0, newAnswers.length).map((q, i) => ({
        question: q,
        answer: newAnswers[i] || "",
      }));
      onComplete(result);
    }
  }, [answer, answers, currentQ, maxQuestions, questionStartTime, config.bonusThresholdMinutes, questions, onComplete]);

  const mins = Math.floor(totalSecondsLeft / 60);
  const secs = totalSecondsLeft % 60;
  const isLowTime = totalSecondsLeft < 60;

  return (
    <div className="flex-1 py-8 px-4 bg-gradient-to-b from-primary/5 via-background to-background min-h-screen">
      <div className="container max-w-3xl space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PenLine className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Written Assessment</h2>
          </div>
          <div className={`flex items-center gap-2 text-sm font-mono font-bold px-3 py-1.5 rounded-full border ${
            isLowTime ? "bg-destructive/10 border-destructive/20 text-destructive animate-pulse" : "bg-muted border-border text-foreground"
          }`}>
            <Clock className="h-4 w-4" />
            {mins}:{secs.toString().padStart(2, "0")}
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Question {currentQ + 1} of {maxQuestions} • Role: <span className="font-semibold text-primary">{role}</span>
        </p>

        <Card className="shadow-lg border-border/60">
          <div className="h-1 gradient-primary" />
          <CardHeader>
            <CardTitle className="text-lg leading-relaxed">{questions[currentQ]}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Write your detailed answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={10}
              className="resize-none text-base focus:shadow-md transition-shadow"
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {answer.length} characters
              </span>
              <Button
                className="gradient-primary text-primary-foreground px-6 py-5 font-bold"
                onClick={handleSubmitAnswer}
                disabled={!answer.trim()}
              >
                {currentQ + 1 < maxQuestions ? (
                  <>Next Question <Send className="ml-1 h-4 w-4" /></>
                ) : (
                  <>Submit & Start Interview <Send className="ml-1 h-4 w-4" /></>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WrittenQuestionsPhase;
