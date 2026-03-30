import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Briefcase, Clock, Layers, Volume2, VolumeX, Mic, MicOff, Send, PenLine, FileText } from "lucide-react";
import { getPlanById, PRICING_PLANS } from "@/data/pricing";
import ChatBubble from "@/components/interview/ChatBubble";
import WrittenQuestionsPhase from "@/components/interview/WrittenQuestionsPhase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
    "What value would you bring to our team on day one?",
    "Tell me about a time you went above and beyond expectations.",
    "How do you deal with ambiguity in a project?",
    "What's the most impactful feedback you've received?",
    "How do you build relationships with stakeholders?",
    "Do you have any questions for us?",
  ];
  return allQuestions.slice(0, Math.min(count, allQuestions.length));
};

type InterviewPhase = "pre-prompt" | "written" | "verbal";

interface ChatMessage {
  type: "ai" | "user";
  text: string;
}

const Interview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = sessionStorage.getItem("interview_role") || "General";
  const domain = sessionStorage.getItem("interview_domain") || "";
  const experience = sessionStorage.getItem("interview_experience") || "";
  const planId = sessionStorage.getItem("selected_plan") || "standard";
  const plan = getPlanById(planId) || PRICING_PLANS[1];

  const [phase, setPhase] = useState<InterviewPhase>("pre-prompt");
  const [includeWritten, setIncludeWritten] = useState(false);
  const [writtenAnswers, setWrittenAnswers] = useState<{ question: string; answer: string }[]>([]);

  const [questions] = useState(() => generateQuestions(role, plan.questionCount));
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [answer, setAnswer] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const userName = user?.name || "You";
  const progress = ((currentQ + 1) / questions.length) * 100;

  // Scroll chat to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Add first question to chat when verbal phase starts
  useEffect(() => {
    if (phase === "verbal" && chatHistory.length === 0) {
      setChatHistory([{ type: "ai", text: questions[0] }]);
    }
  }, [phase, chatHistory.length, questions]);

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

  const handleSubmitAnswer = () => {
    stopSpeaking();
    stopListening();

    const trimmed = answer.trim();
    const updated = [...answers];
    updated[currentQ] = trimmed;
    setAnswers(updated);

    // Add user answer to chat
    if (trimmed) {
      setChatHistory((prev) => [...prev, { type: "user", text: trimmed }]);
    }

    if (currentQ < questions.length - 1) {
      const nextQ = currentQ + 1;
      setCurrentQ(nextQ);
      setAnswer(answers[nextQ] || "");
      // Add next AI question
      setChatHistory((prev) => [...prev, { type: "ai", text: questions[nextQ] }]);
    } else {
      sessionStorage.setItem("interview_answers", JSON.stringify(updated));
      sessionStorage.setItem("interview_questions", JSON.stringify(questions));
      if (writtenAnswers.length > 0) {
        sessionStorage.setItem("written_answers", JSON.stringify(writtenAnswers));
      }
      navigate("/feedback");
    }
  };

  const isLastQuestion = currentQ === questions.length - 1;

  // Pre-prompt dialog
  if (phase === "pre-prompt") {
    return (
      <div className="flex-1 flex items-center justify-center py-12 px-4 bg-gradient-to-b from-primary/5 via-background to-background min-h-screen">
        <Dialog open onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <PenLine className="h-5 w-5 text-primary" />
                Written Assessment
              </DialogTitle>
              <DialogDescription>
                Would you like to include written questions before the verbal interview?
                Based on your <span className="font-semibold text-foreground">{plan.name}</span> plan,
                you'll get {plan.writtenQuestions.initialCount} written question{plan.writtenQuestions.initialCount > 1 ? "s" : ""} with
                up to {plan.writtenQuestions.maxTimeMinutes} minutes total.
                Complete early to earn bonus questions!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setIncludeWritten(false);
                  setPhase("verbal");
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                Skip, go verbal only
              </Button>
              <Button
                className="flex-1 gradient-primary text-primary-foreground"
                onClick={() => {
                  setIncludeWritten(true);
                  setPhase("written");
                }}
              >
                <PenLine className="mr-2 h-4 w-4" />
                Include Written Questions
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Written questions phase
  if (phase === "written") {
    return (
      <WrittenQuestionsPhase
        config={plan.writtenQuestions}
        role={role}
        onComplete={(results) => {
          setWrittenAnswers(results);
          setPhase("verbal");
        }}
      />
    );
  }

  // Verbal interview - chat style
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-primary/5 via-background to-background min-h-screen">
      {/* Top bar */}
      <div className="border-b border-border/60 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-4xl py-3 px-4 space-y-3">
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 font-semibold text-xs">
              <Briefcase className="h-3.5 w-3.5" /> {role}
            </span>
            {domain && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted text-muted-foreground px-3 py-1 text-xs">
                <Layers className="h-3.5 w-3.5" /> {domain}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted text-muted-foreground px-3 py-1 text-xs">
              <Clock className="h-3.5 w-3.5" /> {plan.name} ({plan.duration} min)
            </span>
            {includeWritten && writtenAnswers.length > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 text-accent px-3 py-1 text-xs">
                <PenLine className="h-3.5 w-3.5" /> {writtenAnswers.length} written done
              </span>
            )}
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Question {currentQ + 1} of {questions.length}</span>
              <span className="font-bold text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto">
        <div className="container max-w-3xl py-6 px-4 space-y-4">
          {chatHistory.map((msg, i) => (
            <ChatBubble
              key={i}
              type={msg.type}
              message={msg.text}
              userName={userName}
            />
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-border/60 bg-card/80 backdrop-blur-sm">
        <div className="container max-w-3xl py-4 px-4">
          <div className="flex items-center gap-2">
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

            <div className="relative flex-1">
              <Textarea
                placeholder="Type your answer or use the mic..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={2}
                className="resize-none text-sm pr-12 min-h-[52px] max-h-32"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (answer.trim()) handleSubmitAnswer();
                  }
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                className={`absolute right-2 bottom-1.5 rounded-lg ${isListening ? "bg-destructive/10 text-destructive animate-pulse" : "text-muted-foreground hover:text-primary"}`}
                onClick={isListening ? stopListening : startListening}
                title={isListening ? "Stop recording" : "Answer with voice"}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>

            <Button
              size="icon"
              className={`shrink-0 rounded-xl h-[52px] w-[52px] ${isLastQuestion ? "gradient-accent text-accent-foreground" : "gradient-primary text-primary-foreground"}`}
              onClick={handleSubmitAnswer}
              disabled={!answer.trim()}
              title={isLastQuestion ? "Submit Interview" : "Send"}
            >
              {isLastQuestion ? <Send className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </Button>
          </div>

          {isListening && (
            <div className="flex items-center gap-2 text-xs text-primary font-medium animate-pulse mt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Listening... Speak your answer now
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interview;
