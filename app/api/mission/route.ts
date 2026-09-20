import { handleApiError, jsonOk, requireAuth } from "@/lib/mission/api";
import {
  computeFunnel,
  computeKpis,
  currentPhase,
  daysRemaining,
  nextPriorityAction,
  overallProgress,
  rvCategoryProgress,
  runwayMonths,
} from "@/lib/mission/analytics";
import {
  ensureSeeded,
  getActivities,
  getApplications,
  getFinances,
  getGoals,
  getPhases,
  getRecruiters,
  getRv,
  getSettings,
  putPhases,
  putSettings,
} from "@/lib/mission/blob";
import { phasesPatchSchema, settingsPatchSchema } from "@/lib/mission/schemas";

export async function GET() {
  const denied = await requireAuth();
  if (denied) return denied;
  try {
    await ensureSeeded();
    const [settings, phases, goals, activities, applications, recruiters, finances, rv] =
      await Promise.all([
        getSettings(),
        getPhases(),
        getGoals(),
        getActivities(),
        getApplications(),
        getRecruiters(),
        getFinances(),
        getRv(),
      ]);

    const phase = currentPhase(settings, phases);
    const kpis = computeKpis(activities, applications, recruiters);
    const funnel = computeFunnel(applications);
    const rvProgress = rvCategoryProgress(rv);

    return jsonOk({
      settings,
      phases,
      goals,
      kpis,
      funnel,
      finances: {
        ...finances,
        runwayMonths: runwayMonths(finances),
      },
      rv: {
        ...rv,
        progress: rvProgress,
      },
      overview: {
        startDate: settings.startDate,
        targetDate: settings.targetDate,
        daysRemaining: daysRemaining(settings.targetDate),
        overallProgress: overallProgress(settings, phases),
        currentMonth: phase?.month ?? 1,
        currentPhase: phase,
        primaryObjective: phase?.objective ?? settings.primaryObjective,
        stages: settings.stages,
        nextAction: nextPriorityAction(phases, applications, recruiters, settings),
        lastSaved: [
          settings.updatedAt,
          phases.updatedAt,
          goals.updatedAt,
          activities.updatedAt,
          applications.updatedAt,
          recruiters.updatedAt,
          finances.updatedAt,
          rv.updatedAt,
        ].sort().at(-1),
      },
    });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PATCH(request: Request) {
  const denied = await requireAuth();
  if (denied) return denied;
  try {
    const body = (await request.json()) as {
      version?: number;
      settings?: unknown;
      phases?: unknown;
    };

    let settings = await getSettings();
    let phases = await getPhases();

    if (body.settings) {
      const patch = settingsPatchSchema.parse(body.settings);
      settings = await putSettings(
        { ...settings, ...patch, version: settings.version },
        body.version ?? settings.version,
      );
    }

    if (body.phases) {
      const patch = phasesPatchSchema.parse({
        version: body.version,
        phases: body.phases,
      });
      if (patch.phases) {
        phases = await putPhases(
          { ...phases, phases: patch.phases, version: phases.version },
          patch.version ?? phases.version,
        );
      }
    }

    return jsonOk({ settings, phases });
  } catch (err) {
    return handleApiError(err);
  }
}
