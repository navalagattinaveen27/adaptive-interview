import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setSending(false);
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "support@evalsmart.com", href: "mailto:support@evalsmart.com" },
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, label: "Address", value: "123 Innovation Drive, San Francisco, CA 94105" },
    { icon: Clock, label: "Hours", value: "Mon–Fri, 9:00 AM – 6:00 PM PST" },
  ];

  return (
    <div className="flex-1 py-8 px-4 bg-gradient-to-b from-primary/5 via-background to-background min-h-screen">
      <div className="container max-w-5xl space-y-8 animate-fade-in">
        <div className="text-center space-y-3">
          <div className="mx-auto mb-1 h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
            <Mail className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Have questions or need assistance? Reach out and our team will respond promptly.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Contact Info */}
          <div className="md:col-span-2 space-y-4">
            {contactInfo.map((item) => (
              <Card key={item.label} className="border-border/60">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-primary hover:underline break-all">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <Card className="md:col-span-3 shadow-lg border-border/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Send className="h-4 w-4 text-primary" /> Send a Message
              </CardTitle>
              <CardDescription>Fill out the form and we'll get back to you soon.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-medium">Name *</Label>
                    <Input id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-medium">Email *</Label>
                    <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="font-medium">Subject</Label>
                  <Input id="subject" placeholder="What's this about?" value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={200} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="font-medium">Message *</Label>
                  <Textarea id="message" placeholder="Tell us how we can help..." value={message} onChange={(e) => setMessage(e.target.value)} rows={5} maxLength={1000} className="focus:shadow-md transition-shadow" />
                </div>
                <Button type="submit" disabled={sending} className="w-full gradient-primary text-primary-foreground py-5 font-semibold">
                  {sending ? "Sending..." : <><Send className="mr-1.5 h-4 w-4" /> Send Message</>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
