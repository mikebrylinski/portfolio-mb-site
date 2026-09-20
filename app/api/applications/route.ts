import { generateId } from "@/lib/mission/auth";
import { handleApiError, jsonError, jsonOk, requireAuth } from "@/lib/mission/api";
import { getApplications, putApplications } from "@/lib/mission/blob";
import {
  applicationCreateSchema,
  applicationUpdateSchema,
} from "@/lib/mission/schemas";

export async function GET() {
  const denied = await requireAuth();
  if (denied) return denied;
  try {
    return jsonOk(await getApplications());
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(request: Request) {
  const denied = await requireAuth();
  if (denied) return denied;
  try {
    const body = applicationCreateSchema.parse(await request.json());
    const doc = await getApplications();
    const now = new Date().toISOString();
    const item = {
      ...body,
      id: generateId("app"),
      createdAt: now,
      updatedAt: now,
    };
    const next = await putApplications(
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
    const body = applicationUpdateSchema.parse(await request.json());
    const doc = await getApplications();
    const idx = doc.items.findIndex((i) => i.id === body.id);
    if (idx < 0) return jsonError("Application not found", 404);
    const updated = {
      ...doc.items[idx]!,
      ...body,
      updatedAt: new Date().toISOString(),
    };
    const items = [...doc.items];
    items[idx] = updated;
    const next = await putApplications(
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return jsonError("id is required", 400);
    const doc = await getApplications();
    if (!doc.items.some((i) => i.id === id)) {
      return jsonError("Application not found", 404);
    }
    const next = await putApplications(
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
