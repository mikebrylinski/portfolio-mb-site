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
import {
  RECRUITER_STATUSES,
  type Recruiter,
  type RecruiterStatus,
  type RecruitersDoc,
} from "@/lib/mission/schemas";

const emptyForm = {
  name: "",
  company: "",
  email: "",
  linkedInUrl: "",
  specialty: "",
  location: "",
  dateContacted: todayInputValue(),
  lastContact: todayInputValue(),
  nextFollowUp: "",
  status: "New" as RecruiterStatus,
  jobsDiscussed: "",
  notes: "",
};

export default function RecruitersPage() {
  const [doc, setDoc] = useState<RecruitersDoc | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState<Recruiter | null>(null);

  async function load() {
    try {
      setDoc(await apiFetch<RecruitersDoc>("/api/recruiters"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const today = todayInputValue();
  const dueSoon = (doc?.items ?? [])
    .filter((r) => r.nextFollowUp && r.nextFollowUp <= today)
    .sort((a, b) => a.nextFollowUp.localeCompare(b.nextFollowUp));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      if (editing) {
        setDoc(
          await apiFetch("/api/recruiters", {
            method: "PATCH",
            body: JSON.stringify({ id: editing.id, ...form }),
          }),
        );
      } else {
        setDoc(
          await apiFetch("/api/recruiters", {
            method: "POST",
            body: JSON.stringify(form),
          }),
        );
      }
      setForm(emptyForm);
      setEditing(null);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setPending(false);
    }
  }

  async function remove(id: string) {
    setPending(true);
    try {
      setDoc(await apiFetch(`/api/recruiters?id=${id}`, { method: "DELETE" }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setPending(false);
    }
  }

  function startEdit(r: Recruiter) {
    setEditing(r);
    setForm({
      name: r.name,
      company: r.company,
      email: r.email,
      linkedInUrl: r.linkedInUrl,
      specialty: r.specialty,
      location: r.location,
      dateContacted: r.dateContacted || todayInputValue(),
      lastContact: r.lastContact || todayInputValue(),
      nextFollowUp: r.nextFollowUp,
      status: r.status,
      jobsDiscussed: r.jobsDiscussed,
      notes: r.notes,
    });
    setShowForm(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white">Recruiter CRM</h1>
          <p className="mt-1 text-sm text-[#9cb6d4]">
            Lightweight contacts with follow-up reminders.
          </p>
        </div>
        <McButton type="button" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Close" : "+ Add Recruiter"}
        </McButton>
      </div>

      <ErrorText>{error}</ErrorText>

      {dueSoon.length > 0 ? (
        <Panel>
          <PanelTitle code="DUE">Follow-ups due</PanelTitle>
          <ul className="space-y-2">
            {dueSoon.map((r) => (
              <li key={r.id} className="text-sm text-[#c8dff7]">
                <span className="font-mono text-[#3B8CFF]">{r.nextFollowUp}</span> —{" "}
                {r.name} ({r.company || "—"})
              </li>
            ))}
          </ul>
        </Panel>
      ) : null}

      {showForm ? (
        <Panel>
          <PanelTitle code="REC">{editing ? "Edit" : "New"} Recruiter</PanelTitle>
          <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
            {(
              [
                ["name", "Name", true],
                ["company", "Company", false],
                ["email", "Email", false],
                ["linkedInUrl", "LinkedIn URL", false],
                ["specialty", "Specialty", false],
                ["location", "Location", false],
                ["jobsDiscussed", "Jobs discussed", false],
              ] as const
            ).map(([key, label, required]) => (
              <Field key={key} label={label}>
                <McInput
                  required={required}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              </Field>
            ))}
            <Field label="Date contacted">
              <McInput
                type="date"
                value={form.dateContacted}
                onChange={(e) => setForm({ ...form, dateContacted: e.target.value })}
              />
            </Field>
            <Field label="Last contact">
              <McInput
                type="date"
                value={form.lastContact}
                onChange={(e) => setForm({ ...form, lastContact: e.target.value })}
              />
            </Field>
            <Field label="Next follow-up">
              <McInput
                type="date"
                value={form.nextFollowUp}
                onChange={(e) => setForm({ ...form, nextFollowUp: e.target.value })}
              />
            </Field>
            <Field label="Status">
              <McSelect
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as RecruiterStatus })
                }
              >
                {RECRUITER_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </McSelect>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Notes">
                <McTextarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </Field>
            </div>
            <McButton type="submit" disabled={pending}>
              {pending ? "Saving…" : editing ? "Update" : "Create"}
            </McButton>
          </form>
        </Panel>
      ) : null}

      <div className="space-y-3">
        {(doc?.items ?? []).map((r) => (
          <Panel key={r.id} corners={false}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#3B8CFF]">
                  {r.status}
                </p>
                <h3 className="text-lg font-medium text-white">{r.name}</h3>
                <p className="text-sm text-[#9cb6d4]">
                  {r.company || "—"} · {r.specialty || "General"}
                </p>
                <p className="mt-2 text-xs text-[#9cb6d4]">
                  Next follow-up: {r.nextFollowUp || "—"}
                </p>
              </div>
              <div className="flex gap-2">
                <McButton type="button" variant="ghost" onClick={() => startEdit(r)}>
                  Edit
                </McButton>
                <McButton
                  type="button"
                  variant="ghost"
                  disabled={pending}
                  onClick={() => void remove(r.id)}
                >
                  Delete
                </McButton>
              </div>
            </div>
          </Panel>
        ))}
        {(doc?.items ?? []).length === 0 ? (
          <p className="text-sm text-[#9cb6d4]">No recruiters yet.</p>
        ) : null}
      </div>
    </div>
  );
}
