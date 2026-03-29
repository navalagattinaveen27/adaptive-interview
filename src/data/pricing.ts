export interface PricingPlan {
  id: string;
  name: string;
  duration: number; // minutes
  price: number; // base price in INR
  gst: number; // 18%
  total: number;
  questionsRange: [number, number]; // min, max
  questionCount: number; // actual count used in interview
  popular?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "basic",
    name: "Quick Practice",
    duration: 20,
    price: 250,
    gst: 45,
    total: 295,
    questionsRange: [10, 12],
    questionCount: 12,
  },
  {
    id: "standard",
    name: "Standard Interview",
    duration: 30,
    price: 375,
    gst: 67.5,
    total: 442.5,
    questionsRange: [15, 18],
    questionCount: 18,
    popular: true,
  },
  {
    id: "premium",
    name: "Deep Dive",
    duration: 45,
    price: 650,
    gst: 117,
    total: 767,
    questionsRange: [20, 25],
    questionCount: 25,
  },
];

export const PLAN_FEATURES = [
  "Simulate unlimited mock interviews",
  "Analyze all recorded interviews",
  "Interview for any job position",
  "Get AI-powered feedback on interview performance",
  "Access to full interview training program",
  "Share mock interviews for feedback",
  "Create your own custom interviews",
  "Track activity with admin dashboard",
];

export function getPlanById(id: string): PricingPlan | undefined {
  return PRICING_PLANS.find((p) => p.id === id);
}
