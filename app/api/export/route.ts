import { handleApiError, jsonError, requireAuth, toCsv } from "@/lib/mission/api";
import {
  getActivities,
  getApplications,
  getFinances,
  getGoals,
  getInterviews,
  getPhases,
  getRecruiters,
  getRv,
  getSettings,
} from "@/lib/mission/blob";

export async function GET(request: Request) {
  const denied = await requireAuth();
  if (denied) return denied;
  try {
    const type = new URL(request.url).searchParams.get("type") ?? "json";

    if (type === "applications") {
      const doc = await getApplications();
      const csv = toCsv(doc.items as unknown as Record<string, unknown>[]);
      return new Response(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="applications.csv"',
        },
      });
    }
    if (type === "recruiters") {
      const doc = await getRecruiters();
      const csv = toCsv(doc.items as unknown as Record<string, unknown>[]);
      return new Response(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="recruiters.csv"',
        },
      });
    }
    if (type === "activities") {
      const doc = await getActivities();
      const csv = toCsv(doc.items as unknown as Record<string, unknown>[]);
      return new Response(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="activities.csv"',
        },
      });
    }
    if (type === "json") {
      const [
        settings,
        goals,
        phases,
        activities,
        applications,
        recruiters,
        interviews,
        finances,
        rv,
      ] = await Promise.all([
        getSettings(),
        getGoals(),
        getPhases(),
        getActivities(),
        getApplications(),
        getRecruiters(),
        getInterviews(),
        getFinances(),
        getRv(),
      ]);
      const payload = {
        exportedAt: new Date().toISOString(),
        settings,
        goals,
        phases,
        activities,
        applications,
        recruiters,
        interviews,
        finances,
        rv,
      };
      return new Response(JSON.stringify(payload, null, 2), {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Content-Disposition": 'attachment; filename="mission-backup.json"',
        },
      });
    }
    return jsonError("Invalid export type", 400);
  } catch (err) {
    return handleApiError(err);
  }
}
