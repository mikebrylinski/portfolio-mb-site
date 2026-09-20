import { handleApiError, jsonOk, requireAuth } from "@/lib/mission/api";
import { runwayMonths } from "@/lib/mission/analytics";
import { getFinances, putFinances } from "@/lib/mission/blob";
import { financesPatchSchema } from "@/lib/mission/schemas";

export async function GET() {
  const denied = await requireAuth();
  if (denied) return denied;
  try {
    const finances = await getFinances();
    return jsonOk({ ...finances, runwayMonths: runwayMonths(finances) });
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
    const patch = financesPatchSchema.parse(body);
    const doc = await getFinances();
    const next = await putFinances(
      { ...doc, ...patch, version: doc.version },
      body.version ?? doc.version,
    );
    return jsonOk({ ...next, runwayMonths: runwayMonths(next) });
  } catch (err) {
    return handleApiError(err);
  }
}
