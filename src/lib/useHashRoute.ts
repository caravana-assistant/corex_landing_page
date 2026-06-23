import { useEffect, useState } from "react";

// COR-163: tiny dependency-free hash router. Routes (static-host safe, no 404 on F5):
//   #/            → index
//   #/stages      → all stages grid
//   #/stage/3     → individual stage page (tabs)
//   #/my-corex    → My CoreX schedule lookup
export type Route =
  | { name: "index" }
  | { name: "stages" }
  | { name: "stage"; n: number }
  | { name: "my-corex" };

export function parseHash(hash: string): Route {
  const clean = hash.replace(/^#/, "").replace(/^\/+/, "").replace(/\/+$/, "");
  const seg = clean.split("/").filter(Boolean);
  if (seg.length === 0) return { name: "index" };
  if (seg[0] === "stages") return { name: "stages" };
  if (seg[0] === "stage" && seg[1]) {
    const n = parseInt(seg[1], 10);
    if (Number.isFinite(n)) return { name: "stage", n };
  }
  if (seg[0] === "my-corex" || seg[0] === "my-schedule") return { name: "my-corex" };
  return { name: "index" };
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    parseHash(typeof window !== "undefined" ? window.location.hash : ""),
  );
  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

/** Programmatic navigation. */
export function navigate(path: string) {
  const h = path.startsWith("#") ? path : `#${path.startsWith("/") ? path : `/${path}`}`;
  if (window.location.hash === h) {
    window.scrollTo({ top: 0, behavior: "auto" });
  } else {
    window.location.hash = h;
  }
}
