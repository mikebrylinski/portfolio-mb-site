import type {
  ActivitiesDoc,
  ApplicationsDoc,
  ApplicationStatus,
  FinancesDoc,
  GoalsDoc,
  MissionSettings,
  PhasesDoc,
  RecruitersDoc,
  RvReadinessDoc,
} from "./schemas";

function startOfWeek(d: Date): Date {
  const x = new Date(d);
  const day = x.getUTCDay();
  const diff = day === 0 ? 6 : day - 1;
  x.setUTCDate(x.getUTCDate() - diff);
  x.setUTCHours(0, 0, 0, 0);
  return x;
}

function startOfMonth(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
}

function inRange(iso: string | undefined, from: Date, to: Date): boolean {
  if (!iso) return false;
  const t = new Date(iso.includes("T") ? iso : `${iso}T12:00:00.000Z`).getTime();
  return t >= from.getTime() && t <= to.getTime();
}

const RESPONSE_STATUSES: ApplicationStatus[] = [
  "RECRUITER_CONTACTED",
  "PHONE_SCREEN",
  "TECHNICAL",
  "FINAL",
  "OFFER",
  "ACCEPTED",
];
const SCREEN_STATUSES: ApplicationStatus[] = [
  "PHONE_SCREEN",
  "TECHNICAL",
  "FINAL",
  "OFFER",
  "ACCEPTED",
];
const TECH_STATUSES: ApplicationStatus[] = [
  "TECHNICAL",
  "FINAL",
  "OFFER",
  "ACCEPTED",
];
const FINAL_STATUSES: ApplicationStatus[] = ["FINAL", "OFFER", "ACCEPTED"];
const OFFER_STATUSES: ApplicationStatus[] = ["OFFER", "ACCEPTED"];

function countByStatus(
  apps: ApplicationsDoc["items"],
  statuses: ApplicationStatus[],
): number {
  const set = new Set(statuses);
  return apps.filter((a) => set.has(a.status)).length;
}

function rate(numerator: number, denominator: number): number {
  if (denominator <= 0) return 0;
  return Math.round((numerator / denominator) * 1000) / 10;
}

export function daysRemaining(targetDate: string): number {
  const target = new Date(`${targetDate}T23:59:59.000Z`).getTime();
  const now = Date.now();
  return Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
}

export function overallProgress(settings: MissionSettings, phases: PhasesDoc): number {
  const totalTasks = phases.phases.reduce((n, p) => n + p.tasks.length, 0);
  const doneTasks = phases.phases.reduce(
    (n, p) => n + p.tasks.filter((t) => t.completed).length,
    0,
  );
  const stageDone = Object.values(settings.stages).filter(Boolean).length;
  const taskPct = totalTasks > 0 ? (doneTasks / totalTasks) * 80 : 0;
  const stagePct = (stageDone / 4) * 20;
  return Math.round(Math.min(100, taskPct + stagePct));
}

export function currentPhase(settings: MissionSettings, phases: PhasesDoc) {
  const today = new Date().toISOString().slice(0, 10);
  const byDate = phases.phases.find(
    (p) => p.startDate <= today && today <= p.endDate,
  );
  if (byDate) return byDate;
  return (
    phases.phases.find((p) => p.id === settings.currentPhaseId) ??
    phases.phases[0] ??
    null
  );
}

export function checklistPct(
  items: { completed: boolean }[],
): number {
  if (items.length === 0) return 0;
  return Math.round(
    (items.filter((i) => i.completed).length / items.length) * 100,
  );
}

export function runwayMonths(finances: FinancesDoc): number | null {
  if (finances.monthlyExpenses <= 0) return null;
  return Math.round((finances.savings / finances.monthlyExpenses) * 10) / 10;
}

