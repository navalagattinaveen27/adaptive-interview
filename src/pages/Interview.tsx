import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Briefcase, Clock, Layers, Volume2, VolumeX, Mic, MicOff, Send, LogOut } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getPlanById, PRICING_PLANS } from "@/data/pricing";
import ChatBubble from "@/components/interview/ChatBubble";

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

  const [questions] = useState(() => generateQuestions(role, plan.questionCount));
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [answer, setAnswer] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [waitingForUser, setWaitingForUser] = useState(false);
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const userName = user?.name || "You";
  const progress = ((currentQ + 1) / questions.length) * 100;

  // Scroll chat to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Speak the current question automatically when it appears
  const speakAndWait = useCallback((questionText: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(questionText);
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeakingQuestion(true);
    utterance.onend = () => {
      setIsSpeakingQuestion(false);
      // Auto-start listening after question is read
      setWaitingForUser(true);
    };
    utterance.onerror = () => {
      setIsSpeakingQuestion(false);
      setWaitingForUser(true);
    };
    window.speechSynthesis.speak(utterance);
  }, []);

  // Start interview: add first question and speak it
  useEffect(() => {
    if (chatHistory.length === 0) {
      const firstQ = questions[0];
      setChatHistory([{ type: "ai", text: firstQ }]);
      speakAndWait(firstQ);
    }
  }, [chatHistory.length, questions, speakAndWait]);

  // Auto-start mic when waiting for user (after TTS finishes)
  useEffect(() => {
    if (waitingForUser && !isListening) {
      startListeningInternal();
      setWaitingForUser(false);
    }
  }, [waitingForUser, isListening]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeakingQuestion(false);
  }, []);

  const startListeningInternal = useCallback(() => {
    const SpeechRecognitionCtor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) return;

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let finalTranscript = "";

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
  }, []);

  const startListening = useCallback(() => {
    setAnswer("");
    startListeningInternal();
  }, [startListeningInternal]);

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

    if (trimmed) {
      setChatHistory((prev) => [...prev, { type: "user", text: trimmed }]);
    }

    if (currentQ < questions.length - 1) {
      const nextQ = currentQ + 1;
      setCurrentQ(nextQ);
      setAnswer("");

      // Add next question and speak it
      const nextQuestion = questions[nextQ];
      setChatHistory((prev) => [...prev, { type: "ai", text: nextQuestion }]);
      speakAndWait(nextQuestion);
    } else {
      sessionStorage.setItem("interview_answers", JSON.stringify(updated));
      sessionStorage.setItem("interview_questions", JSON.stringify(questions));
      navigate("/feedback");
    }
  };

  const handleEndInterview = () => {
    stopSpeaking();
    stopListening();

    // Save current answer if any
    const updated = [...answers];
    const trimmed = answer.trim();
    if (trimmed) {
      updated[currentQ] = trimmed;
    }

    // Only keep answered questions
    const answeredQuestions = questions.slice(0, currentQ + (trimmed ? 1 : 0));
    const answeredAnswers = updated.slice(0, currentQ + (trimmed ? 1 : 0));

    sessionStorage.setItem("interview_answers", JSON.stringify(answeredAnswers));
    sessionStorage.setItem("interview_questions", JSON.stringify(answeredQuestions));
    navigate("/feedback");
  };

  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const isLastQuestion = currentQ === questions.length - 1;

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-primary/5 via-background to-background min-h-screen">
      {/* Top bar */}
      <div className="border-b border-border/60 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-4xl py-3 px-4 space-y-3">
          <div className="flex flex-wrap gap-2 text-sm items-center">
            <Button
              variant="destructive"
              size="sm"
              className="rounded-full text-xs gap-1.5"
              onClick={() => setShowEndConfirm(true)}
            >
              <LogOut className="h-3.5 w-3.5" /> End Interview
            </Button>
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
      <div className="border-t border-border/60 bg-card/80 backdrop-blur-sm" onKeyDown={(e) => { if (e.key === "Enter" && answer.trim()) handleSubmitAnswer(); }}>
        <div className="container max-w-3xl py-4 px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className={`shrink-0 rounded-xl ${isSpeakingQuestion ? "bg-primary/10" : ""}`}
              onClick={isSpeakingQuestion ? stopSpeaking : () => speakAndWait(questions[currentQ])}
              title={isSpeakingQuestion ? "Stop reading" : "Repeat question"}
            >
              {isSpeakingQuestion ? (
                <VolumeX className="h-5 w-5 text-primary" />
              ) : (
                <Volume2 className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>

            <Button
              variant={isListening ? "destructive" : "outline"}
              size="icon"
              className={`shrink-0 rounded-xl h-[52px] w-[52px] ${isListening ? "animate-pulse" : ""}`}
              onClick={isListening ? stopListening : startListening}
              title={isListening ? "Stop recording" : "Start speaking"}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>

            <div className="flex-1 min-w-0">
              {answer ? (
                <p className="text-sm text-foreground truncate">{answer}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  {isListening ? "Listening... speak your answer" : isSpeakingQuestion ? "Listen to the question..." : "Click mic to answer"}
                </p>
              )}
            </div>

            <Button
              size="icon"
              className={`shrink-0 rounded-xl h-[52px] w-[52px] ${isLastQuestion ? "gradient-accent text-accent-foreground" : "gradient-primary text-primary-foreground"}`}
              onClick={handleSubmitAnswer}
              disabled={!answer.trim()}
              title={isLastQuestion ? "Submit Interview" : "Next Question"}
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
              Recording... Click the arrow when you're done answering
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interview;
