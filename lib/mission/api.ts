import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { isAuthenticated } from "./auth";
import { BlobConflictError, BlobUnavailableError } from "./blob";

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function jsonError(message: string, status: number, details?: unknown) {
  return NextResponse.json(
    { error: message, ...(details !== undefined ? { details } : {}) },
    { status },
  );
}

export async function requireAuth(): Promise<NextResponse | null> {
  const ok = await isAuthenticated();
  if (!ok) return jsonError("Unauthorized", 401);
  return null;
}

export function handleApiError(err: unknown): NextResponse {
  if (err instanceof BlobConflictError) {
    return jsonError(err.message, 409);
  }
  if (err instanceof BlobUnavailableError) {
    return jsonError(err.message, 503);
  }
  if (err instanceof ZodError) {
    return jsonError("Validation failed", 400, err.flatten());
  }
  if (err instanceof Error) {
    console.error("[mission-api]", err.message);
    return jsonError(err.message || "Internal server error", 500);
  }
  return jsonError("Internal server error", 500);
}

export function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const keys = Object.keys(rows[0]!);
  const escape = (v: unknown) => {
    const s = v == null ? "" : String(v);
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  return [
    keys.join(","),
    ...rows.map((row) => keys.map((k) => escape(row[k])).join(",")),
  ].join("\n");
}
