import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Briefcase, Clock, Layers } from "lucide-react";

const generateQuestions = (role: string): string[] => [
  "Tell me about yourself and why you're interested in this role.",
  `What motivated you to pursue a career as a ${role}?`,
  "Describe a challenging project you've worked on. What was your role and contribution?",
  "How do you stay updated with the latest trends and technologies in your field?",
  "Tell me about a time you had a disagreement with a colleague. How did you handle it?",
  "What are your greatest professional strengths?",
  "Where do you see yourself in 5 years?",
  "How do you prioritize tasks when working on multiple projects simultaneously?",
  "Describe a situation where you had to learn something new quickly.",
  "How do you handle pressure and tight deadlines?",
  "Tell me about a time you failed. What did you learn from it?",
  "What makes you a good fit for this position?",
  "How do you approach problem-solving in complex situations?",
  "Describe your ideal work environment.",
  "Do you have any questions for us?",
];

const Interview = () => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("interview_role") || "General";
  const domain = sessionStorage.getItem("interview_domain") || "";
  const experience = sessionStorage.getItem("interview_experience") || "";

  const [questions] = useState(() => generateQuestions(role));
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(15).fill(""));
  const [answer, setAnswer] = useState("");

  const progress = ((currentQ + 1) / questions.length) * 100;

  const handleNext = () => {
    const updated = [...answers];
    updated[currentQ] = answer;
    setAnswers(updated);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setAnswer(answers[currentQ + 1] || "");
    } else {
      sessionStorage.setItem("interview_answers", JSON.stringify(updated));
      sessionStorage.setItem("interview_questions", JSON.stringify(questions));
      navigate("/feedback");
    }
  };

  const handlePrevious = () => {
    if (currentQ > 0) {
      const updated = [...answers];
      updated[currentQ] = answer;
      setAnswers(updated);
      setCurrentQ(currentQ - 1);
      setAnswer(answers[currentQ - 1] || "");
    }
  };

  return (
    <div className="flex-1 py-8 px-4">
      <div className="container max-w-3xl space-y-6 animate-fade-in">
        {/* Session info bar */}
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 font-medium">
            <Briefcase className="h-3.5 w-3.5" /> {role}
          </span>
          {domain && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted text-muted-foreground px-3 py-1">
              <Layers className="h-3.5 w-3.5" /> {domain}
            </span>
          )}
          {experience && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted text-muted-foreground px-3 py-1">
              <Clock className="h-3.5 w-3.5" /> {experience}
            </span>
          )}
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Question {currentQ + 1} of {questions.length}</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">{questions[currentQ]}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={8}
              className="resize-none text-base"
            />
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQ === 0}>
                Previous
              </Button>
              <Button className="gradient-primary text-primary-foreground px-6" onClick={handleNext}>
                {currentQ === questions.length - 1 ? "Submit Interview" : "Next"} <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Interview;
