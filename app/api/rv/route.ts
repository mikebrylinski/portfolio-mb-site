import { handleApiError, jsonOk, requireAuth } from "@/lib/mission/api";
import { rvCategoryProgress } from "@/lib/mission/analytics";
import { getRv, putRv, getSettings, putSettings } from "@/lib/mission/blob";
import { rvPatchSchema } from "@/lib/mission/schemas";

export async function GET() {
  const denied = await requireAuth();
  if (denied) return denied;
  try {
    const rv = await getRv();
    return jsonOk({ ...rv, progress: rvCategoryProgress(rv) });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PATCH(request: Request) {
  const denied = await requireAuth();
  if (denied) return denied;
  try {
    const body = (await request.json()) as { version?: number } & Record<
      string,
      unknown
    >;
    const patch = rvPatchSchema.parse(body);
    const doc = await getRv();

    // JOB SECURED and RV READY stay independent
    const next = await putRv(
      {
        ...doc,
        ...patch,
        jobSecured: patch.jobSecured ?? doc.jobSecured,
        rvReady: patch.rvReady ?? doc.rvReady,
        version: doc.version,
      },
      body.version ?? doc.version,
    );

    // Sync mission stages carefully: job stage from jobSecured; RV_LIFE only from rvReady
    const settings = await getSettings();
    const stages = {
      ...settings.stages,
      JOB: next.jobSecured,
      RV_LIFE: next.rvReady,
    };
    if (
      stages.JOB !== settings.stages.JOB ||
      stages.RV_LIFE !== settings.stages.RV_LIFE
    ) {
      await putSettings({ ...settings, stages }, settings.version);
    }

    return jsonOk({ ...next, progress: rvCategoryProgress(next) });
  } catch (err) {
    return handleApiError(err);
  }
}
