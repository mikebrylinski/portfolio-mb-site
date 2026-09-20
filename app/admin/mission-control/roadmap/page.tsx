"use client";

import { useMission } from "@/components/mission-control/MissionProvider";
import { apiFetch } from "@/components/mission-control/api-client";
import { ErrorText, McButton, Panel, PanelTitle, ProgressBar } from "@/components/mission-control/ui";
import { useState } from "react";

export default function RoadmapPage() {
  const { data, loading, error, refresh } = useMission();
  const [busy, setBusy] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  if (loading) return <p className="font-mono text-sm text-[#9cb6d4]">Loading…</p>;
  if (error || !data) return <p className="text-sm text-red-400">{error}</p>;

  async function toggleTask(phaseId: string, taskId: string) {
    if (!data) return;
    setBusy(taskId);
    setSaveError(null);
    const phases = data.phases.phases.map((p) =>
      p.id !== phaseId
        ? p
        : {
            ...p,
            tasks: p.tasks.map((t) =>
              t.id === taskId ? { ...t, completed: !t.completed } : t,
            ),
          },
    );
    try {
      await apiFetch("/api/mission", {
        method: "PATCH",
        body: JSON.stringify({ version: data.phases.version, phases }),
      });
      await refresh();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Six-Month Roadmap</h1>
        <p className="mt-1 text-sm text-[#9cb6d4]">
          Seeded plan and tasks. Mark items complete as you finish them.
        </p>
      </div>
      <ErrorText>{saveError}</ErrorText>
      {data.phases.phases.map((phase) => {
        const done = phase.tasks.filter((t) => t.completed).length;
        const pct = Math.round((done / Math.max(phase.tasks.length, 1)) * 100);
        return (
          <Panel key={phase.id}>
            <PanelTitle code={`M${phase.month}`}>
              {phase.title} — {phase.startDate} → {phase.endDate}
            </PanelTitle>
            <p className="text-sm text-white">{phase.goal}</p>
            <p className="mt-1 text-xs text-[#9cb6d4]">{phase.objective}</p>
            <div className="mt-3 max-w-md space-y-1">
              <div className="flex justify-between font-mono text-[10px] text-[#9cb6d4]">
                <span>
                  {done}/{phase.tasks.length}
                </span>
                <span>{pct}%</span>
              </div>
              <ProgressBar value={pct} />
            </div>
            <ul className="mt-4 space-y-2">
              {phase.tasks.map((task) => (
                <li key={task.id}>
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-[#c8dff7]">
                    <input
                      type="checkbox"
                      className="mt-1 accent-[#3B8CFF]"
                      checked={task.completed}
                      disabled={busy === task.id}
                      onChange={() => void toggleTask(phase.id, task.id)}
                    />
                    <span className={task.completed ? "line-through opacity-60" : ""}>
                      {task.label}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </Panel>
        );
      })}
      <McButton type="button" onClick={() => void refresh()}>
        Refresh
      </McButton>
    </div>
  );
}
