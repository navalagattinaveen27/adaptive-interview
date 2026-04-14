import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, FileText, CheckCircle2, Loader2, X } from "lucide-react";

interface ResumeUploadProps {
  onParsed: (text: string) => void;
}

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ACCEPTED_EXTENSIONS = ".pdf,.doc,.docx";

const ResumeUpload = ({ onParsed }: ResumeUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [parsed, setParsed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!ACCEPTED_TYPES.includes(selected.type)) {
      toast.error("Only PDF and Word documents (.pdf, .doc, .docx) are allowed.");
      e.target.value = "";
      return;
    }

    setFile(selected);
    setParsed(false);
  };

  const removeFile = () => {
    setFile(null);
    setParsed(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleParse = async () => {
    if (!file) return;
    setParsing(true);

    try {
      let text = "";

      if (file.type === "application/pdf") {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items
            .map((item: any) => item.str)
            .join(" ") + "\n";
        }
      } else {
        // .doc / .docx
        const mammoth = await import("mammoth");
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      }

      const trimmed = text.trim();
      if (!trimmed) {
        toast.error("Could not extract text from the resume. Please try a different file.");
        setParsing(false);
        return;
      }

      onParsed(trimmed);
      setParsed(true);
      toast.success("Resume parsed successfully!");
    } catch (err) {
      console.error("Resume parse error:", err);
      toast.error("Failed to parse the resume. Please try a different file.");
    } finally {
      setParsing(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-sm font-semibold">
        <Upload className="h-4 w-4 text-primary" /> Attach Resume (Optional)
      </Label>
      <p className="text-xs text-muted-foreground">
        Upload your resume to auto-fill details. Accepted formats: PDF, DOC, DOCX
      </p>

      <div className="flex items-center gap-2">
        <label
          className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-border bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors text-sm"
        >
          <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="truncate text-muted-foreground">
            {file ? file.name : "Choose a file..."}
          </span>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_EXTENSIONS}
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        {file && !parsing && (
          <button
            type="button"
            onClick={removeFile}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {file && !parsed && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleParse}
          disabled={parsing}
        >
          {parsing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Parsing Resume...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" /> Parse Resume
            </>
          )}
        </Button>
      )}

      {parsed && (
        <p className="text-xs text-primary font-medium flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> Resume parsed — data will be used to tailor your interview
        </p>
      )}
    </div>
  );
};

export default ResumeUpload;
