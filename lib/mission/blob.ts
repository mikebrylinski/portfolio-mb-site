import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { get, put } from "@vercel/blob";
import type { ZodType } from "zod";
import {
  activitiesDocSchema,
  applicationsDocSchema,
  financesSchema,
  goalsSchema,
  interviewsDocSchema,
  phasesDocSchema,
  recruitersDocSchema,
  rvReadinessSchema,
  settingsSchema,
  type ActivitiesDoc,
  type ApplicationsDoc,
  type FinancesDoc,
  type GoalsDoc,
  type InterviewsDoc,
  type MissionSettings,
  type PhasesDoc,
  type RecruitersDoc,
  type RvReadinessDoc,
} from "./schemas";
import {
  createEmptyActivities,
  createEmptyApplications,
  createEmptyFinances,
  createEmptyRecruiters,
  createSeedGoals,
  createSeedInterviews,
  createSeedPhases,
  createSeedRv,
  createSeedSettings,
} from "./seed";

export const BLOB_PATHS = {
  settings: "mission/settings.json",
  goals: "mission/goals.json",
  phases: "mission/phases.json",
  activities: "mission/activities.json",
  applications: "mission/applications.json",
  recruiters: "mission/recruiters.json",
  interviews: "mission/interviews.json",
  finances: "mission/finances.json",
  rv: "mission/rv-readiness.json",
} as const;

export class BlobConflictError extends Error {
  constructor(message = "Version conflict") {
    super(message);
    this.name = "BlobConflictError";
  }
}

export class BlobUnavailableError extends Error {
  constructor(message = "Blob storage is not configured") {
    super(message);
    this.name = "BlobUnavailableError";
  }
}

const LOCAL_ROOT = path.join(process.cwd(), ".data");

function hasBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function token(): string {
  const t = process.env.BLOB_READ_WRITE_TOKEN;
  if (!t) throw new BlobUnavailableError("BLOB_READ_WRITE_TOKEN is not set");
  return t;
}

function localPath(pathname: string): string {
  return path.join(LOCAL_ROOT, pathname);
}

