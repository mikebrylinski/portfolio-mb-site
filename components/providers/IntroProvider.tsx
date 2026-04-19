"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  startTransition,
} from "react";
import { usePathname } from "next/navigation";
import { KeynoteIntro } from "@/components/KeynoteIntro";

const STORAGE_KEY = "mb-keynote-v1";

type IntroContextValue = {
  /** Shell ready after client mount (avoids hydration mismatch) */
  shellReady: boolean;
  /** Keynote overlay active */
  introOpen: boolean;
  closeIntro: () => void;
};

const IntroContext = createContext<IntroContextValue>({
  shellReady: false,
  introOpen: false,
  closeIntro: () => {},
});

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [shellReady, setShellReady] = useState(false);
  const [introOpen, setIntroOpen] = useState(false);

  useEffect(() => {
    startTransition(() => {
      if (pathname !== "/") {
        setIntroOpen(false);
        setShellReady(true);
        return;
      }

      try {
        const seen = sessionStorage.getItem(STORAGE_KEY) === "1";
        setIntroOpen(!seen);
      } catch {
        setIntroOpen(true);
      }
      setShellReady(true);
    });
  }, [pathname]);

  const closeIntro = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setIntroOpen(false);
  }, []);

  const value = useMemo(
    () => ({ shellReady, introOpen, closeIntro }),
    [shellReady, introOpen, closeIntro],
  );

  return (
    <IntroContext.Provider value={value}>
      {children}
      {pathname === "/" && shellReady && introOpen && (
        <KeynoteIntro onComplete={closeIntro} />
      )}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}
