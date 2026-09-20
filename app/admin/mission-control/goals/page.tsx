"use client";

import { FormEvent, useState } from "react";
import { useMission } from "@/components/mission-control/MissionProvider";
import { apiFetch } from "@/components/mission-control/api-client";
import {
  ErrorText,
  Field,
  McButton,
  McInput,
  Metric,
  Panel,
  PanelTitle,
  ProgressBar,
} from "@/components/mission-control/ui";

export default function GoalsPage() {
  const { data, loading, error, refresh } = useMission();
  const [pending, setPending] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  if (loading) return <p className="font-mono text-sm text-[#9cb6d4]">Loading…</p>;
  if (error || !data) return <p className="text-sm text-red-400">{error}</p>;

  const { goals, kpis, funnel } = data;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setPending(true);
    setSaveError(null);
    try {
      await apiFetch("/api/goals", {
        method: "PATCH",
        body: JSON.stringify({
          version: goals.version,
          applicationsPerMonth: Number(fd.get("applicationsPerMonth")),
          contactsPerMonth: Number(fd.get("contactsPerMonth")),
          networkingPerMonth: Number(fd.get("networkingPerMonth")),
          technicalPostsPerMonth: Number(fd.get("technicalPostsPerMonth")),
          technicalProjects: Number(fd.get("technicalProjects")),
          offersTarget: String(fd.get("offersTarget") || ""),
        }),
      });
      await refresh();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setPending(false);
    }
  }

  function pct(current: number, target: number) {
    if (target <= 0) return 0;
    return Math.min(100, Math.round((current / target) * 100));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Goals & KPIs</h1>
        <p className="mt-1 text-sm text-[#9cb6d4]">
          Activity targets — not guaranteed outcomes.
        </p>
      </div>

      <Panel>
        <PanelTitle code="KPI">Job Search</PanelTitle>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Apps this week" value={kpis.applicationsThisWeek} />
          <Metric label="Apps this month" value={kpis.applicationsThisMonth} />
          <Metric label="Total applications" value={kpis.applicationsTotal} />
          <Metric label="Recruiters contacted" value={kpis.recruitersContacted} />
          <Metric label="HM contacts (month)" value={kpis.hiringManagersContactedMonth} />
          <Metric label="Interviews" value={kpis.interviews} />
          <Metric label="Final interviews" value={kpis.finalInterviews} />
          <Metric label="Offers" value={kpis.offers} />
        </div>
      </Panel>

      <Panel>
        <PanelTitle code="TGT">Monthly targets</PanelTitle>
        <div className="mb-4 space-y-3">
          {(
            [
              ["Applications", kpis.applicationsThisMonth, goals.applicationsPerMonth],
              [
                "Contacts",
                kpis.recruitersContactedMonth + kpis.hiringManagersContactedMonth,
                goals.contactsPerMonth,
              ],
              ["Networking", kpis.networkingMonth, goals.networkingPerMonth],
              ["Technical posts", kpis.technicalPostsMonth, goals.technicalPostsPerMonth],
            ] as const
          ).map(([label, current, target]) => (
            <div key={label} className="space-y-1">
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[#9cb6d4]">
                <span>
                  {label}: {current} / {target}
                </span>
                <span>{pct(current, target)}%</span>
              </div>
              <ProgressBar value={pct(current, target)} />
            </div>
          ))}
        </div>
        <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Applications / month">
            <McInput
              name="applicationsPerMonth"
              type="number"
              min={0}
              defaultValue={goals.applicationsPerMonth}
            />
          </Field>
          <Field label="Contacts / month">
            <McInput
              name="contactsPerMonth"
              type="number"
              min={0}
              defaultValue={goals.contactsPerMonth}
            />
          </Field>
          <Field label="Networking / month">
            <McInput
              name="networkingPerMonth"
              type="number"
              min={0}
              defaultValue={goals.networkingPerMonth}
            />
          </Field>
          <Field label="Technical posts / month">
            <McInput
              name="technicalPostsPerMonth"
              type="number"
              min={0}
              defaultValue={goals.technicalPostsPerMonth}
            />
          </Field>
          <Field label="Technical projects">
            <McInput
              name="technicalProjects"
              type="number"
              min={0}
              defaultValue={goals.technicalProjects}
            />
          </Field>
          <Field label="Offers target">
            <McInput name="offersTarget" defaultValue={goals.offersTarget} />
          </Field>
          <div className="sm:col-span-2 lg:col-span-3">
            <ErrorText>{saveError}</ErrorText>
            <McButton type="submit" disabled={pending} className="mt-2">
              {pending ? "Saving…" : "Save targets"}
            </McButton>
          </div>
        </form>
      </Panel>

      <Panel>
        <PanelTitle code="FUN">Funnel analytics</PanelTitle>
        <div className="grid gap-4 lg:grid-cols-2">
          {(
            [
              ["Current month", funnel.currentMonth],
              ["Six-month total", funnel.sixMonthTotal],
            ] as const
          ).map(([title, slice]) => (
            <div key={title} className="border border-[#3B8CFF]/15 p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#3B8CFF]">
                {title}
              </p>
              <ol className="mt-3 space-y-2 font-mono text-xs text-[#c8dff7]">
                <li>Applications — {slice.applications}</li>
                <li>
                  Responses — {slice.responses} (
                  {slice.rates.applicationToResponse}%)
                </li>
                <li>
                  Recruiter screens — {slice.recruiterScreens} (
                  {slice.rates.responseToScreen}%)
                </li>
                <li>
                  Technical — {slice.technicalInterviews} (
                  {slice.rates.screenToTechnical}%)
                </li>
                <li>
                  Final — {slice.finalInterviews} ({slice.rates.technicalToFinal}%)
                </li>
                <li>
                  Offers — {slice.offers} ({slice.rates.finalToOffer}%)
                </li>
              </ol>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
