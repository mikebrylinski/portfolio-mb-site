import { handleApiError, jsonOk, requireAuth } from "@/lib/mission/api";
import { getInterviews, putInterviews } from "@/lib/mission/blob";
import { interviewsDocSchema } from "@/lib/mission/schemas";

export async function GET() {
  const denied = await requireAuth();
  if (denied) return denied;
  try {
    return jsonOk(await getInterviews());
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
    const doc = await getInterviews();
    const merged = interviewsDocSchema.parse({
      ...doc,
      ...body,
      version: doc.version,
      updatedAt: doc.updatedAt,
    });
    const next = await putInterviews(merged, body.version ?? doc.version);
    return jsonOk(next);
  } catch (err) {
    return handleApiError(err);
  }
}
