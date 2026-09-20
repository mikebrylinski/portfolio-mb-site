import { handleApiError, jsonOk, requireAuth } from "@/lib/mission/api";
import {
  putActivities,
  putApplications,
  putFinances,
  putGoals,
  putInterviews,
  putPhases,
  putRecruiters,
  putRv,
  putSettings,
} from "@/lib/mission/blob";
import { backupSchema } from "@/lib/mission/schemas";

export async function POST(request: Request) {
  const denied = await requireAuth();
  if (denied) return denied;
  try {
    const body = backupSchema.parse(await request.json());

    await putSettings(body.settings);
    await putGoals(body.goals);
    await putPhases(body.phases);
    await putActivities(body.activities);
    await putApplications(body.applications);
    await putRecruiters(body.recruiters);
    await putInterviews(body.interviews);
    await putFinances(body.finances);
    await putRv(body.rv);

    return jsonOk({ ok: true, importedAt: new Date().toISOString() });
  } catch (err) {
    return handleApiError(err);
  }
}
