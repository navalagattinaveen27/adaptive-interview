import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Smartphone, CheckCircle2, Briefcase, Layers, Clock, Shield, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Payment = () => {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const role = sessionStorage.getItem("interview_role") || "";
  const domain = sessionStorage.getItem("interview_domain") || "";
  const experience = sessionStorage.getItem("interview_experience") || "";

  if (!role) {
    navigate("/role-selection");
    return null;
  }

  const handlePayment = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Payment successful!");
    setProcessing(false);
    navigate("/device-check");
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 bg-gradient-to-b from-primary/5 via-background to-background min-h-screen">
      <div className="w-full max-w-2xl grid md:grid-cols-5 gap-6 animate-fade-in">
        {/* Order Summary */}
        <Card className="md:col-span-2 shadow-lg border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/50">
                <Briefcase className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div><p className="text-xs text-muted-foreground">Role</p><p className="font-semibold">{role}</p></div>
              </div>
              {domain && (
                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/50">
                  <Layers className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div><p className="text-xs text-muted-foreground">Domain</p><p className="font-semibold">{domain}</p></div>
                </div>
              )}
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/50">
                <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div><p className="text-xs text-muted-foreground">Experience</p><p className="font-semibold">{experience || "Not specified"}</p></div>
              </div>
            </div>
            <hr className="border-border" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Interview Session</span><span className="font-medium">₹375.00</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">GST (18%)</span><span className="font-medium">₹67.50</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">AI Feedback Report</span><span className="text-success font-medium">Included</span></div>
              <hr className="border-border" />
              <div className="flex justify-between font-bold text-lg pt-1"><span>Total</span><span className="text-primary">₹442.50</span></div>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground pt-2">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success shrink-0" /> 15 AI-powered questions</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success shrink-0" /> Detailed scoring & feedback</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success shrink-0" /> Performance insights</div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card className="md:col-span-3 shadow-lg border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="card">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="card" className="gap-1.5"><CreditCard className="h-4 w-4" /> Card</TabsTrigger>
                <TabsTrigger value="upi" className="gap-1.5"><Smartphone className="h-4 w-4" /> UPI</TabsTrigger>
              </TabsList>

              <TabsContent value="card" className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Card Number</Label>
                  <Input placeholder="1234 5678 9012 3456" className="py-5" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label className="text-sm font-medium">Expiry</Label><Input placeholder="MM/YY" className="py-5" /></div>
                  <div className="space-y-2"><Label className="text-sm font-medium">CVV</Label><Input placeholder="123" type="password" className="py-5" /></div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Cardholder Name</Label>
                  <Input placeholder="Name on card" className="py-5" />
                </div>
                <Button
                  className="w-full gradient-primary text-primary-foreground py-6 font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all"
                  onClick={handlePayment}
                  disabled={processing}
                >
                  {processing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : "Pay $5"}
                </Button>
              </TabsContent>

              <TabsContent value="upi" className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">UPI ID</Label>
                  <Input placeholder="yourname@upi" className="py-5" />
                </div>
                <Button
                  className="w-full gradient-primary text-primary-foreground py-6 font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all"
                  onClick={handlePayment}
                  disabled={processing}
                >
                  {processing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : "Pay $5 via UPI"}
                </Button>
              </TabsContent>
            </Tabs>

            <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1.5">
              <Shield className="h-3.5 w-3.5" />
              Secured with 256-bit SSL encryption
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
