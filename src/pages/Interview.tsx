import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft, Briefcase, Clock, Layers, Volume2, VolumeX, Mic, MicOff, Send } from "lucide-react";
import { getPlanById, PRICING_PLANS } from "@/data/pricing";

const generateQuestions = (role: string, count: number): string[] => {
  const allQuestions = [
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
    "Tell me about your experience working in teams.",
    "How do you handle constructive criticism?",
    "What is your approach to continuous learning and self-improvement?",
    "Describe a situation where you demonstrated leadership skills.",
    "How do you manage work-life balance?",
    "Do you have any questions for us?",
  ];
  return allQuestions.slice(0, Math.min(count, allQuestions.length));
};

const Interview = () => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("interview_role") || "General";
  const domain = sessionStorage.getItem("interview_domain") || "";
  const experience = sessionStorage.getItem("interview_experience") || "";
  const planId = sessionStorage.getItem("selected_plan") || "standard";
  const plan = getPlanById(planId) || PRICING_PLANS[1];

  const [questions] = useState(() => generateQuestions(role, plan.questionCount));
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [answer, setAnswer] = useState("");
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const progress = ((currentQ + 1) / questions.length) * 100;

  const speakQuestion = useCallback(() => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(questions[currentQ]);
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeakingQuestion(true);
    utterance.onend = () => setIsSpeakingQuestion(false);
    utterance.onerror = () => setIsSpeakingQuestion(false);
    window.speechSynthesis.speak(utterance);
  }, [currentQ, questions]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeakingQuestion(false);
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognitionCtor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) return;

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let finalTranscript = answer;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += (finalTranscript ? " " : "") + transcript;
        } else {
          interim = transcript;
        }
      }
      setAnswer(finalTranscript + (interim ? " " + interim : ""));
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [answer]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      recognitionRef.current?.stop();
    };
  }, []);

  const handleNext = () => {
    stopSpeaking();
    stopListening();
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
      stopSpeaking();
      stopListening();
      const updated = [...answers];
      updated[currentQ] = answer;
      setAnswers(updated);
      setCurrentQ(currentQ - 1);
      setAnswer(answers[currentQ - 1] || "");
    }
  };

  const isLastQuestion = currentQ === questions.length - 1;

  return (
    <div className="flex-1 py-8 px-4 bg-gradient-to-b from-primary/5 via-background to-background min-h-screen">
      <div className="container max-w-3xl space-y-6 animate-fade-in">
        {/* Session info bar */}
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1.5 font-semibold text-xs">
            <Briefcase className="h-3.5 w-3.5" /> {role}
          </span>
          {domain && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted text-muted-foreground px-3 py-1.5 text-xs">
              <Layers className="h-3.5 w-3.5" /> {domain}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted text-muted-foreground px-3 py-1.5 text-xs">
            <Clock className="h-3.5 w-3.5" /> {plan.name} ({plan.duration} min)
          </span>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-medium">Question {currentQ + 1} of {questions.length}</span>
            <span className="font-bold text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2.5" />
        </div>

        {/* Question Card */}
        <Card className="shadow-lg border-border/60 overflow-hidden">
          <div className="h-1 gradient-primary" />
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">
                  Question {currentQ + 1}
                </p>
                <CardTitle className="text-xl leading-relaxed">{questions[currentQ]}</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className={`shrink-0 rounded-xl ${isSpeakingQuestion ? "bg-primary/10" : ""}`}
                onClick={isSpeakingQuestion ? stopSpeaking : speakQuestion}
                title={isSpeakingQuestion ? "Stop reading" : "Read question aloud"}
              >
                {isSpeakingQuestion ? (
                  <VolumeX className="h-5 w-5 text-primary" />
                ) : (
                  <Volume2 className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder="Type your answer here or use the microphone..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={8}
                className="resize-none text-base pr-14 focus:shadow-md transition-shadow"
              />
              <Button
                variant="ghost"
                size="icon"
                className={`absolute right-2 bottom-2 rounded-xl ${isListening ? "bg-destructive/10 text-destructive animate-pulse" : "text-muted-foreground hover:text-primary"}`}
                onClick={isListening ? stopListening : startListening}
                title={isListening ? "Stop recording" : "Answer with voice"}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
            </div>
            {isListening && (
              <div className="flex items-center gap-2 text-xs text-primary font-medium animate-pulse">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                Listening... Speak your answer now
              </div>
            )}
            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQ === 0} className="px-5 py-5">
                <ChevronLeft className="mr-1 h-4 w-4" /> Previous
              </Button>
              <Button
                className={`px-6 py-5 font-bold ${isLastQuestion ? "gradient-accent text-accent-foreground" : "gradient-primary text-primary-foreground"}`}
                onClick={handleNext}
              >
                {isLastQuestion ? (
                  <>Submit Interview <Send className="ml-1 h-4 w-4" /></>
                ) : (
                  <>Next <ChevronRight className="ml-1 h-4 w-4" /></>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Interview;
