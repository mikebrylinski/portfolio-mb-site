import type { ReactNode } from "react";
import { MissionProvider } from "@/components/mission-control/MissionProvider";

export default function MissionControlLayout({ children }: { children: ReactNode }) {
  return <MissionProvider>{children}</MissionProvider>;
}
