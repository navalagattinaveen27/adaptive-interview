import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, Send, MessageSquare, HelpCircle } from "lucide-react";
import { toast } from "sonner";

const Help = () => {
  const [subject, setSubject] = useState("");
  const [question, setQuestion] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !question.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    toast.success("Your question has been submitted. We'll get back to you soon!");
    setSubject("");
    setQuestion("");
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Please provide a rating.");
      return;
    }
    toast.success("Thank you for your feedback!");
    setFeedbackText("");
    setRating(0);
  };

  return (
    <div className="flex-1 py-8 px-4">
      <div className="container max-w-2xl space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Help & Feedback</h1>
          <p className="text-muted-foreground">Have a question or want to share your thoughts? We're here to help.</p>
        </div>

        <Tabs defaultValue="support">
          <TabsList className="w-full">
            <TabsTrigger value="support" className="flex-1">
              <HelpCircle className="mr-1.5 h-4 w-4" /> Support
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex-1">
              <MessageSquare className="mr-1.5 h-4 w-4" /> Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="support" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Send Us a Question</CardTitle>
                <CardDescription>We'll respond to your query as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitQuestion} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="e.g. Issue with interview audio"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="question">Your Question</Label>
                    <Textarea
                      id="question"
                      placeholder="Describe your question or issue in detail..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      rows={5}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="mr-1.5 h-4 w-4" /> Submit Question
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rate Your Experience</CardTitle>
                <CardDescription>Your feedback helps us improve the application.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Rating</Label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button type="button" key={s} onClick={() => setRating(s)} className="p-1">
                          <Star className={`h-8 w-8 transition-colors ${s <= rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feedback">Comments (optional)</Label>
                    <Textarea
                      id="feedback"
                      placeholder="Tell us what you liked or what we can improve..."
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <MessageSquare className="mr-1.5 h-4 w-4" /> Submit Feedback
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Help;
