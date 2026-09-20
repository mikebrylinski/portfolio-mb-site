import { z } from "zod";

export const missionStageSchema = z.enum(["JOB", "RUNWAY", "TEST", "RV_LIFE"]);
export type MissionStage = z.infer<typeof missionStageSchema>;

export const applicationStatusSchema = z.enum([
  "FOUND",
  "QUALIFIED",
  "APPLIED",
  "RECRUITER_CONTACTED",
  "PHONE_SCREEN",
  "TECHNICAL",
  "FINAL",
  "OFFER",
  "ACCEPTED",
  "REJECTED",
  "WITHDRAWN",
]);
export type ApplicationStatus = z.infer<typeof applicationStatusSchema>;

export const recruiterStatusSchema = z.enum([
  "New",
  "Contacted",
  "Responded",
  "Conversation",
  "Interview",
  "Dormant",
  "Closed",
]);
export type RecruiterStatus = z.infer<typeof recruiterStatusSchema>;

export const activityTypeSchema = z.enum([
  "application",
  "recruiter_contact",
  "hiring_manager_contact",
  "networking",
  "interview",
  "follow_up",
  "portfolio_work",
  "coding_study",
  "linkedin_post",
  "other",
]);
export type ActivityType = z.infer<typeof activityTypeSchema>;

const docMeta = {
  version: z.number().int().nonnegative(),
  updatedAt: z.string(),
};

export const phaseTaskSchema = z.object({
  id: z.string(),
  label: z.string(),
  completed: z.boolean(),
});

export const phaseSchema = z.object({
  id: z.string(),
  month: z.number().int().min(1).max(6),
  title: z.string(),
  goal: z.string(),
  objective: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  tasks: z.array(phaseTaskSchema),
});

export const settingsSchema = z.object({
  ...docMeta,
  startDate: z.string(),
  targetDate: z.string(),
  currentPhaseId: z.string(),
  stages: z.object({
    JOB: z.boolean(),
    RUNWAY: z.boolean(),
    TEST: z.boolean(),
    RV_LIFE: z.boolean(),
  }),
  primaryObjective: z.string(),
});
export type MissionSettings = z.infer<typeof settingsSchema>;

export const phasesDocSchema = z.object({
  ...docMeta,
  phases: z.array(phaseSchema),
});
export type PhasesDoc = z.infer<typeof phasesDocSchema>;

export const goalsSchema = z.object({
  ...docMeta,
  applicationsPerMonth: z.number().nonnegative(),
  contactsPerMonth: z.number().nonnegative(),
  networkingPerMonth: z.number().nonnegative(),
  technicalPostsPerMonth: z.number().nonnegative(),
  technicalProjects: z.number().nonnegative(),
  offersTarget: z.string(),
});
export type GoalsDoc = z.infer<typeof goalsSchema>;

export const activitySchema = z.object({
  id: z.string(),
  date: z.string(),
  type: activityTypeSchema,
  description: z.string(),
  companyOrPerson: z.string().optional().default(""),
  url: z.string().optional().default(""),
  notes: z.string().optional().default(""),
  createdAt: z.string(),
});
export type Activity = z.infer<typeof activitySchema>;

export const activitiesDocSchema = z.object({
  ...docMeta,
  items: z.array(activitySchema),
});
export type ActivitiesDoc = z.infer<typeof activitiesDocSchema>;

