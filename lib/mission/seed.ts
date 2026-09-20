import type {
  ActivitiesDoc,
  ApplicationsDoc,
  FinancesDoc,
  GoalsDoc,
  InterviewsDoc,
  MissionSettings,
  PhasesDoc,
  RecruitersDoc,
  RvReadinessDoc,
} from "./schemas";

function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T12:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function nowIso(): string {
  return new Date().toISOString();
}

const PHASE_DEFS = [
  {
    month: 1,
    title: "POSITION",
    goal: "Turn portfolio into a hiring machine.",
    objective: "Make the portfolio recruiter-ready.",
    tasks: [
      "Finalize portfolio positioning",
      "Improve homepage headline",
      "Polish About page",
      "Polish PracDrum case study",
      "Polish GlucorAI case study",
      "Polish Andy Ebert case study",
      "Add resume download",
      "Add remote-job CTA",
      "Finalize GitHub links",
      "Finalize technical architecture sections",
    ],
  },
  {
    month: 2,
    title: "PROOF",
    goal: "Strengthen technical proof.",
    objective: "Ship one documented technical demonstration project.",
    tasks: [
      "Build one small technical demonstration project",
      "Document architecture",
      "Document API design",
      "Document authentication",
      "Document database structure",
      "Document deployment",
      "Add project to portfolio",
      "Add GitHub repository",
      "Write technical case study",
    ],
  },
  {
    month: 3,
    title: "PIPELINE",
    goal: "Create a consistent job-search machine.",
    objective: "Hit daily application and contact targets consistently.",
    tasks: [
      "Track applications",
      "Track recruiter contacts",
      "Track hiring-manager contacts",
      "Track networking conversations",
      "Track recruiter screens",
      "Track technical interviews",
      "Track final interviews",
      "Track offers",
      "Hit 10 applications/day target",
      "Hit 10 targeted contacts/day target",
      "Work 5 days/week pipeline cadence",
    ],
  },
  {
    month: 4,
    title: "NETWORK",
    goal: "Increase professional visibility.",
    objective: "Build visible network and referral momentum.",
    tasks: [
      "LinkedIn profile optimization",
      "One technical post/week",
      "Contact former colleagues",
      "Contact recruiters",
      "Contact engineering managers",
      "Track referrals",
      "Track conversations",
      "Track introductions",
    ],
  },
  {
    month: 5,
    title: "INTERVIEW",
    goal: "Convert interviews into offers.",
    objective: "Build interview readiness and story library.",
    tasks: [
      "Prep React",
      "Prep Next.js",
      "Prep TypeScript",
      "Prep JavaScript",
      "Prep Node.js",
      "Prep APIs",
      "Prep SQL",
      "Prep Supabase/Postgres",
      "Prep AWS",
      "Prep system design",
      "Prep AI/LLM integration",
      "Prep behavioral questions",
      "Build interview-story library",
    ],
  },
  {
    month: 6,
    title: "RV TRANSITION",
    goal: "Evaluate remote employment and begin preparing for RV life.",
    objective: "Secure remote role and prepare RV readiness separately.",
    tasks: [
      "Evaluate job offer",
      "Confirm salary",
      "Confirm benefits",
      "Confirm remote-work policy",
      "Confirm work-from-anywhere restrictions",
      "Confirm working hours",
      "Confirm PTO",
      "Confirm equipment",
      "Confirm internet requirements",
      "Build RV budget",
      "Build emergency fund",
      "Map monthly expenses",
      "Complete RV research",
      "Plan test trips",
    ],
  },
] as const;

const INTERVIEW_TOPICS = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "APIs",
  "SQL",
  "Supabase/Postgres",
  "AWS",
  "System design",
  "AI/LLM integration",
  "Behavioral questions",
];

const STORY_TITLES = [
  "PracDrum architecture",
  "GlucorAI AI architecture",
  "Ecommerce experience",
  "Production deployment",
  "Difficult project",
  "Performance optimization",
  "Database design",
  "API design",
  "Client communication",
];

