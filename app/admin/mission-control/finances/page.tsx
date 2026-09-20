"use client";

import { FormEvent, useEffect, useState } from "react";
import { apiFetch } from "@/components/mission-control/api-client";
import {
  ErrorText,
  Field,
  McButton,
  McInput,
  Metric,
  Panel,
  PanelTitle,
} from "@/components/mission-control/ui";
import type { FinancesDoc } from "@/lib/mission/schemas";

type FinancesResponse = FinancesDoc & { runwayMonths: number | null };

const FIELDS: Array<{ key: keyof FinancesDoc; label: string }> = [
  { key: "currentMonthlyIncome", label: "Current monthly income" },
  { key: "monthlyExpenses", label: "Monthly expenses" },
  { key: "savings", label: "Savings" },
  { key: "emergencyFund", label: "Emergency fund" },
  { key: "targetEmergencyFund", label: "Target emergency fund" },
  { key: "monthlyJobSearchBudget", label: "Monthly job-search budget" },
  { key: "freelanceIncome", label: "Freelance income" },
  { key: "saasIncome", label: "SaaS income" },
  { key: "targetSalary", label: "Target salary" },
  { key: "estimatedMonthlyTakeHome", label: "Estimated monthly take-home" },
  { key: "rvMonthlyBudget", label: "RV monthly budget" },
];

export default function FinancesPage() {
  const [doc, setDoc] = useState<FinancesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        setDoc(await apiFetch<FinancesResponse>("/api/finances"));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      }
    })();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!doc) return;
    const fd = new FormData(e.currentTarget);
    setPending(true);
    setError(null);
    try {
      const payload: Record<string, number> = {};
      for (const field of FIELDS) {
        payload[field.key] = Number(fd.get(field.key) || 0);
      }
      const next = await apiFetch<FinancesResponse>("/api/finances", {
        method: "PATCH",
        body: JSON.stringify({ version: doc.version, ...payload }),
      });
      setDoc(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setPending(false);
    }
  }

  if (!doc) {
    return (
      <div>
        <ErrorText>{error}</ErrorText>
        <p className="font-mono text-sm text-[#9cb6d4]">Loading…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Financial Runway</h1>
        <p className="mt-1 text-sm text-[#9cb6d4]">
          Private finances. Never exposed on the public site.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Metric
          label="Runway"
          value={
            doc.runwayMonths == null
              ? "—"
              : `${doc.runwayMonths} months`
          }
          hint="Savings ÷ Monthly expenses"
        />
        <Metric
          label="Emergency fund gap"
          value={`$${Math.max(0, doc.targetEmergencyFund - doc.emergencyFund).toLocaleString()}`}
        />
      </div>

      <Panel>
        <PanelTitle code="FIN">Track</PanelTitle>
        <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FIELDS.map((field) => (
            <Field key={field.key} label={field.label}>
              <McInput
                name={field.key}
                type="number"
                min={0}
                step="0.01"
                defaultValue={doc[field.key] as number}
              />
            </Field>
          ))}
          <div className="sm:col-span-2 lg:col-span-3">
            <ErrorText>{error}</ErrorText>
            <McButton type="submit" disabled={pending} className="mt-2">
              {pending ? "Saving…" : "Save finances"}
            </McButton>
          </div>
        </form>
      </Panel>
    </div>
  );
}
