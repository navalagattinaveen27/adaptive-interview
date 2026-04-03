import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Phone, ArrowLeft, User } from "lucide-react";

const ForgotUsername = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
    toast.success("Username details sent to your phone/email!");
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 bg-gradient-to-b from-primary/5 via-background to-background min-h-screen">
      <Card className="w-full max-w-md animate-fade-in shadow-xl border-border/60">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-3 h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
            <User className="h-7 w-7 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Forgot Username</CardTitle>
          <CardDescription>
            {sent
              ? "Check your phone/email for your username."
              : "Enter your registered phone number to recover your username."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recover-phone" className="text-sm font-medium">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="recover-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-9"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
              <Button className="w-full gradient-primary text-primary-foreground py-5 font-semibold" disabled={loading}>
                {loading ? "Sending..." : "Recover Username"}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                We've sent your username details to the phone number ending in <span className="font-medium text-foreground">...{phone.slice(-4)}</span>.
              </p>
              <Button variant="outline" className="w-full" onClick={() => { setSent(false); setPhone(""); }}>
                Try Again
              </Button>
            </div>
          )}
          <Button
            variant="ghost"
            className="w-full mt-4 text-muted-foreground"
            onClick={() => navigate("/login")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotUsername;
