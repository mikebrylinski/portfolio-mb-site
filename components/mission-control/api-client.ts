"use client";

import { useCallback, useState } from "react";

export class ApiClientError extends Error {
  status: number;
  details?: unknown;
  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export async function apiFetch<T>(
  url: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    let message = res.statusText;
    let details: unknown;
    try {
      const body = (await res.json()) as { error?: string; details?: unknown };
      message = body.error || message;
      details = body.details;
    } catch {
      // ignore
    }
    throw new ApiClientError(message, res.status, details);
  }
  if (res.status === 204) return undefined as T;
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return (await res.json()) as T;
  return (await res.text()) as T;
}

export function useAsyncAction<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (...args: TArgs) => {
      setPending(true);
      setError(null);
      try {
        return await fn(...args);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Request failed";
        setError(msg);
        throw err;
      } finally {
        setPending(false);
      }
    },
    [fn],
  );

  return { run, pending, error, setError };
}

export function formatTimestamp(iso?: string | null): string {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function todayInputValue(): string {
  return new Date().toISOString().slice(0, 10);
}
