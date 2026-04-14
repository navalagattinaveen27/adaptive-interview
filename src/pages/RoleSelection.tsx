import { useState, useMemo } from "react";
import TermsConsentDialog from "@/components/TermsConsentDialog";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ROLES, getDomainsForRole, EXPERIENCE_OPTIONS } from "@/data/roles";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Search, ChevronRight, Briefcase, Layers, Clock, LucideIcon, Sparkles, CheckCircle2, Building2, FileText, Shield } from "lucide-react";
import ResumeUpload from "@/components/interview/ResumeUpload";

interface DropdownInputProps {
  label: string;
  icon: LucideIcon;
  value: string;
  search: string;
  setSearch: (v: string) => void;
  show: boolean;
  setShow: (v: boolean) => void;
  items: string[];
  onSelect: (v: string) => void;
  placeholder: string;
}

const DropdownInput = ({
  label, icon: Icon, value, search, setSearch, show, setShow, items, onSelect, placeholder,
}: DropdownInputProps) => (
  <div className="space-y-2 rounded-xl bg-muted/40 p-4 border border-border/40">
    <Label className="flex items-center gap-2 text-sm font-semibold">
      <Icon className="h-4 w-4 text-primary" /> {label}
    </Label>
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        className="pl-9 py-5 transition-shadow focus:shadow-md"
        placeholder={placeholder}
        value={show ? search : value || search}
        onChange={(e) => { setSearch(e.target.value); setShow(true); onSelect(e.target.value); }}
        onFocus={() => setShow(true)}
        onBlur={(e) => {
          const container = e.currentTarget.closest('.relative');
          const relatedTarget = e.relatedTarget as Node | null;
          if (container && relatedTarget && container.contains(relatedTarget)) return;
          setTimeout(() => setShow(false), 150);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === 'Tab') {
            setShow(false);
            if (search && !value) onSelect(search);
          }
        }}
      />
      {show && items.length > 0 && (
        <div className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-xl border border-border bg-card shadow-xl">
          {items.map((item) => (
            <button
              key={item}
              type="button"
              tabIndex={-1}
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-primary/5 hover:text-primary transition-colors"
              onMouseDown={(e) => { e.preventDefault(); onSelect(item); setSearch(""); setShow(false); }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
    {value && !show && (
      <p className="text-xs text-primary font-medium flex items-center gap-1">
        <CheckCircle2 className="h-3 w-3" /> {value}
      </p>
    )}
  </div>
);

const RoleSelection = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [roleSearch, setRoleSearch] = useState("");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const [domain, setDomain] = useState("");
  const [domainSearch, setDomainSearch] = useState("");
  const [showDomainDropdown, setShowDomainDropdown] = useState(false);

  const [experience, setExperience] = useState("");
  const [expSearch, setExpSearch] = useState("");
  const [showExpDropdown, setShowExpDropdown] = useState(false);

  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [showTerms, setShowTerms] = useState(false);

  const termsAccepted = sessionStorage.getItem("terms_accepted") === "true";

  const domains = useMemo(() => getDomainsForRole(role), [role]);

  const filteredRoles = useMemo(() => {
    const q = roleSearch.toLowerCase();
    return q ? ROLES.filter((r) => r.toLowerCase().includes(q)) : ROLES;
  }, [roleSearch]);

  const filteredDomains = useMemo(() => {
    const q = domainSearch.toLowerCase();
    return q ? domains.filter((d) => d.toLowerCase().includes(q)) : domains;
  }, [domainSearch, domains]);

  const filteredExp = useMemo(() => {
    const q = expSearch.toLowerCase();
    return q ? EXPERIENCE_OPTIONS.filter((e) => e.toLowerCase().includes(q)) : EXPERIENCE_OPTIONS;
  }, [expSearch]);

  const canProceed = role.trim().length > 0;

  const handleProceed = () => {
    const accepted = sessionStorage.getItem("terms_accepted");
    if (!accepted) {
      toast.error("Please accept the Terms & Conditions first. You can do so during login.");
      return;
    }
    sessionStorage.setItem("interview_role", role);
    sessionStorage.setItem("interview_domain", domain);
    sessionStorage.setItem("interview_experience", experience);
    sessionStorage.setItem("interview_company", company);
    sessionStorage.setItem("interview_job_description", jobDescription);
    sessionStorage.setItem("interview_resume", resumeText);
    navigate("/payment");
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 bg-gradient-to-b from-primary/5 via-background to-background min-h-screen">
      <Card className="w-full max-w-lg animate-fade-in shadow-xl border-border/60 bg-primary/[0.02]">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-3 h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
            <Sparkles className="h-7 w-7 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Customize Your Interview</CardTitle>
          <CardDescription>Select your target role, domain, and experience level</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <DropdownInput
            label="Target Role *"
            icon={Briefcase}
            value={role}
            search={roleSearch}
            setSearch={setRoleSearch}
            show={showRoleDropdown}
            setShow={setShowRoleDropdown}
            items={filteredRoles}
            onSelect={(v) => { setRole(v); setDomain(""); }}
            placeholder="Search or type a role..."
          />

          <DropdownInput
            label="Domain / Specialization (Optional)"
            icon={Layers}
            value={domain}
            search={domainSearch}
            setSearch={setDomainSearch}
            show={showDomainDropdown}
            setShow={setShowDomainDropdown}
            items={filteredDomains}
            onSelect={setDomain}
            placeholder={domains.length > 0 ? "Select from suggestions or type your own..." : "Type your domain or specialization..."}
          />

          <DropdownInput
            label="Years of Experience (Optional)"
            icon={Clock}
            value={experience}
            search={expSearch}
            setSearch={setExpSearch}
            show={showExpDropdown}
            setShow={setShowExpDropdown}
            items={filteredExp}
            onSelect={setExperience}
            placeholder="Select or type experience..."
          />

          {/* Resume Upload */}
          <ResumeUpload onParsed={(text) => setResumeText(text)} />

          {/* Job Description */}
          <div className="space-y-2 rounded-xl bg-muted/40 p-4 border border-border/40">
            <Label className="flex items-center gap-2 text-sm font-semibold">
              <FileText className="h-4 w-4 text-primary" /> Job Description (Optional)
            </Label>
            <Textarea
              className="min-h-[120px] transition-shadow focus:shadow-md resize-y"
              placeholder="Paste or type the job description here. We'll tailor your interview questions based on the role requirements, skills, and qualifications mentioned in the JD to give you the most relevant practice experience."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            {jobDescription.trim().length > 0 && (
              <p className="text-xs text-primary font-medium flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Job description added — questions will be tailored accordingly
              </p>
            )}
          </div>

          {/* Target Company */}
          <div className="space-y-2 rounded-xl bg-muted/40 p-4 border border-border/40">
            <Label className="flex items-center gap-2 text-sm font-semibold">
              <Building2 className="h-4 w-4 text-primary" /> Target Company (Optional)
            </Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9 py-5 transition-shadow focus:shadow-md"
                placeholder="e.g. Google, TCS, Infosys..."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>

          {canProceed && (
            <div className="rounded-xl bg-primary/5 border border-primary/15 p-4 space-y-1.5 text-sm">
              <p className="font-semibold text-primary text-xs uppercase tracking-wider mb-2">Your Selection</p>
              <p><span className="text-muted-foreground">Role:</span> <span className="font-semibold">{role}</span></p>
              {domain && <p><span className="text-muted-foreground">Domain:</span> <span className="font-semibold">{domain}</span></p>}
              {experience && <p><span className="text-muted-foreground">Experience:</span> <span className="font-semibold">{experience}</span></p>}
              {company && <p><span className="text-muted-foreground">Company:</span> <span className="font-semibold">{company}</span></p>}
              {jobDescription && <p><span className="text-muted-foreground">Job Description:</span> <span className="font-semibold">Added ✓</span></p>}
            </div>
          )}

          {!termsAccepted && (
            <button
              type="button"
              onClick={() => setShowTerms(true)}
              className="flex items-center justify-center gap-2 w-full text-sm text-primary font-semibold hover:underline underline-offset-4 transition-all py-2"
            >
              <Shield className="h-4 w-4" />
              Click here to accept the Terms and Conditions
            </button>
          )}

          {termsAccepted && (
            <p className="flex items-center justify-center gap-2 text-sm text-primary font-medium">
              <CheckCircle2 className="h-4 w-4" />
              Terms and Conditions accepted
            </p>
          )}

          <Button
            className="w-full gradient-primary text-primary-foreground py-6 rounded-xl text-base font-bold shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
            disabled={!canProceed}
            onClick={handleProceed}
          >
            Continue to Payment <ChevronRight className="ml-1 h-5 w-5" />
          </Button>
        </CardContent>
      </Card>

      <TermsConsentDialog
        open={showTerms}
        onAccept={() => {
          sessionStorage.setItem("terms_accepted", "true");
          setShowTerms(false);
        }}
        onDismiss={() => setShowTerms(false)}
      />
    </div>
  );
};

export default RoleSelection;
