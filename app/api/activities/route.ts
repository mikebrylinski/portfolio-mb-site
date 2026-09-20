import { generateId } from "@/lib/mission/auth";
import { handleApiError, jsonError, jsonOk, requireAuth } from "@/lib/mission/api";
import { getActivities, putActivities } from "@/lib/mission/blob";
import { activityCreateSchema, activityUpdateSchema } from "@/lib/mission/schemas";

export async function GET() {
  const denied = await requireAuth();
  if (denied) return denied;
  try {
    return jsonOk(await getActivities());
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(request: Request) {
  const denied = await requireAuth();
  if (denied) return denied;
  try {
    const body = activityCreateSchema.parse(await request.json());
    const doc = await getActivities();
    const item = {
      ...body,
      id: generateId("act"),
      createdAt: new Date().toISOString(),
    };
    const next = await putActivities(
      { ...doc, items: [item, ...doc.items], version: doc.version },
      doc.version,
    );
    return jsonOk(next, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PATCH(request: Request) {
  const denied = await requireAuth();
  if (denied) return denied;
  try {
    const body = activityUpdateSchema.parse(await request.json());
    const doc = await getActivities();
    const idx = doc.items.findIndex((i) => i.id === body.id);
    if (idx < 0) return jsonError("Activity not found", 404);
    const items = [...doc.items];
    items[idx] = { ...doc.items[idx]!, ...body };
    const next = await putActivities(
      { ...doc, items, version: doc.version },
      doc.version,
    );
    return jsonOk(next);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(request: Request) {
  const denied = await requireAuth();
  if (denied) return denied;
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return jsonError("id is required", 400);
    const doc = await getActivities();
    if (!doc.items.some((i) => i.id === id)) {
      return jsonError("Activity not found", 404);
    }
    const next = await putActivities(
      {
        ...doc,
        items: doc.items.filter((i) => i.id !== id),
        version: doc.version,
      },
      doc.version,
    );
    return jsonOk(next);
  } catch (err) {
    return handleApiError(err);
  }
}
