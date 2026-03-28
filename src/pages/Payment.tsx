import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Smartphone, CheckCircle2, Briefcase, Layers, Clock } from "lucide-react";
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
    // Mock payment processing
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Payment successful!");
    setProcessing(false);
    navigate("/device-check");
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl grid md:grid-cols-5 gap-6 animate-fade-in">
        {/* Order Summary */}
        <Card className="md:col-span-2">
          <CardHeader><CardTitle className="text-lg">Order Summary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Briefcase className="h-4 w-4 text-primary mt-0.5" />
                <div><p className="text-muted-foreground">Role</p><p className="font-medium">{role}</p></div>
              </div>
              {domain && (
                <div className="flex items-start gap-2">
                  <Layers className="h-4 w-4 text-primary mt-0.5" />
                  <div><p className="text-muted-foreground">Domain</p><p className="font-medium">{domain}</p></div>
                </div>
              )}
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-primary mt-0.5" />
                <div><p className="text-muted-foreground">Experience</p><p className="font-medium">{experience}</p></div>
              </div>
            </div>
            <hr className="border-border" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Interview Session</span><span>$5</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">AI Feedback Report</span><span>Included</span></div>
              <hr className="border-border" />
              <div className="flex justify-between font-bold text-base"><span>Total</span><span>$5</span></div>
            </div>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> 15 AI-powered questions</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Detailed scoring & feedback</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Performance insights</div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card className="md:col-span-3">
          <CardHeader><CardTitle className="text-lg">Payment</CardTitle></CardHeader>
          <CardContent>
            <Tabs defaultValue="card">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="card" className="gap-1.5"><CreditCard className="h-4 w-4" /> Card</TabsTrigger>
                <TabsTrigger value="upi" className="gap-1.5"><Smartphone className="h-4 w-4" /> UPI</TabsTrigger>
              </TabsList>

              <TabsContent value="card" className="space-y-4">
                <div><Label>Card Number</Label><Input placeholder="1234 5678 9012 3456" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Expiry</Label><Input placeholder="MM/YY" /></div>
                  <div><Label>CVV</Label><Input placeholder="123" type="password" /></div>
                </div>
                <div><Label>Cardholder Name</Label><Input placeholder="Name on card" /></div>
                <Button className="w-full gradient-primary text-primary-foreground py-5 font-semibold" onClick={handlePayment} disabled={processing}>
                  {processing ? "Processing..." : "Pay $5"}
                </Button>
              </TabsContent>

              <TabsContent value="upi" className="space-y-4">
                <div><Label>UPI ID</Label><Input placeholder="yourname@upi" /></div>
                <Button className="w-full gradient-primary text-primary-foreground py-5 font-semibold" onClick={handlePayment} disabled={processing}>
                  {processing ? "Processing..." : "Pay $5 via UPI"}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
