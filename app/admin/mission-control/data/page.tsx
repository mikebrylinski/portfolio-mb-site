"use client";

import { useRef, useState } from "react";
import { useMission } from "@/components/mission-control/MissionProvider";
import { formatTimestamp } from "@/components/mission-control/api-client";
import {
  ErrorText,
  McButton,
  Panel,
  PanelTitle,
} from "@/components/mission-control/ui";

export default function DataPage() {
  const { data, refresh } = useMission();
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function download(type: string) {
    window.location.href = `/api/export?type=${type}`;
  }

  async function onImport(file: File) {
    setPending(true);
    setError(null);
    setMessage(null);
    try {
      const text = await file.text();
      const json = JSON.parse(text) as unknown;
      const res = await fetch("/api/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      });
      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        throw new Error(body.error || "Import failed");
      }
      setMessage("Backup restored successfully.");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Data Export & Backup</h1>
        <p className="mt-1 text-sm text-[#9cb6d4]">
          Last saved: {formatTimestamp(data?.overview.lastSaved)}
        </p>
      </div>

      <Panel>
        <PanelTitle code="EXP">Export Data</PanelTitle>
        <div className="flex flex-wrap gap-2">
          <McButton type="button" onClick={() => download("applications")}>
            Applications CSV
          </McButton>
          <McButton type="button" onClick={() => download("recruiters")}>
            Recruiters CSV
          </McButton>
          <McButton type="button" onClick={() => download("activities")}>
            Activities CSV
          </McButton>
          <McButton type="button" onClick={() => download("json")}>
            Complete JSON backup
          </McButton>
        </div>
      </Panel>

      <Panel>
        <PanelTitle code="IMP">Import Backup</PanelTitle>
        <p className="mb-3 text-sm text-[#9cb6d4]">
          Restore a previously exported mission-backup.json. This overwrites current
          Blob data.
        </p>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void onImport(file);
          }}
        />
        <McButton
          type="button"
          disabled={pending}
          onClick={() => fileRef.current?.click()}
        >
          {pending ? "Importing…" : "Choose JSON backup"}
        </McButton>
        <ErrorText>{error}</ErrorText>
        {message ? <p className="mt-2 text-sm text-[#3B8CFF]">{message}</p> : null}
      </Panel>
    </div>
  );
}