export function computeKpis(
  activities: ActivitiesDoc,
  applications: ApplicationsDoc,
  recruiters: RecruitersDoc,
  now = new Date(),
) {
  const weekStart = startOfWeek(now);
  const monthStart = startOfMonth(now);
  const end = now;

  const apps = applications.items;
  const acts = activities.items;

  const appliedApps = apps.filter((a) => a.dateApplied);
  const appsThisWeek = appliedApps.filter((a) =>
    inRange(a.dateApplied, weekStart, end),
  ).length;
  const appsThisMonth = appliedApps.filter((a) =>
    inRange(a.dateApplied, monthStart, end),
  ).length;

  const countActivity = (
    types: string[],
    from: Date,
  ) =>
    acts.filter(
      (a) => types.includes(a.type) && inRange(a.date, from, end),
    ).length;

  const recruiterContactsTotal = recruiters.items.length;
  const recruiterContactsMonth = recruiters.items.filter((r) =>
    inRange(r.dateContacted || r.createdAt, monthStart, end),
  ).length;

  const hmMonth = countActivity(["hiring_manager_contact"], monthStart);
  const networkingMonth = countActivity(["networking"], monthStart);
  const interviewsMonth = countActivity(["interview"], monthStart);
  const postsMonth = countActivity(["linkedin_post"], monthStart);

  const interviews = countByStatus(apps, [
    "PHONE_SCREEN",
    "TECHNICAL",
    "FINAL",
    "OFFER",
    "ACCEPTED",
  ]);
  const finals = countByStatus(apps, ["FINAL", "OFFER", "ACCEPTED"]);
  const offers = countByStatus(apps, ["OFFER", "ACCEPTED"]);

  return {
    applicationsThisWeek: appsThisWeek,
    applicationsThisMonth: appsThisMonth,
    applicationsTotal: appliedApps.length || apps.filter((a) =>
      ["APPLIED", "RECRUITER_CONTACTED", "PHONE_SCREEN", "TECHNICAL", "FINAL", "OFFER", "ACCEPTED", "REJECTED", "WITHDRAWN"].includes(
        a.status,
      ),
    ).length,
    recruitersContacted: recruiterContactsTotal,
    recruitersContactedMonth: recruiterContactsMonth,
    hiringManagersContactedMonth: hmMonth,
    networkingMonth,
    interviews,
    interviewsMonth,
    finalInterviews: finals,
    offers,
    technicalPostsMonth: postsMonth,
  };
}

export function computeFunnel(
  applications: ApplicationsDoc,
  now = new Date(),
) {
  const monthStart = startOfMonth(now);
  const end = now;

  const build = (items: ApplicationsDoc["items"]) => {
    const applicationsCount = items.filter((a) =>
      a.dateApplied ||
      ![
        "FOUND",
        "QUALIFIED",
      ].includes(a.status),
    ).length || items.filter((a) => a.status !== "FOUND").length;

    const applied = items.filter((a) =>
      ![
        "FOUND",
        "QUALIFIED",
      ].includes(a.status),
    );
    const responses = countByStatus(applied, RESPONSE_STATUSES);
    const screens = countByStatus(applied, SCREEN_STATUSES);
    const technical = countByStatus(applied, TECH_STATUSES);
    const finals = countByStatus(applied, FINAL_STATUSES);
    const offers = countByStatus(applied, OFFER_STATUSES);
    const appCount = Math.max(applied.length, applicationsCount);

    return {
      applications: appCount,
      responses,
      recruiterScreens: screens,
      technicalInterviews: technical,
      finalInterviews: finals,
      offers,
      rates: {
        applicationToResponse: rate(responses, appCount),
        responseToScreen: rate(screens, responses),
        screenToTechnical: rate(technical, screens),
        technicalToFinal: rate(finals, technical),
        finalToOffer: rate(offers, finals),
      },
    };
  };

  const monthItems = applications.items.filter((a) => {
    const d = a.dateApplied || a.createdAt;
    return inRange(d, monthStart, end);
  });

  return {
    currentMonth: build(monthItems),
    sixMonthTotal: build(applications.items),
  };
}

export function nextPriorityAction(
  phases: PhasesDoc,
  applications: ApplicationsDoc,
  recruiters: RecruitersDoc,
  settings: MissionSettings,
): { label: string; href: string } {
  const phase = currentPhase(settings, phases);
  const openTask = phase?.tasks.find((t) => !t.completed);
  if (openTask) {
    return {
      label: openTask.label,
      href: "/admin/mission-control/roadmap",
    };
  }

  const dueApps = applications.items
    .filter((a) => a.nextActionDate && a.nextAction)
    .sort((a, b) => (a.nextActionDate > b.nextActionDate ? 1 : -1));
  if (dueApps[0]) {
    return {
      label: `${dueApps[0].company}: ${dueApps[0].nextAction}`,
      href: "/admin/mission-control/pipeline",
    };
  }

  const dueRecruiters = recruiters.items
    .filter((r) => r.nextFollowUp)
    .sort((a, b) => (a.nextFollowUp > b.nextFollowUp ? 1 : -1));
  if (dueRecruiters[0]) {
    return {
      label: `Follow up: ${dueRecruiters[0].name}`,
      href: "/admin/mission-control/recruiters",
    };
  }

  return {
    label: "Log today's career activity",
    href: "/admin/mission-control/today",
  };
}

export function rvCategoryProgress(rv: RvReadinessDoc) {
  return {
    employment: checklistPct(rv.employment),
    financial: checklistPct(rv.financial),
    technical: checklistPct(rv.technical),
    lifestyle: checklistPct(rv.lifestyle),
    overall: checklistPct([
      ...rv.employment,
      ...rv.financial,
      ...rv.technical,
      ...rv.lifestyle,
    ]),
  };
}
