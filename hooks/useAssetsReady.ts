"use client";

import { useEffect, useState } from "react";

/** True once the initial mount + a short delay has elapsed, used to gate the loading screen. */
export function useAssetsReady(minimumMs = 1800) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), minimumMs);
    return () => window.clearTimeout(timer);
  }, [minimumMs]);

  return ready;
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
