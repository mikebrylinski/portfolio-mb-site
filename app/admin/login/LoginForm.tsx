"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FrameCorners } from "@/components/ui/FieldNotes";
import { apiFetch } from "@/components/mission-control/api-client";
import { ErrorText, McButton, McInput } from "@/components/mission-control/ui";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ password }),
      });
      const next = params.get("next") || "/admin/mission-control";
      router.replace(next.startsWith("/admin") ? next : "/admin/mission-control");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6 py-16">
      <div className="relative w-full border border-[#3B8CFF]/30 bg-[#06101c]/80 p-6 sm:p-8">
        <FrameCorners />
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#3B8CFF]">
          Restricted Access
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white">
          Mission Control
        </h1>
        <p className="mt-2 text-sm text-[#9cb6d4]">
          Private career OS. Authenticate to continue.
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/80">
              Password
            </span>
            <McInput
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <ErrorText>{error}</ErrorText>
          <McButton type="submit" disabled={pending} className="w-full">
            {pending ? "Authenticating…" : "Enter →"}
          </McButton>
        </form>
      </div>
    </main>
  );
}
