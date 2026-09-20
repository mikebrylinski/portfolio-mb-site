"use client";

import { FormEvent, useEffect, useState } from "react";
import { apiFetch, todayInputValue } from "@/components/mission-control/api-client";
import {
  ErrorText,
  Field,
  McButton,
  McInput,
  McSelect,
  McTextarea,
  Panel,
  PanelTitle,
} from "@/components/mission-control/ui";
import { ACTIVITY_TYPES, type ActivitiesDoc, type ActivityType } from "@/lib/mission/schemas";

const LABELS: Record<ActivityType, string> = {
  application: "Applications submitted",
  recruiter_contact: "Recruiters contacted",
  hiring_manager_contact: "Hiring managers contacted",
  networking: "Networking conversations",
  interview: "Interviews",
  follow_up: "Follow-ups",
  portfolio_work: "Portfolio work",
  coding_study: "Coding/technical study",
  linkedin_post: "LinkedIn posts",
  other: "Other career activity",
};

export default function TodayPage() {
  const [doc, setDoc] = useState<ActivitiesDoc | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    date: todayInputValue(),
    type: "application" as ActivityType,
    description: "",
    companyOrPerson: "",
    url: "",
    notes: "",
  });

  async function load() {
    try {
      setDoc(await apiFetch<ActivitiesDoc>("/api/activities"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const next = await apiFetch<ActivitiesDoc>("/api/activities", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setDoc(next);
      setForm((f) => ({ ...f, description: "", companyOrPerson: "", url: "", notes: "" }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setPending(false);
    }
  }

  async function remove(id: string) {
    setPending(true);
    try {
      const next = await apiFetch<ActivitiesDoc>(`/api/activities?id=${id}`, {
        method: "DELETE",
      });
      setDoc(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setPending(false);
    }
  }

  const today = todayInputValue();
  const todays = (doc?.items ?? []).filter((a) => a.date === today);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Today</h1>
        <p className="mt-1 text-sm text-[#9cb6d4]">Quick-entry daily activity tracker.</p>
      </div>

      <Panel>
        <PanelTitle code="LOG">Add Activity</PanelTitle>
        <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
          <Field label="Date">
            <McInput
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
          </Field>
          <Field label="Type">
            <McSelect
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as ActivityType })
              }
            >
              {ACTIVITY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {LABELS[t]}
                </option>
              ))}
            </McSelect>
          </Field>
          <Field label="Description">
            <McInput
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </Field>
          <Field label="Company / Person">
            <McInput
              value={form.companyOrPerson}
              onChange={(e) => setForm({ ...form, companyOrPerson: e.target.value })}
            />
          </Field>
          <Field label="URL">
            <McInput
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />
          </Field>
          <Field label="Notes">
            <McTextarea
              rows={2}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </Field>
          <div className="sm:col-span-2">
            <ErrorText>{error}</ErrorText>
            <McButton type="submit" disabled={pending} className="mt-2">
              {pending ? "Saving…" : "+ Add Activity"}
            </McButton>
          </div>
        </form>
      </Panel>

      <Panel>
        <PanelTitle code="LIST">Today&apos;s entries</PanelTitle>
        {todays.length === 0 ? (
          <p className="text-sm text-[#9cb6d4]">No activity logged today yet.</p>
        ) : (
          <ul className="space-y-3">
            {todays.map((a) => (
              <li
                key={a.id}
                className="flex flex-col gap-2 border border-[#3B8CFF]/15 p-3 sm:flex-row sm:items-start sm:justify-between"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#3B8CFF]">
                    {LABELS[a.type]}
                  </p>
                  <p className="text-sm text-white">{a.description}</p>
                  {a.companyOrPerson ? (
                    <p className="text-xs text-[#9cb6d4]">{a.companyOrPerson}</p>
                  ) : null}
                </div>
                <McButton
                  type="button"
                  variant="ghost"
                  disabled={pending}
                  onClick={() => void remove(a.id)}
                >
                  Delete
                </McButton>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
