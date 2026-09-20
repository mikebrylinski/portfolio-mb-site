"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/components/mission-control/api-client";
import {
  ErrorText,
  McButton,
  McInput,
  McTextarea,
  Panel,
  PanelTitle,
  ProgressBar,
} from "@/components/mission-control/ui";
import type { InterviewsDoc } from "@/lib/mission/schemas";

export default function InterviewsPage() {
  const [doc, setDoc] = useState<InterviewsDoc | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function load() {
    try {
      setDoc(await apiFetch<InterviewsDoc>("/api/interviews"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function save(next: InterviewsDoc) {
    setPending(true);
    setError(null);
    try {
      const saved = await apiFetch<InterviewsDoc>("/api/interviews", {
        method: "PATCH",
        body: JSON.stringify({
          version: doc?.version,
          topics: next.topics,
          stories: next.stories,
        }),
      });
      setDoc(saved);
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
        <h1 className="text-2xl font-semibold text-white">Interview Prep</h1>
        <p className="mt-1 text-sm text-[#9cb6d4]">
          Topic readiness and story library for Month 5.
        </p>
      </div>
      <ErrorText>{error}</ErrorText>

      <Panel>
        <PanelTitle code="TOP">Preparation topics</PanelTitle>
        <ul className="space-y-4">
          {doc.topics.map((topic, idx) => (
            <li key={topic.id} className="space-y-2 border border-[#3B8CFF]/15 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-white">{topic.topic}</p>
                <label className="flex items-center gap-2 font-mono text-[10px] text-[#9cb6d4]">
                  Ready
                  <McInput
                    type="number"
                    min={0}
                    max={100}
                    className="w-20 py-1"
                    value={topic.readiness}
                    onChange={(e) => {
                      const topics = [...doc.topics];
                      topics[idx] = {
                        ...topic,
                        readiness: Number(e.target.value),
                      };
                      setDoc({ ...doc, topics });
                    }}
                  />
                </label>
              </div>
              <ProgressBar value={topic.readiness} />
              <McTextarea
                rows={2}
                placeholder="Notes"
                value={topic.notes}
                onChange={(e) => {
                  const topics = [...doc.topics];
                  topics[idx] = { ...topic, notes: e.target.value };
                  setDoc({ ...doc, topics });
                }}
              />
            </li>
          ))}
        </ul>
        <McButton
          type="button"
          className="mt-4"
          disabled={pending}
          onClick={() => void save(doc)}
        >
          {pending ? "Saving…" : "Save topics"}
        </McButton>
      </Panel>

      <Panel>
        <PanelTitle code="STY">Story library</PanelTitle>
        <ul className="space-y-4">
          {doc.stories.map((story, idx) => (
            <li key={story.id} className="space-y-2 border border-[#3B8CFF]/15 p-3">
              <McInput
                value={story.title}
                onChange={(e) => {
                  const stories = [...doc.stories];
                  stories[idx] = { ...story, title: e.target.value };
                  setDoc({ ...doc, stories });
                }}
              />
              <McTextarea
                rows={2}
                placeholder="Situation"
                value={story.situation}
                onChange={(e) => {
                  const stories = [...doc.stories];
                  stories[idx] = { ...story, situation: e.target.value };
                  setDoc({ ...doc, stories });
                }}
              />
              <McTextarea
                rows={2}
                placeholder="Action"
                value={story.action}
                onChange={(e) => {
                  const stories = [...doc.stories];
                  stories[idx] = { ...story, action: e.target.value };
                  setDoc({ ...doc, stories });
                }}
              />
              <McTextarea
                rows={2}
                placeholder="Result"
                value={story.result}
                onChange={(e) => {
                  const stories = [...doc.stories];
                  stories[idx] = { ...story, result: e.target.value };
                  setDoc({ ...doc, stories });
                }}
              />
            </li>
          ))}
        </ul>
        <McButton
          type="button"
          className="mt-4"
          disabled={pending}
          onClick={() => void save(doc)}
        >
          {pending ? "Saving…" : "Save stories"}
        </McButton>
      </Panel>
    </div>
  );
}
