import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

interface ChatBubbleProps {
  type: "ai" | "user";
  message: string;
  userName?: string;
  timestamp?: string;
}

const ChatBubble = ({ type, message, userName = "You" }: ChatBubbleProps) => {
  const isAI = type === "ai";
  const initials = userName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`flex gap-3 ${isAI ? "flex-row" : "flex-row-reverse"} animate-fade-in`}>
      <Avatar className={`shrink-0 h-9 w-9 ${isAI ? "bg-primary/10 border-2 border-primary/20" : "bg-accent/10 border-2 border-accent/20"}`}>
        {isAI ? (
          <AvatarFallback className="bg-primary/10 text-primary">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        ) : (
          <AvatarFallback className="bg-accent/10 text-accent font-bold text-sm">
            {initials || "U"}
          </AvatarFallback>
        )}
      </Avatar>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isAI
            ? "bg-muted text-foreground rounded-tl-sm"
            : "bg-primary text-primary-foreground rounded-tr-sm"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatBubble;
