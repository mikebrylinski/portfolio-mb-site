import { generateId } from "@/lib/mission/auth";
import { handleApiError, jsonError, jsonOk, requireAuth } from "@/lib/mission/api";
import { getRecruiters, putRecruiters } from "@/lib/mission/blob";
import { recruiterCreateSchema, recruiterUpdateSchema } from "@/lib/mission/schemas";

export async function GET() {
  const denied = await requireAuth();
  if (denied) return denied;
  try {
    return jsonOk(await getRecruiters());
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(request: Request) {
  const denied = await requireAuth();
  if (denied) return denied;
  try {
    const body = recruiterCreateSchema.parse(await request.json());
    const doc = await getRecruiters();
    const now = new Date().toISOString();
    const item = {
      ...body,
      id: generateId("rec"),
      createdAt: now,
      updatedAt: now,
    };
    const next = await putRecruiters(
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
    const body = recruiterUpdateSchema.parse(await request.json());
    const doc = await getRecruiters();
    const idx = doc.items.findIndex((i) => i.id === body.id);
    if (idx < 0) return jsonError("Recruiter not found", 404);
    const updated = {
      ...doc.items[idx]!,
      ...body,
      updatedAt: new Date().toISOString(),
    };
    const items = [...doc.items];
    items[idx] = updated;
    const next = await putRecruiters(
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
    const doc = await getRecruiters();
    if (!doc.items.some((i) => i.id === id)) {
      return jsonError("Recruiter not found", 404);
    }
    const next = await putRecruiters(
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
