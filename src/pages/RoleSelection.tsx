import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ROLES, getDomainsForRole, EXPERIENCE_OPTIONS } from "@/data/roles";
import { Search, ChevronRight, Briefcase, Layers, Clock } from "lucide-react";

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
    sessionStorage.setItem("interview_role", role);
    sessionStorage.setItem("interview_domain", domain);
    sessionStorage.setItem("interview_experience", experience);
    navigate("/payment");
  };

  const DropdownInput = ({
    label, icon: Icon, value, search, setSearch, show, setShow, items, onSelect, placeholder,
  }: {
    label: string; icon: typeof Briefcase; value: string; search: string;
    setSearch: (v: string) => void; show: boolean; setShow: (v: boolean) => void;
    items: string[]; onSelect: (v: string) => void; placeholder: string;
  }) => (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-sm font-medium">
        <Icon className="h-4 w-4 text-primary" /> {label}
      </Label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder={placeholder}
          value={show ? search : value || search}
          onChange={(e) => { setSearch(e.target.value); setShow(true); onSelect(e.target.value); }}
          onFocus={() => setShow(true)}
          onBlur={() => setTimeout(() => setShow(false), 200)}
        />
        {show && items.length > 0 && (
          <div className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-lg border border-border bg-card shadow-lg">
            {items.map((item) => (
              <button
                key={item}
                type="button"
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                onMouseDown={() => { onSelect(item); setSearch(""); setShow(false); }}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
      {value && !show && (
        <p className="text-xs text-primary font-medium">Selected: {value}</p>
      )}
    </div>
  );

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-lg animate-fade-in">
        <CardHeader className="text-center">
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

          {domains.length > 0 && (
            <DropdownInput
              label="Domain / Specialization"
              icon={Layers}
              value={domain}
              search={domainSearch}
              setSearch={setDomainSearch}
              show={showDomainDropdown}
              setShow={setShowDomainDropdown}
              items={filteredDomains}
              onSelect={setDomain}
              placeholder="Search or type a domain..."
            />
          )}

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

          {/* Summary */}
          {canProceed && (
            <div className="rounded-lg bg-muted p-4 space-y-1 text-sm">
              <p><span className="text-muted-foreground">Role:</span> <span className="font-medium">{role}</span></p>
              {domain && <p><span className="text-muted-foreground">Domain:</span> <span className="font-medium">{domain}</span></p>}
              <p><span className="text-muted-foreground">Experience:</span> <span className="font-medium">{experience}</span></p>
            </div>
          )}

          <Button
            className="w-full gradient-accent text-accent-foreground py-6 rounded-xl text-base font-semibold"
            disabled={!canProceed}
            onClick={handleProceed}
          >
            Continue to Payment <ChevronRight className="ml-1 h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleSelection;
