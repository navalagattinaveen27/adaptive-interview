export const ROLES = [
  "Software Engineer","Frontend Developer","Backend Developer","Full Stack Developer",
  "Data Scientist","Data Analyst","AI Engineer","Machine Learning Engineer",
  "DevOps Engineer","Cloud Engineer","Cybersecurity Analyst","QA Engineer",
  "Test Engineer","System Administrator","UI Designer","UX Designer",
  "Product Manager","Product Owner","Business Analyst","Project Manager",
  "Scrum Master","HR Manager","Recruiter","Operations Manager",
  "Sales Executive","Sales Manager","Marketing Manager","Digital Marketing Specialist",
  "Content Writer","Graphic Designer","Video Editor","Journalist",
  "Customer Support Executive","Call Center Executive","Relationship Manager",
  "Financial Analyst","Investment Banker","Accountant","Auditor","Insurance Advisor",
  "Bank Probationary Officer (PO)","Bank Clerk","RBI Grade B Officer","NABARD Officer","LIC AAO",
  "IAS Officer","IPS Officer","IFS Officer","State PCS Officer","SSC Officer","Railway Officer",
  "Lawyer","Advocate","Legal Advisor","Corporate Counsel","Public Prosecutor","Judge",
  "Doctor","Nurse","Pharmacist","Medical Officer","Lab Technician",
  "School Teacher","Lecturer","Assistant Professor","Professor","Principal",
  "Mechanical Engineer","Civil Engineer","Electrical Engineer","Electronics Engineer",
  "PSU Engineer","PWD Engineer",
  "Store Manager","Hospitality Manager","Pilot","Cabin Crew","Ground Staff",
  "Army Officer","Navy Officer","Air Force Officer","Police Sub-Inspector","Constable",
  "Intelligence Bureau Officer","Security Analyst",
  "APSC Officer","Arunachal Pradesh PSC Officer","Manipur PSC Officer","Tripura PSC Officer",
  "Meghalaya PSC Officer","Nagaland PSC Officer","Mizoram PSC Officer","JKPSC (KAS) Officer",
  "Goa PSC Officer","MPPSC Officer","CGPSC Officer","WBCS Officer","OAS Officer","JPSC Officer",
  "MPSC State Services Officer","GPSC Officer","KAS Officer (Karnataka)","TNPSC Group 1 Officer",
  "Kerala PSC (KAS) Officer","APPSC Group 1 Officer","TSPSC Group 1 Officer","UPPCS Officer",
  "BPSC CCE Officer","HCS Officer","Punjab PCS Officer","RAS Officer","UKPCS Officer","HPAS Officer",
  "Deputy Collector","Sub Divisional Magistrate (SDM)","Assistant Commissioner",
  "Block Development Officer (BDO)","District Registrar",
  "Deputy Superintendent of Police (DSP)","Assistant Commissioner of Police (ACP)",
  "Commercial Tax Officer (CTO)","State Tax Officer (STO)","Treasury Officer",
  "Excise Inspector","District Panchayat Officer","Municipal Commissioner",
  "Assistant Director","Section Officer","Labour Officer","Employment Officer",
  "NDA Cadet","CDS Officer","AFCAT Officer","INET Officer",
  "TES Officer (Army)","TGC Officer (Army)","SSC Tech Officer (Army)",
  "NCC Special Entry Officer","JAG Officer (Army)","UES Officer",
  "AFCAT Flying Branch Officer","AFCAT Ground Duty Officer",
  "Navy Executive Branch Officer","Navy Engineering Branch Officer","Navy Electrical Branch Officer",
  "Supply Chain Manager","Warehouse Manager","Logistics Coordinator",
  "Electrician","Plumber","Technician","Machine Operator",
  "Freelance Developer","Virtual Assistant","Online Tutor",
];

type DomainMap = Record<string, string[]>;

const IT_DOMAINS = ["Web Development","Mobile Development","Cloud Computing","AI & Machine Learning","Data Engineering","Cybersecurity","DevOps & SRE","Embedded Systems","Blockchain","Game Development"];
const GOV_DOMAINS = ["Civil Services","Police Services","Railway Services","Banking Services","Defense Services","Revenue Services","Foreign Services","State Services"];
const FINANCE_DOMAINS = ["Retail Banking","Investment Banking","Risk Management","Wealth Management","Insurance","Auditing","Taxation","Corporate Finance"];
const LEGAL_DOMAINS = ["Corporate Law","Criminal Law","Civil Law","Constitutional Law","Intellectual Property Law","Family Law","International Law"];
const HEALTHCARE_DOMAINS = ["General Medicine","Surgery","Pediatrics","Cardiology","Neurology","Orthopedics","Dermatology","Radiology","Pathology","Pharmacy"];
const EDUCATION_DOMAINS = ["Primary Education","Secondary Education","Higher Education","Special Education","STEM Education","Arts & Humanities","Research"];
const ENGINEERING_DOMAINS = ["Structural Engineering","Automotive","Power Systems","Manufacturing","HVAC","Robotics","Aerospace"];
const MANAGEMENT_DOMAINS = ["Strategy","Operations","Human Resources","Marketing","Supply Chain","Product Management","Consulting"];
const CREATIVE_DOMAINS = ["UI/UX Design","Graphic Design","Content Strategy","Video Production","Social Media","Brand Design","Motion Graphics"];

