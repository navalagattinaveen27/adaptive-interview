import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mic, Volume2, CheckCircle2, XCircle, Loader2, ChevronRight } from "lucide-react";

type TestStatus = "idle" | "testing" | "passed" | "failed";

const DeviceCheck = () => {
  const navigate = useNavigate();
  const [micStatus, setMicStatus] = useState<TestStatus>("idle");
  const [speakerStatus, setSpeakerStatus] = useState<TestStatus>("idle");
  const [micLevel, setMicLevel] = useState(0);
  const animFrameRef = useRef<number>();
  const streamRef = useRef<MediaStream | null>(null);

  const testMicrophone = useCallback(async () => {
    setMicStatus("testing");
    setMicLevel(0);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let maxLevel = 0;
      const startTime = Date.now();

      const check = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        const normalized = Math.min(avg / 80, 1);
        if (normalized > maxLevel) maxLevel = normalized;
        setMicLevel(normalized);

        if (Date.now() - startTime < 4000) {
          animFrameRef.current = requestAnimationFrame(check);
        } else {
          stream.getTracks().forEach((t) => t.stop());
          audioCtx.close();
          streamRef.current = null;
          setMicStatus(maxLevel > 0.05 ? "passed" : "failed");
        }
      };
      check();
    } catch {
      setMicStatus("failed");
    }
  }, []);

  const testSpeaker = useCallback(() => {
    setSpeakerStatus("testing");
    try {
      const utterance = new SpeechSynthesisUtterance(
        "Hello! Your speakers are working correctly. You are ready for the interview."
      );
      utterance.rate = 1;
      utterance.onend = () => setSpeakerStatus("passed");
      utterance.onerror = () => setSpeakerStatus("failed");
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } catch {
      setSpeakerStatus("failed");
    }
  }, []);

  const canProceed = micStatus === "passed" && speakerStatus === "passed";

  const handleProceed = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    navigate("/interview");
  };

  const StatusIcon = ({ status }: { status: TestStatus }) => {
    if (status === "testing") return <Loader2 className="h-5 w-5 animate-spin text-primary" />;
    if (status === "passed") return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    if (status === "failed") return <XCircle className="h-5 w-5 text-destructive" />;
    return null;
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-lg animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Device Check</CardTitle>
          <CardDescription>
            Please test your microphone and speakers before starting the interview
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Microphone Test */}
          <div className="rounded-xl border p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mic className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Microphone</p>
                  <p className="text-xs text-muted-foreground">
                    {micStatus === "idle" && "Click to test your microphone"}
                    {micStatus === "testing" && "Speak something now..."}
                    {micStatus === "passed" && "Microphone is working!"}
                    {micStatus === "failed" && "No audio detected. Check your mic."}
                  </p>
                </div>
              </div>
              <StatusIcon status={micStatus} />
            </div>

            {micStatus === "testing" && (
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-100"
                  style={{ width: `${micLevel * 100}%` }}
                />
              </div>
            )}

            {(micStatus === "idle" || micStatus === "failed") && (
              <Button variant="outline" className="w-full" onClick={testMicrophone}>
                <Mic className="mr-2 h-4 w-4" />
                {micStatus === "failed" ? "Retry Microphone Test" : "Test Microphone"}
              </Button>
            )}
          </div>

          {/* Speaker Test */}
          <div className="rounded-xl border p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Volume2 className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold">Speakers</p>
                  <p className="text-xs text-muted-foreground">
                    {speakerStatus === "idle" && "Click to test your speakers"}
                    {speakerStatus === "testing" && "Playing test audio..."}
                    {speakerStatus === "passed" && "Speakers are working!"}
                    {speakerStatus === "failed" && "Audio playback failed. Check speakers."}
                  </p>
                </div>
              </div>
              <StatusIcon status={speakerStatus} />
            </div>

            {(speakerStatus === "idle" || speakerStatus === "failed") && (
              <Button variant="outline" className="w-full" onClick={testSpeaker}>
                <Volume2 className="mr-2 h-4 w-4" />
                {speakerStatus === "failed" ? "Retry Speaker Test" : "Test Speakers"}
              </Button>
            )}
          </div>

          {/* Proceed */}
          <Button
            className="w-full gradient-accent text-accent-foreground py-6 rounded-xl text-base font-semibold"
            disabled={!canProceed}
            onClick={handleProceed}
          >
            Start Interview <ChevronRight className="ml-1 h-5 w-5" />
          </Button>

          {!canProceed && (
            <p className="text-center text-xs text-muted-foreground">
              Both tests must pass before you can proceed
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceCheck;
