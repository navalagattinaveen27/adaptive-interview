import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield } from "lucide-react";

interface TermsConsentDialogProps {
  open: boolean;
  onAccept: () => void;
  onDismiss: () => void;
}

const TermsConsentDialog = ({ open, onAccept, onDismiss }: TermsConsentDialogProps) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onDismiss(); }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <DialogTitle className="text-lg">Terms & Conditions</DialogTitle>
          </div>
          <DialogDescription className="text-sm">
            Please review and accept before continuing.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-48 rounded-md border p-4 text-sm text-muted-foreground leading-relaxed">
          <h4 className="font-semibold text-foreground mb-2">1. Usage Agreement</h4>
          <p className="mb-3">
            By using this platform, you agree to participate in AI-powered mock interviews designed for practice and learning purposes only. Interview results are not shared with any employer or third party.
          </p>
          <h4 className="font-semibold text-foreground mb-2">2. Data & Privacy</h4>
          <p className="mb-3">
            Your responses, audio recordings (if applicable), and session data are processed to provide feedback. We do not sell or share your personal information. Session data may be stored temporarily to generate performance reports.
          </p>
          <h4 className="font-semibold text-foreground mb-2">3. Recording Consent</h4>
          <p className="mb-3">
            During interviews, your microphone input may be used for speech-to-text processing. You may choose to use text-only mode at any time. No recordings are permanently stored without your explicit consent.
          </p>
          <h4 className="font-semibold text-foreground mb-2">4. Fair Use</h4>
          <p className="mb-3">
            This service is intended for individual interview preparation. Automated or bulk usage is prohibited. We reserve the right to limit access in case of misuse.
          </p>
          <h4 className="font-semibold text-foreground mb-2">5. Disclaimer</h4>
          <p>
            Interview feedback is AI-generated and should be used as guidance only. We make no guarantees regarding actual interview outcomes.
          </p>
        </ScrollArea>

        <div className="flex items-start gap-3 mt-2">
          <Checkbox
            id="terms-agree"
            checked={agreed}
            onCheckedChange={(v) => setAgreed(v === true)}
            className="mt-0.5"
          />
          <label htmlFor="terms-agree" className="text-sm cursor-pointer leading-snug">
            I have read and agree to the Terms & Conditions and Privacy Policy.
          </label>
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <Button variant="ghost" size="sm" onClick={onDismiss}>
            Later
          </Button>
          <Button size="sm" disabled={!agreed} onClick={onAccept}>
            Accept & Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsConsentDialog;
