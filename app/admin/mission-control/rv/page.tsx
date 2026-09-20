"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/components/mission-control/api-client";
import {
  ErrorText,
  McButton,
  Panel,
  PanelTitle,
  ProgressBar,
} from "@/components/mission-control/ui";
import type { RvReadinessDoc } from "@/lib/mission/schemas";

type RvResponse = RvReadinessDoc & {
  progress: {
    employment: number;
    financial: number;
    technical: number;
    lifestyle: number;
    overall: number;
  };
};

export default function RvPage() {
  const [doc, setDoc] = useState<RvResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function load() {
    try {
      setDoc(await apiFetch<RvResponse>("/api/rv"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function persist(next: RvReadinessDoc) {
    setPending(true);
    setError(null);
    try {
      const saved = await apiFetch<RvResponse>("/api/rv", {
        method: "PATCH",
        body: JSON.stringify({
          version: doc?.version,
          jobSecured: next.jobSecured,
          rvReady: next.rvReady,
          employment: next.employment,
          financial: next.financial,
          technical: next.technical,
          lifestyle: next.lifestyle,
        }),
      });
      setDoc(saved);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setPending(false);
    }
  }

  function toggle(
    category: "employment" | "financial" | "technical" | "lifestyle",
    id: string,
  ) {
    if (!doc) return;
    const items = doc[category].map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item,
    );
    void persist({ ...doc, [category]: items });
  }

  if (!doc) {
    return (
      <div>
        <ErrorText>{error}</ErrorText>
        <p className="font-mono text-sm text-[#9cb6d4]">Loading…</p>
      </div>
    );
  }

  const categories = [
    ["Employment", "employment", doc.progress.employment],
    ["Financial", "financial", doc.progress.financial],
    ["Technical", "technical", doc.progress.technical],
    ["Lifestyle", "lifestyle", doc.progress.lifestyle],
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">RV Readiness</h1>
        <p className="mt-1 text-sm text-[#9cb6d4]">
          Job secured and RV ready are tracked separately.
        </p>
      </div>

      <ErrorText>{error}</ErrorText>

      <div className="flex flex-wrap gap-3">
        <label className="flex items-center gap-2 border border-[#3B8CFF]/25 px-3 py-2 text-sm">
          <input
            type="checkbox"
            className="accent-[#3B8CFF]"
            checked={doc.jobSecured}
            disabled={pending}
            onChange={() =>
              void persist({ ...doc, jobSecured: !doc.jobSecured })
            }
          />
          JOB SECURED
        </label>
        <label className="flex items-center gap-2 border border-[#3B8CFF]/25 px-3 py-2 text-sm">
          <input
            type="checkbox"
            className="accent-[#3B8CFF]"
            checked={doc.rvReady}
            disabled={pending}
            onChange={() => void persist({ ...doc, rvReady: !doc.rvReady })}
          />
          RV READY
        </label>
      </div>

      <Panel>
        <PanelTitle code="PCT">Overall</PanelTitle>
        <ProgressBar value={doc.progress.overall} />
        <p className="mt-2 font-mono text-xs text-[#9cb6d4]">
          {doc.progress.overall}% checklist complete
        </p>
      </Panel>

      {categories.map(([title, key, pct]) => (
        <Panel key={key}>
          <PanelTitle code={title.slice(0, 3).toUpperCase()}>{title}</PanelTitle>
          <div className="mb-3 max-w-md space-y-1">
            <div className="flex justify-between font-mono text-[10px] text-[#9cb6d4]">
              <span>Progress</span>
              <span>{pct}%</span>
            </div>
            <ProgressBar value={pct} />
          </div>
          <ul className="space-y-2">
            {doc[key].map((item) => (
              <li key={item.id}>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-[#c8dff7]">
                  <input
                    type="checkbox"
                    className="mt-1 accent-[#3B8CFF]"
                    checked={item.completed}
                    disabled={pending}
                    onChange={() => toggle(key, item.id)}
                  />
                  <span className={item.completed ? "line-through opacity-60" : ""}>
                    {item.label}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </Panel>
      ))}

      <McButton type="button" onClick={() => void load()} disabled={pending}>
        Refresh
      </McButton>
    </div>
  );
}
