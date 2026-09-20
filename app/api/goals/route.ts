import { handleApiError, jsonOk, requireAuth } from "@/lib/mission/api";
import { getGoals, putGoals } from "@/lib/mission/blob";
import { goalsPatchSchema } from "@/lib/mission/schemas";

export async function GET() {
  const denied = await requireAuth();
  if (denied) return denied;
  try {
    return jsonOk(await getGoals());
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
    const patch = goalsPatchSchema.parse(body);
    const doc = await getGoals();
    const next = await putGoals(
      { ...doc, ...patch, version: doc.version },
      body.version ?? doc.version,
    );
    return jsonOk(next);
  } catch (err) {
    return handleApiError(err);
  }
}
