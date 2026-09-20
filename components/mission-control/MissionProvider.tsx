"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { MissionNav } from "@/components/mission-control/MissionNav";
import { apiFetch } from "@/components/mission-control/api-client";

type MissionContextValue = {
  data: MissionPayload | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

export type MissionPayload = {
  settings: {
    version: number;
    updatedAt: string;
    startDate: string;
    targetDate: string;
    currentPhaseId: string;
    stages: { JOB: boolean; RUNWAY: boolean; TEST: boolean; RV_LIFE: boolean };
    primaryObjective: string;
  };
  phases: {
    version: number;
    updatedAt: string;
    phases: Array<{
      id: string;
      month: number;
      title: string;
      goal: string;
      objective: string;
      startDate: string;
      endDate: string;
      tasks: Array<{ id: string; label: string; completed: boolean }>;
    }>;
  };
  goals: {
    version: number;
    applicationsPerMonth: number;
    contactsPerMonth: number;
    networkingPerMonth: number;
    technicalPostsPerMonth: number;
    technicalProjects: number;
    offersTarget: string;
  };
  kpis: {
    applicationsThisWeek: number;
    applicationsThisMonth: number;
    applicationsTotal: number;
    recruitersContacted: number;
    recruitersContactedMonth: number;
    hiringManagersContactedMonth: number;
    networkingMonth: number;
    interviews: number;
    interviewsMonth: number;
    finalInterviews: number;
    offers: number;
    technicalPostsMonth: number;
  };
  funnel: {
    currentMonth: FunnelSlice;
    sixMonthTotal: FunnelSlice;
  };
  finances: {
    version: number;
    currentMonthlyIncome: number;
    monthlyExpenses: number;
    savings: number;
    emergencyFund: number;
    targetEmergencyFund: number;
    monthlyJobSearchBudget: number;
    freelanceIncome: number;
    saasIncome: number;
    targetSalary: number;
    estimatedMonthlyTakeHome: number;
    rvMonthlyBudget: number;
    runwayMonths: number | null;
  };
  rv: {
    version: number;
    jobSecured: boolean;
    rvReady: boolean;
    employment: Array<{ id: string; label: string; completed: boolean }>;
    financial: Array<{ id: string; label: string; completed: boolean }>;
    technical: Array<{ id: string; label: string; completed: boolean }>;
    lifestyle: Array<{ id: string; label: string; completed: boolean }>;
    progress: {
      employment: number;
      financial: number;
      technical: number;
      lifestyle: number;
      overall: number;
    };
  };
  overview: {
    startDate: string;
    targetDate: string;
    daysRemaining: number;
    overallProgress: number;
    currentMonth: number;
    currentPhase: MissionPayload["phases"]["phases"][number] | null;
    primaryObjective: string;
    stages: MissionPayload["settings"]["stages"];
    nextAction: { label: string; href: string };
    lastSaved?: string;
  };
};

type FunnelSlice = {
  applications: number;
  responses: number;
  recruiterScreens: number;
  technicalInterviews: number;
  finalInterviews: number;
  offers: number;
  rates: {
    applicationToResponse: number;
    responseToScreen: number;
    screenToTechnical: number;
    technicalToFinal: number;
    finalToOffer: number;
  };
};

const MissionContext = createContext<MissionContextValue | null>(null);

export function useMission() {
  const ctx = useContext(MissionContext);
  if (!ctx) throw new Error("useMission must be used within MissionProvider");
  return ctx;
}

export function MissionProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<MissionPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setError(null);
    try {
      const payload = await apiFetch<MissionPayload>("/api/mission");
      setData(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load mission data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <MissionContext.Provider value={{ data, loading, error, refresh }}>
      <MissionNav lastSaved={data?.overview.lastSaved} />
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">{children}</div>
    </MissionContext.Provider>
  );
}
