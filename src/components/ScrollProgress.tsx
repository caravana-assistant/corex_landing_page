import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const next = max > 0 ? (window.scrollY / max) * 100 : 0;
      setPct(next);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
    >
      <div
        className="h-full origin-left bg-[var(--color-volt)] transition-[width] duration-150"
        style={{
          width: `${pct}%`,
          boxShadow: "0 0 16px var(--color-volt-glow)",
        }}
      />
    </div>
  );
}