async function readLocal(pathname: string): Promise<unknown | null> {
  try {
    const text = await readFile(localPath(pathname), "utf8");
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

async function writeLocal(pathname: string, data: unknown): Promise<void> {
  const file = localPath(pathname);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

async function readRaw(pathname: string): Promise<unknown | null> {
  if (!hasBlobToken()) {
    return readLocal(pathname);
  }

  try {
    const result = await get(pathname, {
      access: "private",
      token: token(),
      useCache: false,
    });
    if (!result) return null;
    const text = await new Response(result.stream).text();
    if (!text) return null;
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

async function writeRaw(pathname: string, data: unknown): Promise<void> {
  const previous = await readRaw(pathname);

  if (!hasBlobToken()) {
    if (previous !== null) {
      const stamp = new Date().toISOString().replace(/[:.]/g, "-");
      const backupName = pathname.replace("mission/", "").replace(".json", "");
      try {
        await writeLocal(`mission/backups/${backupName}-${stamp}.json`, previous);
      } catch {
        // best-effort backup
      }
    }
    await writeLocal(pathname, data);
    return;
  }

  if (previous !== null) {
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupName = pathname.replace("mission/", "").replace(".json", "");
    try {
      await put(
        `mission/backups/${backupName}-${stamp}.json`,
        JSON.stringify(previous, null, 2),
        {
          access: "private",
          token: token(),
          contentType: "application/json",
          addRandomSuffix: false,
          allowOverwrite: true,
        },
      );
    } catch {
      // best-effort backup
    }
  }

  await put(pathname, JSON.stringify(data, null, 2), {
    access: "private",
    token: token(),
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

async function getOrDefault<T>(
  pathname: string,
  schema: ZodType<T>,
  factory: () => T,
): Promise<T> {
  const raw = await readRaw(pathname);
  if (raw === null) {
    const seeded = factory();
    await writeRaw(pathname, seeded);
    return seeded;
  }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const seeded = factory();
    await writeRaw(pathname, seeded);
    return seeded;
  }
  return parsed.data;
}

export async function getSettings(): Promise<MissionSettings> {
  return getOrDefault(BLOB_PATHS.settings, settingsSchema, () => createSeedSettings());
}

export async function getGoals(): Promise<GoalsDoc> {
  return getOrDefault(BLOB_PATHS.goals, goalsSchema, () => createSeedGoals());
}

export async function getPhases(): Promise<PhasesDoc> {
  return getOrDefault(BLOB_PATHS.phases, phasesDocSchema, () => createSeedPhases());
}

export async function getActivities(): Promise<ActivitiesDoc> {
  return getOrDefault(
    BLOB_PATHS.activities,
    activitiesDocSchema,
    () => createEmptyActivities(),
  );
}

export async function getApplications(): Promise<ApplicationsDoc> {
  return getOrDefault(
    BLOB_PATHS.applications,
    applicationsDocSchema,
    () => createEmptyApplications(),
  );
}

export async function getRecruiters(): Promise<RecruitersDoc> {
  return getOrDefault(
    BLOB_PATHS.recruiters,
    recruitersDocSchema,
    () => createEmptyRecruiters(),
  );
}

export async function getInterviews(): Promise<InterviewsDoc> {
  return getOrDefault(
    BLOB_PATHS.interviews,
    interviewsDocSchema,
    () => createSeedInterviews(),
  );
}

export async function getFinances(): Promise<FinancesDoc> {
  return getOrDefault(BLOB_PATHS.finances, financesSchema, () => createEmptyFinances());
}

export async function getRv(): Promise<RvReadinessDoc> {
  return getOrDefault(BLOB_PATHS.rv, rvReadinessSchema, () => createSeedRv());
}

export async function putDocument<T extends { version: number; updatedAt: string }>(
  pathname: string,
  schema: ZodType<T>,
  next: T,
  expectedVersion?: number,
): Promise<T> {
  const currentRaw = await readRaw(pathname);
  if (expectedVersion !== undefined && currentRaw !== null) {
    const current = schema.safeParse(currentRaw);
    if (current.success && current.data.version !== expectedVersion) {
      throw new BlobConflictError(
        `Expected version ${expectedVersion}, found ${current.data.version}`,
      );
    }
  }

  let toWrite = next;
  if (expectedVersion !== undefined) {
    toWrite = {
      ...next,
      version: expectedVersion + 1,
      updatedAt: new Date().toISOString(),
    };
  } else {
    toWrite = {
      ...next,
      updatedAt: new Date().toISOString(),
    };
  }

  const parsed = schema.parse(toWrite);
  await writeRaw(pathname, parsed);
  return parsed;
}

export async function putSettings(
  data: MissionSettings,
  expectedVersion?: number,
): Promise<MissionSettings> {
  return putDocument(BLOB_PATHS.settings, settingsSchema, data, expectedVersion);
}

export async function putGoals(
  data: GoalsDoc,
  expectedVersion?: number,
): Promise<GoalsDoc> {
  return putDocument(BLOB_PATHS.goals, goalsSchema, data, expectedVersion);
}

export async function putPhases(
  data: PhasesDoc,
  expectedVersion?: number,
): Promise<PhasesDoc> {
  return putDocument(BLOB_PATHS.phases, phasesDocSchema, data, expectedVersion);
}

export async function putActivities(
  data: ActivitiesDoc,
  expectedVersion?: number,
): Promise<ActivitiesDoc> {
  return putDocument(
    BLOB_PATHS.activities,
    activitiesDocSchema,
    data,
    expectedVersion,
  );
}

export async function putApplications(
  data: ApplicationsDoc,
  expectedVersion?: number,
): Promise<ApplicationsDoc> {
  return putDocument(
    BLOB_PATHS.applications,
    applicationsDocSchema,
    data,
    expectedVersion,
  );
}

export async function putRecruiters(
  data: RecruitersDoc,
  expectedVersion?: number,
): Promise<RecruitersDoc> {
  return putDocument(
    BLOB_PATHS.recruiters,
    recruitersDocSchema,
    data,
    expectedVersion,
  );
}

export async function putInterviews(
  data: InterviewsDoc,
  expectedVersion?: number,
): Promise<InterviewsDoc> {
  return putDocument(
    BLOB_PATHS.interviews,
    interviewsDocSchema,
    data,
    expectedVersion,
  );
}

export async function putFinances(
  data: FinancesDoc,
  expectedVersion?: number,
): Promise<FinancesDoc> {
  return putDocument(BLOB_PATHS.finances, financesSchema, data, expectedVersion);
}

export async function putRv(
  data: RvReadinessDoc,
  expectedVersion?: number,
): Promise<RvReadinessDoc> {
  return putDocument(BLOB_PATHS.rv, rvReadinessSchema, data, expectedVersion);
}

export async function ensureSeeded(): Promise<void> {
  await Promise.all([
    getSettings(),
    getGoals(),
    getPhases(),
    getActivities(),
    getApplications(),
    getRecruiters(),
    getInterviews(),
    getFinances(),
    getRv(),
  ]);
}