export const applicationSchema = z.object({
  id: z.string(),
  company: z.string(),
  position: z.string(),
  jobUrl: z.string().optional().default(""),
  companyUrl: z.string().optional().default(""),
  location: z.string().optional().default(""),
  remoteStatus: z.string().optional().default("Remote"),
  salaryRange: z.string().optional().default(""),
  employmentType: z.string().optional().default("Full-time"),
  techStack: z.string().optional().default(""),
  recruiter: z.string().optional().default(""),
  recruiterEmail: z.string().optional().default(""),
  hiringManager: z.string().optional().default(""),
  dateDiscovered: z.string().optional().default(""),
  dateApplied: z.string().optional().default(""),
  status: applicationStatusSchema,
  nextAction: z.string().optional().default(""),
  nextActionDate: z.string().optional().default(""),
  notes: z.string().optional().default(""),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Application = z.infer<typeof applicationSchema>;

export const applicationsDocSchema = z.object({
  ...docMeta,
  items: z.array(applicationSchema),
});
export type ApplicationsDoc = z.infer<typeof applicationsDocSchema>;

export const recruiterSchema = z.object({
  id: z.string(),
  name: z.string(),
  company: z.string().optional().default(""),
  email: z.string().optional().default(""),
  linkedInUrl: z.string().optional().default(""),
  specialty: z.string().optional().default(""),
  location: z.string().optional().default(""),
  dateContacted: z.string().optional().default(""),
  lastContact: z.string().optional().default(""),
  nextFollowUp: z.string().optional().default(""),
  status: recruiterStatusSchema,
  jobsDiscussed: z.string().optional().default(""),
  notes: z.string().optional().default(""),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Recruiter = z.infer<typeof recruiterSchema>;

export const recruitersDocSchema = z.object({
  ...docMeta,
  items: z.array(recruiterSchema),
});
export type RecruitersDoc = z.infer<typeof recruitersDocSchema>;

export const interviewTopicSchema = z.object({
  id: z.string(),
  topic: z.string(),
  readiness: z.number().min(0).max(100),
  notes: z.string().optional().default(""),
});

export const interviewStorySchema = z.object({
  id: z.string(),
  title: z.string(),
  situation: z.string().optional().default(""),
  action: z.string().optional().default(""),
  result: z.string().optional().default(""),
  tags: z.array(z.string()).optional().default([]),
});

export const interviewsDocSchema = z.object({
  ...docMeta,
  topics: z.array(interviewTopicSchema),
  stories: z.array(interviewStorySchema),
});
export type InterviewsDoc = z.infer<typeof interviewsDocSchema>;

export const financesSchema = z.object({
  ...docMeta,
  currentMonthlyIncome: z.number().nonnegative(),
  monthlyExpenses: z.number().nonnegative(),
  savings: z.number().nonnegative(),
  emergencyFund: z.number().nonnegative(),
  targetEmergencyFund: z.number().nonnegative(),
  monthlyJobSearchBudget: z.number().nonnegative(),
  freelanceIncome: z.number().nonnegative(),
  saasIncome: z.number().nonnegative(),
  targetSalary: z.number().nonnegative(),
  estimatedMonthlyTakeHome: z.number().nonnegative(),
  rvMonthlyBudget: z.number().nonnegative(),
});
export type FinancesDoc = z.infer<typeof financesSchema>;

export const rvCheckItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  completed: z.boolean(),
});

export const rvReadinessSchema = z.object({
  ...docMeta,
  jobSecured: z.boolean(),
  rvReady: z.boolean(),
  employment: z.array(rvCheckItemSchema),
  financial: z.array(rvCheckItemSchema),
  technical: z.array(rvCheckItemSchema),
  lifestyle: z.array(rvCheckItemSchema),
});
export type RvReadinessDoc = z.infer<typeof rvReadinessSchema>;

export const activityCreateSchema = activitySchema.omit({ id: true, createdAt: true });
export const activityUpdateSchema = activitySchema.partial().required({ id: true });

export const applicationCreateSchema = applicationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const applicationUpdateSchema = applicationSchema
  .partial()
  .required({ id: true });

export const recruiterCreateSchema = recruiterSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const recruiterUpdateSchema = recruiterSchema.partial().required({ id: true });

export const settingsPatchSchema = settingsSchema.partial().omit({ version: true, updatedAt: true });
export const goalsPatchSchema = goalsSchema.partial().omit({ version: true, updatedAt: true });
export const financesPatchSchema = financesSchema
  .partial()
  .omit({ version: true, updatedAt: true });
export const rvPatchSchema = rvReadinessSchema
  .partial()
  .omit({ version: true, updatedAt: true });
export const phasesPatchSchema = z.object({
  version: z.number().int().nonnegative().optional(),
  phases: z.array(phaseSchema).optional(),
});

export const backupSchema = z.object({
  exportedAt: z.string(),
  settings: settingsSchema,
  goals: goalsSchema,
  phases: phasesDocSchema,
  activities: activitiesDocSchema,
  applications: applicationsDocSchema,
  recruiters: recruitersDocSchema,
  interviews: interviewsDocSchema,
  finances: financesSchema,
  rv: rvReadinessSchema,
});
export type BackupPayload = z.infer<typeof backupSchema>;

export const APPLICATION_STATUSES = applicationStatusSchema.options;
export const ACTIVITY_TYPES = activityTypeSchema.options;
export const RECRUITER_STATUSES = recruiterStatusSchema.options;

export const KANBAN_COLUMNS: ApplicationStatus[] = [
  "FOUND",
  "QUALIFIED",
  "APPLIED",
  "RECRUITER_CONTACTED",
  "PHONE_SCREEN",
  "TECHNICAL",
  "FINAL",
  "OFFER",
  "ACCEPTED",
  "REJECTED",
  "WITHDRAWN",
];
