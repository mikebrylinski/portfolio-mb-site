"use client";

import Link from "next/link";
import { useMission } from "@/components/mission-control/MissionProvider";
import {
  Metric,
  McButton,
  Panel,
  PanelTitle,
  ProgressBar,
  StageTimeline,
} from "@/components/mission-control/ui";

export default function MissionControlOverviewPage() {
  const { data, loading, error, refresh } = useMission();

  if (loading) {
    return <p className="font-mono text-sm text-[#9cb6d4]">Loading mission data…</p>;
  }
  if (error || !data) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-400">{error || "No data"}</p>
        <McButton type="button" onClick={() => void refresh()}>
          Retry
        </McButton>
      </div>
    );
  }

  const { overview, goals, kpis, rv, phases } = data;
  const phase = overview.currentPhase;

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#3B8CFF]">
          Mission Control
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Remote Engineering Job → Financial Runway → RV Life
        </h1>
        <div className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9cb6d4]">
            The Mission
          </p>
          <p className="text-sm text-[#c8dff7]">
            Get the remote engineering job. Build the runway. Test the RV lifestyle. Hit the road.
          </p>
          <StageTimeline stages={overview.stages} />
        </div>
        <div className="max-w-xl space-y-2">
          <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[#9cb6d4]">
            <span>Overall progress</span>
            <span>{overview.overallProgress}%</span>
          </div>
          <ProgressBar value={overview.overallProgress} />
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Start" value={overview.startDate} />
        <Metric label="Target" value={overview.targetDate} />
        <Metric label="Days remaining" value={overview.daysRemaining} />
        <Metric label="Current month" value={`M${overview.currentMonth}`} />
      </div>

      <Panel>
        <PanelTitle code="01">Current Phase</PanelTitle>
        <h3 className="text-xl font-semibold text-white">
          MONTH {phase?.month ?? 1} — {phase?.title ?? "POSITION"}
        </h3>
        <p className="mt-2 text-sm text-[#9cb6d4]">{phase?.goal}</p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#3B8CFF]">
          Current objective
        </p>
        <p className="mt-1 text-sm text-white">{overview.primaryObjective}</p>
      </Panel>

      <Panel>
        <PanelTitle code="02">This Month</PanelTitle>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Metric
            label="Applications"
            value={`${kpis.applicationsThisMonth} / ${goals.applicationsPerMonth}`}
          />
          <Metric
            label="Recruiter contacts"
            value={`${kpis.recruitersContactedMonth + kpis.hiringManagersContactedMonth} / ${goals.contactsPerMonth}`}
          />
          <Metric
            label="Networking"
            value={`${kpis.networkingMonth} / ${goals.networkingPerMonth}`}
          />
          <Metric label="Interviews" value={kpis.interviewsMonth} />
        </div>
      </Panel>

      <Panel>
        <PanelTitle code="03">Job Pipeline</PanelTitle>
        <p className="font-mono text-xs tracking-[0.12em] text-[#c8dff7]">
          Found → Applied → Screen → Technical → Final → Offer
        </p>
        <Link
          href="/admin/mission-control/pipeline"
          className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-[#3B8CFF] hover:underline"
        >
          Open full pipeline →
        </Link>
      </Panel>

      <Panel>
        <PanelTitle code="04">Six Month Roadmap</PanelTitle>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {phases.phases.map((p) => {
            const done = p.tasks.filter((t) => t.completed).length;
            const active = p.id === phase?.id;
            return (
              <div
                key={p.id}
                className={`border p-3 ${
                  active
                    ? "border-[#3B8CFF] bg-[#3B8CFF]/10"
                    : "border-[#3B8CFF]/20 bg-[#020617]/50"
                }`}
              >
                <p className="font-mono text-[10px] text-[#3B8CFF]">M{p.month}</p>
                <p className="mt-1 text-sm font-medium text-white">{p.title}</p>
                <p className="mt-2 font-mono text-[10px] text-[#9cb6d4]">
                  {done}/{p.tasks.length}
                </p>
              </div>
            );
          })}
        </div>
      </Panel>

      <Panel>
        <PanelTitle code="05">RV Readiness</PanelTitle>
        <div className="space-y-3">
          {(
            [
              ["Employment", rv.progress.employment],
              ["Financial", rv.progress.financial],
              ["Technical", rv.progress.technical],
              ["Lifestyle", rv.progress.lifestyle],
            ] as const
          ).map(([label, value]) => (
            <div key={label} className="space-y-1">
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[#9cb6d4]">
                <span>{label}</span>
                <span>{value}%</span>
              </div>
              <ProgressBar value={value} />
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.14em]">
          <span
            className={`border px-2 py-1 ${
              rv.jobSecured
                ? "border-[#3B8CFF] text-white"
                : "border-[#3B8CFF]/25 text-[#9cb6d4]"
            }`}
          >
            Job Secured {rv.jobSecured ? "✓" : "—"}
          </span>
          <span
            className={`border px-2 py-1 ${
              rv.rvReady
                ? "border-[#3B8CFF] text-white"
                : "border-[#3B8CFF]/25 text-[#9cb6d4]"
            }`}
          >
            RV Ready {rv.rvReady ? "✓" : "—"}
          </span>
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelTitle code="06">Today</PanelTitle>
          <p className="text-sm text-[#9cb6d4]">
            Log applications, contacts, interviews, and portfolio work.
          </p>
          <Link href="/admin/mission-control/today" className="mt-4 inline-block">
            <McButton type="button">+ Add Activity</McButton>
          </Link>
        </Panel>
        <Panel>
          <PanelTitle code="07">Next Action</PanelTitle>
          <p className="text-sm text-white">{overview.nextAction.label}</p>
          <Link href={overview.nextAction.href} className="mt-4 inline-block">
            <McButton type="button" variant="outline">
              Go →
            </McButton>
          </Link>
        </Panel>
      </div>
    </div>
  );
}