export function createSeedSettings(startDate = todayIso()): MissionSettings {
  const targetDate = addDays(startDate, 180);
  return {
    version: 1,
    updatedAt: nowIso(),
    startDate,
    targetDate,
    currentPhaseId: "phase_1",
    stages: {
      JOB: false,
      RUNWAY: false,
      TEST: false,
      RV_LIFE: false,
    },
    primaryObjective: "Make the portfolio recruiter-ready.",
  };
}

export function createSeedPhases(startDate = todayIso()): PhasesDoc {
  const phases = PHASE_DEFS.map((def) => {
    const phaseStart = addDays(startDate, (def.month - 1) * 30);
    const phaseEnd = addDays(startDate, def.month * 30 - 1);
    return {
      id: `phase_${def.month}`,
      month: def.month,
      title: def.title,
      goal: def.goal,
      objective: def.objective,
      startDate: phaseStart,
      endDate: phaseEnd,
      tasks: def.tasks.map((label, i) => ({
        id: `phase_${def.month}_task_${i + 1}`,
        label,
        completed: false,
      })),
    };
  });

  return {
    version: 1,
    updatedAt: nowIso(),
    phases,
  };
}

export function createSeedGoals(): GoalsDoc {
  return {
    version: 1,
    updatedAt: nowIso(),
    applicationsPerMonth: 200,
    contactsPerMonth: 200,
    networkingPerMonth: 20,
    technicalPostsPerMonth: 4,
    technicalProjects: 1,
    offersTarget: "Secure a full-time remote role",
  };
}

export function createEmptyActivities(): ActivitiesDoc {
  return { version: 1, updatedAt: nowIso(), items: [] };
}

export function createEmptyApplications(): ApplicationsDoc {
  return { version: 1, updatedAt: nowIso(), items: [] };
}

export function createEmptyRecruiters(): RecruitersDoc {
  return { version: 1, updatedAt: nowIso(), items: [] };
}

export function createSeedInterviews(): InterviewsDoc {
  return {
    version: 1,
    updatedAt: nowIso(),
    topics: INTERVIEW_TOPICS.map((topic, i) => ({
      id: `topic_${i + 1}`,
      topic,
      readiness: 0,
      notes: "",
    })),
    stories: STORY_TITLES.map((title, i) => ({
      id: `story_${i + 1}`,
      title,
      situation: "",
      action: "",
      result: "",
      tags: [],
    })),
  };
}

export function createEmptyFinances(): FinancesDoc {
  return {
    version: 1,
    updatedAt: nowIso(),
    currentMonthlyIncome: 0,
    monthlyExpenses: 0,
    savings: 0,
    emergencyFund: 0,
    targetEmergencyFund: 0,
    monthlyJobSearchBudget: 0,
    freelanceIncome: 0,
    saasIncome: 0,
    targetSalary: 0,
    estimatedMonthlyTakeHome: 0,
    rvMonthlyBudget: 0,
  };
}

export function createSeedRv(): RvReadinessDoc {
  const item = (id: string, label: string) => ({ id, label, completed: false });
  return {
    version: 1,
    updatedAt: nowIso(),
    jobSecured: false,
    rvReady: false,
    employment: [
      item("emp_remote", "Remote job secured"),
      item("emp_w2", "W-2"),
      item("emp_salary", "Salary confirmed"),
      item("emp_benefits", "Benefits confirmed"),
      item("emp_policy", "Remote policy confirmed"),
      item("emp_hours", "Working hours compatible with travel"),
    ],
    financial: [
      item("fin_emergency", "Emergency fund"),
      item("fin_monthly", "Monthly budget"),
      item("fin_rv", "RV budget"),
      item("fin_insurance", "Insurance budget"),
      item("fin_maintenance", "Maintenance reserve"),
    ],
    technical: [
      item("tech_laptop", "Laptop"),
      item("tech_backup", "Backup computer"),
      item("tech_hotspot", "Cell hotspot"),
      item("tech_internet", "Backup internet"),
      item("tech_power", "Power solution"),
      item("tech_workspace", "Workspace"),
    ],
    lifestyle: [
      item("life_test", "Test trip completed"),
      item("life_1w", "1-week work trip"),
      item("life_2w", "2-week work trip"),
      item("life_1m", "1-month work trip"),
    ],
  };
}
