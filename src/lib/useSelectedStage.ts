import { useEffect, useState } from "react";
import { findStage, type Stage } from "@/lib/stages";

function readFromHash(): Stage | null {
  if (typeof window === "undefined") return null;
  const m = window.location.hash.match(/^#stage-(\d+)/i);
  if (!m) return null;
  return findStage(m[1]) ?? null;
}

export function useSelectedStage(): [Stage | null, (n: number | null) => void] {
  const [stage, setStage] = useState<Stage | null>(() => readFromHash());

  useEffect(() => {
    const onHashChange = () => setStage(readFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function select(n: number | null) {
    if (typeof window === "undefined") return;
    if (n == null) {
      // Clear selection — strip the hash without scrolling
      history.replaceState(null, "", window.location.pathname + window.location.search);
      setStage(null);
      return;
    }
    const target = `#stage-${n}`;
    if (window.location.hash !== target) {
      window.location.hash = target;
    } else {
      setStage(readFromHash());
    }
  }

  return [stage, select];
}