const ROLE_CATEGORY: Record<string, string[]> = {
  IT: ["Software Engineer","Frontend Developer","Backend Developer","Full Stack Developer","Data Scientist","Data Analyst","AI Engineer","Machine Learning Engineer","DevOps Engineer","Cloud Engineer","Cybersecurity Analyst","QA Engineer","Test Engineer","System Administrator","Freelance Developer"],
  GOV: ["IAS Officer","IPS Officer","IFS Officer","State PCS Officer","SSC Officer","Railway Officer","Bank Probationary Officer (PO)","Bank Clerk","RBI Grade B Officer","NABARD Officer","LIC AAO","PSU Engineer","PWD Engineer","Police Sub-Inspector","Constable","Intelligence Bureau Officer","APSC Officer","Arunachal Pradesh PSC Officer","Manipur PSC Officer","Tripura PSC Officer","Meghalaya PSC Officer","Nagaland PSC Officer","Mizoram PSC Officer","JKPSC (KAS) Officer","Goa PSC Officer","MPPSC Officer","CGPSC Officer","WBCS Officer","OAS Officer","JPSC Officer","MPSC State Services Officer","GPSC Officer","KAS Officer (Karnataka)","TNPSC Group 1 Officer","Kerala PSC (KAS) Officer","APPSC Group 1 Officer","TSPSC Group 1 Officer","UPPCS Officer","BPSC CCE Officer","HCS Officer","Punjab PCS Officer","RAS Officer","UKPCS Officer","HPAS Officer","Deputy Collector","Sub Divisional Magistrate (SDM)","Assistant Commissioner","Block Development Officer (BDO)","District Registrar","Deputy Superintendent of Police (DSP)","Assistant Commissioner of Police (ACP)","Commercial Tax Officer (CTO)","State Tax Officer (STO)","Treasury Officer","Excise Inspector","District Panchayat Officer","Municipal Commissioner","Assistant Director","Section Officer","Labour Officer","Employment Officer"],
  FINANCE: ["Financial Analyst","Investment Banker","Accountant","Auditor","Insurance Advisor","Relationship Manager"],
  LEGAL: ["Lawyer","Advocate","Legal Advisor","Corporate Counsel","Public Prosecutor","Judge"],
  HEALTHCARE: ["Doctor","Nurse","Pharmacist","Medical Officer","Lab Technician"],
  EDUCATION: ["School Teacher","Lecturer","Assistant Professor","Professor","Principal","Online Tutor"],
  ENGINEERING: ["Mechanical Engineer","Civil Engineer","Electrical Engineer","Electronics Engineer"],
  MANAGEMENT: ["Product Manager","Product Owner","Business Analyst","Project Manager","Scrum Master","HR Manager","Recruiter","Operations Manager","Sales Executive","Sales Manager","Marketing Manager","Supply Chain Manager","Warehouse Manager","Logistics Coordinator","Store Manager","Hospitality Manager"],
  CREATIVE: ["UI Designer","UX Designer","Digital Marketing Specialist","Content Writer","Graphic Designer","Video Editor","Journalist","Virtual Assistant"],
  DEFENSE: ["Army Officer","Navy Officer","Air Force Officer","Pilot","Cabin Crew","Ground Staff"],
};

const CATEGORY_DOMAINS: DomainMap = {
  IT: IT_DOMAINS, GOV: GOV_DOMAINS, FINANCE: FINANCE_DOMAINS, LEGAL: LEGAL_DOMAINS,
  HEALTHCARE: HEALTHCARE_DOMAINS, EDUCATION: EDUCATION_DOMAINS, ENGINEERING: ENGINEERING_DOMAINS,
  MANAGEMENT: MANAGEMENT_DOMAINS, CREATIVE: CREATIVE_DOMAINS, DEFENSE: GOV_DOMAINS,
};

export function getDomainsForRole(role: string): string[] {
  for (const [cat, roles] of Object.entries(ROLE_CATEGORY)) {
    if (roles.includes(role)) return CATEGORY_DOMAINS[cat] || [];
  }
  return [];
}

export const EXPERIENCE_OPTIONS = [
  "Fresher","0-1 years","1-2 years","2-3 years","3-5 years","5-7 years",
  "7-10 years","10-15 years","15-20 years","20-30 years","30-40 years","40-50 years","50+ years",
];
