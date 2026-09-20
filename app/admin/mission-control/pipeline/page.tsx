"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
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
  KANBAN_COLUMNS,
  type Application,
  type ApplicationStatus,
  type ApplicationsDoc,
} from "@/lib/mission/schemas";

const emptyForm = {
  company: "",
  position: "",
  jobUrl: "",
  companyUrl: "",
  location: "",
  remoteStatus: "Remote",
  salaryRange: "",
  employmentType: "Full-time",
  techStack: "",
  recruiter: "",
  recruiterEmail: "",
  hiringManager: "",
  dateDiscovered: todayInputValue(),
  dateApplied: "",
  status: "FOUND" as ApplicationStatus,
  nextAction: "",
  nextActionDate: "",
  notes: "",
};

export default function PipelinePage() {
  const [doc, setDoc] = useState<ApplicationsDoc | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState<Application | null>(null);

  async function load() {
    try {
      setDoc(await apiFetch<ApplicationsDoc>("/api/applications"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const byStatus = useMemo(() => {
    const map = Object.fromEntries(
      KANBAN_COLUMNS.map((s) => [s, [] as Application[]]),
    ) as Record<ApplicationStatus, Application[]>;
    for (const item of doc?.items ?? []) {
      map[item.status]?.push(item);
    }
    return map;
  }, [doc]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      if (editing) {
        const next = await apiFetch<ApplicationsDoc>("/api/applications", {
          method: "PATCH",
          body: JSON.stringify({ id: editing.id, ...form }),
        });
        setDoc(next);
      } else {
        const next = await apiFetch<ApplicationsDoc>("/api/applications", {
          method: "POST",
          body: JSON.stringify(form),
        });
        setDoc(next);
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

  async function move(id: string, status: ApplicationStatus) {
    setPending(true);
    try {
      const next = await apiFetch<ApplicationsDoc>("/api/applications", {
        method: "PATCH",
        body: JSON.stringify({ id, status }),
      });
      setDoc(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setPending(false);
    }
  }

  async function remove(id: string) {
    setPending(true);
    try {
      const next = await apiFetch<ApplicationsDoc>(`/api/applications?id=${id}`, {
        method: "DELETE",
      });
      setDoc(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setPending(false);
    }
  }

  function startEdit(app: Application) {
    setEditing(app);
    setForm({
      company: app.company,
      position: app.position,
      jobUrl: app.jobUrl,
      companyUrl: app.companyUrl,
      location: app.location,
      remoteStatus: app.remoteStatus,
      salaryRange: app.salaryRange,
      employmentType: app.employmentType,
      techStack: app.techStack,
      recruiter: app.recruiter,
      recruiterEmail: app.recruiterEmail,
      hiringManager: app.hiringManager,
      dateDiscovered: app.dateDiscovered || todayInputValue(),
      dateApplied: app.dateApplied,
      status: app.status,
      nextAction: app.nextAction,
      nextActionDate: app.nextActionDate,
      notes: app.notes,
    });
    setShowForm(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white">Job Pipeline</h1>
          <p className="mt-1 text-sm text-[#9cb6d4]">Kanban tracker for applications.</p>
        </div>
        <McButton
          type="button"
          onClick={() => {
            setEditing(null);
            setForm(emptyForm);
            setShowForm((v) => !v);
          }}
        >
          {showForm ? "Close" : "+ Add Application"}
        </McButton>
      </div>

      <ErrorText>{error}</ErrorText>

      {showForm ? (
        <Panel>
          <PanelTitle code="APP">{editing ? "Edit" : "New"} Application</PanelTitle>
          <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(
              [
                ["company", "Company", true],
                ["position", "Position", true],
                ["jobUrl", "Job URL", false],
                ["companyUrl", "Company URL", false],
                ["location", "Location", false],
                ["remoteStatus", "Remote status", false],
                ["salaryRange", "Salary range", false],
                ["employmentType", "Employment type", false],
                ["techStack", "Tech stack", false],
                ["recruiter", "Recruiter", false],
                ["recruiterEmail", "Recruiter email", false],
                ["hiringManager", "Hiring manager", false],
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
            <Field label="Date discovered">
              <McInput
                type="date"
                value={form.dateDiscovered}
                onChange={(e) => setForm({ ...form, dateDiscovered: e.target.value })}
              />
            </Field>
            <Field label="Date applied">
              <McInput
                type="date"
                value={form.dateApplied}
                onChange={(e) => setForm({ ...form, dateApplied: e.target.value })}
              />
            </Field>
            <Field label="Status">
              <McSelect
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as ApplicationStatus })
                }
              >
                {KANBAN_COLUMNS.map((s) => (
                  <option key={s} value={s}>
                    {s.replaceAll("_", " ")}
                  </option>
                ))}
              </McSelect>
            </Field>
            <Field label="Next action">
              <McInput
                value={form.nextAction}
                onChange={(e) => setForm({ ...form, nextAction: e.target.value })}
              />
            </Field>
            <Field label="Next action date">
              <McInput
                type="date"
                value={form.nextActionDate}
                onChange={(e) => setForm({ ...form, nextActionDate: e.target.value })}
              />
            </Field>
            <div className="sm:col-span-2 lg:col-span-3">
              <Field label="Notes">
                <McTextarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </Field>
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <McButton type="submit" disabled={pending}>
                {pending ? "Saving…" : editing ? "Update" : "Create"}
              </McButton>
            </div>
          </form>
        </Panel>
      ) : null}

      <div className="flex gap-3 overflow-x-auto pb-2">
        {KANBAN_COLUMNS.map((status) => (
          <div
            key={status}
            className="w-[260px] shrink-0 border border-[#3B8CFF]/20 bg-[#06101c]/50"
          >
            <div className="border-b border-[#3B8CFF]/15 px-3 py-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#3B8CFF]">
                {status.replaceAll("_", " ")}
              </p>
              <p className="text-xs text-[#9cb6d4]">{byStatus[status].length}</p>
            </div>
            <div className="space-y-2 p-2">
              {byStatus[status].map((app) => (
                <div
                  key={app.id}
                  className="border border-[#3B8CFF]/15 bg-[#020617]/80 p-2"
                >
                  <p className="text-sm font-medium text-white">{app.company}</p>
                  <p className="text-xs text-[#9cb6d4]">{app.position}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <McSelect
                      className="py-1 text-xs"
                      value={app.status}
                      disabled={pending}
                      onChange={(e) =>
                        void move(app.id, e.target.value as ApplicationStatus)
                      }
                    >
                      {KANBAN_COLUMNS.map((s) => (
                        <option key={s} value={s}>
                          {s.replaceAll("_", " ")}
                        </option>
                      ))}
                    </McSelect>
                    <McButton
                      type="button"
                      variant="ghost"
                      className="min-h-0 px-2 py-1 text-[10px]"
                      onClick={() => startEdit(app)}
                    >
                      Edit
                    </McButton>
                    <McButton
                      type="button"
                      variant="ghost"
                      className="min-h-0 px-2 py-1 text-[10px]"
                      disabled={pending}
                      onClick={() => void remove(app.id)}
                    >
                      Del
                    </McButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
